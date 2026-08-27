import { useEffect } from "react"
import HeroSection from "../components/home_page/HeroSection"
import ExploreRecommendation from "../components/home_page/ExploreRecommendation";
import { NavLink, Outlet } from "react-router-dom";
import Chatbot from "../components/chat/Chatbot";



const Homepage = () => {
  useEffect(() => {
    document.title = "AiTip | Home";
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute(
        "content",
        "Welcome to AiTip. Explore interesting places to visit and make it memorable journey of your life."
      );
  });

  const all_menu = [
    { name: "Solo Trip", href: "solo-travel", key: "solo" },
    { name: "Group Trip", href: "group-travel", key: "group" },
    { name: "Family Trip", href: "family-travel", key: "family" },
    { name: "Couple Trip", href: "couple-travel", key: "couple" },
    { name: "Business & Work Trip", href: "business-and/travel", key: "work" },
  ]


  return (
    <>
      <HeroSection />
      <section className="py-10">
        <div className="travel-type flex justify-center items-center">
          <div className="flex w-5xl justify-between items-center text-center">
            {
              all_menu.map((item) => (
                <NavLink
                  key={item.key}
                  to={item.href}
                  className={({ isActive }) =>
                    `py-3 px-4 text-sm md:text-base font-medium transition-colors border-b-2 ${isActive
                      ? "border-red-900 text-amber-600"
                      : "border-transparent text-white hover:text-white/70"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))
            }
          </div>
        </div>
        <div>
          <Outlet />
        </div>
      </section>
      <section id="explore">
        <ExploreRecommendation />
      </section>



      <section>
        <Chatbot />
      </section>
    </>
  )
}

export default Homepage
