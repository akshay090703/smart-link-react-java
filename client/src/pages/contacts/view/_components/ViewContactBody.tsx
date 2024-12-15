import { ScrollArea } from "@/components/ui/scroll-area";
import { ViewContactImage } from "./ViewContactImage";
import { ViewContactInfo } from "./ViewContactInfo";
import { Contact } from "./types";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import DeleteContactModal from "./ContactDeleteModal";
import { Button } from "@/components/ui/button";

interface ViewContactBodyProps {
    contact: Contact;
    onSearch: () => void
}

export function ViewContactBody({ contact, onSearch }: ViewContactBodyProps) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    return (
        <ScrollArea className="h-full">
            <div className="p-6">
                <div className="grid grid-cols-[auto,1fr] gap-8">
                    <div className="flex flex-col items-center gap-5">
                        <div className="">
                            <ViewContactImage imageUrl={contact.picture} />
                        </div>

                        <div className="relative">
                            <Button
                                variant="destructive"
                                size="sm"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setShowDeleteModal(true);
                                }}
                                className="gap-2"
                            >
                                <Trash2 className="h-4 w-4" />
                                Delete Contact
                            </Button>
                        </div>
                    </div>
                    <div className="flex-1 min-w-0">
                        <ViewContactInfo contact={contact} />
                    </div>
                </div>
            </div>

            <DeleteContactModal contactName={contact.name} isOpen={showDeleteModal} onClose={() => {
                setTimeout(() => (document.body.style.pointerEvents = ""), 300)
                setShowDeleteModal(false);
            }} id={contact.id} onSearch={onSearch} />
        </ScrollArea>
    );
}