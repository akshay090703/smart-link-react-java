import { Outlet } from "react-router-dom"
import { ProtectedRoute } from "./ProtectedLayout"


const MainLayout = () => {
    return (
        <ProtectedRoute isAuth={false}>
            <main>
                <div className="w-full">
                    <Outlet />
                </div>
            </main>
        </ProtectedRoute>
    )
}

export default MainLayout