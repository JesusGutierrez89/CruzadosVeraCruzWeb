// Script para actualizar todas las páginas de comisiones
const fs = require('fs');
const path = require('path');

const commissions = [
  { folder: 'musica', key: 'musica', title: 'música', placeholder: 'Buscar en música...', button: 'Añadir contenido musical' },
  { folder: 'historia', key: 'historia', title: 'historia', placeholder: 'Buscar en historia...', button: 'Añadir información histórica' },
  { folder: 'diseno', key: 'diseno', title: 'diseño', placeholder: 'Buscar en diseño...', button: 'Añadir contenido de diseño' },
  { folder: 'dinamizacion', key: 'dinamizacion', title: 'dinamización', placeholder: 'Buscar en dinamización...', button: 'Añadir actividad' },
  { folder: 'relaciones', key: 'relaciones', title: 'relaciones públicas', placeholder: 'Buscar en relaciones públicas...', button: 'Añadir información de RRPP' }
];

commissions.forEach(commission => {
  const filePath = path.join(__dirname, 'app', 'dashboard', 'info', commission.folder, 'page.tsx');
  
  const pageContent = `import { DashboardModals } from '@/components/dashboard/dashboard-modals';
import { RecordsTable } from '@/components/dashboard/records-table';
import { Search } from '@/components/dashboard/search';
import { Button } from '@/components/ui/button';
import { getRecords } from '@/lib/firestore-data';
import { PlusCircle } from 'lucide-react';
import Link from 'next/link';

export default async function ${commission.folder.charAt(0).toUpperCase() + commission.folder.slice(1)}Page({
  searchParams,
}: {
  searchParams?: Promise<{
    q?: string;
    action?: string;
    id?: string;
  }>;
}) {
  const params = await searchParams;
  const query = params?.q || '';
  const records = await getRecords(query, '${commission.key}');

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex-1">
          <Search placeholder="${commission.placeholder}" />
        </div>
        <Button asChild>
          <Link href="/dashboard/info/${commission.folder}?action=new">
            <PlusCircle className="mr-2" />
            ${commission.button}
          </Link>
        </Button>
      </div>

      <RecordsTable records={records} />
      <DashboardModals />
    </div>
  );
}
`;
  
  if (fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, pageContent);
    console.log(`Updated ${commission.folder}/page.tsx`);
  }
});

console.log('All commission pages updated!');