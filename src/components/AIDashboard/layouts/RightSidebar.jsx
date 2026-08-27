import { useState } from "react";
import {
    ChevronRight,
    ChevronLeft,
    Plane,
    Hotel,
    Wallet,
    MapPin,
    CloudSun,
} from "lucide-react";

export default function RightSidebar() {
    const [open, setOpen] = useState(true);

    return (
        <>
            {/* Toggle Button */}
            <button
                onClick={() => setOpen(!open)}
                className="
          fixed right-4 top-6 z-50
          flex h-11 w-11 items-center justify-center
          rounded-xl
          border border-white/10
          bg-slate-900/90
          text-white
          backdrop-blur-xl
        "
            >
                {open ? <ChevronRight /> : <ChevronLeft />}
            </button>

            {/* Sidebar */}
            <aside
                className={`
          fixed right-0 top-0
          h-screen
          bg-[#070B1F]
          border-l border-white/5
          backdrop-blur-xl
          transition-all duration-300 ease-in-out
          overflow-y-auto

          ${open
                        ? "w-[340px] translate-x-0"
                        : "w-[340px] translate-x-full"
                    }

          lg:block
        `}
            >
                <div className="p-6">
                    {/* Header */}
                    <h3 className="mb-6 text-sm font-semibold tracking-wider text-slate-400 uppercase">
                        Trip Status
                    </h3>

                    {/* Status Cards */}
                    <div className="space-y-3">
                        <StatusCard
                            icon={<Plane size={18} />}
                            title="Flight Confirmed"
                            subtitle="UA 837 • SFO → KIX"
                            color="emerald"
                        />

                        <StatusCard
                            icon={<Hotel size={18} />}
                            title="Hotel Booked"
                            subtitle="Ritz-Carlton • 4 Nights"
                            color="blue"
                        />

                        <StatusCard
                            icon={<Wallet size={18} />}
                            title="Budget"
                            subtitle="$420 Remaining"
                            color="amber"
                        />

                        <StatusCard
                            icon={<MapPin size={18} />}
                            title="Saved Places"
                            subtitle="8 Locations"
                            color="violet"
                        />
                    </div>

                    {/* Upcoming */}
                    <div className="mt-10">
                        <h3 className="mb-4 text-sm font-semibold tracking-wider text-slate-400 uppercase">
                            Up Next
                        </h3>

                        <div className="space-y-3">
                            <UpcomingCard
                                title="Kikunoi Honten"
                                time="Today • 7:30 PM"
                                type="Dinner Reservation"
                            />

                            <UpcomingCard
                                title="Fushimi Inari"
                                time="Tomorrow • 6:00 AM"
                                type="Sunrise Visit"
                            />
                        </div>
                    </div>

                    {/* Weather */}
                    <div className="mt-10">
                        <h3 className="mb-4 text-sm font-semibold tracking-wider text-slate-400 uppercase">
                            Weather
                        </h3>

                        <div
                            className="
                rounded-3xl
                border border-white/5
                bg-white/[0.03]
                p-5
              "
                        >
                            <div className="flex items-center gap-4">
                                <CloudSun className="text-yellow-400" size={36} />

                                <div>
                                    <h2 className="text-4xl font-bold text-white">
                                        24°
                                    </h2>

                                    <p className="text-slate-400">
                                        Partly Cloudy
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="mt-10">
                        <h3 className="mb-4 text-sm font-semibold tracking-wider text-slate-400 uppercase">
                            Quick Stats
                        </h3>

                        <div className="grid grid-cols-2 gap-3">
                            <QuickCard
                                value="12"
                                label="Activities"
                            />

                            <QuickCard
                                value="4.9"
                                label="Rating"
                            />
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}

function StatusCard({
    icon,
    title,
    subtitle,
    color,
}) {
    return (
        <div
            className="
        flex items-center gap-4
        rounded-2xl
        border border-white/5
        bg-white/[0.03]
        p-4
        transition-all
        hover:bg-white/[0.06]
      "
        >
            <div
                className={`
          flex h-11 w-11 items-center justify-center
          rounded-xl

          ${color === "emerald"
                        ? "bg-emerald-500/15 text-emerald-400"
                        : color === "blue"
                            ? "bg-blue-500/15 text-blue-400"
                            : color === "amber"
                                ? "bg-amber-500/15 text-amber-400"
                                : "bg-violet-500/15 text-violet-400"
                    }
        `}
            >
                {icon}
            </div>

            <div>
                <h4 className="font-medium text-white">
                    {title}
                </h4>

                <p className="text-sm text-slate-400">
                    {subtitle}
                </p>
            </div>
        </div>
    );
}

function UpcomingCard({
    title,
    time,
    type,
}) {
    return (
        <div
            className="
        rounded-2xl
        border border-white/5
        bg-white/[0.03]
        p-4
      "
        >
            <h4 className="font-medium text-white">
                {title}
            </h4>

            <p className="mt-1 text-sm text-slate-400">
                {time}
            </p>

            <p className="mt-2 text-xs text-slate-500">
                {type}
            </p>
        </div>
    );
}

function QuickCard({ value, label }) {
    return (
        <div
            className="
        rounded-2xl
        border border-white/5
        bg-white/[0.03]
        p-5 text-center
      "
        >
            <div className="text-3xl font-bold text-white">
                {value}
            </div>

            <div className="mt-1 text-sm text-slate-400">
                {label}
            </div>
        </div>
    );
}