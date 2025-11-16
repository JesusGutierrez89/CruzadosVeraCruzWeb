'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { es } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import { PlusCircle, Trash2, Calendar as CalendarIcon, Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, addDoc, deleteDoc, doc } from 'firebase/firestore';
import type { Evento } from '@/lib/definitions';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

// Definición del tipo para un evento en el frontend (con Date object)
type FrontendEvento = Omit<Evento, 'date'> & {
    date: Date;
};


export default function CalendarPage() {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [newEvent, setNewEvent] = useState({ title: '', description: '', time: '' });
    const [selectedEvent, setSelectedEvent] = useState<FrontendEvento | null>(null);

    const firestore = useFirestore();
    const eventsCollectionRef = useMemoFirebase(() => firestore ? collection(firestore, 'events') : null, [firestore]);
    const { data: eventsData, isLoading, error } = useCollection<Evento>(eventsCollectionRef);

    const events: FrontendEvento[] = useMemo(() => {
        if (!eventsData) return [];
        return eventsData.map(e => ({
            ...e,
            date: new Date(e.date), // Convert ISO string from Firestore to Date object
        }));
    }, [eventsData]);


    const handleDateSelect = (selectedDate: Date | undefined) => {
        setDate(selectedDate);
        setSelectedEvent(null); // Deseleccionar evento al cambiar de día
    }

    const selectedDayEvents = date
        ? events.filter(
            (event) => event.date.toDateString() === date.toDateString()
        )
        : [];

    const handleAddEvent = async (e: React.FormEvent) => {
        e.preventDefault();
        if (date && newEvent.title && firestore) {
            await addDoc(collection(firestore, 'events'), {
                date: date.toISOString(), // Store as ISO string
                title: newEvent.title,
                description: newEvent.description,
                time: newEvent.time,
            });
            
            setNewEvent({ title: '', description: '', time: '' });
            setIsFormOpen(false);
        }
    };
    
    const handleRemoveEvent = async () => {
        if (selectedEvent && firestore) {
            await deleteDoc(doc(firestore, 'events', selectedEvent.id));
            setSelectedEvent(null); // Deseleccionar después de borrar
        }
    };

    const eventDates = events.map(e => e.date);
    const todayAndHasEvent = (day: Date) => {
        const today = new Date();
        const isToday = day.toDateString() === today.toDateString();
        const hasEvent = eventDates.some(eventDate => eventDate.toDateString() === day.toDateString());
        return isToday && hasEvent;
    };
    
    return (
        <Card>
            <CardHeader>
                <CardTitle>Calendario de Actividades</CardTitle>
                <CardDescription>Selecciona una fecha para ver los eventos o añadir uno nuevo.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex justify-center">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={handleDateSelect}
                        className="rounded-md border"
                        locale={es}
                        modifiers={{ 
                            hasEvent: eventDates,
                            today: new Date(),
                            todayAndHasEvent: todayAndHasEvent,
                        }}
                        modifiersStyles={{
                            hasEvent: { 
                                backgroundColor: 'hsl(var(--accent))',
                                color: 'hsl(var(--accent-foreground))',
                            },
                            today: {
                                borderBottom: '2px solid hsl(var(--accent))',
                            },
                            todayAndHasEvent: {
                                backgroundColor: 'hsl(50 95% 55%)', /* Amarillo */
                                color: 'hsl(var(--background))',
                            },
                        }}
                    />
                </div>
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold font-headline flex items-center gap-2">
                        <CalendarIcon className="w-5 h-5 text-muted-foreground" />
                        Eventos para {date ? format(date, 'PPP', { locale: es }) : '...'}
                    </h3>
                    {isLoading && (
                        <div className="flex items-center justify-center h-40">
                             <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                        </div>
                    )}
                    {error && (
                         <Alert variant="destructive">
                            <Terminal className="h-4 w-4" />
                            <AlertTitle>Error de Carga</AlertTitle>
                            <AlertDescription>
                                No se pudieron cargar los eventos desde la base de datos.
                            </AlertDescription>
                        </Alert>
                    )}
                    {!isLoading && !error && selectedDayEvents.length > 0 ? (
                        <div className="space-y-4">
                            {selectedDayEvents.sort((a, b) => a.time.localeCompare(b.time)).map((event) => (
                                <Card 
                                    key={event.id} 
                                    className={cn("bg-muted/30 cursor-pointer transition-all", selectedEvent?.id === event.id && "border-primary ring-2 ring-primary")}
                                    onClick={() => setSelectedEvent(event)}
                                >
                                    <CardHeader className="p-4">
                                        <CardTitle className="text-base font-semibold">{event.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-4 pt-0">
                                        <p className="text-sm text-muted-foreground">{event.description}</p>
                                    </CardContent>
                                    <CardFooter className="p-4 pt-0">
                                        <p className="text-xs font-semibold text-accent">{event.time}</p>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        !isLoading && !error && (
                            <div className="flex items-center justify-center h-40 p-8 border-2 border-dashed rounded-lg">
                                <p className="text-muted-foreground">No hay eventos para esta fecha.</p>
                            </div>
                        )
                    )}
                     <div className="flex gap-2">
                        <Button onClick={() => setIsFormOpen(true)} disabled={!date} className="flex-1">
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Añadir Evento
                        </Button>
                        <Button onClick={handleRemoveEvent} disabled={!selectedEvent} variant="destructive" className="flex-1">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Quitar Evento
                        </Button>
                    </div>
                </div>
            </CardContent>

             <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Añadir Nuevo Evento</DialogTitle>
                        <DialogDescription>
                            Creando un evento para el {date ? format(date, 'PPP', { locale: es }) : ''}.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleAddEvent} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="title">Título del Evento</Label>
                            <Input
                                id="title"
                                value={newEvent.title}
                                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                                placeholder="Ej: Ensayo de tambores"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description">Descripción</Label>
                            <Textarea
                                id="description"
                                value={newEvent.description}
                                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                                placeholder="Detalles del evento..."
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="time">Hora</Label>
                            <Input
                                id="time"
                                value={newEvent.time}
                                onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                                placeholder="Ej: 20:00 - 22:00"
                            />
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type="button" variant="outline">Cancelar</Button>
                            </DialogClose>
                            <Button type="submit">Guardar Evento</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </Card>
    );
}

function format(date: Date, formatStr: string, options?: { locale?: any }) {
    // Check if locale and locale.code exist to avoid errors
    const localeCode = options?.locale?.code || 'es-ES';
    return new Intl.DateTimeFormat(localeCode, {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    }).format(date);
}