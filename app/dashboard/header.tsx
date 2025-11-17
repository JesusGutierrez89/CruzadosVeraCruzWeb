'use client';

import { UserNav } from '@/components/dashboard/user-nav';
import { SidebarTrigger } from '@/components/ui/sidebar';
import {
    BookOpen,
    Calendar,
    Database,
    Files,
    ImageIcon,
    LayoutGrid,
    Settings,
    Share2,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const sectionMap: { [key: string]: { title: string; icon: JSX.Element } } = {
  '/dashboard': { title: 'Panel de Control', icon: <LayoutGrid /> },
  '/dashboard/info': { title: 'Comisiones', icon: <Files /> },
  '/dashboard/calendar': { title: 'Calendario de Actividades', icon: <Calendar /> },
  '/dashboard/gallery': { title: 'Galería de Fotos', icon: <ImageIcon /> },
  '/dashboard/database': { title: 'Base de Datos', icon: <Database /> },
  '/dashboard/history': { title: 'Historia', icon: <BookOpen /> },
  '/dashboard/social': { title: 'Redes Sociales', icon: <Share2 /> },
  '/dashboard/settings': { title: 'Configuración', icon: <Settings /> },
};


export function DashboardHeader() {
  const pathname = usePathname();
  const currentSection = sectionMap[pathname] || sectionMap['/dashboard'];

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6">
      <SidebarTrigger className="md:hidden" />
      <div className="flex flex-1 items-center gap-2">
         {pathname !== '/dashboard' && (
            <Link href="/dashboard" className="text-muted-foreground hover:text-foreground">
                <LayoutGrid className="h-5 w-5" />
            </Link>
         )}
         {pathname !== '/dashboard' && <span className="text-muted-foreground">/</span>}
        <h1 className="text-xl font-semibold">{currentSection.title}</h1>
      </div>
      <UserNav />
    </header>
  );
}
