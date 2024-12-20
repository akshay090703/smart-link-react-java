import { UserProfileCard } from './_components/UserProfileCard';
import { ContactsOverview } from './_components/ContactsOverview';
import { ContactsChart } from './_components/ContactsChart';
import { RecentContacts } from './_components/RecentContacts';
import { Contact } from '../contacts/view/_components/types';
import { ProfileType, useProfile } from '../../context/UserContext';
import { useEffect, useState } from 'react';
import { apiClient } from '../../lib/api-client';
import { SkeletonCard } from '@/components/SkeletonCard';

const defaultData = {
    id: "",
    name: "",
    email: "",
    about: "",
    profilePic: "",
    phoneNumber: "",

    // info
    enabled: false,
    emailVerified: false,
    phoneVerified: false
}

export default function Dashboard() {
    const { userProfile } = useProfile();
    const [profile, setProfile] = useState<ProfileType | null>(defaultData);
    const [contacts, setContacts] = useState<Contact[]>([]);

    const getAllContacts = async () => {
        try {
            const res = await apiClient.get('/user/contacts');

            if (res.status === 200) {

                setContacts(res?.data?.content)
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getAllContacts();
    }, [])

    useEffect(() => {
        setProfile(userProfile);
    }, [userProfile])

    // Calculate statistics
    const totalContacts = contacts.length;
    const favoriteContacts = contacts.filter(c => c.favorite).length;
    const websiteContacts = contacts.filter(c => c.websiteLink).length;
    const phoneContacts = contacts.filter(c => c.phoneNumber).length;

    return (
        <>
            {contacts.length ? <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
                <div className="flex items-center justify-between space-y-2">
                    <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                </div>
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
                    <div className="col-span-1 md:col-span-2 lg:col-span-3">
                        {profile && <UserProfileCard profile={profile} />}
                    </div>
                    <div className="col-span-1 md:col-span-2 lg:col-span-4">
                        <ContactsOverview
                            totalContacts={totalContacts}
                            favoriteContacts={favoriteContacts}
                            websiteContacts={websiteContacts}
                            phoneContacts={phoneContacts}
                        />
                    </div>
                </div>
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
                    <ContactsChart contacts={contacts} />
                    <RecentContacts contacts={contacts} />
                </div>
            </div> :
                <SkeletonCard />
            }
        </>
    );
}