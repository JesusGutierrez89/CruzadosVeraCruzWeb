import { Button } from '@/components/ui/button';
import { getRecords } from '@/lib/data';
import { PlusCircle } from 'lucide-react';
import Link from 'next/link';
import { RecordsTable } from '@/components/dashboard/records-table';
import { Search } from '@/components/dashboard/search';
import { DashboardModals } from '@/components/dashboard/dashboard-modals';

export default async function InfoPage({
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
          <Search placeholder="Buscar en la información..." />
        </div>
        <Button asChild>
          <Link href="/dashboard/info?action=new">
            <PlusCircle className="mr-2" />
            Añadir información
          </Link>
        </Button>
      </div>

      <RecordsTable records={records} />
      <DashboardModals />
    </div>
  );
}
