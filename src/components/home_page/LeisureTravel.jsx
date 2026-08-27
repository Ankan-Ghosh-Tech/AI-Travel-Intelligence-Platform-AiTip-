import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import gsap from "gsap";
import TravelForms from "./TravelForms";


// Helper Component for Individual 3D Card
function Card3D({ title, description, badge, bgImage, onClick }) {
  const cardRef = useRef(null);
  const bgRef = useRef(null);
  const contentRef = useRef(null);

  // Mouse movement handler to create 3D rotation & depth perspective
  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Calculate cursor position relative to card center (-1 to 1)
    const mouseX = (e.clientX - rect.left - width / 2) / (width / 2);
    const mouseY = (e.clientY - rect.top - height / 2) / (height / 2);

    // Rotate card (Max tilt: 15deg)
    gsap.to(card, {
      rotateY: mouseX * 15,
      rotateX: -mouseY * 15,
      duration: 0.4,
      ease: "power2.out",
      transformPerspective: 1000,
      transformStyle: "preserve-3d",
    });

    // Parallax background (Move slightly opposite to rotation)
    gsap.to(bgRef.current, {
      x: -mouseX * 15,
      y: -mouseY * 15,
      scale: 1.15,
      duration: 0.4,
      ease: "power2.out",
    });

    // Parallax foreground content (Elevate towards user)
    gsap.to(contentRef.current, {
      z: 40,
      x: mouseX * 8,
      y: mouseY * 8,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  // Reset card transformation smoothly when mouse leaves
  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.8,
      ease: "elastic.out(1, 0.4)",
    });

    gsap.to(bgRef.current, {
      x: 0,
      y: 0,
      scale: 1,
      duration: 0.8,
      ease: "power2.out",
    });

    gsap.to(contentRef.current, {
      z: 0,
      x: 0,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
    });
  };

  return (
    <div className="perspective-1000">
      <button
        ref={cardRef}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="group relative h-96 w-full overflow-hidden rounded-2xl p-8 text-left shadow-lg border border-white/10 focus:outline-none transition-shadow duration-500 hover:shadow-2xl"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Parallax Background Image */}
        <div
          ref={bgRef}
          className="absolute inset-0 bg-cover bg-center pointer-events-none"
          style={{ backgroundImage: `url('${bgImage}')` }}
        />

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 pointer-events-none" />
        <div className="absolute inset-0 bg-red-600/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100 mix-blend-overlay pointer-events-none" />

        {/* 3D Elevated Content Layer */}
        <div
          ref={contentRef}
          className="relative z-10 flex h-full flex-col justify-end pointer-events-none"
          style={{ transformStyle: "preserve-3d" }}
        >
          <span className="mb-2 inline-block text-xs font-semibold uppercase tracking-wider text-red-400">
            {badge}
          </span>
          <h3 className="text-2xl font-bold text-white drop-shadow-md">
            {title}
          </h3>
          <p className="mt-2 text-sm text-gray-300 drop-shadow">
            {description}
          </p>
        </div>
      </button>
    </div>
  );
}

export default function LeisureTravel() {
  const { travelType, step } = useParams();
  const navigate = useNavigate();

  const formattedType = travelType
    ?.replace("-travel", "")
    ?.replace(/^\w/, (c) => c.toUpperCase());

  // Step 1: Destination Selection
  if (!step) {
    return (
      <div className="flex flex-col items-center text-center mx-auto py-30 px-4">
        <h2 className="text-5xl font-extrabold tracking-tight capitalize text-white">
          {formattedType} Trip
        </h2>
        <p className="mt-3 text-lg text-white/50 max-w-lg">
          Choose how you want to plan your next journey
        </p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
          {/* Card 1: Specific Destination */}
          <Card3D
            title="I have a destination in mind"
            description="Search specific places and generate your detailed itinerary directly."
            badge="Direct Search"
            bgImage="https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1000&auto=format&fit=crop"
            onClick={() => navigate(`/${travelType}/destination`)}
          />

          {/* Card 2: AI Suggestions */}
          <Card3D
            title="Need some suggestions"
            description="Tell us your preferences and let AI curate custom recommendations."
            badge="AI Discovery"
            bgImage="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000&auto=format&fit=crop"
            onClick={() => navigate(`/${travelType}/suggestion`)}
          />
        </div>
      </div>
    );
  }

  // Step 2: Display Forms according to step in URL
  return (
    <div className="max-w-2xl mx-auto py-6 px-4">
      <button
        onClick={() => navigate(`/${travelType}`)}
        className="mb-4 text-sm font-medium text-gray-500 hover:text-gray-900 flex items-center gap-1 transition-colors"
      >
        ← Back to choices
      </button>

      <TravelForms mode={step} travelType={formattedType} />
    </div>
  );
}