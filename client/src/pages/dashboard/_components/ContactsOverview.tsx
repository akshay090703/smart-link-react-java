import { Users, Star, Globe, Phone } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface StatsCardProps {
    title: string;
    value: string;
    icon: React.ReactNode;
    description: string;
}

function StatsCard({ title, value, icon, description }: StatsCardProps) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 gap-1">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                {icon}
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                <p className="text-xs text-muted-foreground">{description}</p>
            </CardContent>
        </Card>
    );
}

interface ContactsOverviewProps {
    totalContacts: number;
    favoriteContacts: number;
    websiteContacts: number;
    phoneContacts: number;
}

export function ContactsOverview({
    totalContacts,
    favoriteContacts,
    websiteContacts,
    phoneContacts,
}: ContactsOverviewProps) {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatsCard
                title="Total Contacts"
                value={totalContacts.toString()}
                icon={<Users className="h-4 w-4 text-muted-foreground" />}
                description="Total contacts in your network"
            />
            <StatsCard
                title="Favorite Contacts"
                value={favoriteContacts.toString()}
                icon={<Star className="h-4 w-4 text-muted-foreground" />}
                description="Contacts marked as favorites"
            />
            <StatsCard
                title="With Websites"
                value={websiteContacts.toString()}
                icon={<Globe className="h-4 w-4 text-muted-foreground" />}
                description="Contacts with website links"
            />
            <StatsCard
                title="With Phone Numbers"
                value={phoneContacts.toString()}
                icon={<Phone className="h-4 w-4 text-muted-foreground" />}
                description="Contacts with phone numbers"
            />
        </div>
    );
}