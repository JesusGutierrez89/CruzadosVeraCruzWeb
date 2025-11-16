import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';

export default function LegalPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b z-10 bg-accent/60 text-accent-foreground backdrop-blur-sm sticky top-0 w-full">
        <Link href="/" className="flex items-center justify-center" prefetch={false}>
          <Logo className="w-10 h-10" />
          <span className="ml-2 font-headline text-lg font-semibold">Cruzados de la Vera Cruz</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
          <Button asChild>
            <Link href="/" prefetch={false}>
              Volver al Menu
            </Link>
          </Button>
        </nav>
      </header>
      <main className="flex-1 py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl space-y-6">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
              Aviso de Confidencialidad
            </h1>
            <div className="space-y-4 text-muted-foreground text-base md:text-lg">
              <p>
                Este mensaje va dirigido exclusivamente a su destinatario, en caso de haber recibido este mensaje por error, puede comunicárnoslo mediante el correo electrónico remitido a nuestra atención y procederemos a revisar el motivo del error.
              </p>
              <p>
                Asimismo, el email puede contener documentos y/o información confidencial propia o de terceros por lo que rogamos que se proceda a su eliminación, tanto del email como de los documentos adjuntos para así prevenir mayores fugas de información confidencial.
              </p>
              <p>
                En cumplimiento del Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo, de 27 de abril de 2016, puede ejercer los derechos de acceso, rectificación, cancelación y oposición (derechos ARCO) a través de: https://cruzadosdelaveracruz.com/
              </p>
            </div>
          </div>
        </div>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 Cruzados de la Vera Cruz. Que los vientos os sean favorables.</p>
      </footer>
    </div>
  );
}
