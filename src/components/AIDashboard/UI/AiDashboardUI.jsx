import { Outlet } from "react-router-dom"
import LeftSidebar from "../layouts/LeftSidebar"
import RightSidebar from "../layouts/RightSidebar"


const AiDashboardUI = () => {
    return (
        <div className="flex min-h-screen bg-[#000000b1]">
            <LeftSidebar />

            <main className="flex-1 p-6 lg:ml-[280px] lg:mr-[320px]">
                <Outlet />
            </main>

            <RightSidebar />
        </div>
    )
}

export default AiDashboardUI
