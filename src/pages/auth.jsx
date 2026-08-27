import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import GoogleAuth from "../components/auth/GoogleAuth";

const Auth = () => {
    const containerRef = useRef(null);
    const heroRef = useRef(null);
    const cardRef = useRef(null);

    useGSAP(
        () => {
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            // Left Visual Entrance
            tl.from(".gsap-badge", {
                y: -20,
                opacity: 0,
                duration: 0.6,
            })
                .from(
                    ".gsap-title",
                    {
                        y: 30,
                        opacity: 0,
                        duration: 0.8,
                    },
                    "-=0.3"
                )
                .from(
                    ".gsap-subtext",
                    {
                        y: 20,
                        opacity: 0,
                        duration: 0.6,
                    },
                    "-=0.5"
                );

            // Right Card Entrance
            tl.from(
                cardRef.current,
                {
                    scale: 0.9,
                    y: 30,
                    opacity: 0,
                    duration: 0.8,
                    ease: "back.out(1.7)",
                },
                "-=0.6"
            );

            // Floating Infinite Animation for AI Badge
            gsap.to(".gsap-badge", {
                y: -4,
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
            });
        },
        { scope: containerRef }
    );

    return (
        <div
            ref={containerRef}
            className="min-h-screen w-full bg-slate-950 text-slate-100 font-sans grid grid-cols-1 lg:grid-cols-12 overflow-hidden"
        >
            {/* Left Visual Banner (7 cols) */}
            <div
                ref={heroRef}
                className="relative hidden lg:flex lg:col-span-7 flex-col justify-between p-12 overflow-hidden bg-cover bg-center"
                style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1800&auto=format&fit=crop')`,
                }}
            >
                {/* Modern Cinematic Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-950/50 to-slate-950/20 backdrop-blur-[1px]" />
                {/* Hero Content */}
                <div className="relative z-10 max-w-xl space-y-6 my-auto">
                    <div className="gsap-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/15 border border-teal-400/30 text-teal-300 text-xs font-semibold tracking-wider uppercase backdrop-blur-md shadow-inner">
                        <span>✨</span> Next-Gen Travel Companion
                    </div>

                    <h1 className="gsap-title text-5xl xl:text-6xl font-extrabold tracking-tight text-white leading-[1.15] drop-shadow-lg">
                        Explore the world <br />
                        <span className="bg-gradient-to-r from-teal-300 via-cyan-200 to-emerald-400 bg-clip-text text-transparent">
                            on autopilot.
                        </span>
                    </h1>

                    <p className="gsap-subtext text-slate-300 text-lg leading-relaxed max-w-lg font-light">
                        Personalized itineraries, hidden gem discovery, and smart trip
                        planning driven by intelligent AI.
                    </p>
                </div>

                {/* Footer Note */}
                <div className="relative z-10 text-xs text-slate-400/80">
                    © {new Date().getFullYear()} AiTrip. All rights reserved.
                </div>
            </div>

            {/* Right Auth Section (5 cols) */}
            <div className="lg:col-span-5 flex items-center justify-center p-6 sm:p-12 relative bg-slate-950">
                {/* Ambient Glowing Orbs */}
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-teal-500/10 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-10 right-10 w-64 h-64 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

                {/* Auth Card Container */}
                <div
                    ref={cardRef}
                    className="w-full max-w-md space-y-8 bg-slate-900/80 border border-slate-800/80 p-8 sm:p-10 rounded-3xl backdrop-blur-2xl shadow-2xl relative z-10"
                >
                    {/* Header */}
                    <div className="text-center space-y-3">
                        <div className="inline-flex lg:hidden items-center justify-center w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/20 mb-2">
                            <span className="text-2xl">🌍</span>
                        </div>
                        <h2 className="text-3xl font-bold tracking-tight text-white">
                            Start Your Adventure
                        </h2>
                        <p className="text-sm text-slate-400 leading-relaxed">
                            Sign in to unlock AI-crafted itineraries tailored just for you.
                        </p>
                    </div>

                    {/* Action Button */}
                    <div className="pt-2 flex justify-center">
                        <div className="w-full">
                            <GoogleAuth />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;