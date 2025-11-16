import { cn } from "@/lib/utils";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";

export const Logo = ({ className }: { className?: string }) => {
    const logoImage = PlaceHolderImages.find(p => p.id === 'app-logo');
    
    if (!logoImage) {
        return null; // O un fallback
    }

    return (
        <Image
            src={logoImage.imageUrl}
            alt={logoImage.description}
            className={cn("object-contain", className)}
            width={80}
            height={80}
            data-ai-hint={logoImage.imageHint}
        />
    );
};
