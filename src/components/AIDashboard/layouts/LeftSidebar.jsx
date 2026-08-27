import { useState, useRef, useEffect } from "react";
import {
    Compass,
    Briefcase,
    MapPinSearch,
    Bookmark,
    Settings,
    Menu,
    X,
    MoreVertical,
    LogOut,
    HelpCircle,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const navItems = [
    {
        name: "Dashboard",
        path: "/dashboard",
        icon: Compass,
    },
    {
        name: "Plan My Trips",
        path: "/trips",
        icon: Briefcase,
    },
    {
        name: "Destination Routes",
        path: "/documents",
        icon: MapPinSearch,
    },
    {
        name: "Saved Trips",
        path: "/saved",
        icon: Bookmark,
    },
    {
        name: "Settings",
        path: "/settings",
        icon: Settings,
    },
];

export default function LeftSidebar() {
    const [open, setOpen] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const userMenuRef = useRef(null);

    // Handlers for click events
    const handleLogout = () => {
        setShowUserMenu(false);
        // Add your logout logic here (e.g., clear tokens, redirect)
        console.log("User logged out");
    };

    const handleHelp = () => {
        setShowUserMenu(false);
        // Add your help action here (e.g., navigate to /help or open modal)
        console.log("Open Help");
    };

    // Close menu when clicking outside or pressing Escape
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                setShowUserMenu(false);
            }
        };

        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                setShowUserMenu(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    return (
        <>
            {/* Mobile Toggle */}
            <button
                onClick={() => setOpen(true)}
                className="fixed top-5 left-5 z-50 
                flex h-11 w-11 items-center justify-center 
                rounded-xl text-white shadow-lg md:hidden"
            >
                <Menu size={22} />
            </button>

            {/* Mobile Overlay */}
            {open && (
                <div
                    className="fixed inset-0 z-40 bg-black/60
                    backdrop-blur-sm md:hidden"
                    onClick={() => setOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
                    fixed left-0 top-0 z-50 flex h-screen w-[290px]
                    flex-col border-r border-white/5
                    bg-[#000000]
                    transition-transform duration-300
                    ${open ? "translate-x-0" : "-translate-x-full"}
                    md:translate-x-0
                `}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-6">
                    <div className="flex items-center gap-4">
                        <div
                            className="
                                flex h-11 w-11 items-center justify-center
                                rounded-2xl
                                bg-gradient-to-br
                                from-indigo-500
                                to-violet-600
                                text-lg font-bold text-white
                            "
                        >
                            AI
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-white">
                                AiTip
                            </h2>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <span
                            className="
                                rounded-full
                                bg-indigo-500/10
                                px-3 py-1
                                text-xs
                                text-indigo-300
                            "
                        >
                            v1.0
                        </span>

                        <button
                            onClick={() => setOpen(false)}
                            className="text-white md:hidden"
                        >
                            <X size={22} />
                        </button>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="mt-6 flex-1 px-3">
                    <ul className="space-y-2">
                        {navItems.map((item) => {
                            const Icon = item.icon;

                            return (
                                <li key={item.name}>
                                    <NavLink
                                        to={item.path}
                                        className={({ isActive }) =>
                                            `
                                                group relative flex items-center
                                                gap-4 rounded-2xl px-4 py-4
                                                transition-all duration-300

                                            ${isActive
                                                ? "bg-indigo-900/40 text-white"
                                                : "text-slate-400 hover:bg-white/5 hover:text-white"
                                            }
                                            `
                                        }
                                    >
                                        {({ isActive }) => (
                                            <>
                                                {isActive && (
                                                    <span
                                                        className="
                                                            absolute left-0 top-1/2
                                                            h-8 w-1 -translate-y-1/2
                                                            rounded-r-full bg-cyan-400
                                                        "
                                                    />
                                                )}

                                                <Icon size={20} />

                                                <span className="font-medium">
                                                    {item.name}
                                                </span>

                                                {item.badge && (
                                                    <span
                                                        className="
                                                            ml-auto flex h-6 w-6
                                                            items-center justify-center
                                                            rounded-full
                                                            bg-indigo-500/20
                                                            text-xs
                                                            text-indigo-300
                                                        "
                                                    >
                                                        {item.badge}
                                                    </span>
                                                )}
                                            </>
                                        )}
                                    </NavLink>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* User Profile */}
                <div className="relative border-t border-white/5 p-5" ref={userMenuRef}>
                    {/* Popover Menu */}
                    {showUserMenu && (
                        <div
                            className="
                                absolute bottom-full left-5 right-5 mb-3
                                overflow-hidden rounded-2xl border border-white/10
                                bg-[#121212] p-1.5 shadow-xl backdrop-blur-md
                            "
                        >
                            <button
                                onClick={handleHelp}
                                className="
                                    flex w-full items-center gap-3 rounded-xl
                                    px-3 py-2.5 text-sm font-medium text-slate-300
                                    transition-all hover:bg-white/5 hover:text-white
                                "
                            >
                                <HelpCircle size={18} />
                                <span>Help & Support</span>
                            </button>

                            <button
                                onClick={handleLogout}
                                className="
                                    flex w-full items-center gap-3 rounded-xl
                                    px-3 py-2.5 text-sm font-medium text-rose-400
                                    transition-all hover:bg-rose-500/10 hover:text-rose-300
                                "
                            >
                                <LogOut size={18} />
                                <span>Log out</span>
                            </button>
                        </div>
                    )}

                    <div
                        className="
                            flex items-center gap-3
                            rounded-2xl p-2
                            transition-all
                            hover:bg-white/5
                        "
                    >
                        <div
                            className="
                                flex h-12 w-12 items-center
                                justify-center rounded-full
                                bg-gradient-to-r
                                from-indigo-500
                                to-cyan-400
                                font-semibold text-white
                            "
                        >
                            JD
                        </div>

                        <div className="flex-1 overflow-hidden">
                            <h4 className="truncate font-semibold text-white">
                                James Donovan
                            </h4>

                            <p className="truncate text-sm text-slate-400">
                                james@travel.ai
                            </p>
                        </div>

                        <button
                            onClick={() => setShowUserMenu((prev) => !prev)}
                            className="rounded-lg p-1 text-slate-400 hover:bg-white/5 hover:text-white"
                            aria-label="User menu"
                        >
                            <MoreVertical size={18} />
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
}