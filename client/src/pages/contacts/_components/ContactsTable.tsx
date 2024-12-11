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
import { Copy, ExternalLink, Eye, Link2, Linkedin, MoreVertical, Pen } from "lucide-react";
import toast from "react-hot-toast";
import { Contact } from "../page";

interface ContactsTableProps {
    contacts: Contact[]; // Required list of contacts
    setContacts: React.Dispatch<React.SetStateAction<Contact[]>>; // Setter for updating contacts
}

export function ContactsTable({ contacts, setContacts }: ContactsTableProps) {
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

    const deleteContact = (id: string) => {
        setContacts((prev) => prev.filter((contact) => contact.id !== id));
    };

    const updateContact = (id: string) => {
        console.log(id);

    }

    return (
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
                                            onClick={() => updateContact(contact.id)}
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
                                            onClick={() => deleteContact(contact.id)}
                                            className="gap-2 text-destructive"
                                        >
                                            <ExternalLink className="h-4 w-4" />
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
    );
}
