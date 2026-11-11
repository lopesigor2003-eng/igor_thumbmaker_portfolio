import React from 'react';
import { Play, Sparkles, ArrowRight, Upload, Layers } from 'lucide-react';
import { UserProfileData } from '../types/portfolio';
import { HIGHLIGHT_STATS } from '../data/portfolioData';

interface HeroSectionProps {
  profile: UserProfileData;
  onNavigate: (sectionId: string) => void;
  onOpenFeedSimulator?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  profile,
  onNavigate,
}) => {
  return (
    <section id="hero" className="relative min-h-[92vh] flex flex-col justify-between py-8 md:py-16 px-4 md:px-8 overflow-hidden bg-black">
      {/* Electric neon blue ambient lighting */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] glow-spot-neon-blue pointer-events-none -z-10 blur-3xl opacity-75" />
      <div className="absolute top-1/3 left-10 w-[450px] h-[450px] glow-spot-neon-blue pointer-events-none -z-10 blur-3xl opacity-50" />

      {/* Main Hero Container */}
      <div className="max-w-7xl mx-auto w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Creator Avatar with Electric Neon Blue Arched Frame */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start">
            <div className="relative group">
              
              {/* Neon Arched Background Shape in Carbon Black & Electric Neon Blue Border */}
              <div className="w-[280px] sm:w-[340px] md:w-[380px] h-[360px] sm:h-[420px] md:h-[460px] rounded-t-full rounded-b-3xl bg-gradient-to-b from-neutral-900 via-neutral-950 to-black border border-cyan-500/40 group-hover:border-cyan-400 p-3 sm:p-4 shadow-2xl group-hover:shadow-[0_0_45px_rgba(0,240,255,0.35)] flex flex-col items-center justify-end overflow-hidden relative transition-all duration-500">
                
                {/* Monogram inside frame */}
                <div className="absolute top-6 left-6 z-20 flex items-center gap-1.5 opacity-90">
                  <div className="w-6 h-6 rounded bg-neutral-900 border border-cyan-500/50 flex items-center justify-center shadow-[0_0_10px_rgba(0,240,255,0.3)]">
                    <span className="font-['Big_Shoulders_Display'] text-xs font-bold text-cyan-400">IT</span>
                  </div>
                  <span className="text-[10px] uppercase tracking-widest text-cyan-300 font-semibold">Creator</span>
                </div>

                {/* Ambient neon blue glow behind avatar head */}
                <div className="absolute top-14 w-52 h-52 bg-cyan-500/20 rounded-full blur-2xl pointer-events-none" />

                {/* Avatar Image */}
                <img
                  src={profile.avatarUrl}
                  alt={profile.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-[90%] object-cover object-[center_12%] rounded-t-full rounded-b-2xl relative z-10 transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const parent = e.currentTarget.parentElement;
                    if (parent) {
                      const fb = document.getElementById('avatar-fallback');
                      if (fb) fb.style.display = 'flex';
                    }
                  }}
                />

                {/* Fallback container if image not found */}
                <div id="avatar-fallback" className="hidden w-full h-[85%] bg-neutral-900 rounded-t-full flex-col items-center justify-center text-center p-4 z-10 border border-cyan-500/40">
                  <span className="font-['Big_Shoulders_Display'] text-4xl font-extrabold text-white">IGOR</span>
                  <span className="text-xs text-cyan-400 mt-1">Thumbnail Maker</span>
                </div>

                {/* Scrim at bottom */}
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black via-black/80 to-transparent z-20" />

                {/* Overlay Name Badge */}
                <div className="absolute bottom-4 inset-x-4 z-30 text-center">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/90 border border-cyan-500/40 text-xs font-medium text-neutral-200 backdrop-blur-md shadow-lg shadow-cyan-950/50">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#00f0ff] animate-pulse" />
                    <span>Available for Projects</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Hero Typography & Navigation Actions */}
          <div className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left space-y-6">
            
            {/* Giant Title in Neon White & Electric Neon Blue */}
            <div className="space-y-1">
              <h1 className="font-['Big_Shoulders_Display'] text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white leading-none">
                THUMBNAILS THAT <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 drop-shadow-[0_0_35px_rgba(0,240,255,0.65)]">STOP THE SCROLL</span>
              </h1>
              <p className="font-['Big_Shoulders_Display'] text-2xl sm:text-3xl md:text-4xl uppercase tracking-wider text-neutral-300 font-bold">
                IGOR · <span className="text-cyan-400 drop-shadow-[0_0_12px_rgba(0,240,255,0.4)]">THUMBNAIL DESIGNER</span>
              </p>
            </div>

            {/* Subtitle / Value proposition */}
            <p className="text-base sm:text-lg text-neutral-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              I transform YouTube impressions into real clicks. Dynamic, high-contrast psychological thumbnails engineered to stop viewers from scrolling past your video.
            </p>

            {/* Interactive Menu List: Clean primary actions */}
            <div className="pt-2 flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-3">
              <button
                onClick={() => onNavigate('projects')}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-black font-black text-sm uppercase tracking-wider shadow-[0_0_30px_rgba(0,240,255,0.5)] transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <Play className="w-4 h-4 fill-black" />
                <span>START · View Projects</span>
              </button>

              <button
                onClick={() => onNavigate('about')}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-700 hover:border-cyan-400/60 text-neutral-200 hover:text-white font-semibold text-sm uppercase tracking-wider transition-all cursor-pointer shadow-md hover:shadow-[0_0_15px_rgba(0,240,255,0.2)]"
              >
                <Layers className="w-4 h-4 text-cyan-400" />
                <span>About Me</span>
              </button>
            </div>

            {/* Quick trust highlights */}
            <div className="pt-4 flex items-center justify-center lg:justify-start gap-6 text-xs text-neutral-300 border-t border-neutral-800/80">
              <span className="flex items-center gap-1.5">
                <span className="text-cyan-400 font-bold drop-shadow-[0_0_8px_rgba(0,240,255,0.8)]">✓</span> Total Retention Focus
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-cyan-400 font-bold drop-shadow-[0_0_8px_rgba(0,240,255,0.8)]">✓</span> Mobile-First Optimization
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-cyan-400 font-bold drop-shadow-[0_0_8px_rgba(0,240,255,0.8)]">✓</span> Proven A/B Testing
              </span>
            </div>

          </div>
        </div>
      </div>

      {/* KPI Stats Strip below the hero split */}
      <div className="max-w-7xl mx-auto w-full mt-12 pt-8 border-t border-neutral-800/60">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {HIGHLIGHT_STATS.map((stat, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-neutral-900/50 border border-neutral-800 hover:border-cyan-500/50 backdrop-blur-sm transition-all hover:shadow-[0_0_25px_rgba(0,240,255,0.18)] group"
            >
              <div className="font-['Big_Shoulders_Display'] text-3xl sm:text-4xl font-black text-white group-hover:text-cyan-300 tracking-tight transition-colors drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                {stat.value}
              </div>
              <div className="text-xs font-semibold uppercase tracking-wider text-cyan-400 mt-1">
                {stat.label}
              </div>
              <div className="text-[11px] text-neutral-400 mt-0.5 leading-tight">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};
