import { DashboardModals } from '@/components/dashboard/dashboard-modals';
import { RecordsTable } from '@/components/dashboard/records-table';
import { Search } from '@/components/dashboard/search';
import { Button } from '@/components/ui/button';
import { getRecords } from '@/lib/data';
import { PlusCircle } from 'lucide-react';
import Link from 'next/link';

export default async function MusicaPage({
  searchParams,
}: {
  searchParams?: {
    q?: string;
    action?: string;
    id?: string;
  };
}) {
  const query = searchParams?.q || '';
  const records = await getRecords(query);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex-1">
          <Search placeholder="Buscar en música y espectáculos..." />
        </div>
        <Button asChild>
          <Link href="/dashboard/info/musica?action=new">
            <PlusCircle className="mr-2" />
            Añadir contenido musical
          </Link>
        </Button>
      </div>

      <RecordsTable records={records} />
      <DashboardModals />
    </div>
  );
}