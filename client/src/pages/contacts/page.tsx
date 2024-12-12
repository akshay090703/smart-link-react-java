import { SkeletonCard } from "@/components/SkeletonCard";
import { useState, useEffect } from "react";
import { apiClient } from "../../lib/api-client";
import toast from "react-hot-toast";
import { ContactsTable } from "./_components/ContactsTable";
import { useSearchParams } from 'react-router-dom';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input";
import { LoadingButton } from '@/components/LoadingButton';
import { SearchIcon } from "lucide-react";

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

    const [totalPages, setTotalPages] = useState(0);
    const [currPage, setCurrPage] = useState(0);

    const page = Number(searchParams.get("page") || 0);
    const size = Number(searchParams.get("size") || 10);
    const sortBy = searchParams.get("sortBy") || "name";
    const order = searchParams.get("order") || "asc";

    const [searchLoading, setSearchLoading] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState("");
    const [searchText, setSearchText] = useState("");

    const onSearch = () => {
        setSearchLoading(true)
        setTimeout(() => {
            console.log(selectedCategory + " " + searchText);

            setSearchLoading(false)
        }, 1000)
    }

    useEffect(() => {
        const getAllContacts = async () => {
            setLoading(true);
            try {
                const res = await apiClient.get("/user/contacts", {
                    params: { page, size, sortBy, order }
                });

                // console.log(res.data);

                if (res.status === 200) {
                    setContacts(res?.data?.contacts?.content);
                    setTotalPages(res?.data?.totalPages)
                    setCurrPage(res?.data?.currentPage)
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
        <div className="flex flex-col px-4 py-3 pt-5 gap-4">
            <div className="flex gap-4 ml-auto">
                <Select onValueChange={(val) => setSelectedCategory(val)}>
                    <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Category to search" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Categories</SelectLabel>
                            <SelectItem value="name">Name</SelectItem>
                            <SelectItem value="phoneNumber">Phone Number</SelectItem>
                            <SelectItem value="email">Email</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>

                <div className="relative w-full max-w-sm">
                    <Input
                        type="text"
                        placeholder="Search"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        className="pl-10"
                    />
                    <SearchIcon className="absolute left-3 top-[45%] transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                </div>

                <LoadingButton loading={searchLoading} onClick={onSearch}>Search</LoadingButton>
            </div>
            <div className="flex-grow overflow-auto">
                {
                    contacts.length ?
                        <ContactsTable contacts={contacts} setContacts={setContacts} /> :
                        <div className="flex justify-center items-center h-[20vh]">
                            <p>No contacts found!</p>
                        </div>
                }
            </div>
            <div className="flex justify-between items-center">
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious onClick={() => page > 0 && updateUrlParams({ page: page - 1 })}
                                className={`${page === 0 ? "cursor-not-allowed opacity-50" : "cursor-pointer"
                                    }`}
                            />
                        </PaginationItem>
                        {
                            Array.from({ length: totalPages }).map((_, index) => (
                                <PaginationItem key={index}>
                                    <PaginationLink
                                        onClick={() => updateUrlParams({ page: index })}
                                        className={`${index === currPage ? "bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-50" : "cursor-pointer"
                                            }`}
                                    >
                                        {index + 1}
                                    </PaginationLink>
                                </PaginationItem>
                            ))
                        }
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext onClick={() => page < totalPages - 1 && updateUrlParams({ page: page + 1 })}
                                className={`${page === totalPages - 1 ? "cursor-not-allowed opacity-50" : "cursor-pointer"
                                    }`}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    );
};

export default ContactsPage;
