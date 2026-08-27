import { useRef, useEffect } from 'react';
import DestinationCard from '../cards/RecommendationsDestinationCard';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

const RECOMMENDATIONS = [
  {
    id: 1,
    title: 'Kyoto Ancient Temples',
    location: 'Japan',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1000&auto=format&fit=crop',
    budget: '$1,200 - $1,800',
    highlights: ['Fushimi Inari Shrine', 'Arashiyama Bamboo Grove', 'Kinkaku-ji'],
    tags: ['Culture', 'Photography', 'Food']
  },
  {
    id: 2,
    title: 'Amalfi Coast Riviera',
    location: 'Italy',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1000&auto=format&fit=crop',
    budget: '$2,100 - $3,000',
    highlights: ['Positano Cliffside', 'Ravello Gardens', 'Capri Boat Tour'],
    tags: ['Coastal', 'Luxury', 'Scenery']
  },
  {
    id: 3,
    title: 'Santorini Sunset Bay',
    location: 'Greece',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=1000&auto=format&fit=crop',
    budget: '$1,500 - $2,400',
    highlights: ['Oia Village', 'Red Beach', 'Fira Town Hike'],
    tags: ['Romance', 'Islands', 'Relax']
  },
  {
    id: 4,
    title: 'Banff National Park',
    location: 'Canada',
    image: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?q=80&w=1000&auto=format&fit=crop',
    budget: '$900 - $1,500',
    highlights: ['Lake Louise', 'Moraine Lake', 'Johnston Canyon'],
    tags: ['Hiking', 'Nature', 'Adventure']
  },
  {
    id: 5,
    title: 'Swiss Alps Trail',
    location: 'Switzerland',
    image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=1000&auto=format&fit=crop',
    budget: '$2,500 - $3,800',
    highlights: ['Zermatt Matterhorn', 'Jungfraujoch', 'Interlaken Lakes'],
    tags: ['Mountains', 'Skiing', 'Views']
  },
  {
    id: 6,
    title: 'Bali Hidden Waterfalls',
    location: 'Indonesia',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1000&auto=format&fit=crop',
    budget: '$700 - $1,200',
    highlights: ['Ubud Rice Terraces', 'Tegenungan Waterfall', 'Nusa Penida'],
    tags: ['Tropical', 'Wellness', 'Budget']
  }
];

export const ExploreRecommendation = () => {
  const scrollContainerRef = useRef(null);
  const targetSpeed = useRef(0);
  const currentSpeed = useRef(0);
  const animationFrameId = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);

  // Smooth Interpolated Continuous Scroll Engine
  useEffect(() => {
    let lastTime = performance.now();

    const loop = (currentTime) => {
      const delta = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      // Linear interpolation (lerp) for smooth speed acceleration and deceleration
      currentSpeed.current += (targetSpeed.current - currentSpeed.current) * 0.1;

      if (scrollContainerRef.current && Math.abs(currentSpeed.current) > 0.01) {
        scrollContainerRef.current.scrollLeft += currentSpeed.current * (delta * 60);
      }

      animationFrameId.current = requestAnimationFrame(loop);
    };

    animationFrameId.current = requestAnimationFrame(loop);

    return () => {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, []);

  const handleMouseMove = (e) => {
    if (isDragging.current) {
      e.preventDefault();
      const x = e.clientX - scrollContainerRef.current.offsetLeft;
      const walk = (x - startX.current) * 1.5;
      scrollContainerRef.current.scrollLeft = scrollLeftStart.current - walk;
      return;
    }

    const container = scrollContainerRef.current;
    if (!container) return;

    const { left, width } = container.getBoundingClientRect();
    const mouseX = e.clientX - left;
    const triggerZone = 160;
    const maxSpeed = 10;

    if (mouseX < triggerZone) {
      const intensity = Math.pow((triggerZone - mouseX) / triggerZone, 1.5);
      targetSpeed.current = -maxSpeed * intensity;
    } else if (mouseX > width - triggerZone) {
      const intensity = Math.pow((mouseX - (width - triggerZone)) / triggerZone, 1.5);
      targetSpeed.current = maxSpeed * intensity;
    } else {
      targetSpeed.current = 0;
    }
  };

  const handleMouseLeave = () => {
    targetSpeed.current = 0;
    isDragging.current = false;
  };

  // Mouse Drag to Scroll Handlers
  const handleMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.clientX - scrollContainerRef.current.offsetLeft;
    scrollLeftStart.current = scrollContainerRef.current.scrollLeft;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleManualScroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 340;
      scrollContainerRef.current.scrollBy({
        left: direction === 'right' ? scrollAmount : -scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="w-full py-20 sm:px-8 text-white overflow-hidden select-none">
      <div className="mx-auto space-y-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 px-6">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm tracking-wide uppercase">
              <Sparkles className="w-4 h-4" />
              Tailored For You
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-1">
              Explore Recommendations
            </h2>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleManualScroll('left')}
              className="p-3 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 active:scale-95 transition-all duration-200 shadow-md"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleManualScroll('right')}
              className="p-3 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 active:scale-95 transition-all duration-200 shadow-md"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Edge & Drag Scrollable Area */}
        <div
          ref={scrollContainerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          className="
            flex gap-10 overflow-x-auto py-8 px-6 cursor-grab active:cursor-grabbing
            scrollbar-none will-change-transform
            [mask-image:linear-gradient(to_right,transparent,black_3%,black_97%,transparent)]
          "
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {RECOMMENDATIONS.map((destination) => (
            <DestinationCard key={destination.id} destination={destination} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExploreRecommendation;