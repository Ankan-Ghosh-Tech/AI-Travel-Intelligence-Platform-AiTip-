import { useState } from "react";
import { Menu, X, Sparkles, Luggage, CalendarCheck } from "lucide-react";

const Navbar = () => {
    const [open, setOpen] = useState(false);

    // Get current active route path
    const currentPath = typeof window !== "undefined" ? window.location.pathname : "/";

    // Menu item definitions
    const menus = [
        { name: "AI Planner", path: "/ai-planner", icon: Sparkles },
        { name: "Trips", path: "/trips", icon: Luggage },
        { name: "Bookings", path: "/bookings", icon: CalendarCheck },
    ];

    return (
        <nav className="absolute p-5 z-50 w-full">
            <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/10 bg-white/[0.08] px-6 py-2 shadow-[0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-xl">
                {/* Logo */}
                <a href="/" className="flex items-center gap-1 text-2xl font-black tracking-tight">
                    <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                        Ai
                    </span>
                    <span className="text-white">Trip</span>
                </a>

                {/* Desktop Menu */}
                <ul className="hidden items-center gap-1 md:flex">
                    {menus.map((menu) => {
                        const Icon = menu.icon;
                        const isActive = currentPath === menu.path;

                        return (
                            <li key={menu.name}>
                                <a
                                    href={menu.path}
                                    className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
                                        isActive
                                            ? "bg-blue-600/10 text-blue-400 ring-1 ring-blue-500/20"
                                            : "text-slate-300 hover:bg-slate-800 hover:text-white"
                                    }`}
                                >
                                    <Icon className="h-4 w-4" />
                                    {menu.name}
                                </a>
                            </li>
                        );
                    })}
                </ul>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setOpen(!open)}
                    className="rounded-lg p-2 text-slate-300 hover:bg-slate-800 hover:text-white focus:outline-none md:hidden"
                    aria-label="Toggle Navigation Menu"
                >
                    {open ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Dropdown Menu */}
            {open && (
                <div className="mt-2 border-t border-slate-800 bg-slate-900 px-4 py-3 md:hidden">
                    <ul className="flex flex-col gap-1">
                        {menus.map((menu) => {
                            const Icon = menu.icon;
                            const isActive = currentPath === menu.path;

                            return (
                                <li key={menu.name}>
                                    <a
                                        href={menu.path}
                                        onClick={() => setOpen(false)}
                                        className={`flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium transition-all ${
                                            isActive
                                                ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                                                : "text-slate-300 hover:bg-slate-800 hover:text-white"
                                        }`}
                                    >
                                        <Icon className="h-5 w-5" />
                                        {menu.name}
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
        </nav>
    );
};

export default Navbar;