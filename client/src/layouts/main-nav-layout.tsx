import MainNav from "@/components/MainNav"
import { Outlet } from "react-router-dom"

const MainLayout = () => {
    return (
        <div>
            <MainNav />
            <div>
                <Outlet />
            </div>
        </div>
    )
}

export default MainLayout