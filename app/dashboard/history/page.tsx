

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Shield, Swords } from 'lucide-react';
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const KnightHelmetIcon = ({ className }: { className?: string }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 2a4 4 0 0 0-4 4v2h8V6a4 4 0 0 0-4-4z" />
      <path d="M18 10h-2.5a.5.5 0 0 1-.5-.5V8h-6v1.5a.5.5 0 0 1-.5.5H6" />
      <path d="M18 10v4a6 6 0 0 1-5 5.91V22h-2v-2.09A6 6 0 0 1 6 14v-4" />
      <line x1="12" x2="12" y1="10" y2="16" />
    </svg>
  );

const historySections = [
  {
    id: "iconografia",
    title: 'Iconografía',
    description: 'Simbología e iconografía de los Cruzados de la Vera Cruz',
    icon: <Shield className="w-8 h-8 text-accent" />,
  },
  {
    id: "armamento",
    title: 'Armamento',
    description: 'Armamento para los desfiles.',
    icon: <Swords className="w-8 h-8 text-accent" />,
  },
  {
    id: "indumentaria",
    title: 'Indumentaria',
    description: 'Vestimenta y trajes oficiales del grupo.',
    icon: <KnightHelmetIcon className="w-8 h-8 text-accent" />,
  },
];

export default function HistoryPage() {
    const escudoImage = PlaceHolderImages.find(p => p.id === 'hero-image');
    const arpiaImage = PlaceHolderImages.find(p => p.id === 'app-logo');
    const swordImage = PlaceHolderImages.find(p => p.id === 'sword-image');
    const axeImage = PlaceHolderImages.find(p => p.id === 'axe-image');
    const bowImage = PlaceHolderImages.find(p => p.id === 'bow-image');
    const vestimentaImage = PlaceHolderImages.find(p => p.id === 'vestimenta-image');
    const proteccionImage = PlaceHolderImages.find(p => p.id === 'proteccion-image');
    const complementosImage = PlaceHolderImages.find(p => p.id === 'complementos-image');


  return (
    <Accordion type="single" collapsible className="w-full space-y-4">
        {historySections.map((section) => (
             <AccordionItem value={section.id} key={section.id} className="border-b-0">
                <AccordionTrigger className="p-0 hover:no-underline">
                     <Card className="w-full transform transition-transform duration-200 hover:-translate-y-1 hover:shadow-2xl hover:shadow-accent/20">
                        <CardHeader className="flex flex-col items-center justify-center p-6 text-center">
                            <div className="mb-4 flex items-center justify-center rounded-lg bg-gray-800 p-4">
                            {section.icon}
                            </div>
                            <CardTitle className="font-headline text-xl">{section.title}</CardTitle>
                            <CardDescription className="mt-2 text-base md:text-lg">{section.description}</CardDescription>
                        </CardHeader>
                    </Card>
                </AccordionTrigger>
                <AccordionContent>
                    {section.id === 'iconografia' && (
                        <Card className="mt-4">
                            <CardHeader>
                                <CardTitle className="font-headline text-2xl">Simbolismo e Iconografía</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-8">
                                <div className="space-y-4">
                                    <h3 className="font-headline text-xl text-accent">El Escudo</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                                        <div className="md:col-span-1">
                                            {escudoImage && (
                                                <Image src={escudoImage.imageUrl} alt={escudoImage.description} width={300} height={300} className="mx-auto rounded-lg" data-ai-hint={escudoImage.imageHint} />
                                            )}
                                        </div>
                                        <div className="md:col-span-2 space-y-4 text-muted-foreground text-base lg:text-lg">
                                            <p>
                                            Milicias Populares de los Nobles Caballeros Cruzados de la Villa de la Vera Cruz, una orden que, aunque no existió oficialmente, se inspira en los caballeros cruzados que habitaron la antigua villa. El grupo busca recuperar el espíritu e idiosincrasia de las cruzadas adaptadas a la ciudad actual. Su lema "Honor, Fuerza y Fe" (Honor Robur et Fides) recoge los valores fundamentales que desean reivindicar por considerarlos hoy casi perdidos.
                                            </p>
                                            <p>El escudo combina elementos históricos y simbólicos:</p>
                                            <ul className="list-disc list-inside space-y-2">
                                                <li>Un <strong className="text-foreground">escudo de lágrima invertida</strong>, típico de los bandos cristianos en Tierra Santa.</li>
                                                <li>Una <strong className="text-foreground">cruz roja sobre fondo blanco</strong>, distintivo español en las cruzadas.</li>
                                                <li>Un <strong className="text-foreground">alfanje moro y una espada cristiana cruzados</strong>, representando los conflictos religiosos y el carácter forjado en la guerra.</li>
                                                <li>A los lados, las insignias de las órdenes de <strong className="text-foreground">San Juan y del Temple</strong>, y una referencia al <strong className="text-foreground">Santo Sepulcro</strong>, evocando las principales órdenes militar-religiosas de la época.</li>
                                            </ul>
                                             <p>En conjunto, el grupo pretende unir tradición, simbolismo histórico y valores caballerescos adaptados al presente.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="font-headline text-xl text-accent">La Arpía</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                                         <div className="md:col-span-2 space-y-2 text-muted-foreground text-base lg:text-lg">
                                            <p>
                                            La arpía, figura mítica con cabeza de mujer y cuerpo de ave rapaz, es el emblema protector del grupo. Inspirado en las sirenas griegas, su elección se debe a una escultura clave de la villa, donde se le atribuía la custodia de lugares mágicos. En el medallón, la arpía abraza la Vera Cruz de Caravaca, simbolizando la protección de la fe por parte de los miembros. A sus pies, una campana refuerza esta idea de custodia, consolidando el conjunto como sello distintivo, mientras que el escudo funciona como emblema oficial.
                                            </p>
                                        </div>
                                        <div className="md:col-span-1">
                                            {arpiaImage && (
                                                <Image src={arpiaImage.imageUrl} alt={arpiaImage.description} width={300} height={400} className="mx-auto rounded-lg" data-ai-hint={arpiaImage.imageHint} />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                     {section.id === 'armamento' && (
                        <Card className="mt-4">
                            <CardHeader>
                                <CardTitle className="font-headline text-2xl">Armamento Reglamentario</CardTitle>
                            </CardHeader>
                             <CardContent className="space-y-8">
                                <div className="space-y-4">
                                    <h3 className="font-headline text-xl text-accent">La Espada</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                                        <div className="md:col-span-1">
                                            {swordImage && (
                                                <Image src={swordImage.imageUrl} alt={swordImage.description} width={400} height={400} className="mx-auto rounded-lg" data-ai-hint={swordImage.imageHint} />
                                            )}
                                        </div>
                                        <div className="md:col-span-2 space-y-4 text-muted-foreground text-base lg:text-lg">
                                            <p>
                                                Las espadas de mano y media, armas emblemáticas del medievo y ampliamente utilizadas tanto por caballería ligera como pesada. Forjadas artesanalmente en acero de carbono siguiendo técnicas tradicionales, eran versátiles, manejables y efectivas tanto a una mano como a dos. Destaca que fueron de las primeras en incorporar la guarda en forma de cruz, un diseño que se mantuvo durante las Cruzadas del siglo XII, con variaciones mínimas en el pomo. Eran armas principalmente cortantes, aunque con el tiempo adoptaron puntas más eficaces para contrarrestar las mejoras en las armaduras. Su manejo dependía del uso correcto del pomo, que actuaba como eje del movimiento. Con unos 112 cm de longitud y hoja de doble filo, ofrecían un alcance notable. Eran habituales en la segunda línea de combate, precedidas por las armas más pesadas como el mandoble.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="font-headline text-xl text-accent">El Hacha</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                                        <div className="md:col-span-2 space-y-2 text-muted-foreground text-base lg:text-lg">
                                            <p>
                                               El hacha fue una de las armas más temidas de la Edad Media debido a su gran versatilidad, utilizada tanto en combate cuerpo a cuerpo como en asaltos, defensa contra caballería y como arma arrojadiza. Su eficacia y variedad de usos le otorgaron una fama casi legendaria. Requería una larga instrucción, y los guerreros entrenaban intensamente para dominarla. Su evolución acompañó los cambios de la sociedad medieval: inicialmente destacó en asaltos y en detener cargas de caballería, siendo capaz de atravesar corazas y escudos con su potente filo. Por su diversidad de formas y tamaños, fue empleada por combatientes de todas las clases sociais. Su impacto en batalla y su aura sangrienta la convirtieron en protagonista de numerosas leyendas y relatos medievales.
                                            </p>
                                        </div>
                                        <div className="md:col-span-1">
                                            {axeImage && (
                                                <Image src={axeImage.imageUrl} alt={axeImage.description} width={400} height={400} className="mx-auto rounded-lg" data-ai-hint={axeImage.imageHint} />
                                            )}
                                        </div>
                                    </div>
                                </div>

                                 <div className="space-y-4">
                                    <h3 className="font-headline text-xl text-accent">El Arco</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                                        <div className="md:col-span-1">
                                            {bowImage && (
                                                <Image src={bowImage.imageUrl} alt={bowImage.description} width={400} height={400} className="mx-auto rounded-lg" data-ai-hint={bowImage.imageHint} />
                                            )}
                                        </div>
                                        <div className="md:col-span-2 space-y-4 text-muted-foreground text-base lg:text-lg">
                                            <p>
                                               El arco fue uno de los mayores avances militares de la Alta Edad Media y, antes de dar paso a la ballesta, constituyó un arma clave en la estrategia bélica hasta la Edad Moderna. Su versión más eficaz, el longbow inglés y escocés, alcanzaba hasta 400 metros y podía perforar incluso armaduras de placas. Su función principal era diezmar al enemigo a distancia antes del combate cuerpo a cuerpo. Estos arcos, adoptados por los cruzados tras su contacto con las culturas de Tierra Santa, tenían una rápida cadencia de tiro, permitiendo disparar cinco o seis flechas en medio minuto. El arco formaba parte de las primeras líneas de ataque en los ejércitos cruzados, aunque con el tiempo fue reemplazado por armas de mayor alcance y potencia.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                     )}
                    {section.id === 'indumentaria' && (
                        <Card className="mt-4">
                            <CardHeader>
                                <CardTitle className="font-headline text-2xl">Indumentaria Oficial</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-8">
                                <div className="space-y-4">
                                    <h3 className="font-headline text-xl text-accent">Vestimenta</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                                        <div className="md:col-span-1">
                                            {vestimentaImage && (
                                                <Image src={vestimentaImage.imageUrl} alt={vestimentaImage.description} width={400} height={400} className="mx-auto rounded-lg" data-ai-hint={vestimentaImage.imageHint} />
                                            )}
                                        </div>
                                        <div className="md:col-span-2 space-y-4 text-muted-foreground text-base lg:text-lg">
                                            <p>
                                                El grupo Cruzados de la Vera Cruz prioriza la fidelidad histórica, por lo que su vestimenta evita adornos excesivos y utiliza solo los emblemas necesarios. El atuendo principal es una casaca negra de inspiración oriental y cruzada, con diseño guerrero: abertura en cuatro palas, faldones largos de estilo monástico, mangas cortas y capucha, elementos que evocan la figura del monje-guerrero propio de una orden religioso-militar. La ornamentación, aunque discreta, subraya la nobleza del grupo y su identidad histórica sin emplear materiales lujosos, ya que se trata de una prenda concebida para la guerra. Destacan dos elementos icónicos: La cruz en el lado frontal derecho, correspondiente a la orden militar medieval con la que cada miembro se identifique. Una cenefa blanca con motivos rojos y negros donde figura la Cruz de Caravaca, custodiada por arpías. Estos símbolos refuerzan el vínculo entre tradición, identidad y función militar de la Orden.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="font-headline text-xl text-accent">Protección</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                                        <div className="md:col-span-2 space-y-2 text-muted-foreground text-base lg:text-lg">
                                            <p>
                                               En la guerra medieval, los caballeros cruzados —antes milicianos y ahora nobles— podían permitirse una protección moderada, suficiente contra cortes y pequeños golpes, aunque ineficaz frente a estocadas o armas pesadas. Su defensa se integraba en la propia indumentaria y se basaba en varios elementos: Coraza de cuero curtido de camello, con partes pectoral y abdominal, que protege de cortes y distribuye parcialmente los impactos. Cota de malla (imitación), útil frente a cortes pero no ante golpes contundentes. Muñequeras y manoplas, también de cuero, que brindan una protección limitada debido a la falta de recursos para usar metal. La manopla diestra, más flexible, facilita el manejo de la espada y muestra la figura de la arpía como símbolo de vigilancia y fuerza. La manopla izquierda protege nudillos y parte superior de la mano mediante una estructura articulada y porta la cruz personal como emblema de amparo. En conjunto, esta protección ofrece un equilibrio entre movilidad, simbolismo e identidad militar, acorde a los recursos y tradición de la Orden.
                                            </p>
                                        </div>
                                        <div className="md:col-span-1">
                                            {proteccionImage && (
                                                <Image src={proteccionImage.imageUrl} alt={proteccionImage.description} width={400} height={400} className="mx-auto rounded-lg" data-ai-hint={proteccionImage.imageHint} />
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="font-headline text-xl text-accent">Complementos</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                                        <div className="md:col-span-1">
                                            {complementosImage && (
                                                <Image src={complementosImage.imageUrl} alt={complementosImage.description} width={400} height={400} className="mx-auto rounded-lg" data-ai-hint={complementosImage.imageHint} />
                                            )}
                                        </div>
                                        <div className="md:col-span-2 space-y-4 text-muted-foreground text-base lg:text-lg">
                                            <p>
                                               En un atuendo medieval de uso bélico no se permiten adornos innecesarios ni peso superfluo. Por ello, los accesorios son mínimos y estrictamente funcionales. Sobre la coraza se colocan varios correajes: uno sostiene la vaina del arma, otro —en posición transversal— sujeta una bolsa de cuero para suministros, y un cinturón ancho mantiene y ajusta todo el conjunto. Las capas varían según su propósito: las de guerra son simples y sin ornamentos, mientras que las capas de gala o capitulares, usadas tras victorias o actos solemnes, pueden ser más lujosas por el carácter noble de los caballeros.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </AccordionContent>
             </AccordionItem>
        ))}
    </Accordion>
  );
}
