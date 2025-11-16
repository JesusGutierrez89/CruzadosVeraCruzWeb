import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';

export default function TermsPage() {
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
          <div className="mx-auto max-w-3xl space-y-8">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline text-center">
              Leyes del Reino
            </h1>
            <div className="space-y-6 text-muted-foreground text-base md:text-lg">
              <div>
                <h2 className="text-xl font-bold tracking-tighter font-headline text-foreground mb-2">
                  TÍTULO I: Principios de la Cruzada
                </h2>
                <h3 className="font-semibold text-foreground">Artículo 1. Espíritu y Voto</h3>
                <p>
                  El espíritu de los "Cruzados de la Vera Cruz" se basa en el Doble Voto de la Disciplina Marcial y la Alegría del Compañerismo, buscando la recreación histórica rigurosa de nuestra fe en acción, sin olvidar que toda actividad debe ser un ejercicio de confraternidad y gozo.
                </p>
                <h3 className="font-semibold text-foreground mt-4">Artículo 2. La Misión del Cruzado</h3>
                <p>
                  Formación Marcial (La Cruzada de Rigor): Defender y ejecutar la formación y las coreografías de combate con el máximo rigor histórico, disciplina y sincronía. El "pasarlo bien" jamás comprometerá la excelencia de la línea de desfile.
                </p>
                <p>
                  Fe y Recreación (La Vera Cruz): Ser testimonio vivo de los valores cristianos, actuando con caballerosidad, humildad y respeto en todo momento.
                </p>
              </div>
              <div>
                <h2 className="text-xl font-bold tracking-tighter font-headline text-foreground mb-2">
                  TÍTULO II: Normas de Formación y Atuendo (El Rigor del Caballero)
                </h2>
                <h3 className="font-semibold text-foreground">Artículo 3. Disciplina en la Línea</h3>
                <p>
                  El Silencio de la Vera Cruz: Desde el momento de la orden de Formación, solo el Capitán o el Alférez tienen voz. El resto de Cruzados mantendrá un silencio marcial absoluto, comunicándose solo mediante los gestos y señales de mando preestablecidos.
                </p>
                <p>
                  El Paso del Cruzado: La cadencia y el paso deben ser uniformes. Aquel Cruzado que rompa la línea de forma notoria deberá realizar cinco flexiones por cada desajuste al finalizar el ensayo, en honor a las cinco llagas de Cristo.
                </p>
                <p>
                  La Arma del Honor: El manejo de la espada, lanza o escudo será impecable. Los descuidos o las posturas negligentes durante el desfile se considerarán una falta de respeto al compromiso marcial del grupo.
                </p>
                <h3 className="font-semibold text-foreground mt-4">Artículo 4. Uniformidad y Equipo</h3>
                <p>
                  El Hábito y el Escudo: El atuendo debe ser completo y fiel al diseño del grupo, incluyendo el emblema de la Vera Cruz. Un equipo incompleto o sucio es un deshonor al estandarte.
                </p>
                <p>
                  Mantenimiento de la Armadura: Cada Cruzado es el custodio de su equipo. Se prohíbe el uso de armas o armaduras con daños que comprometan la estética o la seguridad. Toda cota de malla debe brillar.
                </p>
              </div>
              <div>
                <h2 className="text-xl font-bold tracking-tighter font-headline text-foreground mb-2">
                  TÍTULO III: El Compromiso de Fe y Compañerismo (El Código de la Hermandad)
                </h2>
                <h3 className="font-semibold text-foreground">Artículo 5. La Regla de Oro del Cruzado</h3>
                <p>
                  Asistencia al Caído: Si un compañero (incluso de otro grupo) tiene dificultades (calor, sed, equipo averiado), el deber prioritario del Cruzado es asistirlo con prontitud y discreción, anteponiendo la caridad al lucimiento personal.
                </p>
                <p>
                  La Caridad Verbal: Se prohíbe estrictamente el lenguaje que denigre, menosprecie o falte al respeto. Cualquier conflicto se resolverá por mediación de los mandos en un encuentro privado de "discernimiento fraterno".
                </p>
                <p>
                  Testimonio de la Fe: En todo evento, los Cruzados son embajadores de su fe. El comportamiento debe ser siempre honorable, especialmente con el público y los organizadores.
                </p>
                <h3 className="font-semibold text-foreground mt-4">Artículo 6. El Disfrute de la Conquista (Pasárselo Bien)</h3>
                <p>
                  Liberación de la Formación: Una vez finalizado el desfile y dado el rompan filas oficial, el Cruzado es libre de intercambiar espadas por tazas de cerveza (o refresco) y compartir con alegría con sus hermanos y el público.
                </p>
                <p>
                  El Bote de la Alegría: Se permite y se anima a los Cruzados a interactuar con niños y familias en las "Zonas Seguras" post-desfile. Un gesto heroico y una sonrisa sincera son más importantes que cualquier marcha militar.
                </p>
                <p>
                  La Leyenda del Cruzado: Las anécdotas cómicas de los ensayos o los errores de desfile deben contarse con humor y camaradería durante las cenas de hermandad.
                </p>
              </div>
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
