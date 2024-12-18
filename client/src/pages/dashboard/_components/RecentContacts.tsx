import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User } from 'lucide-react';
import { Contact } from '../../contacts/view/_components/types';

interface RecentContactProps {
    contacts: Contact[];
}

export function RecentContacts({ contacts }: RecentContactProps) {
    return (
        <Card className="col-span-3">
            <CardHeader>
                <CardTitle>Recent Contacts</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-8">
                    {contacts.slice(0, 5).map((contact) => (
                        <div key={contact.email} className="flex items-center">
                            <Avatar className="h-9 w-9">
                                {contact.picture ? (
                                    <AvatarImage
                                        src={contact.picture}
                                        alt={contact.name}
                                    />
                                ) : (
                                    <AvatarFallback>
                                        <User className="h-4 w-4" />
                                    </AvatarFallback>
                                )}
                            </Avatar>
                            <div className="ml-4 space-y-1">
                                <p className="text-sm font-medium leading-none">{contact.name}</p>
                                <p className="text-sm text-muted-foreground">{contact.email}</p>
                            </div>
                            <div className="ml-auto font-medium">
                                {contact.favorite && "⭐"}
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}