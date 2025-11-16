import { UnirseForm } from '@/components/unirse/unirse-form';
import { Logo } from '@/components/logo';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function UnirsePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="absolute top-6 left-6">
            <Button asChild variant="outline">
                <Link href="/" prefetch={false}>Volver</Link>
            </Button>
        </div>
      <div className="w-full max-w-2xl">
        <div className="mb-8 text-center">
          <Link href="/" className="flex items-center justify-center mb-4" prefetch={false}>
            <Logo />
            <span className="ml-2 text-2xl font-semibold font-headline">Cruzados de la Vera Cruz</span>
          </Link>
        </div>
        <UnirseForm />
      </div>
    </div>
  );
}
