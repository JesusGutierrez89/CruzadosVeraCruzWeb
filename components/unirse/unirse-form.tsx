'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Calendar as CalendarIcon } from 'lucide-react';
import { Textarea } from '../ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Calendar } from '../ui/calendar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Checkbox } from '../ui/checkbox';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import Link from 'next/link';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useFirestore, useUser } from '@/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { sendJoinRequestEmail } from '@/lib/email';

const phoneRegex = /^(?:\+34|0034|34)?[6789]\d{8}$/;
const dniRegex = /^[XYZ\d]?\d{7,8}[A-Z]$/i;

const UnirseFormSchema = z.object({
    fullName: z.string().min(1, 'El nombre completo es menester.'),
    dni: z.string().refine((val) => dniRegex.test(val), {
        message: 'Por favor, introduce un DNI o NIE válido.',
    }),
    birthDate: z.date({
        required_error: 'La fecha de nacimiento es menester.',
    }),
    email: z.string().email('Por favor, introduce un correo electrónico válido.'),
    phone: z.string().regex(phoneRegex, 'Por favor, introduce un número de teléfono móvil español válido.'),
    address: z.string().optional(),
    experience: z.array(z.string()).optional(),
    motivation: z.string().max(200, 'La motivación no puede exceder los 200 caracteres.').optional(),
    normativa: z.enum(['si', 'no']).refine(val => val === 'si', {
        message: 'Es menester aceptar la normativa para unirse.',
    }),
    imagen: z.enum(['si', 'no']).refine(val => val === 'si', {
        message: 'Es menester aceptar el uso de imagen y sonido.',
    }),
    proteccion_datos: z.enum(['si', 'no']).refine(val => val === 'si', {
        message: 'Es menester aceptar la cláusula de protección de datos.',
    }),
});

type UnirseFormData = z.infer<typeof UnirseFormSchema>;

