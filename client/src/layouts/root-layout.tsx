
import { ThemeProvider } from "@/components/theme-provider"
import { SidebarProvider } from "@/components/ui/sidebar"
import { Outlet } from "react-router-dom"
import { AppSidebar } from '../components/app-sidebar';
import MainNav from '@/components/MainNav';
import { useProfile } from '../context/UserContext';


const RootLayout = () => {
    const { userProfile } = useProfile()

    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <div className="min-h-screen bg-background w-full">
                <SidebarProvider defaultOpen={true}>
                    {userProfile && <AppSidebar />}
                    {/* <SidebarTrigger /> */}

                    <div className="w-full">
                        <MainNav />
                        <div className="w-full">
                            <Outlet />
                        </div>
                    </div>
                </SidebarProvider>
            </div>
        </ThemeProvider>
    )
}

export default RootLayout