'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import type { Record } from '@/lib/definitions';
import { Calendar, Download, Eye, FileText, X } from 'lucide-react';

interface RecordDetailModalProps {
  record: Record | null;
  isOpen: boolean;
  onClose: () => void;
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function RecordDetailModal({ record, isOpen, onClose }: RecordDetailModalProps) {
  if (!record) return null;

  const isPlaceholderFile = (fileUrl: string) => {
    // Los archivos placeholder tienen esta estructura
    return fileUrl.includes('/uploads/placeholder/') || 
           fileUrl.startsWith('/uploads/placeholder/') ||
           fileUrl.includes('placeholder');
  };

  const isFirebaseFile = (fileUrl: string) => {
    // Los archivos reales de Firebase tienen esta estructura
    return fileUrl.includes('firebasestorage.googleapis.com') || 
           fileUrl.includes('firebase') ||
           fileUrl.startsWith('https://');
  };

  const handleFileClick = (fileUrl: string, fileName: string) => {
    // Debug: mostrar la URL real
    console.log('Archivo URL:', fileUrl);
    console.log('Nombre:', fileName);
    
    // Para archivos placeholder, mostrar información pero permitir simulación
    if (isPlaceholderFile(fileUrl)) {
      // Crear una URL del blob desde el nombre del archivo para simular la apertura
      const blobContent = `Este es el contenido simulado del archivo: ${fileName}\n\nEn un sistema real, este archivo se abriría desde Firebase Storage.`;
      const blob = new Blob([blobContent], { type: 'text/plain' });
      const blobUrl = URL.createObjectURL(blob);
      window.open(blobUrl, '_blank');
      
      // Limpiar el blob después de un tiempo
      setTimeout(() => URL.revokeObjectURL(blobUrl), 5000);
      return;
    }
    
    // Para archivos reales de Firebase
    if (isFirebaseFile(fileUrl)) {
      window.open(fileUrl, '_blank');
      return;
    }
    
    // Fallback: intentar abrir cualquier URL
    window.open(fileUrl, '_blank');
  };

  const handleDownload = (fileUrl: string, fileName: string) => {
    // Si es un placeholder, mostrar mensaje
    if (isPlaceholderFile(fileUrl)) {
      alert(`Descarga placeholder: ${fileName}\nEn la versión completa, esto descargaría el archivo real.`);
      return;
    }

    // Para archivos reales, crear enlace de descarga
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName;
    link.target = '_blank'; // Abrir en nueva ventana como respaldo
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-gothic">
            <FileText className="h-5 w-5" />
            Detalles del Contenido
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Información básica */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold font-gothic mb-2">{record.name}</h3>
              <Badge 
                variant={
                  record.category === 'Documento' ? 'default' : 
                  record.category === 'Imagen' ? 'secondary' : 
                  'outline'
                }
                className="mb-3"
              >
                {record.category}
              </Badge>
            </div>

            <div>
              <h4 className="font-medium mb-2">Descripción:</h4>
              <p className="text-muted-foreground leading-relaxed">
                {record.description}
              </p>
            </div>
          </div>

          <Separator />

          {/* Información de fechas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="font-medium">Fecha de creación:</p>
                <p className="text-muted-foreground">{formatDate(record.date_added)}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="font-medium">Última modificación:</p>
                <p className="text-muted-foreground">{formatDate(record.last_modified)}</p>
              </div>
            </div>
          </div>

          {/* Archivos adjuntos */}
          {record.files && record.files.length > 0 && (
            <>
              <Separator />
              <div>
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Archivos adjuntos ({record.files.length})
                </h4>
                <div className="space-y-2">
                  {record.files.map((file, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <FileText className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{file.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {isPlaceholderFile(file.url) ? 'Archivo de prueba - Click para ver simulación' : 
                             isFirebaseFile(file.url) ? 'Archivo real - Click para ver' : 'Click para ver archivo'}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-1 flex-shrink-0">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleFileClick(file.url, file.name)}
                          className="h-8 w-8 p-0"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDownload(file.url, file.name)}
                          className="h-8 w-8 p-0"
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Sin archivos */}
          {(!record.files || record.files.length === 0) && (
            <>
              <Separator />
              <div className="text-center py-6 text-muted-foreground">
                <FileText className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No hay archivos adjuntos en este contenido</p>
              </div>
            </>
          )}
        </div>

        {/* Botón de cerrar */}
        <div className="flex justify-end pt-4">
          <Button variant="outline" onClick={onClose}>
            <X className="h-4 w-4 mr-2" />
            Cerrar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}