export function UnirseForm() {
    const form = useForm<UnirseFormData>({
        resolver: zodResolver(UnirseFormSchema),
        defaultValues: {
            fullName: '',
            dni: '',
            email: '',
            phone: '',
            address: '',
            experience: [],
            motivation: '',
        },
    });

    const { toast } = useToast();
    const router = useRouter();
    const firestore = useFirestore();
    const { user } = useUser();

    const onSubmit = async (data: UnirseFormData) => {
        if (!firestore) {
            toast({
                variant: 'destructive',
                title: 'Error de conexión',
                description: 'No se pudo conectar a la base de datos. Inténtalo de nuevo.',
            });
            return;
        }

        if (!user) {
            toast({
                variant: 'destructive',
                title: 'Error de autenticación',
                description: 'Debes iniciar sesión o crear una cuenta para poder unirte. Recarga la página e inténtalo de nuevo.',
            });
            return;
        }

        try {
            const { normativa, imagen, proteccion_datos, ...rest } = data;
            
            const joinRequestDataForDb = {
                ...rest,
                uid: user.uid, // VINCULAMOS el UID del usuario autenticado
                birthDate: data.birthDate.toISOString(),
                submittedAt: new Date().toISOString(),
            };
            
            // Envía el correo primero
            await sendJoinRequestEmail(joinRequestDataForDb);
            
            // Luego, guarda en la base de datos
            await addDoc(collection(firestore, 'joinRequests'), joinRequestDataForDb);
            
            toast({
                title: '¡Solicitud enviada!',
                description: 'Hemos recibido tu solicitud de unión. Nos pondremos en contacto contigo pronto.',
            });
            router.push('/');

        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
            toast({
                variant: 'destructive',
                title: 'Error al enviar la solicitud',
                description: 'Hubo un problema al guardar tu solicitud. Por favor, inténtalo de nuevo.',
            });
        }
    };
    
    const { formState: { isSubmitting } } = form;

    return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle className="text-2xl text-center font-headline">Formulario de Unión</CardTitle>
            <CardDescription className="text-center">
              Rellena este formulario para solicitar tu ingreso en los Cruzados de la Vera Cruz.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre Completo <span className="text-destructive">*</span></FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dni"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>DNI / NIE <span className="text-destructive">*</span></FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                  <FormLabel>Fecha de Nacimiento <span className="text-destructive">*</span></FormLabel>
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo Electrónico <span className="text-destructive">*</span></FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="nombre@ejemplo.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Teléfono de Contacto <span className="text-destructive">*</span></FormLabel>
                  <FormControl>
                    <Input type="tel" {...field} />
                  </FormControl>
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
              name="experience"
              render={() => (
                <FormItem className="space-y-3 md:col-span-2">
                  <FormLabel>Experiencia en Recreación/Formación Marcial (Opcional)</FormLabel>
                  <div className="flex flex-wrap gap-4 items-center">
                    <FormField
                      control={form.control}
                      name="experience"
                      render={({ field }) => {
                        return (
                          <>
                           <FormItem className="flex items-center space-x-2">
                                <FormControl>
                                <Checkbox
                                    value="ninguna"
                                    checked={field.value?.includes("ninguna")}
                                    onCheckedChange={(checked) => {
                                    return checked
                                        ? field.onChange([...(field.value || []), "ninguna"])
                                        : field.onChange(
                                            field.value?.filter(
                                            (value) => value !== "ninguna"
                                            )
                                        )
                                    }}
                                />
                                </FormControl>
                                <FormLabel className="font-normal">Ninguna</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-2">
                                <FormControl>
                                <Checkbox
                                    value="esgrima"
                                    checked={field.value?.includes("esgrima")}
                                    onCheckedChange={(checked) => {
                                    return checked
                                        ? field.onChange([...(field.value || []), "esgrima"])
                                        : field.onChange(
                                            field.value?.filter(
                                            (value) => value !== "esgrima"
                                            )
                                        )
                                    }}
                                />
                                </FormControl>
                                <FormLabel className="font-normal">Esgrima/Armas</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-2">
                                <FormControl>
                                <Checkbox
                                    value="arco"
                                    checked={field.value?.includes("arco")}
                                    onCheckedChange={(checked) => {
                                    return checked
                                        ? field.onChange([...(field.value || []), "arco"])
                                        : field.onChange(
                                            field.value?.filter(
                                            (value) => value !== "arco"
                                            )
                                        )
                                    }}
                                />
                                </FormControl>
                                <FormLabel className="font-normal">Tiro con Arco</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-2">
                                <FormControl>
                                <Checkbox
                                    value="desfiles"
                                    checked={field.value?.includes("desfiles")}
                                    onCheckedChange={(checked) => {
                                    return checked
                                        ? field.onChange([...(field.value || []), "desfiles"])
                                        : field.onChange(
                                            field.value?.filter(
                                            (value) => value !== "desfiles"
                                            )
                                        )
                                    }}
                                />
                                </FormControl>
                                <FormLabel className="font-normal">Desfiles/Bandas</FormLabel>
                            </FormItem>
                          </>
                        )
                      }}
                    />
                  </div>
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
            <FormField
              control={form.control}
              name="normativa"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Aceptación de Normativa <span className="text-destructive">*</span></FormLabel>
                  <p className="text-xs text-muted-foreground">
                      He leído y acepto las <Link href="/terms" className="underline" prefetch={false}>Leyes del Reino</Link>.
                  </p>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex gap-4"
                    >
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem value="si" />
                        </FormControl>
                        <FormLabel className="font-normal">Sí</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem value="no" />
                        </FormControl>
                        <FormLabel className="font-normal">No</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imagen"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Uso de Imagen y Sonido <span className="text-destructive">*</span></FormLabel>
                  <p className="text-xs text-muted-foreground">
                      Autorizo el uso de mi imagen y sonido en medios del grupo.
                  </p>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex gap-4"
                    >
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem value="si" />
                        </FormControl>
                        <FormLabel className="font-normal">Sí</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem value="no" />
                        </FormControl>
                        <FormLabel className="font-normal">No</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="proteccion_datos"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Cláusula de Protección de Datos <span className="text-destructive">*</span></FormLabel>
                  <p className="text-xs text-muted-foreground">
                  He leído y acepto el <Link href="/legal" className="underline" prefetch={false}>Aviso de confidencialidad</Link>.
                  </p>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex gap-4"
                    >
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem value="si" />
                        </FormControl>
                        <FormLabel className="font-normal">Sí</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem value="no" />
                        </FormControl>
                        <FormLabel className="font-normal">No</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex-col gap-4">
              <p className="text-xs text-muted-foreground text-center">
                  Los campos marcados con <span className="text-destructive">*</span> son obligatorios.
              </p>
              <Button type="submit" className="w-full bg-black hover:bg-accent" disabled={isSubmitting}>
                {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Enviar Solicitud
              </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
