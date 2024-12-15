import { CopyButton } from "./CopyButton";
import { cn } from "@/lib/utils";
import { VisitButton } from "./VisitButton";

interface ViewContactFieldProps {
    icon: React.ReactNode;
    label: string;
    value?: string;
    className?: string;
    isLink?: boolean
}

export function ViewContactField({
    icon,
    label,
    value,
    className,
    isLink = false
}: ViewContactFieldProps) {
    return (
        <div className={cn("space-y-2", className)}>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                {icon}
                <span>{label}</span>
            </div>
            <div className="flex items-center justify-between gap-4 group">
                <p className="text-lg font-medium break-all">{value}</p>
                {value && <div className="flex gap-3 items-center">
                    {isLink && <VisitButton href={value} />}
                    <CopyButton value={value} />
                </div>}
            </div>
        </div>
    );
}