import React, { useState } from 'react';
import { ThumbnailProject, ThumbnailCategory } from '../types/portfolio';
import { filterThumbnails } from '../utils/portfolioCalculators';
import { Layers } from 'lucide-react';

interface ProjectsSectionProps {
  thumbnails: ThumbnailProject[];
  onSelectThumbnail: (thumb: ThumbnailProject) => void;
  onSimulateThumbnail: (thumb: ThumbnailProject) => void;
  onOpenCustomizer?: () => void;
}

const CATEGORY_TABS: { id: ThumbnailCategory; label: string }[] = [
  { id: 'todos', label: 'All Games' },
  { id: 'gta5', label: 'GTA 5' },
  { id: 'gta6', label: 'GTA 6' },
  { id: 'csgo', label: 'CS:GO / CS2' },
  { id: 'roblox', label: 'Roblox' },
];

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  thumbnails,
  onSelectThumbnail,
}) => {
  const [activeCategory, setActiveCategory] = useState<ThumbnailCategory>('todos');

  const filtered = filterThumbnails(thumbnails, activeCategory);

  return (
    <section id="projects" className="relative py-16 md:py-24 px-4 md:px-8 border-t border-neutral-800/80 bg-black overflow-hidden">
      {/* Background neon blue lighting */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] glow-spot-neon-blue pointer-events-none -z-10 blur-3xl opacity-35" />

      <div className="max-w-7xl mx-auto w-full">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 border-b border-neutral-800/80 pb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 block mb-1">
              Work Gallery · Real Cases
            </span>
            <h2 className="font-['Big_Shoulders_Display'] text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white">
              RECAP PROJECT <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 drop-shadow-[0_0_25px_rgba(0,240,255,0.6)]">2026</span>
            </h2>
          </div>
        </div>

        {/* Category Filter Tabs (Electric Neon Blue & Carbon Segmented Buttons) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 no-scrollbar">
          {CATEGORY_TABS.map((tab) => {
            const isActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all whitespace-nowrap shrink-0 border cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-400 to-blue-500 border-cyan-400 text-black font-black shadow-[0_0_20px_rgba(0,240,255,0.45)]'
                    : 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:text-cyan-300 hover:border-cyan-500/40'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Projects Grid: ONLY PHOTOS, NO TITLE, NO DESCRIPTION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {filtered.map((thumb) => (
            <div
              key={thumb.id}
              onClick={() => onSelectThumbnail(thumb)}
              className="group relative rounded-2xl bg-neutral-950 border border-neutral-800 hover:border-cyan-400 overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,240,255,0.35)] cursor-pointer"
              title="Click to view details"
            >
              {/* Thumbnail 16:9 Container - Strictly the photo */}
              <div className="relative aspect-video w-full overflow-hidden bg-black">
                <img
                  src={thumb.imageUrl}
                  alt={thumb.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const parent = e.currentTarget.parentElement;
                    if (parent) {
                      const fallback = parent.querySelector('.thumb-fallback') as HTMLElement;
                      if (fallback) fallback.style.display = 'flex';
                    }
                  }}
                />

                {/* Resilient fallback if image fails */}
                <div className="thumb-fallback hidden absolute inset-0 bg-neutral-950 flex-col items-center justify-center p-4 text-center">
                  <Layers className="w-8 h-8 text-cyan-400 mb-2" />
                  <span className="text-xs text-neutral-400">{thumb.categoryLabel}</span>
                </div>

                {/* Subtle electric blue glow overlay on hover */}
                <div className="absolute inset-0 bg-cyan-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom banner for creators with Neon Blue Accent */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-neutral-950 border border-neutral-800 hover:border-cyan-500/40 flex flex-col md:flex-row items-center justify-between gap-6 transition-all hover:shadow-[0_0_25px_rgba(0,240,255,0.15)]">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="font-['Big_Shoulders_Display'] text-2xl sm:text-3xl font-extrabold uppercase text-white">
              Need a custom high-CTR thumbnail for your next video?
            </h4>
            <p className="text-xs text-neutral-400">
              Fast turnaround in 24h to 48h with up to two complete revision rounds included.
            </p>
          </div>
          <button
            onClick={() => {
              const el = document.getElementById('contact');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-black font-black text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(0,240,255,0.45)] transition-all shrink-0 cursor-pointer"
          >
            Get a Quote Now
          </button>
        </div>

      </div>
    </section>
  );
};
