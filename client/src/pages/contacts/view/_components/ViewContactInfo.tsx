import { ViewContactField } from "./ViewContactField";
import { Contact } from "./types";
import {
    User,
    Mail,
    Phone,
    MapPin,
    FileText,
    Star,
    Globe,
    Linkedin,
} from "lucide-react";

interface ViewContactInfoProps {
    contact: Contact;
}

export function ViewContactInfo({ contact }: ViewContactInfoProps) {
    return (
        <div className="space-y-8">
            <div className="space-y-6">
                <ViewContactField
                    icon={<User className="h-4 w-4" />}
                    label="Name"
                    value={contact.name}
                />
                <ViewContactField
                    icon={<Mail className="h-4 w-4" />}
                    label="Email"
                    value={contact.email}
                />
                <ViewContactField
                    icon={<Phone className="h-4 w-4" />}
                    label="Phone"
                    value={contact.phoneNumber}
                />
                <ViewContactField
                    icon={<MapPin className="h-4 w-4" />}
                    label="Address"
                    value={contact.address}
                />
                {contact.description && <ViewContactField
                    icon={<FileText className="h-4 w-4" />}
                    label="Description"
                    value={contact.description}
                />}
                {contact.favorite ? (
                    <div className="text-amber-500 flex items-center gap-2">
                        <Star className="h-4 w-4 fill-current" />
                        <span className="text-sm font-medium">Favorite Contact</span>
                    </div>
                ) : (
                    <div className="text-gray-500 flex items-center gap-2">
                        <Star className="h-4 w-4" />
                        <span className="text-sm font-medium">Not a Favorite Contact</span>
                    </div>
                )}
                {contact.websiteLink && (
                    <ViewContactField
                        icon={<Globe className="h-4 w-4" />}
                        label="Website"
                        value={contact.websiteLink}
                        isLink
                    />
                )}
                {contact.linkedinLink && (
                    <ViewContactField
                        icon={<Linkedin className="h-4 w-4" />}
                        label="LinkedIn"
                        value={contact.linkedinLink}
                        isLink
                    />
                )}
            </div>
        </div>
    );
}