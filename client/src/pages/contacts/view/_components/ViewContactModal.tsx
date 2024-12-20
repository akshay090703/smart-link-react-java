import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ViewContactHeader } from "./ViewContactHeader";
import { ViewContactBody } from "./ViewContactBody";
import { Contact } from "./types";
import { Spinner } from "@/components/ui/infinite-scroller";

interface ViewContactModalProps {
    contact: Contact;
    isOpen: boolean;
    onClose: () => void;
    onSearch: () => void
    //   onDelete: (id: string) => Promise<void>;
}

export function ViewContactModal({
    contact,
    isOpen,
    onClose,
    onSearch
    //   onDelete,
}: ViewContactModalProps) {
    return (

        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-3xl h-[90vh] flex flex-col p-0">
                {contact && contact.name ? <>
                    <ViewContactHeader />
                    <ViewContactBody
                        contact={contact}
                        onSearch={onSearch}
                        onClose={onClose}
                    />
                </> : <Spinner />}
            </DialogContent>
        </Dialog>
    );
}