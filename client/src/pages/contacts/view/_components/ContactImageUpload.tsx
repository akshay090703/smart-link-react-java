import { Plus } from "lucide-react";
import { ChangeEvent } from "react";
// import { cn } from "@/lib/utils";

interface ContactImageUploadProps {
    imageUrl: string;
    disabled?: boolean;
    onImageChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export function ContactImageUpload({ imageUrl, disabled, onImageChange }: ContactImageUploadProps) {
    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            onImageChange(e);
        }
    };

    return (
        <div className="relative w-48 h-48 group rounded-full">
            <img
                src={imageUrl || "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=400&fit=crop"}
                alt="Contact"
                className="w-full h-full object-cover rounded-full"
            />
            {!disabled && (
                <>
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-full flex items-center justify-center">
                        <Plus className="w-8 h-8 text-white" />
                    </div>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        disabled={disabled}
                    />
                </>
            )}
        </div>
    );
}