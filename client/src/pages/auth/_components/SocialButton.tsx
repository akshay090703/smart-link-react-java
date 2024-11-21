import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SocialButtonProps {
    icon: LucideIcon;
    provider: string;
    onClick: () => void;
    className?: string;
}

export function SocialButton({ icon: Icon, provider, onClick, className }: SocialButtonProps) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "w-[95%] flex items-center justify-center gap-3 px-6 py-3 rounded-lg",
                "font-medium transition-all duration-200",
                "bg-background border-2 border-border hover:bg-accent",
                "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                "transform hover:-translate-y-0.5",
                className
            )}
        >
            <Icon className="w-5 h-5" />
            <span>Continue with {provider}</span>
        </button>
    );
}