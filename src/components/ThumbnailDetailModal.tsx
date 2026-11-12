import React, { useState, useEffect } from 'react';
import { ThumbnailProject } from '../types/portfolio';
import { X, ZoomIn, ZoomOut, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

interface ThumbnailDetailModalProps {
  thumbnail: ThumbnailProject | null;
  thumbnails?: ThumbnailProject[];
  onClose: () => void;
  onOpenFeedSimulator?: (thumb: ThumbnailProject) => void;
  onSelectThumbnail?: (thumb: ThumbnailProject) => void;
}

export const ThumbnailDetailModal: React.FC<ThumbnailDetailModalProps> = ({
  thumbnail,
  thumbnails = [],
  onClose,
  onSelectThumbnail,
}) => {
  const [isZoomed, setIsZoomed] = useState(false);

  // Reset zoom whenever thumbnail changes
  useEffect(() => {
    setIsZoomed(false);
  }, [thumbnail]);

  // Keyboard navigation: Escape to close, Left/Right arrow keys to switch
  useEffect(() => {
    if (!thumbnail) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight' && thumbnails.length > 0 && onSelectThumbnail) {
        const currentIndex = thumbnails.findIndex((t) => t.id === thumbnail.id);
        const nextIndex = (currentIndex + 1) % thumbnails.length;
        onSelectThumbnail(thumbnails[nextIndex]);
      } else if (e.key === 'ArrowLeft' && thumbnails.length > 0 && onSelectThumbnail) {
        const currentIndex = thumbnails.findIndex((t) => t.id === thumbnail.id);
        const prevIndex = (currentIndex - 1 + thumbnails.length) % thumbnails.length;
        onSelectThumbnail(thumbnails[prevIndex]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [thumbnail, thumbnails, onClose, onSelectThumbnail]);

  if (!thumbnail) return null;

  const currentIndex = thumbnails.findIndex((t) => t.id === thumbnail.id);
  const totalCount = thumbnails.length || 6;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (thumbnails.length > 0 && onSelectThumbnail) {
      const prevIndex = (currentIndex - 1 + thumbnails.length) % thumbnails.length;
      onSelectThumbnail(thumbnails[prevIndex]);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (thumbnails.length > 0 && onSelectThumbnail) {
      const nextIndex = (currentIndex + 1) % thumbnails.length;
      onSelectThumbnail(thumbnails[nextIndex]);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Fullscreen preview: ${thumbnail.title}`}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md transition-opacity duration-300 p-2 sm:p-6 overflow-hidden select-none"
    >
      {/* Top Floating Bar */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute top-4 inset-x-4 sm:inset-x-8 flex items-center justify-between z-20 pointer-events-auto"
      >
        {/* Thumbnail Info Tag */}
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900/90 border border-neutral-800 backdrop-blur-md shadow-lg">
          <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_#2563eb]" />
          <span className="text-xs font-bold uppercase tracking-wider text-white">
            {thumbnail.categoryLabel}
          </span>
          {currentIndex >= 0 && (
            <span className="text-[11px] font-mono text-neutral-400 border-l border-neutral-700 pl-2">
              {currentIndex + 1} / {totalCount}
            </span>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Zoom Toggle Button */}
          <button
            onClick={() => setIsZoomed((prev) => !prev)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-900/90 hover:bg-neutral-800 border border-neutral-800 hover:border-blue-500 text-neutral-200 hover:text-white text-xs font-medium transition-all shadow-lg cursor-pointer"
            title={isZoomed ? 'Zoom out' : 'Zoom in (fullscreen)'}
          >
            {isZoomed ? (
              <>
                <ZoomOut className="w-4 h-4 text-blue-400" />
                <span className="hidden sm:inline">100%</span>
              </>
            ) : (
              <>
                <ZoomIn className="w-4 h-4 text-blue-400" />
                <span className="hidden sm:inline">Zoom</span>
              </>
            )}
          </button>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-neutral-900/90 hover:bg-neutral-800 border border-neutral-800 hover:border-blue-500 text-neutral-300 hover:text-white transition-all shadow-lg cursor-pointer group"
            aria-label="Close fullscreen view"
          >
            <X className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </div>

      {/* Previous Arrow Button */}
      {thumbnails.length > 1 && (
        <button
          onClick={handlePrev}
          aria-label="Previous thumbnail"
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800 hover:border-blue-500 text-neutral-300 hover:text-white transition-all shadow-xl hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] cursor-pointer group"
        >
          <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
        </button>
      )}

      {/* Next Arrow Button */}
      {thumbnails.length > 1 && (
        <button
          onClick={handleNext}
          aria-label="Next thumbnail"
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800 hover:border-blue-500 text-neutral-300 hover:text-white transition-all shadow-xl hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] cursor-pointer group"
        >
          <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
        </button>
      )}

      {/* Image Container with Zoom Interaction */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative max-w-full max-h-full flex items-center justify-center transition-transform duration-300 ${
          isZoomed ? 'scale-125 sm:scale-150 cursor-zoom-out' : 'scale-100 cursor-zoom-in'
        }`}
      >
        <img
          src={thumbnail.imageUrl}
          alt={thumbnail.title}
          referrerPolicy="no-referrer"
          onClick={() => setIsZoomed((prev) => !prev)}
          className="max-h-[86vh] max-w-[94vw] w-auto h-auto object-contain rounded-xl sm:rounded-2xl shadow-2xl border border-neutral-800/90 shadow-blue-950/30 transition-all duration-300"
        />

        {/* Floating original resolution label */}
        <div className="absolute bottom-3 right-3 pointer-events-none opacity-80 hover:opacity-100 transition-opacity">
          <span className="px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md text-[10px] sm:text-xs font-mono text-neutral-300 border border-neutral-800 shadow">
            Original Format · 2752x1536
          </span>
        </div>
      </div>

      {/* Bottom Hint */}
      <div className="absolute bottom-4 inset-x-0 text-center pointer-events-none">
        <span className="text-[11px] text-neutral-400 bg-neutral-950/80 px-3 py-1 rounded-full border border-neutral-800/80 backdrop-blur-sm">
          Click image to {isZoomed ? 'zoom out' : 'zoom in'} · Use arrows or swipe to navigate · ESC to close
        </span>
      </div>
    </div>
  );
};
