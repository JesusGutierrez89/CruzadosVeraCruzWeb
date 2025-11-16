'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Music } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// TODO: Reemplaza estos marcadores de posición con enlaces directos a tus archivos de audio (.mp3, .wav, etc.)
const songList = [
    { title: "El Diví - Marcha Cristiana", src: "https://www.dropbox.com/scl/fi/2ahghb76ge42hhj3ck80y/El-Divi-Marcha-Cristiana.mp3?rlkey=77rtl7589zlbxsxkpbag0pdfn&st=yxlqxz40&dl=1" },
];

export default function GalleryPage() {
    const galleryImages = PlaceHolderImages.filter(p => p.id.startsWith('gallery-'));
    const audioRef = useRef<HTMLAudioElement>(null);
    const [currentSong, setCurrentSong] = useState<{ title: string; src: string } | null>(null);

    useEffect(() => {
        // Seleccionar una canción aleatoria al cargar el componente si hay canciones en la lista
        if (songList.length > 0) {
            const randomIndex = Math.floor(Math.random() * songList.length);
            setCurrentSong(songList[randomIndex]);
        }

        const audioEl = audioRef.current;

        // Detener la música cuando el usuario abandona la página
        return () => {
            if (audioEl) {
                audioEl.pause();
                audioEl.currentTime = 0;
            }
        };
    }, []);

    useEffect(() => {
        // Cargar la nueva canción en el reproductor cuando cambie
        if (audioRef.current && currentSong) {
            audioRef.current.load();
        }
    }, [currentSong]);

    return (
        <div className="space-y-8">
            <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                    <Music className="w-6 h-6 text-accent" />
                    <CardTitle className="font-headline text-2xl">Banda Sonora</CardTitle>
                </CardHeader>
                <CardContent>
                    {currentSong ? (
                        <>
                            <p className="mb-2 text-sm text-muted-foreground">Reproduciendo: <strong>{currentSong.title}</strong></p>
                            <audio ref={audioRef} controls className="w-full">
                                <source src={currentSong.src} type="audio/mpeg" />
                                Tu navegador no soporta el elemento de audio.
                            </audio>
                        </>
                    ) : (
                        <p className="text-muted-foreground">No hay canciones en la lista de reproducción. Añade enlaces a tus archivos de audio para empezar.</p>
                    )}
                </CardContent>
            </Card>

            <div className="flex justify-center items-center w-full">
                <Carousel className="w-full max-w-4xl">
                    <CarouselContent>
                        {galleryImages.map((image) => (
                            <CarouselItem key={image.id}>
                                <div className="p-1">
                                    <Card>
                                        <CardContent className="relative flex aspect-video items-center justify-center p-0">
                                            <Image
                                                src={image.imageUrl}
                                                alt={image.description}
                                                fill
                                                className="object-cover rounded-lg"
                                                data-ai-hint={image.imageHint}
                                            />
                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle className="text-center font-headline text-2xl">Cuando el alba alza su acero</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="max-w-2xl mx-auto text-center text-muted-foreground space-y-4 text-base md:text-lg">
                        <p>
                            Cuando el alba alza su acero<br />
                            y despierta al mundo en llamas,<br />
                            se estremecen monte y cielo<br />
                            ante el paso de las almas.
                        </p>
                        <p>
                            Resuena el eco guerrero,<br />
                            cruje el hierro en nuestras palmas;<br />
                            la esperanza va primero,<br />
                            la victoria… nunca tarda.
                        </p>
                        <p>
                            Los tambores, a lo lejos,<br />
                            marcan ritmo a la desgracia;<br />
                            pero avanzan sin complejos<br />
                            los que luchan por su causa.
                        </p>
                        <p>
                            Cruz en pecho, honor sincero,<br />
                            fe que al miedo siempre apaga;<br />
                            y aun si el viento sopla fiero,<br />
                            no se quiebra aquella llama.
                        </p>
                        <p>
                            Que la tierra tiemble al verlo:<br />
                            el valor nunca se acaba.<br />
                            Cuando el alba alza su acero,<br />
                            nace el héroe en la batalla.
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
