import { DashboardModals } from '@/components/dashboard/dashboard-modals';
import { RecordsTable } from '@/components/dashboard/records-table';
import { Search } from '@/components/dashboard/search';
import { Button } from '@/components/ui/button';
import { getRecords } from '@/lib/firestore-data';
import { PlusCircle } from 'lucide-react';
import Link from 'next/link';

export default async function HistoriaPage({
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
  const records = await getRecords(query, 'historia');

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex-1">
          <Search placeholder="Buscar en historia y representación..." />
        </div>
        <Button asChild>
          <Link href="/dashboard/info/historia?action=new">
            <PlusCircle className="mr-2" />
            Añadir contenido histórico
          </Link>
        </Button>
      </div>

      <RecordsTable records={records} />
      <DashboardModals />
    </div>
  );
}