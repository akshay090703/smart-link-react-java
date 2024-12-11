import { SkeletonCard } from "@/components/SkeletonCard";
import { useState, useEffect } from "react";
import { apiClient } from "../../lib/api-client";
import toast from "react-hot-toast";
import { ContactsTable } from "./_components/ContactsTable";
import { useSearchParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

export interface Contact {
    id: string;
    name: string;
    email: string;
    picture?: string;
    phoneNumber: string;
    websiteLink?: string;
    linkedinLink?: string;
    favorite?: boolean;
    description?: string;
    address?: string;
    cloudinaryImagePublicId?: string;
}

const ContactsPage = () => {
    const [loading, setLoading] = useState(false);
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [searchParams, setSearchParams] = useSearchParams();

    const page = Number(searchParams.get("page") || 0);
    const size = Number(searchParams.get("size") || 10);
    const sortBy = searchParams.get("sortBy") || "name";
    const order = searchParams.get("order") || "asc";

    useEffect(() => {
        const getAllContacts = async () => {
            setLoading(true);
            try {
                const res = await apiClient.get("/user/contacts", {
                    params: { page, size, sortBy, order }
                });
                if (res.status === 200) {
                    setContacts(res?.data?.content);
                }
            } catch (error) {
                console.error(error);
                toast.error("There was an error fetching the contacts");
            } finally {
                setLoading(false);
            }
        };

        getAllContacts();
    }, [page, size, sortBy, order]);

    const updateUrlParams = (updatedParams: Record<string, string | number>) => {
        const newParams = {
            page: updatedParams.page?.toString() || page.toString(),
            size: updatedParams.size?.toString() || size.toString(),
            sortBy: updatedParams.sortBy?.toString() || sortBy.toString(),
            order: updatedParams.order?.toString() || order.toString(),
        };

        setSearchParams(newParams);
    };

    return loading ? (
        <SkeletonCard />
    ) : (
        <div className="flex flex-col px-4 py-3 pt-5">
            <div className="flex-grow overflow-auto">
                {
                    contacts.length ?
                        <ContactsTable contacts={contacts} setContacts={setContacts} /> :
                        <div className="flex justify-center items-center h-[20vh]">
                            <p>No more contacts. Go Back!</p>
                        </div>
                }
            </div>
            <div className="mt-3 flex justify-between items-center">
                <Button
                    onClick={() => updateUrlParams({ page: page - 1 })}
                    disabled={page == 0}
                    className="disabled:cursor-not-allowed"
                >
                    <ArrowLeft />
                    Prev Page
                </Button>
                <Button
                    onClick={() => updateUrlParams({ page: page + 1 })}
                    disabled={size != contacts.length}
                    className="disabled:cursor-not-allowed"
                >
                    Next Page
                    <ArrowRight />
                </Button>
            </div>
        </div>
    );
};

export default ContactsPage;
