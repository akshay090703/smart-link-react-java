import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface VisitButtonProps {
    href: string;
    className?: string;
}

export function VisitButton({ href, className }: VisitButtonProps) {
    return (
        <Button
            asChild
            variant="ghost"
            size="icon"
            className={cn(
                "opacity-0 group-hover:opacity-100 transition-opacity text-blue-500 hover:text-blue-600",
                className
            )}
        >
            <a href={href} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
            </a>
        </Button>
    );
}
