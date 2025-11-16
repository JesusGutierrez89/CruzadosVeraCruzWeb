
import { Button } from '@/components/ui/button';
import { Shield } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Logo } from '@/components/logo';
import { ContactFormModal } from '@/components/contact/contact-form';

export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-image');
  const aboutUsImage = PlaceHolderImages.find(p => p.id === 'about-us-image');
  const joinUsImage = PlaceHolderImages.find(p => p.id === 'join-us-image');
  const contactUsImage = PlaceHolderImages.find(p => p.id === 'contact-us-image');


  return (
    <div className="flex flex-col min-h-screen">
       <header className="px-4 lg:px-6 h-16 flex items-center border-b z-10 bg-accent/60 text-accent-foreground backdrop-blur-sm fixed top-0 w-full">
          <Link href="/" className="flex items-center justify-center" prefetch={false}>
            <Logo className="w-10 h-10" />
            <span className="ml-2 font-body text-lg font-semibold">Cruzados de la Vera Cruz</span>
          </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
          <Button asChild>
            <Link href="/#contacto" prefetch={false}>
              Contacto
            </Link>
          </Button>
          <Button asChild>
            <Link href="/#unirse" prefetch={false}>
              Unirse
            </Link>
          </Button>
          <Button variant="secondary" asChild>
            <Link href="/login" prefetch={false}>
              Entrar
            </Link>
          </Button>
          <Button asChild>
            <Link href="/signup" prefetch={false}>
              Crear cuenta
            </Link>
          </Button>
        </nav>
      </header>
      <main className="flex-1">
        <section className="relative w-full h-[60vh] md:h-[70vh] flex items-center justify-center">
          {heroImage && (
             <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              className="object-cover"
              data-ai-hint={heroImage.imageHint}
              priority
            />
          )}
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative container px-4 md:px-6 text-center text-white">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none font-body text-slate-400 [text-shadow:0_2px_4px_rgba(0,0,0,0.8)]">
                CRUZADOS DE LA VERA CRUZ
              </h1>
              <p className="max-w-[700px] mx-auto text-xl md:text-2xl font-body font-medium text-slate-400 [text-shadow:0_2px_4px_rgba(0,0,0,0.8)]">
                En esta web encontrarás todo lo referente a posesiones, socios y características del grupo festero
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
                <Button size="lg" asChild>
                  <Link href="/signup" prefetch={false}>
                    Crear cuenta
                  </Link>
                </Button>
                <Button size="lg" variant="secondary" asChild>
                    <Link href="/login" prefetch={false}>
                    Entrar
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <div className="bg-background pt-8">
        <section className="relative w-full py-12 md:py-24 lg:py-32 flex items-center justify-center">
            {aboutUsImage && (
              <Image
                src={aboutUsImage.imageUrl}
                alt={aboutUsImage.description}
                fill
                className="object-cover object-center"
                data-ai-hint={aboutUsImage.imageHint}
              />
            )}
            <div className="absolute inset-0 bg-black/60" />
            <div className="relative container px-4 md:px-6 text-white flex items-center justify-center">
              <div className="space-y-4 text-center">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline text-slate-400 [text-shadow:0_2px_4px_rgba(0,0,0,0.8)]">¿Quiénes somos?</h2>
                <p className="max-w-[900px] mx-auto text-base md:text-lg font-headline text-slate-400 [text-shadow:0_2px_4px_rgba(0,0,0,0.8)]">
                  Las MILICIAS POPULARES DE LOS NOBLES CABALLEROS CRUZADOS DE LA VILLA DE LA VERA CRUZ, representarán en la Fiesta el noble ideal de gentes que dieron lo mejor de sí mismos en la conquista y defensa de los Santos Lugares y que al regresar a su lugar de origen buscaron cobijo a la sombra de la Reliquia de la Vera Cruz a la que defendieron junto a los templarios que gobernaban el territorio hasta su desaparición en 1310, y luego junto a los Santiaguistas, caravaqueños hasta nuestros días, todo sin perder los verdaderos valores: HONOR, FUERZA Y FE.
                </p>
              </div>
            </div>
          </section>
        </div>

        <div id="unirse" className="bg-background pt-8 scroll-mt-16">
        <section className="relative w-full py-12 md:py-24 lg:py-32 flex items-center justify-center">
            {joinUsImage && (
              <Image
                src={joinUsImage.imageUrl}
                alt={joinUsImage.description}
                fill
                className="object-cover object-center"
                data-ai-hint={joinUsImage.imageHint}
              />
            )}
            <div className="absolute inset-0 bg-black/60" />
            <div className="relative container px-4 md:px-6 text-white flex items-center justify-center">
              <div className="space-y-4 text-center">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline text-slate-400 [text-shadow:0_2px_4px_rgba(0,0,0,0.8)]">¿Quieres Unirte?</h2>
                <p className="max-w-[900px] mx-auto text-base md:text-lg font-headline text-slate-400 [text-shadow:0_2px_4px_rgba(0,0,0,0.8)]">
                  Únete a los Cruzados de la Vera Cruz y vive las Fiestas de Caravaca con una intensidad inigualable, fusionando la pasión devocional con la emoción marcial. Más allá del retumbar de los timbales que te embargará al llegar a la Cuesta de la Cruz, nuestro grupo te ofrece una profunda hermandad de amigos que ríen, lloran y luchan juntos. Aquí podrás sumergirte en la recreación histórica medieval con rigor, practicando artes marciales y desfilando con marchas épicas como la Banda Sonora de Skyrim y nuestro himno en latín, «El Diví». Si buscas la emoción de la fe activa, el compañerismo sincero y la disciplina del guerrero, somos tu lugar.
                </p>
                <div className="flex justify-center pt-4">
                  <Button size="lg" asChild>
                    <Link href="/unirse" prefetch={false}>
                      UNIRSE
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div id="contacto" className="bg-background pt-8 scroll-mt-16">
          <section className="relative w-full py-12 md:py-24 lg:py-32 flex items-center justify-center">
              {contactUsImage && (
                <Image
                  src={contactUsImage.imageUrl}
                  alt={contactUsImage.description}
                  fill
                  className="object-cover object-center"
                  data-ai-hint={contactUsImage.imageHint}
                />
              )}
              <div className="absolute inset-0 bg-black/60" />
              <div className="relative container px-4 md:px-6 text-white flex items-center justify-center">
                <div className="space-y-6 text-center">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline text-slate-400 [text-shadow:0_2px_4px_rgba(0,0,0,0.8)]">Contáctenos</h2>
                    <ContactFormModal />
                </div>
              </div>
            </section>
        </div>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground md:text-sm">&copy; 2024 Cruzados de la Vera Cruz. Que los vientos os sean favorables.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="/terms" className="text-xs hover:underline underline-offset-4 md:text-sm" prefetch={false}>
            Leyes del Reino
          </Link>
          <Link href="/legal" className="text-xs hover:underline underline-offset-4 md:text-sm" prefetch={false}>
            Aviso de confidencialidad
          </Link>
        </nav>
      </footer>
    </div>
  );
}
