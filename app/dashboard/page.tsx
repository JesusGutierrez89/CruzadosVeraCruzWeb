import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Files, Calendar, ImageIcon, Database, BookOpen, Share2 } from 'lucide-react';

const sections = [
  {
    title: 'Información de Interés',
    description: 'Documentos, textos e imágenes relevantes.',
    icon: <Files className="w-8 h-8 text-accent" />,
    href: '/dashboard/info',
  },
  {
    title: 'Calendario Actividades',
    description: 'Fechas de ensayos, eventos y desfiles.',
    icon: <Calendar className="w-8 h-8 text-accent" />,
    href: '/dashboard/calendar',
  },
  {
    title: 'Galería de Fotos',
    description: 'Recuerdos de nuestras gestas y convivencias.',
    icon: <ImageIcon className="w-8 h-8 text-accent" />,
    href: '/dashboard/gallery',
  },
  {
    title: 'Base de Datos',
    description: 'Gestión de miembros, inventario y más.',
    icon: <Database className="w-8 h-8 text-accent" />,
    href: '/dashboard/database',
  },
  {
    title: 'Historia',
    description: 'Los anales y crónicas de nuestro grupo.',
    icon: <BookOpen className="w-8 h-8 text-accent" />,
    href: '/dashboard/history',
  },
  {
    title: 'Redes Sociales',
    description: 'Gestiona y visualiza vuestras redes.',
    icon: <Share2 className="w-8 h-8 text-accent" />,
    href: '/dashboard/social',
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sections.map((section) => (
          <Link href={section.href} key={section.title} prefetch={false}>
            <Card className="h-full transform transition-transform duration-200 hover:-translate-y-1 hover:shadow-2xl hover:shadow-accent/20">
              <CardHeader className="flex flex-col items-center justify-center p-6 text-center">
                <div className="mb-4 rounded-lg bg-gray-800 p-4">
                  {section.icon}
                </div>
                <CardTitle className="font-headline text-xl">{section.title}</CardTitle>
                <CardDescription className="mt-2">{section.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
