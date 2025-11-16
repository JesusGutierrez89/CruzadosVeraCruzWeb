import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Facebook, Instagram, X } from "lucide-react";
import Link from "next/link";

const socialLinks = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/cruzadosdelaveracruz?locale=es_ES",
    icon: <Facebook className="h-10 w-10 text-accent" />,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/cruzadoscaravaca?igsh=MTF6Z2NkcHUyNGFsNQ==",
    icon: <Instagram className="h-10 w-10 text-accent" />,
  },
  {
    name: "X (Twitter)",
    href: "https://x.com/CruzadoCaravaca?t=l14EELeL3nfP-6mOn9w06Q&s=08",
    icon: <X className="h-10 w-10 text-accent" />,
  },
];

export default function SocialPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Redes Sociales</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="mb-6 text-muted-foreground text-base md:text-lg">
                    Nuestros perfiles oficiales en redes sociales son un canal directo para informarte sobre nuestras acciones, iniciativas y comunicados. Haz clic en el icono de la plataforma que prefieras para visitarnos.
                </p>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {socialLinks.map((social) => (
                        <Link href={social.href} key={social.name} target="_blank" rel="noopener noreferrer">
                            <Card className="h-full transform transition-transform duration-200 hover:-translate-y-1 hover:shadow-2xl hover:shadow-accent/20">
                                <CardHeader className="flex flex-col items-center justify-center p-6 text-center">
                                    <div className="mb-4 rounded-lg bg-gray-800 p-4">
                                        {social.icon}
                                    </div>
                                    <CardTitle className="font-headline text-xl">{social.name}</CardTitle>
                                </CardHeader>
                            </Card>
                        </Link>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
