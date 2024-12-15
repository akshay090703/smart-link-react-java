import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { apiClient } from '../../../../lib/api-client';
import toast from 'react-hot-toast';

interface DeleteContactModalProps {
    isOpen: boolean;
    onClose: () => void;
    contactName: string;
    id: string
    onSearch: () => void
}

export default function DeleteContactModal({
    isOpen,
    onClose,
    contactName,
    id,
    onSearch
}: DeleteContactModalProps) {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        try {
            setIsDeleting(true);

            const res = await apiClient.delete(`/user/contacts/${id}`)

            if (res.status === 204) {
                toast.success("Contact was successfully deleted!")
                onSearch();
            }
        } catch (error) {
            console.error('Error deleting contact:', error);
            toast.error("There was some error deleting the contact!")
        } finally {
            setIsDeleting(false);
            onClose();
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Delete Contact</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete {contactName}? This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="gap-2 sm:gap-0">
                    <Button
                        type="button"
                        variant="secondary"
                        disabled={isDeleting}
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="button"
                        variant="destructive"
                        onClick={handleDelete}
                        disabled={isDeleting}
                    >
                        {isDeleting ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Deleting...
                            </>
                        ) : (
                            'Delete'
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}