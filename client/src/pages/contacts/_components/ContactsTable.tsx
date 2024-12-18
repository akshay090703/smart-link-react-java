import { Avatar } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Copy, Eye, Link2, Linkedin, MoreVertical, Pen, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { Contact } from "../view/_components/types";
import { ContactModal } from "../view/ContactModal";
import { useState } from 'react';
import { apiClient } from '../../../lib/api-client';
import DeleteContactModal from "../view/_components/ContactDeleteModal";
import { ViewContactModal } from "../view/_components/ViewContactModal";
import { useNavigate } from 'react-router-dom';

interface ContactsTableProps {
    contacts: Contact[]; // Required list of contacts
    onSearch: () => void;
}

const initialContact = {
    id: "",
    name: "",
    email: "",
    picture: "",
    phoneNumber: "",
    websiteLink: "#",
    linkedinLink: "#",
    favorite: false,
    description: "",
    address: "",
    cloudinaryImagePublicId: ""
}

export function ContactsTable({ contacts, onSearch }: ContactsTableProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [viewModal, setViewModal] = useState(false);
    const navigate = useNavigate();

    const [contactName, setContactName] = useState("");

    const [contact, setContact] = useState<Contact>(initialContact);
    const [selectedContact, setSelectedContact] = useState("");

    const onModalClose = () => {
        setTimeout(() => (document.body.style.pointerEvents = ""), 300)

        setIsModalOpen(false)
        setContact(initialContact)
    }

    const copyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            toast("Phone number copied!", {
                icon: "📋",
            });
        } catch (err) {
            console.error("Failed to copy text: ", err);
        }
    };
    const updateContact = (id: string) => {
        getContactInfo(id);
        setIsModalOpen(true);
    }

    const viewContact = (id: string) => {
        getContactInfo(id);
        setViewModal(true);
    }

    const getContactInfo = async (id: string) => {
        try {
            const res = await apiClient.get("/user/contacts/" + id)

            if (res.status === 200) {
                setContact(res?.data);
            }

            if (res.status === 401) {
                toast.error("Unauthorized user!")
                navigate('/auth')
            }
        } catch (error) {
            console.error(error);
            toast.error("There was an error getting the contact!")
        }
    }

    return (
        <div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Phone Number</TableHead>
                            <TableHead>Links</TableHead>
                            <TableHead>Favorite</TableHead>
                            <TableHead className="w-[50px]"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {contacts.map((contact) => (
                            <TableRow key={contact.id}>
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-10 w-10">
                                            {contact.picture && (
                                                <img
                                                    src={contact.picture}
                                                    alt={contact.name}
                                                    className="object-cover"
                                                />
                                            )}
                                        </Avatar>
                                        <div className="flex flex-col">
                                            <span className="font-medium">{contact.name}</span>
                                            <span className="text-sm text-muted-foreground">
                                                {contact.email}
                                            </span>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>{contact.phoneNumber}</TableCell>
                                <TableCell>
                                    <div className="flex gap-2">
                                        {contact.websiteLink && (
                                            <a
                                                href={contact.websiteLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="hover:text-primary"
                                            >
                                                <Link2 className="h-4 w-4" />
                                            </a>
                                        )}
                                        {contact.linkedinLink && (
                                            <a
                                                href={contact.linkedinLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="hover:text-primary"
                                            >
                                                <Linkedin className="h-4 w-4" />
                                            </a>
                                        )}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Checkbox checked={contact.favorite} disabled />
                                </TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger className="cursor-pointer">
                                            <MoreVertical className="h-4 w-4 text-muted-foreground" />
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem
                                                onClick={() => copyToClipboard(contact.phoneNumber)}
                                                className="gap-2"
                                            >
                                                <Copy className="h-4 w-4" />
                                                <span>Copy Phone</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                onClick={() => viewContact(contact.id)}
                                                className="gap-2"
                                            >
                                                <Eye className="h-4 w-4" />
                                                <span>View Contact</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                onClick={() => updateContact(contact.id)}
                                                className="gap-2"
                                            >
                                                <Pen className="h-4 w-4" />
                                                <span>Update Contact</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                onClick={() => {
                                                    setSelectedContact(contact.id);
                                                    setContactName(contact.name)
                                                    setIsDeleteModalOpen(true)
                                                }}
                                                className="gap-2 text-destructive"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                                <span>Delete</span>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>


            </div>
            <ContactModal contact={contact} setContact={setContact} disabled={false} isOpen={isModalOpen} onClose={onModalClose} onSearch={onSearch} />

            <ViewContactModal contact={contact} isOpen={viewModal} onClose={() => {
                setTimeout(() => (document.body.style.pointerEvents = ""), 300)
                setViewModal(false);
                setContact(initialContact)
            }} onSearch={onSearch} />

            <DeleteContactModal contactName={contactName} isOpen={isDeleteModalOpen} onClose={() => {
                setTimeout(() => (document.body.style.pointerEvents = ""), 300)
                setIsDeleteModalOpen(false);
            }} id={selectedContact} onSearch={onSearch} />
        </div>
    );
}
