import React, { useState, useEffect, useCallback } from 'react';
import { ThumbnailProject } from '../types/portfolio';
import { X, ZoomIn, ZoomOut, ChevronLeft, ChevronRight } from 'lucide-react';

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

  // Reset zoom whenever selected thumbnail changes
  useEffect(() => {
    setIsZoomed(false);
  }, [thumbnail?.id]);

  const currentIndex = thumbnail ? thumbnails.findIndex((t) => t.id === thumbnail.id) : -1;
  const totalCount = thumbnails.length;

  const handlePrev = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (!thumbnail || thumbnails.length <= 1 || !onSelectThumbnail) return;
      const prevIndex = (currentIndex - 1 + thumbnails.length) % thumbnails.length;
      onSelectThumbnail(thumbnails[prevIndex]);
    },
    [thumbnail, thumbnails, currentIndex, onSelectThumbnail]
  );

  const handleNext = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (!thumbnail || thumbnails.length <= 1 || !onSelectThumbnail) return;
      const nextIndex = (currentIndex + 1) % thumbnails.length;
      onSelectThumbnail(thumbnails[nextIndex]);
    },
    [thumbnail, thumbnails, currentIndex, onSelectThumbnail]
  );

  // Keyboard navigation: Escape to close, Left/Right arrows to switch thumbnails
  useEffect(() => {
    if (!thumbnail) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [thumbnail, onClose, handleNext, handlePrev]);

  if (!thumbnail) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Fullscreen preview: ${thumbnail.title}`}
      onClick={onClose}
      className={`fixed inset-0 z-50 bg-black/95 backdrop-blur-md transition-opacity duration-200 select-none ${
        isZoomed ? 'overflow-auto' : 'overflow-hidden flex items-center justify-center'
      }`}
    >
      {/* Top Floating Bar */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="fixed top-4 inset-x-4 sm:inset-x-8 flex flex-wrap items-center justify-between gap-3 z-30 pointer-events-auto"
      >
        {/* Clean Category & Index Metadata */}
        <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-neutral-900/90 border border-neutral-800 backdrop-blur-md shadow-lg text-xs">
          <span className="font-bold uppercase tracking-wider text-white whitespace-nowrap">
            {thumbnail.categoryLabel}
          </span>
          {currentIndex >= 0 && totalCount > 0 && (
            <>
              <span className="text-neutral-600" aria-hidden="true">·</span>
              <span className="font-mono tabular-nums text-neutral-400 whitespace-nowrap">
                {currentIndex + 1} / {totalCount}
              </span>
            </>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Individual Zoom Toggle Button */}
          <button
            type="button"
            onClick={() => setIsZoomed((prev) => !prev)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-neutral-900/90 hover:bg-neutral-800 border border-neutral-800 hover:border-blue-500 text-neutral-200 hover:text-white text-xs font-medium transition-all shadow-lg cursor-pointer whitespace-nowrap"
            title={isZoomed ? 'Zoom out' : 'Zoom in'}
          >
            {isZoomed ? (
              <>
                <ZoomOut className="w-4 h-4 text-blue-400" />
                <span className="hidden sm:inline">Reset Zoom</span>
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
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-neutral-900/90 hover:bg-neutral-800 border border-neutral-800 hover:border-blue-500 text-neutral-300 hover:text-white transition-all shadow-lg cursor-pointer group"
            aria-label="Close fullscreen view"
          >
            <X className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </div>

      {/* Previous Arrow Button */}
      {thumbnails.length > 1 && (
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous thumbnail"
          className="fixed left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-neutral-900/85 hover:bg-neutral-800 border border-neutral-800 hover:border-blue-500 text-neutral-300 hover:text-white transition-all shadow-xl hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] cursor-pointer group"
        >
          <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
        </button>
      )}

      {/* Next Arrow Button */}
      {thumbnails.length > 1 && (
        <button
          type="button"
          onClick={handleNext}
          aria-label="Next thumbnail"
          className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-neutral-900/85 hover:bg-neutral-800 border border-neutral-800 hover:border-blue-500 text-neutral-300 hover:text-white transition-all shadow-xl hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] cursor-pointer group"
        >
          <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
        </button>
      )}

      {/* Main 16:9 Image Viewport with Click-to-Zoom */}
      <div
        className={`w-full flex justify-center ${
          isZoomed ? 'items-start py-20 px-4 sm:px-12 min-h-full' : 'items-center p-4 sm:p-8'
        }`}
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
            setIsZoomed((prev) => !prev);
          }}
          className={`relative flex items-center justify-center transition-all duration-200 ${
            isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'
          }`}
        >
          <img
            src={thumbnail.imageUrl}
            alt={thumbnail.title}
            referrerPolicy="no-referrer"
            className={`w-auto h-auto object-contain rounded-xl sm:rounded-2xl shadow-2xl border border-neutral-800/90 shadow-blue-950/30 transition-all duration-200 ${
              isZoomed
                ? 'max-w-[96vw] sm:max-w-[92vw] lg:max-w-[1600px]'
                : 'max-h-[82vh] max-w-[90vw]'
            }`}
          />

          {/* Subtle format label */}
          {!isZoomed && (
            <div className="absolute bottom-3 right-3 pointer-events-none opacity-85">
              <span className="px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md text-[10px] sm:text-xs font-mono text-neutral-300 border border-neutral-800 shadow">
                16:9 · High Resolution
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Hint */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="fixed bottom-4 inset-x-0 flex flex-col items-center gap-2 z-30 pointer-events-none"
      >
        <span className="text-[11px] text-neutral-400 bg-neutral-950/85 px-3 py-1 rounded-full border border-neutral-800/80 backdrop-blur-sm">
          Click image to {isZoomed ? 'zoom out' : 'zoom in'}{thumbnails.length > 1 ? ' · Use arrows to switch' : ''} · ESC to close
        </span>
      </div>
    </div>
  );
};
