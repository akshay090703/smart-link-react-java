import { Home, ContactRound, PackagePlus, User2Icon } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import Logo from "./Logo"
// import DropDownUserMenu from "./DropDownUserMenu"
import { Link } from 'react-router-dom';

// Menu items.
const items = [
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: Home,
    },
    {
        title: "Add Contact",
        url: "/add-contact",
        icon: PackagePlus,
    },
    {
        title: "All Contacts",
        url: "/contacts",
        icon: ContactRound,
    },
    {
        title: "Profile",
        url: "/profile",
        icon: User2Icon,
    },
]

export function AppSidebar() {
    return (
        <Sidebar variant="sidebar">
            <SidebarContent>
                <SidebarGroup className="p-4">
                    <SidebarGroupLabel><Logo /></SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu className="mt-4 p-2" >
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title} className="mb-3">
                                    <SidebarMenuButton asChild className="text-[16px]">
                                        <Link to={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

        </Sidebar>
    )
}
