import React, { useState, useEffect } from 'react';
import { ThumbnailProject, ThumbnailCategory } from '../types/portfolio';
import { filterThumbnails } from '../utils/portfolioCalculators';
import { Layers } from 'lucide-react';

interface ProjectsSectionProps {
  thumbnails: ThumbnailProject[];
  onSelectThumbnail: (thumb: ThumbnailProject, viewMode?: 'before' | 'after') => void;
  onSimulateThumbnail: (thumb: ThumbnailProject) => void;
  onOpenCustomizer?: () => void;
}

const CATEGORY_TABS: { id: ThumbnailCategory; label: string }[] = [
  { id: 'todos', label: 'All Projects (6)' },
  { id: 'gta5', label: 'GTA 5' },
  { id: 'gta6', label: 'GTA 6' },
  { id: 'roblox', label: 'Roblox' },
  { id: 'terror', label: 'Terror' },
  { id: 'viagem', label: 'Viagem' },
  { id: 'vlogs', label: 'Vlogs' },
];

interface ThumbnailCardProps {
  thumb: ThumbnailProject;
  carouselPhase: 'before' | 'after';
  onManualPhase: (e: React.MouseEvent, phase: 'before' | 'after') => void;
  onSelect: (thumb: ThumbnailProject, viewMode?: 'before' | 'after') => void;
}

const ThumbnailCard: React.FC<ThumbnailCardProps> = ({
  thumb,
  carouselPhase,
  onManualPhase,
  onSelect,
}) => {
  const hasBeforeAfter = Boolean(thumb.beforeImageUrl);
  const isBefore = hasBeforeAfter && carouselPhase === 'before';

  return (
    <div
      onClick={() => onSelect(thumb, hasBeforeAfter ? carouselPhase : 'after')}
      className="group relative rounded-2xl bg-neutral-950 border border-neutral-800 hover:border-blue-500 overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(37,99,235,0.4)] cursor-pointer"
      title="Click to open in fullscreen zoom"
    >
      {/* Thumbnail 16:9 Container */}
      <div className="relative aspect-video w-full overflow-hidden bg-black">
        {hasBeforeAfter && thumb.beforeImageUrl ? (
          <>
            {/* Original ("Before") Slide — Starts active on load */}
            <img
              src={thumb.beforeImageUrl}
              alt={`${thumb.title} - Before`}
              referrerPolicy="no-referrer"
              className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-[1.03] ${
                isBefore ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            />

            {/* Redesign ("After") Slide — Synced 3-second loop */}
            <img
              src={thumb.imageUrl}
              alt={`${thumb.title} - After Redesign`}
              referrerPolicy="no-referrer"
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-[1.03] ${
                !isBefore ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            />

            {/* Subtle Corner BEFORE / AFTER Indicator */}
            <div className="absolute top-3 left-3 z-20 pointer-events-none">
              <span
                className={`inline-block px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest backdrop-blur-md border transition-all duration-500 ${
                  isBefore
                    ? 'bg-black/80 text-neutral-200 border-neutral-700/90'
                    : 'bg-blue-950/90 text-blue-300 border-blue-500/70 shadow-[0_0_15px_rgba(37,99,235,0.5)]'
                }`}
              >
                {isBefore ? 'Before' : 'After'}
              </span>
            </div>

            {/* Synced Slide Dots in Bottom-Right Corner */}
            <div className="absolute bottom-3 right-3 z-20 flex items-center gap-1.5 bg-black/75 border border-neutral-800/90 px-2 py-1 rounded-full backdrop-blur-md">
              <button
                type="button"
                onClick={(e) => onManualPhase(e, 'before')}
                aria-label={`Show ${thumb.title} Before thumbnail`}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  isBefore ? 'w-4 bg-white' : 'w-1.5 bg-neutral-500 hover:bg-neutral-300'
                }`}
              />
              <button
                type="button"
                onClick={(e) => onManualPhase(e, 'after')}
                aria-label={`Show ${thumb.title} After redesign thumbnail`}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  !isBefore
                    ? 'w-4 bg-blue-500 shadow-[0_0_8px_#2563eb]'
                    : 'w-1.5 bg-neutral-500 hover:bg-neutral-300'
                }`}
              />
            </div>
          </>
        ) : (
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
        )}

        {/* Resilient fallback if image fails */}
        <div className="thumb-fallback hidden absolute inset-0 bg-neutral-950 flex-col items-center justify-center p-4 text-center">
          <Layers className="w-8 h-8 text-blue-400 mb-2" />
          <span className="text-xs text-neutral-400">{thumb.categoryLabel}</span>
        </div>

        {/* Subtle deep blue glow overlay on hover */}
        <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10" />
      </div>
    </div>
  );
};

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  thumbnails,
  onSelectThumbnail,
}) => {
  const [activeCategory, setActiveCategory] = useState<ThumbnailCategory>('todos');
  // Unified synchronized 3-second loop across all 6 cards, always starting on 'before'
  const [carouselPhase, setCarouselPhase] = useState<'before' | 'after'>('before');
  const [manualTick, setManualTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselPhase((prev) => (prev === 'before' ? 'after' : 'before'));
    }, 3000);

    return () => clearInterval(interval);
  }, [manualTick]);

  const handleManualPhase = (e: React.MouseEvent, phase: 'before' | 'after') => {
    e.stopPropagation();
    setCarouselPhase(phase);
    setManualTick((t) => t + 1);
  };

  const filtered = filterThumbnails(thumbnails, activeCategory);

  return (
    <section id="projects" className="relative py-16 md:py-24 px-4 md:px-8 border-t border-neutral-800/80 bg-black overflow-hidden">
      {/* Background neon blue lighting */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] glow-spot-neon-blue pointer-events-none -z-10 blur-3xl opacity-35" />

      <div className="max-w-7xl mx-auto w-full">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 border-b border-neutral-800/80 pb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-blue-400 block mb-1">
              Portfolio Catalog · Custom Concepts
            </span>
            <h2 className="font-['Big_Shoulders_Display'] text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white">
              THUMBNAIL <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-600 drop-shadow-[0_0_25px_rgba(37,99,235,0.65)]">REDESIGNS</span>
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 mt-2 max-w-2xl">
              Explore the thumbnail redesigns I created across multiple YouTube niches to demonstrate the visual quality and click appeal I can deliver for your channel. Click any image to zoom in.
            </p>
          </div>
        </div>

        {/* Category Filter Tabs (Deep Royal Neon Blue & Carbon Segmented Buttons) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 no-scrollbar">
          {CATEGORY_TABS.map((tab) => {
            const isActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all whitespace-nowrap shrink-0 border cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 border-blue-500 text-white font-black shadow-[0_0_20px_rgba(37,99,235,0.5)]'
                    : 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:text-blue-300 hover:border-blue-500/50'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Projects Grid: Synchronized 3s Before/After Carousels across all 6 cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {filtered.map((thumb) => (
            <ThumbnailCard
              key={thumb.id}
              thumb={thumb}
              carouselPhase={carouselPhase}
              onManualPhase={handleManualPhase}
              onSelect={onSelectThumbnail}
            />
          ))}
        </div>

        {/* Bottom banner for creators with Deep Royal Neon Blue Accent */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-neutral-950 border border-neutral-800 hover:border-blue-500/50 flex flex-col md:flex-row items-center justify-between gap-6 transition-all hover:shadow-[0_0_25px_rgba(37,99,235,0.2)]">
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
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(37,99,235,0.55)] transition-all shrink-0 cursor-pointer"
          >
            Get a Quote Now
          </button>
        </div>

      </div>
    </section>
  );
};
