import { Mail, Phone, Shield, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ProfileType } from '../../../context/UserContext';

interface UserProfileCardProps {
    profile: ProfileType;
}

export function UserProfileCard({ profile }: UserProfileCardProps) {
    return (
        <Card>
            <CardHeader className="pb-2">
                <CardTitle>Profile Overview</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
                <Avatar className="h-24 w-24">
                    <AvatarImage src={profile.profilePic} alt={profile.name} />
                    <AvatarFallback><User className="h-12 w-12" /></AvatarFallback>
                </Avatar>
                <div className="text-center">
                    <h3 className="text-2xl font-semibold">{profile.name}</h3>
                    <p className="text-muted-foreground">{profile.about}</p>
                </div>
                <div className="flex flex-wrap gap-2 justify-center">
                    {profile.emailVerified && (
                        <Badge variant="secondary">
                            <Mail className="mr-1 h-3 w-3" /> Email Verified
                        </Badge>
                    )}
                    {profile.phoneVerified && (
                        <Badge variant="secondary">
                            <Phone className="mr-1 h-3 w-3" /> Phone Verified
                        </Badge>
                    )}
                    {profile.enabled && (
                        <Badge variant="secondary">
                            <Shield className="mr-1 h-3 w-3" /> Account Active
                        </Badge>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}