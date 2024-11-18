
import { ThemeProvider } from "@/components/theme-provider"
import { Outlet } from "react-router-dom"


const RootLayout = () => {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <div className="min-h-screen bg-background w-full">
                <Outlet />
            </div>
        </ThemeProvider>
    )
}

export default RootLayout