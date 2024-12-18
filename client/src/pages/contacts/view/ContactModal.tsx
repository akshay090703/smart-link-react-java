import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ContactImageUpload } from "./_components/ContactImageUpload";
import { ContactForm } from "./_components/ContactForm";
import { Contact, ContactFormData } from "./_components/types";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState, useEffect, ChangeEvent } from 'react';
import { apiClient } from '../../../lib/api-client';
import toast from 'react-hot-toast';
import { Spinner } from "@/components/ui/infinite-scroller";
import { useNavigate } from 'react-router-dom';

interface ContactModalProps {
    contact: Contact;
    isOpen: boolean;
    onClose: () => void;
    disabled?: boolean;
    setContact: React.Dispatch<React.SetStateAction<Contact>>
    onSearch: () => void
}

export function ContactModal({
    contact,
    isOpen,
    onClose,
    disabled = true,
    setContact,
    onSearch
}: ContactModalProps) {
    const initialFormData: ContactFormData = {
        name: contact.name,
        email: contact.email,
        phone: contact.phoneNumber,
        address: contact.address,
        description: contact.description,
        website: contact.websiteLink,
        socialLink: contact.linkedinLink,
        isFavorite: contact.favorite,
        contactPhoto: null
    };

    const [previewImage, setPreviewImage] = useState(contact.picture);
    const [file, setFile] = useState<File | null>(null);
    const [formData, setFormData] = useState<ContactFormData>(initialFormData);
    const [isLoading, setLoading] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        setFormData({
            name: contact.name,
            email: contact.email,
            phone: contact.phoneNumber,
            address: contact.address,
            description: contact.description,
            website: contact.websiteLink,
            socialLink: contact.linkedinLink,
            isFavorite: contact.favorite,
            contactPhoto: null
        });

        setPreviewImage(contact.picture)
    }, [contact])

    // const handleImageChange = (file: File) => {
    //     const picture = URL.createObjectURL(file);
    //     setPreviewImage(picture);
    // };

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const currFile = event.target.files?.[0];
        if (currFile) {
            const maxSizeInBytes = 7 * 1024 * 1024;
            if (currFile.size > maxSizeInBytes) {
                toast.error("Photo size should be less than 7 MB");
                return;
            }

            setFile(currFile);
            if (currFile instanceof File) {
                setPreviewImage(URL.createObjectURL(currFile));
            }
        }
    };

    useEffect(() => {
        if (file instanceof File) {
            setFormData(prev => ({ ...prev, contactPhoto: file }));
        }
    }, [file])

    const handleFormSubmit = async (formData: ContactFormData) => {
        setLoading(true);

        const dataToSend = new FormData();

        Object.entries(formData).forEach(([key, value]) => {
            if (key == "contactPhoto" && value == null) {

            } else {
                dataToSend.append(key, value);
            }
        })

        // console.log(dataToSend);

        try {
            const res = await apiClient.put('/user/contacts/' + contact.id, dataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });

            if (res.status === 200) {
                toast.success("Contact updated successfully!")
                onSearch();
                onClose();
            }

            if (res.status === 401) {
                toast.error("Unauthorized user!")
                navigate('/auth')
            }
        } catch (error) {
            console.error(error)
            toast.error("There was some error updating the contact!")
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-3xl h-[90vh] p-0 flex flex-col gap-0 my-2">
                {contact && contact.name ? <><VisuallyHidden.Root>
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
                                                imageUrl={previewImage}
                                                disabled={disabled}
                                                onImageChange={handleImageChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <ContactForm
                                            formData={formData}
                                            setFormData={setFormData}
                                            disabled={disabled}
                                            onSubmit={handleFormSubmit}
                                            loading={isLoading}
                                        />
                                    </div>
                                </div>
                            </div>
                        </ScrollArea>
                    </div></> : <Spinner />}
            </DialogContent>
        </Dialog>
    );
}