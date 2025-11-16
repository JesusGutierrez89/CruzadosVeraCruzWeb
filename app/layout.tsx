import { Toaster } from "@/components/ui/toaster";
import { FirebaseClientProvider } from '@/firebase';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Cruzados de la Vera Cruz',
  description: 'Guardad aquí vuestros más preciados códices y anales.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Albert+Sans:wght@400;500;600;700&family=MedievalSharp&family=Oldenburg&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <FirebaseClientProvider>
          {children}
        </FirebaseClientProvider>
        <Toaster />
      </body>
    </html>
  );
}
