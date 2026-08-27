import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbars/navbar"
import Footer from "../components/footer/Footer"


const PublicLayout = () => {
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    )
}

export default PublicLayout
