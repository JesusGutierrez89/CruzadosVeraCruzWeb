import { LoginForm } from '@/components/auth/login-form';
import { Logo } from '@/components/logo';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
            <Link href="/" className="flex items-center justify-center mb-4" prefetch={false}>
                <Logo />
                <span className="ml-2 text-2xl font-semibold font-headline">Cruzados de la Vera Cruz</span>
            </Link>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
