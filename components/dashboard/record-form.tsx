'use client';

import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { handleCreateRecord, handleUpdateRecord } from '@/lib/actions';
import type { Record } from '@/lib/definitions';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const FormSchema = z.object({
  name: z.string().min(1, 'El nombre es menester.'),
  category: z.enum(['Texto', 'Documento', 'Imagen'], {
    errorMap: () => ({ message: 'Por favor, elegid un tipo.' }),
  }),
  description: z.string().min(1, 'La descripción es menester.'),
  files: z.any().optional(),
});

export function RecordForm({ record, onSave }: { record: Record | null, onSave: () => void }) {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(record?.category);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const pathname = usePathname();

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

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: record?.name || '',
      category: record?.category || undefined,
      description: record?.description || '',
      files: undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('category', values.category);
    formData.append('description', values.description);

    if (selectedFiles) {
      for (const file of Array.from(selectedFiles)) {
        formData.append('files', file);
      }
    }
    
    startTransition(async () => {
        let result;
        
        if (record) {
            // Update existing record
            result = await handleUpdateRecord(record.id, formData, currentCommission);
        } else {
            // Create new record  
            result = await handleCreateRecord(formData, currentCommission);
        }
        
        if (result?.message) {
            toast({
                variant: 'destructive',
                title: 'Error al guardar',
                description: result.message,
            });
        } else {
            toast({
                title: '¡Guardado!',
                description: 'La información se ha guardado correctamente.',
            });
            onSave();
        }
    });
  }

  const handleCategoryChange = (value: string) => {
    form.setValue('category', value as 'Texto' | 'Documento' | 'Imagen');
    setSelectedCategory(value);
    setSelectedFiles(null); 
    form.setValue('files', null);
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
        setSelectedFiles(event.target.files);
        form.setValue('files', event.target.files);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input placeholder="Ej: Tratado de justas y torneos" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo</FormLabel>
              <Select onValueChange={handleCategoryChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Elegid un tipo" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Texto">Texto</SelectItem>
                  <SelectItem value="Documento">Documento</SelectItem>
                  <SelectItem value="Imagen">Imagen</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descripción</FormLabel>
                <FormControl>
                  <Textarea placeholder="Describid brevemente el contenido..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

        {selectedCategory === 'Imagen' && (
          <FormItem>
            <FormLabel>Adjuntar Imágenes (4 máx., JPG)</FormLabel>
            <FormControl>
                <Input type="file" accept=".jpg,.jpeg" multiple onChange={handleFileChange} />
            </FormControl>
            <FormDescription>
                Puedes seleccionar hasta 4 archivos JPG.
            </FormDescription>
            {selectedFiles && Array.from(selectedFiles).length > 0 && (
                <div className="mt-2 text-sm text-muted-foreground">
                    <p className="font-medium">Archivos seleccionados:</p>
                    <ul className="list-disc pl-5">
                        {Array.from(selectedFiles).map((file, index) => (
                            <li key={index}>{file.name}</li>
                        ))}
                    </ul>
                </div>
            )}
            <FormMessage />
          </FormItem>
        )}

        {selectedCategory === 'Documento' && (
            <FormItem>
                <FormLabel>Adjuntar Documentos (4 máx., PDF)</FormLabel>
                <FormControl>
                    <Input type="file" accept=".pdf" multiple onChange={handleFileChange} />
                </FormControl>
                <FormDescription>
                    Puedes seleccionar hasta 4 archivos PDF.
                </FormDescription>
                {selectedFiles && Array.from(selectedFiles).length > 0 && (
                <div className="mt-2 text-sm text-muted-foreground">
                    <p className="font-medium">Archivos seleccionados:</p>
                    <ul className="list-disc pl-5">
                        {Array.from(selectedFiles).map((file, index) => (
                            <li key={index}>{file.name}</li>
                        ))}
                    </ul>
                </div>
            )}
                <FormMessage />
            </FormItem>
        )}

        <Button type="submit" className="w-full" disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {record ? 'Guardar Cambios' : 'Crear Información'}
        </Button>
      </form>
    </Form>
  );
}
