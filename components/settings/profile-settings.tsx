
'use client';

import { useUser } from '@/firebase';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { useEffect, useState, useTransition } from 'react';
import { doc, getDocs, updateDoc, collection, query, where } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import { Loader2, Calendar as CalendarIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Calendar } from '../ui/calendar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import type { JoinRequest } from '@/lib/definitions';
import type { User } from 'firebase/auth';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Terminal } from 'lucide-react';
import { updateUser } from '@/lib/actions';

const phoneRegex = /^(?:\+34|0034|34)?[6789]\d{8}$/;

const ProfileFormSchema = z.object({
  address: z.string().optional(),
  birthDate: z.date({
    required_error: 'La fecha de nacimiento es menester.',
  }),
  phone: z.string().regex(phoneRegex, 'Por favor, introduce un número de teléfono móvil español válido.'),
  motivation: z.string().max(200, 'La motivación no puede exceder los 200 caracteres.').optional(),
});

type ProfileFormData = z.infer<typeof ProfileFormSchema>;

export function ProfileSettings() {
  const { user, isUserLoading } = useUser();

  if (isUserLoading) {
    return <SettingsSkeleton />;
  }

  if (!user) {
    return <p>No se pudo cargar la información del usuario. Por favor, asegúrate de haber iniciado sesión.</p>;
  }

  return <ProfileForm user={user} />;
}

function ProfileForm({ user }: { user: User }) {
  const firestore = useFirestore();
  const { toast } = useToast();
  const [userData, setUserData] = useState<JoinRequest | null>(null);
  const [loadingUserData, setLoadingUserData] = useState(true);
  const [isPending, startTransition] = useTransition();


  const form = useForm<ProfileFormData>({
    resolver: zodResolver(ProfileFormSchema),
    defaultValues: {
      address: '',
      phone: '',
      motivation: '',
    },
  });

  useEffect(() => {
    if (!firestore || !user?.uid) {
      setLoadingUserData(false);
      return;
    }
  
    const fetchUserData = async () => {
      setLoadingUserData(true);
      const joinRequestsRef = collection(firestore, 'joinRequests');
      const q = query(joinRequestsRef, where('uid', '==', user.uid));
  
      try {
        const querySnapshot = await getDocs(q);
  
        if (!querySnapshot.empty) {
          const docSnap = querySnapshot.docs[0];
          const userProfileData = { ...(docSnap.data() as Omit<JoinRequest, 'id'>), id: docSnap.id };
          setUserData(userProfileData);

          form.reset({
             address: userProfileData.address || '',
             birthDate: userProfileData.birthDate ? new Date(userProfileData.birthDate) : undefined,
             phone: userProfileData.phone || '',
             motivation: userProfileData.motivation || '',
         });
        } else {
           setUserData(null);
        }
      } catch (error) {
        console.error("Error al buscar los datos del usuario:", error);
        toast({
          variant: 'destructive',
          title: 'Error de Carga',
          description: 'No se pudo cargar la información del perfil desde la base de datos.',
        });
      } finally {
        setLoadingUserData(false);
      }
    };
  
    fetchUserData();
  }, [firestore, user?.uid, form, toast]);


  const onSubmit = (data: ProfileFormData) => {
    if (!userData?.id) {
        toast({
            variant: 'destructive',
            title: 'Error',
            description: 'No se puede actualizar el perfil. Falta información del usuario.',
        });
        return;
    };

    const dataToUpdate = {
        ...data,
        birthDate: data.birthDate.toISOString(),
    };
    
    startTransition(async () => {
        const result = await updateUser(userData.id, dataToUpdate);
        
        if (result?.message) {
            toast({
                variant: 'destructive',
                title: 'Error al actualizar',
                description: result.message,
            });
        } else {
            toast({
                title: '¡Datos actualizados!',
                description: 'Tu información ha sido guardada correctamente.',
            });
        }
    });
  };

  if (loadingUserData) {
    return <SettingsSkeleton />;
  }

  if (!userData) {
    return (
        <Alert>
            <Terminal className="h-4 w-4" />
            <AlertTitle>¡Casi listo, Cruzado!</AlertTitle>
            <AlertDescription>
                Tu cuenta ha sido creada. Para completar tu perfil, por favor, rellena el <Link href="/unirse" className="font-semibold underline">formulario de unión</Link>.
            </AlertDescription>
        </Alert>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
                <Label htmlFor="fullName">Nombre Completo</Label>
                <Input id="fullName" value={userData.fullName} disabled />
            </div>
            <div className="space-y-2">
                <Label htmlFor="dni">DNI / NIE</Label>
                <Input id="dni" value={userData.dni} disabled />
            </div>
            <div className="space-y-2">
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input id="email" type="email" value={userData.email} disabled />
            </div>
            
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Teléfono de Contacto</FormLabel>
                  <FormControl>
                    <Input type="tel" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="birthDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Fecha de Nacimiento</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? format(field.value, "PPP", { weekStartsOn: 1 }) : <span>Elegid una fecha</span>}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        captionLayout="dropdown-buttons"
                        fromYear={1920}
                        toYear={new Date().getFullYear()}
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dirección Postal (Calle, Ciudad, C.P.)</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="motivation"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>¿Qué te motivó a unirte a la Vera Cruz? (Máx. 200 caracteres)</FormLabel>
                  <FormControl>
                    <Textarea maxLength={200} placeholder="Describe tu motivación..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
        </div>
        <Button type="submit" disabled={isPending} className="bg-black hover:bg-accent">
          {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Modificar Datos
        </Button>
      </form>
    </Form>
  );
}

function SettingsSkeleton() {
  return (
    <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-10 w-full" />
            </div>
             <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-10 w-full" />
            </div>
             <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-10 w-full" />
            </div>
             <div className="space-y-2 md:col-span-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-20 w-full" />
            </div>
        </div>
        <Skeleton className="h-10 w-32" />
    </div>
  );
}
