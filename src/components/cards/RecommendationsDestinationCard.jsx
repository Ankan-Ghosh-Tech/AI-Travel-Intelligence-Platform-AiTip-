import { MapPin, DollarSign, Compass, Tag } from 'lucide-react';

const RecommendationsDestinationCard = ({ destination }) => {
  const { title, location, image, budget, highlights, tags } = destination;

  return (
    /* Outer wrapper retains spatial dimensions without overflow clipping during hover scaling */
    <div className="relative flex-none w-[520px] h-[720px] py-6 select-none group">
      {/* Inner animated card container */}
      <div
        className="
          relative w-full h-full rounded-3xl overflow-hidden cursor-pointer
          bg-slate-900 border border-white/10 shadow-xl
          /* GPU-accelerated smooth elevation & scaling */
          transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]
          transform-gpu group-hover:-translate-y-4 group-hover:scale-[1.06] group-hover:-z-40
          group-hover:shadow-[0_20px_40px_-10px_rgba(6,182,212,0.3)]
        "
      >
        {/* Background Image with Zoom & Brightness Shift */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={image}
            alt={title}
            draggable={false}
            className="
              w-full h-full object-cover object-center
              transition-transform duration-700 ease-out
              group-hover:scale-110 group-hover:brightness-95
            "
          />
          {/* Gradient Overlays for Readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-85 group-hover:opacity-95 transition-opacity duration-500" />
        </div>

        {/* Top Location Badge */}
        <div className="absolute top-0 left-0 right-0 p-5 z-10 flex justify-between items-start pointer-events-none">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-950/60 backdrop-blur-md text-slate-100 border border-white/15 shadow-sm">
            <MapPin className="w-3.5 h-3.5 text-cyan-400" />
            {location}
          </span>
        </div>

        {/* Card Body & Dynamic Expandable Details Drawer */}
        <div className="absolute bottom-0 inset-x-0 p-6 z-10 flex flex-col justify-end text-white">
          <h3 className="text-2xl font-bold tracking-wide drop-shadow-md transition-transform duration-500 group-hover:-translate-y-1">
            {title}
          </h3>

          {/* Expandable CSS Grid Drawer */}
          <div
            className="
              grid grid-rows-[0fr] group-hover:grid-rows-[1fr]
              transition-[grid-template-rows,opacity] duration-500 ease-in-out
              opacity-0 group-hover:opacity-100 mt-1
            "
          >
            <div className="overflow-hidden space-y-3 pt-2">
              {/* Estimated Budget */}
              <div className="flex items-center gap-2 text-sm text-cyan-300 font-semibold">
                <DollarSign className="w-4 h-4 text-cyan-400" />
                <span>Est. Budget: <strong className="text-white">{budget}</strong></span>
              </div>

              {/* Highlights Section */}
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-[11px] text-slate-300 font-semibold uppercase tracking-wider">
                  <Compass className="w-3.5 h-3.5 text-cyan-400" />
                  Must Visit
                </div>
                <p className="text-xs text-slate-200 line-clamp-2 leading-relaxed">
                  {highlights.join(' • ')}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-medium bg-white/10 backdrop-blur-md text-slate-100 border border-white/10"
                  >
                    <Tag className="w-2.5 h-2.5 text-cyan-300" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendationsDestinationCard;