import React, { useState } from 'react';
import { ThumbnailProject, ThumbnailCategory } from '../types/portfolio';
import { filterThumbnails } from '../utils/portfolioCalculators';
import { Layers, Image as ImageIcon } from 'lucide-react';

interface ProjectsSectionProps {
  thumbnails: ThumbnailProject[];
  onSelectThumbnail: (thumb: ThumbnailProject) => void;
  onSimulateThumbnail: (thumb: ThumbnailProject) => void;
}

interface ThumbnailCardProps {
  thumb: ThumbnailProject;
  onSelect: (thumb: ThumbnailProject) => void;
}

const ThumbnailCard: React.FC<ThumbnailCardProps> = ({ thumb, onSelect }) => {
  return (
    <button
      type="button"
      onClick={() => onSelect(thumb)}
      aria-label={`Open ${thumb.title} thumbnail in fullscreen`}
      className="group relative block w-full text-left rounded-2xl bg-neutral-950 border border-neutral-800 hover:border-blue-500 overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(37,99,235,0.4)] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 cursor-pointer"
      title="Click to open in fullscreen zoom"
    >
      {/* Clean 16:9 Standalone Thumbnail Container */}
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
          <Layers className="w-8 h-8 text-blue-400 mb-2" />
          <span className="text-xs text-neutral-400">{thumb.categoryLabel}</span>
        </div>

        {/* Subtle deep blue glow overlay on hover */}
        <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10" />
      </div>
    </button>
  );
};

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  thumbnails,
  onSelectThumbnail,
}) => {
  const [activeCategory, setActiveCategory] = useState<ThumbnailCategory>('todos');

  const categoryTabs: { id: ThumbnailCategory; label: string }[] = [
    { id: 'todos', label: `All Projects (${thumbnails.length})` },
    { id: 'gta6', label: 'GTA 6' },
    { id: 'travel-vlogs', label: 'Travel Vlogs' },
  ];

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
              Portfolio Catalog · GTA 6 & Travel Vlogs
            </span>
            <h2 className="font-['Big_Shoulders_Display'] text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white">
              FEATURED <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-600 drop-shadow-[0_0_25px_rgba(37,99,235,0.65)]">THUMBNAILS</span>
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 mt-2 max-w-2xl">
              Explore my focused YouTube thumbnail catalog crafted specifically for GTA 6 and Travel Vlogs. Click any thumbnail to inspect it in fullscreen zoom.
            </p>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 no-scrollbar">
          {categoryTabs.map((tab) => {
            const isActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
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

        {/* Projects Grid: Clean Standalone Thumbnails */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {filtered.map((thumb) => (
              <ThumbnailCard
                key={thumb.id}
                thumb={thumb}
                onSelect={onSelectThumbnail}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl bg-neutral-950 border border-neutral-800 p-10 sm:p-14 text-center flex flex-col items-center justify-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <ImageIcon className="w-6 h-6" />
            </div>
            <h3 className="font-['Big_Shoulders_Display'] text-2xl sm:text-3xl font-extrabold uppercase tracking-wide text-white">
              {activeCategory === 'gta6'
                ? 'New GTA 6 Thumbnails Coming Soon'
                : 'New Thumbnails Coming Soon'}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-md">
              Fresh {activeCategory === 'gta6' ? 'GTA 6' : 'Travel Vlogs'} concepts are being finalized and will appear here shortly.
            </p>
            <button
              type="button"
              onClick={() => setActiveCategory('todos')}
              className="mt-2 px-5 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 hover:border-blue-500/60 text-xs font-semibold text-neutral-200 hover:text-white transition-all cursor-pointer"
            >
              View All Available Thumbnails
            </button>
          </div>
        )}

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
            type="button"
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
