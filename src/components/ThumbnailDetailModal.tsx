import React from 'react';
import { ThumbnailProject } from '../types/portfolio';
import { X, TrendingUp, Sparkles, Check, Layers, Eye, Smartphone } from 'lucide-react';

interface ThumbnailDetailModalProps {
  thumbnail: ThumbnailProject | null;
  onClose: () => void;
  onOpenFeedSimulator: (thumb: ThumbnailProject) => void;
}

export const ThumbnailDetailModal: React.FC<ThumbnailDetailModalProps> = ({
  thumbnail,
  onClose,
  onOpenFeedSimulator,
}) => {
  if (!thumbnail) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Thumbnail details: ${thumbnail.title}`}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md overflow-y-auto"
    >
      <div className="relative w-full max-w-4xl bg-neutral-950 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-900/60">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
              {thumbnail.categoryLabel}
            </span>
            <span className="text-neutral-600">·</span>
            <span className="text-xs text-neutral-400">{thumbnail.client}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
            aria-label="Close details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Main 16:9 Image Preview */}
          <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black border border-neutral-800 shadow-xl group">
            <img
              src={thumbnail.imageUrl}
              alt={thumbnail.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            {/* Float badge */}
            <div className="absolute top-3 left-3 flex items-center gap-2">
              <span className="px-3 py-1 rounded-lg bg-black/85 backdrop-blur-md text-blue-300 text-xs font-bold border border-blue-500/40 flex items-center gap-1 shadow-lg shadow-blue-950/40">
                <TrendingUp className="w-3.5 h-3.5 text-blue-400" />
                CTR: {thumbnail.ctr}
              </span>
            </div>
            <div className="absolute bottom-3 right-3">
              <span className="px-2.5 py-1 rounded-md bg-black/85 text-xs font-mono text-neutral-300 border border-neutral-800">
                Resolution: 1920x1080 (FHD)
              </span>
            </div>
          </div>

          {/* Title & Description */}
          <div>
            <h3 className="font-['Big_Shoulders_Display'] text-2xl sm:text-3xl font-extrabold uppercase text-white tracking-wide">
              {thumbnail.title}
            </h3>
            <p className="mt-2 text-sm text-neutral-300 leading-relaxed">
              {thumbnail.description}
            </p>
          </div>

          {/* Key Tactics */}
          <div className="p-4 rounded-xl bg-neutral-900/50 border border-neutral-800 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-widest text-blue-400">
              Key Visual Strategies Employed:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-200">
              {thumbnail.keyTactics.map((tactic, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span>{tactic}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-neutral-800 bg-neutral-900/80 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={() => {
              onClose();
              onOpenFeedSimulator(thumbnail);
            }}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 hover:border-blue-500 text-neutral-200 hover:text-blue-300 text-xs font-semibold transition-all cursor-pointer"
          >
            <Smartphone className="w-4 h-4 text-blue-400" />
            <span>Preview in Feed Simulator</span>
          </button>

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-[0_0_20px_rgba(37,99,235,0.5)]"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
