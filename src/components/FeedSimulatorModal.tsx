import React, { useState } from 'react';
import { ThumbnailProject } from '../types/portfolio';
import { X, Smartphone, Monitor, Search, ThumbsUp, Share2, MoreVertical, CheckCircle, Bell } from 'lucide-react';

interface FeedSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  thumbnails: ThumbnailProject[];
  selectedThumbnail: ThumbnailProject | null;
}

type DeviceMode = 'mobile' | 'desktop' | 'search';

export const FeedSimulatorModal: React.FC<FeedSimulatorModalProps> = ({
  isOpen,
  onClose,
  thumbnails,
  selectedThumbnail,
}) => {
  const [device, setDevice] = useState<DeviceMode>('mobile');
  const [currentThumb, setCurrentThumb] = useState<ThumbnailProject>(
    selectedThumbnail || thumbnails[0]
  );
  const [customTitle, setCustomTitle] = useState(currentThumb.title);

  // Update if selected prop changes
  React.useEffect(() => {
    if (selectedThumbnail) {
      setCurrentThumb(selectedThumbnail);
      setCustomTitle(selectedThumbnail.title);
    }
  }, [selectedThumbnail]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="YouTube Feed Simulator"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-sm overflow-y-auto"
    >
      <div className="relative w-full max-w-5xl bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Topbar */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-800 bg-neutral-900/80">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-black font-black text-xs shadow-[0_0_15px_rgba(255,255,255,0.3)]">
              YT
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base text-white">
                YouTube Feed Simulator
              </h3>
              <p className="text-[11px] text-neutral-400">
                See exactly how your thumbnail stands out on the viewer's screen
              </p>
            </div>
          </div>

          {/* Device Switcher */}
          <div className="flex items-center gap-1 p-1 bg-black border border-neutral-800 rounded-lg">
            <button
              onClick={() => setDevice('mobile')}
              className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                device === 'mobile'
                  ? 'bg-white text-black font-bold shadow'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mobile Feed</span>
            </button>
            <button
              onClick={() => setDevice('desktop')}
              className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                device === 'desktop'
                  ? 'bg-white text-black font-bold shadow'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Desktop</span>
            </button>
            <button
              onClick={() => setDevice('search')}
              className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                device === 'search'
                  ? 'bg-white text-black font-bold shadow'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              <span>Search</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
            aria-label="Close simulator"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Thumbnail Selector Ribbon */}
        <div className="px-5 py-2.5 bg-neutral-900/50 border-b border-neutral-800 flex items-center gap-3 overflow-x-auto no-scrollbar">
          <span className="text-[11px] text-neutral-400 uppercase tracking-wider font-semibold shrink-0">
            Testing thumbnail:
          </span>
          {thumbnails.map((t) => (
            <button
              key={t.id}
              onClick={() => {
                setCurrentThumb(t);
                setCustomTitle(t.title);
              }}
              className={`flex items-center gap-2 px-2.5 py-1 rounded-lg text-xs font-medium border shrink-0 transition-all cursor-pointer ${
                currentThumb.id === t.id
                  ? 'bg-neutral-800 border-white text-white shadow-[0_0_12px_rgba(255,255,255,0.2)]'
                  : 'bg-black border-neutral-800 text-neutral-400 hover:text-white'
              }`}
            >
              <img
                src={t.imageUrl}
                alt=""
                className="w-5 h-3.5 object-cover rounded-xs"
              />
              <span className="truncate max-w-[130px]">{t.title}</span>
            </button>
          ))}
        </div>

        {/* Simulator Body */}
        <div className="p-4 sm:p-8 flex-1 overflow-y-auto bg-slate-950 flex justify-center items-start">
          
          {/* MOBILE VIEW (iPhone/Android YouTube App Frame) */}
          {device === 'mobile' && (
            <div className="w-[360px] sm:w-[390px] rounded-3xl bg-[#0f0f0f] border-4 border-slate-800 shadow-2xl overflow-hidden text-white flex flex-col font-sans">
              
              {/* Fake Phone Status Bar */}
              <div className="flex items-center justify-between px-6 pt-3 pb-1 text-[11px] text-slate-300">
                <span className="font-semibold">09:41</span>
                <div className="flex items-center gap-1.5 text-xs">
                  <span>5G</span>
                  <span>100%</span>
                </div>
              </div>

              {/* Fake YouTube Mobile Header */}
              <div className="flex items-center justify-between px-4 py-2 border-b border-neutral-800/80">
                <div className="flex items-center gap-1.5">
                  <div className="w-6 h-4 bg-red-600 rounded-sm flex items-center justify-center">
                    <div className="w-0 h-0 border-t-[3px] border-t-transparent border-l-[6px] border-l-white border-b-[3px] border-b-transparent" />
                  </div>
                  <span className="font-bold tracking-tighter text-sm">YouTube</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300">
                  <Search className="w-4 h-4" />
                  <Bell className="w-4 h-4" />
                  <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-[10px] font-bold">
                    U
                  </div>
                </div>
              </div>

              {/* YouTube Mobile Feed Item (Igor's Thumbnail) */}
              <div className="py-2">
                {/* 16:9 Thumbnail with timestamp overlay */}
                <div className="relative aspect-video w-full bg-neutral-900 overflow-hidden">
                  <img
                    src={currentThumb.imageUrl}
                    alt={currentThumb.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  {/* YouTube duration timestamp badge */}
                  <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/80 text-[11px] font-semibold text-white">
                    14:28
                  </span>
                  {/* High CTR pulse badge */}
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-red-600 text-[10px] font-bold text-white shadow">
                    ESTIMATED CTR: {currentThumb.ctr}
                  </div>
                </div>

                {/* Video Info under thumbnail */}
                <div className="p-3 flex items-start gap-3">
                  {/* Channel Avatar */}
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-500 to-rose-600 flex items-center justify-center text-white font-bold text-xs shrink-0 shadow">
                    {currentThumb.client.charAt(0)}
                  </div>
                  
                  {/* Title & metadata */}
                  <div className="flex-1 pr-1">
                    <h4 className="text-[13px] font-semibold text-white line-clamp-2 leading-snug">
                      {customTitle}
                    </h4>
                    <div className="flex items-center gap-1 text-[11px] text-neutral-400 mt-1">
                      <span>{currentThumb.client.split('(')[0]}</span>
                      <span>•</span>
                      <span>{currentThumb.views}</span>
                      <span>•</span>
                      <span>2 days ago</span>
                    </div>
                  </div>

                  <button className="text-neutral-400 p-1" aria-label="More options">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>

                {/* Simulating a competitor video below */}
                <div className="mt-4 pt-4 border-t border-neutral-900 opacity-60">
                  <div className="relative aspect-video w-full bg-neutral-950 overflow-hidden flex items-center justify-center border-y border-neutral-800">
                    <span className="text-xs text-neutral-500">Competitor video in feed (low contrast)</span>
                    <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/80 text-[11px] text-neutral-400">
                      22:04
                    </span>
                  </div>
                  <div className="p-3 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-neutral-800 shrink-0" />
                    <div className="space-y-1 flex-1">
                      <div className="h-3 w-3/4 bg-neutral-800 rounded" />
                      <div className="h-2.5 w-1/2 bg-neutral-800 rounded" />
                    </div>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* DESKTOP VIEW (YouTube Desktop Homepage Card) */}
          {device === 'desktop' && (
            <div className="w-full max-w-4xl bg-[#0f0f0f] border border-neutral-800 rounded-xl p-5 shadow-2xl text-white">
              
              <div className="text-xs text-neutral-400 mb-4 flex items-center justify-between">
                <span>Simulation: YouTube Desktop Homepage View</span>
                <span className="text-emerald-400 font-mono">Maximum Contrast Domination</span>
              </div>

              {/* 3-column desktop grid preview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                
                {/* Igor's featured thumbnail card */}
                <div className="flex flex-col group cursor-pointer border-2 border-red-500/80 rounded-xl p-1 bg-red-950/10">
                  <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-neutral-900">
                    <img
                      src={currentThumb.imageUrl}
                      alt={currentThumb.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/80 text-[11px] font-semibold text-white">
                      18:45
                    </span>
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-emerald-600 text-[10px] font-bold text-white shadow">
                      YOUR THUMBNAIL ({currentThumb.ctr})
                    </span>
                  </div>

                  <div className="mt-3 flex items-start gap-3 px-1">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-xs shrink-0">
                      IT
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-white line-clamp-2 leading-snug group-hover:text-red-400 transition-colors">
                        {customTitle}
                      </h4>
                      <p className="text-xs text-neutral-400 mt-1 flex items-center gap-1">
                        <span>{currentThumb.client.split('(')[0]}</span>
                        <CheckCircle className="w-3 h-3 text-neutral-400 inline" />
                      </p>
                      <p className="text-xs text-neutral-400">
                        {currentThumb.views} • 1 day ago
                      </p>
                    </div>
                  </div>
                </div>

                {/* Simulated Competitor Card 1 */}
                <div className="flex flex-col opacity-60">
                  <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-neutral-900 flex items-center justify-center border border-neutral-800">
                    <span className="text-xs text-neutral-500 text-center px-4">Generic thumbnail lacking contrast</span>
                    <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/80 text-[11px] text-neutral-400">
                      10:12
                    </span>
                  </div>
                  <div className="mt-3 flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full bg-neutral-800 shrink-0" />
                    <div className="flex-1 space-y-1.5">
                      <div className="h-3.5 bg-neutral-800 rounded w-full" />
                      <div className="h-3.5 bg-neutral-800 rounded w-3/4" />
                      <div className="h-2.5 bg-neutral-800 rounded w-1/2" />
                    </div>
                  </div>
                </div>

                {/* Simulated Competitor Card 2 */}
                <div className="flex flex-col opacity-60">
                  <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-neutral-900 flex items-center justify-center border border-neutral-800">
                    <span className="text-xs text-neutral-500 text-center px-4">Cluttered thumbnail with excessive text</span>
                    <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/80 text-[11px] text-neutral-400">
                      31:02
                    </span>
                  </div>
                  <div className="mt-3 flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full bg-neutral-800 shrink-0" />
                    <div className="flex-1 space-y-1.5">
                      <div className="h-3.5 bg-neutral-800 rounded w-full" />
                      <div className="h-3.5 bg-neutral-800 rounded w-2/3" />
                      <div className="h-2.5 bg-neutral-800 rounded w-1/3" />
                    </div>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* SEARCH VIEW (YouTube Search Results List) */}
          {device === 'search' && (
            <div className="w-full max-w-4xl bg-[#0f0f0f] border border-neutral-800 rounded-xl p-5 shadow-2xl text-white">
              
              <div className="flex items-center gap-2 p-2 bg-neutral-900 border border-neutral-700 rounded-full mb-6 max-w-lg mx-auto text-xs text-neutral-300 px-4">
                <Search className="w-4 h-4 text-neutral-400" />
                <span className="text-white font-medium">{currentThumb.categoryLabel}</span>
              </div>

              {/* Igor's Search Result Row */}
              <div className="flex flex-col sm:flex-row gap-4 p-3 rounded-xl bg-neutral-900/60 border border-red-500/40">
                <div className="relative aspect-video w-full sm:w-[320px] rounded-lg overflow-hidden bg-neutral-950 shrink-0">
                  <img
                    src={currentThumb.imageUrl}
                    alt={currentThumb.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/80 text-[11px] font-semibold text-white">
                    14:28
                  </span>
                </div>

                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <h4 className="text-base font-semibold text-white hover:text-red-400 transition-colors line-clamp-2">
                      {customTitle}
                    </h4>
                    <p className="text-xs text-neutral-400 mt-1">
                      {currentThumb.views} • 3 days ago
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="w-6 h-6 rounded-full bg-cyan-600 flex items-center justify-center text-[10px] font-bold">
                        IT
                      </div>
                      <span className="text-xs text-neutral-300">{currentThumb.client}</span>
                    </div>
                    <p className="text-xs text-neutral-400 mt-2 line-clamp-2">
                      {currentThumb.description}
                    </p>
                  </div>

                  <div className="mt-3 flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500/40 text-[11px] font-bold text-emerald-400">
                      Superior Click-Through Rate (CTR: {currentThumb.ctr})
                    </span>
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 border-t border-slate-800 bg-slate-900/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div>
            Applied tactics: <span className="text-cyan-300 font-medium">{currentThumb.keyTactics.join(' · ')}</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium transition-colors"
          >
            Close Simulator
          </button>
        </div>

      </div>
    </div>
  );
};
