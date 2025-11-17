
'use client';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { handleDeleteRecord } from '@/lib/actions';
import type { Record } from '@/lib/definitions';
import { getRecordById } from '@/lib/firestore-data';
import { Loader2 } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { RecordForm } from './record-form';

export function DashboardModals() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();
  const action = searchParams.get('action');
  const recordId = searchParams.get('id');

  const [record, setRecord] = useState<Record | null>(null);
  const [loading, setLoading] = useState(false);
  const [pendingDelete, setPendingDelete] = useState(false);

  // Extract commission from current path
  const getCommissionFromPath = (path: string): string => {
    const parts = path.split('/');
    const infoIndex = parts.indexOf('info');
    if (infoIndex !== -1 && infoIndex + 1 < parts.length) {
      return parts[infoIndex + 1];
    }
    return 'general';
  };

  const currentCommission = getCommissionFromPath(pathname);

  useEffect(() => {
    if ((action === 'edit' || action === 'delete') && recordId) {
      setLoading(true);
      getRecordById(recordId, currentCommission as any).then((data: Record | null) => {
        setRecord(data || null);
        setLoading(false);
      });
    } else {
      setRecord(null);
    }
  }, [action, recordId, currentCommission]);

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      router.push(pathname);
    }
  };

  const onConfirmDelete = async () => {
    if (record?.id) {
        setPendingDelete(true);
        const result = await handleDeleteRecord(record.id, currentCommission);
        if (result?.message) {
            toast({
                variant: 'destructive',
                title: 'Error al eliminar',
                description: result.message,
            });
        } else {
            toast({
                title: '¡Eliminado!',
                description: 'La información se ha eliminado correctamente.',
            });
            handleOpenChange(false);
        }
        setPendingDelete(false);
    }
  }

  const isEdit = !!(action === 'edit' && recordId);
  const isCreate = !!(action === 'new');
  const isDelete = !!(action === 'delete' && recordId);

  return (
    <>
      <Dialog open={isCreate || isEdit} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{isEdit ? 'Editar Información' : 'Añadir Nueva Información'}</DialogTitle>
          </DialogHeader>
          {loading && isEdit ? <div className="p-8 text-center">Cargando...</div> : <RecordForm record={record} onSave={() => handleOpenChange(false)} />}
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDelete} onOpenChange={handleOpenChange}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
             {loading ? <div className="p-8 text-center">Cargando...</div> : (
                <AlertDialogDescription>
                Esta acción no puede ser deshecha. Se eliminará para siempre la información
                <span className="font-semibold"> "{record?.name}"</span> de nuestros registros.
                </AlertDialogDescription>
             )}
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction asChild>
                <Button variant="destructive" onClick={onConfirmDelete} disabled={pendingDelete || loading}>
                    {pendingDelete ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    Eliminar
                </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
