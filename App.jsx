import { Route, Routes } from "react-router-dom"
import PublicLayout from "./layout/PublicLayout"
import Homepage from "./pages/Homepage"
import Error from "./pages/Error"
import { BusinessTravel } from "./components/home_page/BusinessTravel"
import LeisureTravel from "./components/home_page/LeisureTravel"
import CoupleTravel from "./components/home_page/CoupleTravel"
import AiplannerDashbord from "./pages/AiplannerDashbord"
import DefaultTravelContent from "./components/home_page/DefaultTravelContent"
import UserPersonalisation from "./components/forms/UserPersonalisation";
import ProtectedRoute from './components/auth/ProtectedRoute';
import GuestRoute from "./components/auth/GuestRoute"
import Auth from "./pages/auth"
import AiDashboardUI from "./components/AIDashboard/UI/AiDashboardUI"



const App = () => {
  return (
    <div>
      <Routes>
        <Route element={<PublicLayout />}>

          <Route path="/" element={<Homepage />} >
            <Route index element={<DefaultTravelContent />} />
            <Route path=":travelType" element={<LeisureTravel />}>
              <Route path=":step" element={<LeisureTravel />} />
            </Route>
            <Route path="couple-travel" element={<CoupleTravel />}>
              <Route path=":subType" element={<CoupleTravel />}>
                <Route path=":step" element={<CoupleTravel />} />
              </Route>
            </Route>
            <Route path="business-and/travel" element={<BusinessTravel title="Business Travel" />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/user/pref/data" element={<UserPersonalisation />} />
          </Route>
          <Route element={<GuestRoute />}>
            <Route path="/user/authenticate" element={<Auth />} />
          </Route>

          {/* 404 Page */}
          <Route path="*" element={<Error />} />
        </Route>

        <Route element={<AiDashboardUI />}>
          <Route path="/ai-planner" element={<AiplannerDashbord />} />
        </Route>

      </Routes>
    </div>
  )
}

export default App;