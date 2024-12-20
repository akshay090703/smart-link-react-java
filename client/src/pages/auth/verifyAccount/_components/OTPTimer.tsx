import { Timer } from "lucide-react";
import { cn } from "@/lib/utils";

interface OTPTimerProps {
    timeLeft: number;
    className?: string;
}

export function OTPTimer({ timeLeft, className }: OTPTimerProps) {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const isLowTime = timeLeft <= 60; // Last minute

    return (
        <div className={cn(
            "flex items-center justify-center gap-2 text-lg font-medium rounded-lg p-3 bg-muted",
            isLowTime && "text-red-500 animate-pulse",
            className
        )}>
            <Timer className="h-5 w-5" />
            <span>
                {minutes}:{seconds.toString().padStart(2, '0')}
            </span>
        </div>
    );
}