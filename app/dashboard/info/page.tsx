import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Briefcase,
    Crown,
    Music,
    Palette,
    Scroll,
    Share2,
    Truck,
    Users
} from 'lucide-react';
import Link from 'next/link';

const comisiones = [
  {
    title: 'Redes Sociales',
    description: 'Gestión de contenido digital y presencia online.',
    icon: <Share2 className="w-8 h-8 text-accent" />,
    href: '/dashboard/info/redes-sociales',
  },
  {
    title: 'Avituallamiento, Sede y Caravana',
    description: 'Logística, equipamiento y gestión de espacios.',
    icon: <Truck className="w-8 h-8 text-accent" />,
    href: '/dashboard/info/avituallamiento',
  },
  {
    title: 'Patrimonio, Confección y Préstamo',
    description: 'Gestión de vestuario, equipamiento y materiales.',
    icon: <Crown className="w-8 h-8 text-accent" />,
    href: '/dashboard/info/patrimonio',
  },
  {
    title: 'Música, Boatos y Espectáculos',
    description: 'Coordinación musical, desfiles y representaciones.',
    icon: <Music className="w-8 h-8 text-accent" />,
    href: '/dashboard/info/musica',
  },
  {
    title: 'Historia, Imagen y Representación',
    description: 'Preservación histórica y representación institucional.',
    icon: <Scroll className="w-8 h-8 text-accent" />,
    href: '/dashboard/info/historia',
  },
  {
    title: 'Diseño',
    description: 'Diseño gráfico, materiales y elementos visuales.',
    icon: <Palette className="w-8 h-8 text-accent" />,
    href: '/dashboard/info/diseno',
  },
  {
    title: 'Dinamización y Cohesión Interna',
    description: 'Actividades de integración y fortalecimiento grupal.',
    icon: <Users className="w-8 h-8 text-accent" />,
    href: '/dashboard/info/dinamizacion',
  },
  {
    title: 'Relaciones Institucionales, Proyectos y Financiación',
    description: 'Gestión externa, proyectos y recursos económicos.',
    icon: <Briefcase className="w-8 h-8 text-accent" />,
    href: '/dashboard/info/relaciones',
  },
];

export default function InfoPage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {comisiones.map((comision) => (
          <Link href={comision.href} key={comision.title} prefetch={false}>
            <Card className="h-full transform transition-transform duration-200 hover:-translate-y-1 hover:shadow-2xl hover:shadow-accent/20">
              <CardHeader className="flex flex-col items-center justify-center p-6 text-center">
                <div className="mb-4 rounded-lg bg-gray-800 p-4">
                  {comision.icon}
                </div>
                <CardTitle className="font-headline text-xl">{comision.title}</CardTitle>
                <CardDescription className="mt-2">{comision.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
