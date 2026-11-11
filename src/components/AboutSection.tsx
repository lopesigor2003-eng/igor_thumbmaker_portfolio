import React from 'react';
import { UserProfileData } from '../types/portfolio';
import { CheckCircle2, Gamepad2, Flame, Sparkles } from 'lucide-react';

interface AboutSectionProps {
  profile: UserProfileData;
  onNavigate: (sectionId: string) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ profile }) => {
  return (
    <section id="about" className="relative py-16 md:py-24 px-4 md:px-8 border-t border-neutral-800/80 bg-black overflow-hidden">
      {/* Background neon blue glow */}
      <div className="absolute top-1/2 left-1/4 w-[450px] h-[450px] glow-spot-neon-blue pointer-events-none -z-10 blur-3xl opacity-40" />

      <div className="max-w-7xl mx-auto w-full">
        
        {/* Section Header */}
        <div className="text-center md:text-left mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-neutral-800/80 pb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-blue-400 block mb-1">
              Professional Profile · Gaming Niche Specialist
            </span>
            <h2 className="font-['Big_Shoulders_Display'] text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white">
              ABOUT <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-600 drop-shadow-[0_0_25px_rgba(37,99,235,0.65)]">ME</span>
            </h2>
          </div>
          <div className="text-sm text-neutral-400 max-w-md">
            Specialized in creating high-impact thumbnails that dominate the feeds of YouTube’s biggest games: GTA, CS, and Roblox.
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Creator Cutout & Personal Badge */}
          <div className="lg:col-span-5 flex flex-col items-center">
            
            <div className="relative w-full max-w-[340px] sm:max-w-[380px] rounded-2xl bg-neutral-950 border border-neutral-800 hover:border-blue-500/60 p-5 shadow-2xl overflow-hidden group transition-all duration-300 hover:shadow-[0_0_35px_rgba(37,99,235,0.25)]">
              
              {/* Backglow behind silhouette */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-48 h-48 bg-blue-600/25 rounded-full blur-3xl pointer-events-none" />
              
              <div className="text-center mb-4">
                <span className="text-xs uppercase tracking-widest text-neutral-400 font-semibold block">
                  HELLO, I AM
                </span>
                <span className="font-['Big_Shoulders_Display'] text-3xl font-extrabold text-white tracking-wide block">
                  IGOR <span className="text-blue-400">THUMBNAIL MAKER</span>
                </span>
              </div>

              {/* Creator Image with moody lighting */}
              <div className="relative h-[320px] rounded-xl overflow-hidden bg-black border border-neutral-800/80">
                <img
                  src={profile.avatarUrl}
                  alt={profile.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-[center_12%] transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Overlay scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-85" />
                
                <div className="absolute bottom-3 inset-x-3 text-center">
                  <span className="text-[11px] font-mono text-blue-300 bg-neutral-900/90 px-2.5 py-1 rounded-md border border-blue-500/50 backdrop-blur-sm shadow-[0_0_10px_rgba(37,99,235,0.3)]">
                    2+ Years Focused on Gaming Niche
                  </span>
                </div>
              </div>

              {/* Bio summary */}
              <p className="mt-4 text-xs text-neutral-300 text-center leading-relaxed">
                Specialist in capturing clicks within fractions of a second. Turning regular gameplay videos into view magnets.
              </p>

            </div>

            {/* Quick Principles Badges */}
            <div className="w-full max-w-[340px] sm:max-w-[380px] grid grid-cols-2 gap-2 mt-4">
              <div className="p-3 rounded-xl bg-neutral-900/60 border border-neutral-800 text-center hover:border-blue-500/40 transition-colors">
                <span className="font-['Big_Shoulders_Display'] text-2xl font-bold text-blue-400 block drop-shadow-[0_0_12px_rgba(37,99,235,0.6)]">0.8s</span>
                <span className="text-[11px] text-neutral-400 font-medium">Decision time in feed</span>
              </div>
              <div className="p-3 rounded-xl bg-neutral-900/60 border border-neutral-800 text-center hover:border-blue-500/40 transition-colors">
                <span className="font-['Big_Shoulders_Display'] text-2xl font-bold text-blue-400 block drop-shadow-[0_0_12px_rgba(37,99,235,0.6)]">85%</span>
                <span className="text-[11px] text-neutral-400 font-medium">Mobile viewers</span>
              </div>
            </div>

          </div>

          {/* Right Column: Bio & Gaming Specialization */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* About Me Text Card (Clean without bullet clutter) */}
            <div className="p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800 hover:border-neutral-700 transition-colors">
              <h3 className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-2">
                ABOUT ME
              </h3>
              <p className="text-base text-neutral-200 leading-relaxed font-normal">
                {profile.bio}
              </p>
            </div>

            {/* Gaming Focus Card */}
            <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 hover:border-blue-500/50 transition-all hover:shadow-[0_0_25px_rgba(37,99,235,0.2)]">
              <div className="flex items-center gap-2 mb-3">
                <Gamepad2 className="w-5 h-5 text-blue-400" />
                <h3 className="font-['Big_Shoulders_Display'] text-2xl font-extrabold uppercase tracking-wide text-white">
                  SPECIALIST IN YOUTUBE'S BIGGEST GAMES
                </h3>
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Gameplay thumbnails require strict visual rules: speed, imminent danger, colors that pop against YouTube’s dark background, and bold typography readable even on mobile screens. My job is to ensure your video is the viewer's first choice.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-neutral-800/80 text-center">
                <div className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-blue-500/60 transition-all group">
                  <span className="font-bold text-xs text-white group-hover:text-blue-300 block">GTA 5</span>
                  <span className="text-[10px] text-neutral-400">Chases & Roleplay</span>
                </div>
                <div className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-blue-500/60 transition-all group">
                  <span className="font-bold text-xs text-white group-hover:text-blue-300 block">GTA 6</span>
                  <span className="text-[10px] text-neutral-400">Vice City & Hype</span>
                </div>
                <div className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-blue-500/60 transition-all group">
                  <span className="font-bold text-xs text-white group-hover:text-blue-300 block">CS:GO / CS2</span>
                  <span className="text-[10px] text-neutral-400">Clutches & Esports</span>
                </div>
                <div className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-blue-500/60 transition-all group">
                  <span className="font-bold text-xs text-white group-hover:text-blue-300 block">ROBLOX</span>
                  <span className="text-[10px] text-neutral-400">Obby & Challenges</span>
                </div>
              </div>
            </div>

            {/* Experience & Education columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className="p-4 rounded-xl bg-neutral-900/50 border border-neutral-800 hover:border-blue-500/40 transition-colors">
                <h4 className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-2">
                  HANDS-ON EXPERIENCE
                </h4>
                <div className="space-y-2 text-xs text-neutral-300">
                  <p className="font-semibold text-white">2+ Years Dedicated to Gaming</p>
                  <p className="text-neutral-400 leading-relaxed">
                    Continuously helping YouTube creators break record view counts with psychology-driven thumbnails.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-neutral-900/50 border border-neutral-800 hover:border-blue-500/40 transition-colors">
                <h4 className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-2">
                  HIGH-CTR METHODOLOGY
                </h4>
                <div className="space-y-2 text-xs text-neutral-300">
                  <p className="font-semibold text-white">Retention-First Design</p>
                  <p className="text-neutral-400 leading-relaxed">
                    Every light beam, smoke particle, and facial expression has one purpose: hook the player’s eye before they scroll.
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
