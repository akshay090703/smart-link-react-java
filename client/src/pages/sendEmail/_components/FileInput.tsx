import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Paperclip, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FileInputProps {
    onChange: (file: File | null) => void;
    disabled?: boolean;
}

export function FileInput({ onChange, disabled }: FileInputProps) {
    const [file, setFile] = useState<File | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0] || null;
        setFile(selectedFile);
        onChange(selectedFile);
    };

    const handleRemoveFile = () => {
        setFile(null);
        onChange(null);
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    };

    return (
        <div className="space-y-2">
            <Label>Attachment</Label>

            <div className="flex items-center gap-4">
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => inputRef.current?.click()}
                    disabled={disabled}
                    className={cn(
                        "gap-2",
                        file && "border-primary text-primary"
                    )}
                >
                    <Paperclip className="h-4 w-4" />
                    {file ? file.name : 'Add attachment'}
                </Button>

                {file && (
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={handleRemoveFile}
                        disabled={disabled}
                        className="text-muted-foreground hover:text-foreground"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                )}

                <input
                    ref={inputRef}
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    disabled={disabled}
                />
            </div>
        </div>
    );
}