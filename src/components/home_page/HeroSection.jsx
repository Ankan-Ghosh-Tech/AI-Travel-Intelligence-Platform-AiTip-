import { useRef, useLayoutEffect } from 'react';
import { initHeroExperience } from '../../animations/HeroExperienceEngine';
import '../../styles/homeHero.css';
import heroSections from '../../assets/videos/herosections.mp4';
import herosections from '../../assets/image/heroCoverimg.png';

export default function HeroSection() {
    const heroStageRef = useRef(null);
    const videoRef = useRef(null);
    const grainCanvasRef = useRef(null);
    const svgTextGroupRef = useRef(null);
    const svgTextRef = useRef(null);
    const svgMaskLayerRef = useRef(null);
    const revealedHeroCopyRef = useRef(null);

    useLayoutEffect(() => {
        const cleanup = initHeroExperience({
            heroStageRef,
            videoRef,
            grainCanvasRef,
            svgTextGroupRef,
            svgTextRef,
            svgMaskLayerRef,
            revealedHeroCopyRef
        });

        // Ensure window scroll resets to top on unmount/reload
        const handleBeforeUnload = () => window.scrollTo(0, 0);
        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
            cleanup();
        };
    }, []);

    return (
        <div className="relative w-full bg-[#070709] text-[#f4f4f6] overflow-x-hidden">
            {/* Pinned Stage Container */}
            <section
                ref={heroStageRef}
                id="hero-stage"
                className="hero-container relative w-full h-screen overflow-hidden bg-[#070709] will-change-transform"
            >
                {/* Video Layer (z-[1]) */}
                <div className="video-viewport absolute inset-0 w-full h-full z-[1] overflow-hidden pointer-events-none">
                    <video
                        ref={videoRef}
                        id="hero-video"
                        autoPlay
                        muted
                        loop
                        playsInline
                        poster={herosections}
                        src={heroSections}
                        className="w-full h-full object-cover origin-center will-change-transform"
                    />
                    <div className="layer-gradient-top absolute inset-0 bg-gradient-to-b from-[#070709]/90 via-[#070709]/20 to-transparent z-[2] pointer-events-none" />
                    <div className="layer-gradient-bottom absolute inset-0 bg-gradient-to-t from-[#070709] via-[#070709]/40 to-transparent z-[2] pointer-events-none" />
                    <div className="layer-vignette absolute inset-0 z-[2] pointer-events-none [background:radial-gradient(circle_at_center,transparent_30%,rgba(7,7,9,0.85)_100%)]" />

                    <canvas
                        ref={grainCanvasRef}
                        id="grain-canvas"
                        className="grain-canvas absolute inset-0 w-full h-full z-[3] opacity-[0.04] pointer-events-none"
                    />
                </div>

                {/* SVG Cutout Mask Layer (z-[4]) */}
                <div
                    ref={svgMaskLayerRef}
                    id="svg-mask-layer"
                    className="svg-mask-wrapper absolute inset-0 w-full h-full z-[4] pointer-events-none will-change-[opacity,transform]"
                >
                    <svg viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice" className="w-full h-full block">
                        <defs>
                            <mask id="agency-hero-mask" x="0" y="0" width="100%" height="100%">
                                <rect x="0" y="0" width="100%" height="100%" fill="white" />
                                <g ref={svgTextGroupRef} id="mask-text-group">
                                    <text
                                        ref={svgTextRef}
                                        id="mask-text"
                                        x="960"
                                        y="540"
                                        dominantBaseline="central"
                                        textAnchor="middle"
                                    >
                                        TRAVEL
                                    </text>
                                </g>
                            </mask>
                        </defs>
                        <rect width="100%" height="100%" fill="#070709" mask="url(#agency-hero-mask)" />
                    </svg>
                </div>

                {/* Initial Content Layer (z-[6]) */}
                <div className="hero-content absolute inset-0 w-full h-full flex flex-col justify-between px-5 sm:px-10 md:px-[6dvw] pt-24 pb-10 sm:pb-16 z-[6]">
                    <div className="hero-heading-wrapper max-w-[850px] my-auto text-left">
                        <span className="hero-entrance-subheadline sub-headline block text-xs sm:text-sm font-semibold tracking-[0.25em] sm:tracking-[0.3em] uppercase text-[#e2c08d] mb-3 sm:mb-5 will-change-[transform,opacity,filter]">
                            Start Your Journey With AiTip
                        </span>
                        <h1 className="hero-entrance-title hero-title font-display font-extrabold text-3xl sm:text-5xl md:text-6xl lg:text-8xl leading-[1.05] sm:leading-[1.02] tracking-tight text-white mb-4 sm:mb-6 will-change-[transform,opacity,filter]">
                            <span className="text-gradient-hero">
                                Ease Your Journey With AiTip
                            </span>
                        </h1>
                        <p className="hero-entrance-desc hero-description text-sm sm:text-base lg:text-lg font-light text-[#8e8e9c] max-w-[540px] leading-relaxed will-change-[transform,opacity,filter] mb-6 sm:mb-8">
                            Traverse untouched mountain wilderness aboard the world’s most advanced AI travel assistant. From deciding destinations to booking stays, finding optimal routes, local gems, food, and culture.
                        </p>
                        <a href="/ai-planner" className="hero-entrance-btn inline-block">
                            <button className="px-6 sm:px-8 py-3 bg-[#e2c08d] hover:bg-[#ebd3ac] text-[#070709] font-medium text-sm sm:text-base rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg shadow-[#e2c08d]/10">
                                Get Started
                            </button>
                        </a>
                    </div>

                    <div className="hero-entrance-scroll scroll-indicator-wrapper flex items-center gap-3 sm:gap-5 will-change-[transform,opacity]">
                        <div className="mouse-icon relative w-[20px] sm:w-[22px] h-[32px] sm:h-[36px] border-[1.5px] border-white/30 rounded-full">
                            <div className="mouse-wheel absolute top-1.5 left-1/2 -translate-x-1/2 w-[3px] h-[6px] bg-[#e2c08d] rounded-sm animate-wheel-bounce" />
                        </div>
                        <span className="scroll-text text-[10px] sm:text-xs tracking-[0.25em] uppercase text-white/60">
                            Scroll To Explore
                        </span>
                    </div>
                </div>

                {/* Final Revealed Content Layer (z-[7]) */}
                <div
                    ref={revealedHeroCopyRef}
                    id="revealed-hero-copy"
                    className="revealed-hero-text absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[7] text-center w-[92%] sm:w-[90%] max-w-[950px] pointer-events-none opacity-0 blur-xl will-change-[opacity,transform,filter]"
                >
                    <span className="revealed-tagline inline-block text-xs sm:text-sm font-semibold tracking-[0.3em] sm:tracking-[0.4em] uppercase text-[#e2c08d] mb-4 sm:mb-6">
                        Trans-Alpine Passage
                    </span>
                    <h2 className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold uppercase leading-[1.02] sm:leading-[0.98] tracking-tight text-white mb-4 sm:mb-6 [text-shadow:0_10px_30px_rgba(0,0,0,0.8)]">
                        Solve any problem in travel seconds
                    </h2>
                    <p className="text-sm sm:text-lg md:text-xl text-white/80 max-w-[600px] mx-auto leading-relaxed font-light [text-shadow:0_10px_20px_rgba(0,0,0,0.8)]">
                        Redefining luxury travel through unseen high-altitude mountain corridors and beaches, within your budget and freedom.
                    </p>
                </div>
            </section>
        </div>
    );
}