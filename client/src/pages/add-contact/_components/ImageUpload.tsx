import { ChangeEvent, useRef } from 'react';
import { Plus } from 'lucide-react';

interface ImageUploadProps {
    imageUrl: string;
    onImageChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export function ImageUpload({ imageUrl, onImageChange }: ImageUploadProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="relative w-48 h-48 group">
            <img
                src={imageUrl}
                alt="Profile photo"
                className="w-full h-full object-cover rounded-full shadow-md"
            />
            <div
                className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                onClick={handleImageClick}
            >
                <Plus className="h-12 w-12 text-white" />
            </div>
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={onImageChange}
            />
        </div>
    );
}