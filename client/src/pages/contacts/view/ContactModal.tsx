import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ContactImageUpload } from "./_components/ContactImageUpload";
import { ContactForm } from "./_components/ContactForm";
import { Contact } from "./_components/types";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ContactModalProps {
    contact: Contact;
    isOpen: boolean;
    onClose: () => void;
    disabled?: boolean;
    onSave?: (contact: Contact) => void;
}

export function ContactModal({
    contact,
    isOpen,
    onClose,
    disabled = true,
    onSave = () => { },
}: ContactModalProps) {
    const handleImageChange = (file: File) => {
        const picture = URL.createObjectURL(file);
        onSave({ ...contact, picture });
    };

    const handleFormSubmit = (data: Omit<Contact, "id" | "picture">) => {
        onSave({ ...contact, ...data });
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-3xl h-[90vh] p-0 flex flex-col gap-0 my-2">
                <VisuallyHidden.Root>
                    <DialogTitle>
                        {disabled ? 'Contact Details' : 'Edit Contact'}
                    </DialogTitle>
                </VisuallyHidden.Root>

                <div className="flex-1 overflow-hidden">
                    <ScrollArea className="h-full">
                        <div className="p-6">
                            <div className="grid grid-cols-[auto,1fr] gap-8">
                                <div className="relative">
                                    <div className="sticky top-6">
                                        <ContactImageUpload
                                            imageUrl={contact.picture}
                                            disabled={disabled}
                                            onImageChange={handleImageChange}
                                        />
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <ContactForm
                                        initialData={contact}
                                        disabled={disabled}
                                        onSubmit={handleFormSubmit}
                                    />
                                </div>
                            </div>
                        </div>
                    </ScrollArea>
                </div>
            </DialogContent>
        </Dialog>
    );
}