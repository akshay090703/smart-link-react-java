import MainNav from "@/components/MainNav"
import { Outlet } from "react-router-dom"
import { ProtectedRoute } from "./ProtectedLayout"

const MainLayout = () => {
    return (
        <ProtectedRoute isAuth={false}>
            <MainNav />
            <div>
                <Outlet />
            </div>
        </ProtectedRoute>
    )
}

export default MainLayout