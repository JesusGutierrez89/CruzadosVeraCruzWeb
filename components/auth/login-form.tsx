
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useAuth } from '@/firebase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, Loader2 } from 'lucide-react';

export function LoginForm() {
  const auth = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // La redirección es manejada por el onAuthStateChanged en el provider,
      // pero una redirección explícita aquí asegura la navegación inmediata.
      router.push('/dashboard');
    } catch (error: any) {
      let friendlyMessage = 'Ha ocurrido un error inesperado. Por favor, inténtalo de nuevo.';
      // Códigos de error comunes para credenciales inválidas.
      if (error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
        friendlyMessage = 'Credenciales inválidas. Por favor, revisa tu correo y contraseña.';
      } else if (error.code) {
        // Mensaje genérico para otros errores de autenticación
        friendlyMessage = `Error en el inicio de sesión. Por favor, revisa tus credenciales.`;
      }
      setErrorMessage(friendlyMessage);
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center">Acceder Web</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Correo Electrónico</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="nombre@ejemplo.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Contraseña</Label>
              <Link href="#" className="text-sm font-medium text-white hover:underline" prefetch={false}>
                ¿Contraseña olvidada?
              </Link>
            </div>
            <Input 
              id="password" 
              name="password" 
              type="password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isSubmitting}
            />
          </div>
           {errorMessage && (
            <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error en el acceso</AlertTitle>
                <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button type="submit" className="w-full bg-black hover:bg-accent" disabled={isSubmitting}>
            {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Entrar
          </Button>
          <p className="text-sm text-muted-foreground text-center">
            ¿Aún no te has registrado?{' '}
            <Link href="/signup" className="font-medium text-white hover:underline" prefetch={false}>
              Registrarse
            </Link>
          </p>
        </CardFooter>
      </Card>
    </form>
  );
}
