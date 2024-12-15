import { CopyButton } from "./CopyButton";
import { cn } from "@/lib/utils";

interface ViewContactFieldProps {
    icon: React.ReactNode;
    label: string;
    value?: string;
    className?: string;
}

export function ViewContactField({
    icon,
    label,
    value,
    className
}: ViewContactFieldProps) {
    return (
        <div className={cn("space-y-2", className)}>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                {icon}
                <span>{label}</span>
            </div>
            <div className="flex items-center justify-between gap-4 group">
                <p className="text-lg font-medium break-all">{value}</p>
                {value && <CopyButton value={value} />}
            </div>
        </div>
    );
}