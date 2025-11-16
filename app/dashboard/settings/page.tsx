import { ProfileSettings } from '@/components/settings/profile-settings';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Database } from 'lucide-react';
import Link from 'next/link';

// El ID de tu proyecto de Firebase.
const firebaseProjectId = 'studio-6945474383-11f02';

export default function SettingsPage() {
  const firestoreUrl = `https://console.firebase.google.com/project/${firebaseProjectId}/firestore/data`;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Configuración de la Cuenta</h1>
        <p className="text-muted-foreground text-sm md:text-base">
          Gestiona los detalles de tu cuenta, perfil y base de datos.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tu Perfil</CardTitle>
          <CardDescription>
            Actualiza tus datos personales. Los campos grises no se pueden modificar.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProfileSettings />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Base de Datos</CardTitle>
          <CardDescription>
            Accede directamente a la base de datos de Firestore para ver y gestionar todos los registros y perfiles de usuario.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild>
            <Link href={firestoreUrl} target="_blank" rel="noopener noreferrer">
              <Database className="mr-2" />
              Abrir Consola de Firebase
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
