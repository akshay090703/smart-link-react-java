import MainNav from "@/components/MainNav"
import { Outlet } from "react-router-dom"
import { ProtectedRoute } from "./ProtectedLayout"

const MainLayout = () => {
    return (
        <ProtectedRoute>
            <MainNav />
            <div>
                <Outlet />
            </div>
        </ProtectedRoute>
    )
}

export default MainLayout