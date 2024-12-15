interface ViewContactImageProps {
    imageUrl: string;
}

export function ViewContactImage({ imageUrl }: ViewContactImageProps) {
    return (
        <div>
            <div className="w-48 h-48 rounded-full overflow-hidden">
                <img
                    src={imageUrl}
                    alt="Contact"
                    className="w-full h-full object-cover"
                />
            </div>
        </div>
    );
}