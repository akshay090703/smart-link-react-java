import MainNav from "@/components/MainNav"
import { Outlet } from "react-router-dom"
import { ProtectedRoute } from "./ProtectedLayout"
import { UserContextProvider } from '../context/UserContext';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

const MainLayout = () => {
    return (
        <ProtectedRoute isAuth={false}>
            <UserContextProvider>
                <main>
                    <MainNav />
                    <SidebarProvider defaultOpen={true}>
                        <AppSidebar />
                        {/* <SidebarTrigger /> */}
                        <div className="w-full">
                            <Outlet />
                        </div>
                    </SidebarProvider>
                </main>

            </UserContextProvider>
        </ProtectedRoute>
    )
}

export default MainLayout