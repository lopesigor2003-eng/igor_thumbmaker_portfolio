import React from 'react';
import { MessageSquare, Sparkles } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenFeedSimulator: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  onOpenFeedSimulator,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-black/85 border-b border-neutral-800/80 px-4 md:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 md:gap-8">
        
        {/* Zone 1: Monogram brand mark */}
        <button
          onClick={() => onNavigate('hero')}
          className="flex items-center gap-2.5 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg p-1 cursor-pointer"
          aria-label="Igor Thumbnail Maker - Home"
        >
          {/* Deep royal neon blue monogram logo */}
          <div className="w-9 h-9 rounded-lg bg-neutral-900 border border-blue-500/50 flex items-center justify-center shadow-lg group-hover:border-blue-400 group-hover:shadow-[0_0_15px_rgba(37,99,235,0.5)] transition-all">
            <span className="font-['Big_Shoulders_Display'] text-xl font-black tracking-tight text-blue-400">
              IT
            </span>
          </div>
          <div className="hidden sm:block">
            <span className="font-['Big_Shoulders_Display'] text-lg font-bold tracking-wider uppercase text-white group-hover:text-blue-400 transition-colors block leading-tight">
              Igor
            </span>
            <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-medium block">
              Thumbnail Maker
            </span>
          </div>
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="flex items-center gap-1 md:gap-1.5 p-1 bg-neutral-900/90 border border-neutral-800 rounded-full text-xs font-medium text-neutral-300 shadow-inner">
          <button
            onClick={() => onNavigate('hero')}
            className={`px-3.5 py-1.5 rounded-full transition-all whitespace-nowrap shrink-0 cursor-pointer ${
              activeSection === 'hero'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-extrabold shadow-[0_0_15px_rgba(37,99,235,0.5)]'
                : 'hover:text-white hover:bg-neutral-800'
            }`}
          >
            Home
          </button>
          
          <button
            onClick={() => onNavigate('about')}
            className={`px-3.5 py-1.5 rounded-full transition-all whitespace-nowrap shrink-0 cursor-pointer ${
              activeSection === 'about'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-extrabold shadow-[0_0_15px_rgba(37,99,235,0.5)]'
                : 'hover:text-white hover:bg-neutral-800'
            }`}
          >
            About Me
          </button>
          
          <button
            onClick={() => onNavigate('projects')}
            className={`px-3.5 py-1.5 rounded-full transition-all whitespace-nowrap shrink-0 cursor-pointer ${
              activeSection === 'projects'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-extrabold shadow-[0_0_15px_rgba(37,99,235,0.5)]'
                : 'hover:text-white hover:bg-neutral-800'
            }`}
          >
            Projects
          </button>

          <button
            onClick={onOpenFeedSimulator}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-neutral-300 hover:text-blue-300 hover:bg-neutral-800 transition-all whitespace-nowrap shrink-0 border border-neutral-700 hover:border-blue-500/50 cursor-pointer"
            title="Preview in YouTube Feed Simulator"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Feed Simulator</span>
          </button>

          <button
            onClick={() => onNavigate('contact')}
            className={`px-3.5 py-1.5 rounded-full transition-all whitespace-nowrap shrink-0 cursor-pointer ${
              activeSection === 'contact'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-extrabold shadow-[0_0_15px_rgba(37,99,235,0.5)]'
                : 'hover:text-white hover:bg-neutral-800'
            }`}
          >
            Contact
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action (Deep royal neon blue glow button) */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => onNavigate('contact')}
            className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-black uppercase tracking-wider text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-lg shadow-[0_0_20px_rgba(37,99,235,0.5)] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5 text-white" />
            <span>Get a Quote</span>
          </button>
        </div>

      </div>
    </header>
  );
};
