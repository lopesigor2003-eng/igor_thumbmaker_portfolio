import React, { useState } from 'react';
import { UserProfileData } from '../types/portfolio';
import {
  Mail,
  Send,
  MessageCircle,
  Copy,
  Check,
  Instagram,
  ExternalLink,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

interface ContactSectionProps {
  profile: UserProfileData;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ profile }) => {
  const [clientName, setClientName] = useState('');
  const [channelLink, setChannelLink] = useState('');
  const [channelNiche, setChannelNiche] = useState('Gaming & Desafios');
  const [projectType, setProjectType] = useState('Thumbnails para Próximos Vídeos');
  const [messageText, setMessageText] = useState('');
  const [copiedDiscord, setCopiedDiscord] = useState(false);

  const handleCopyDiscord = () => {
    navigator.clipboard.writeText(profile.discord);
    setCopiedDiscord(true);
    setTimeout(() => setCopiedDiscord(false), 2500);
  };

  const handleSendInquiry = (e: React.FormEvent) => {
    e.preventDefault();

    const message = encodeURIComponent(
      `Hello Igor! I saw your thumbnail portfolio and would like to request a custom quote for my channel.\n\n` +
      `Name / Channel: ${clientName || 'Content Creator'}\n` +
      `Channel Link: ${channelLink || 'N/A'}\n` +
      `Niche: ${channelNiche}\n` +
      `Project Scope: ${projectType}\n` +
      `Details: ${messageText || 'Looking forward to discussing turnaround times and custom packages.'}`
    );

    // Open WhatsApp directly with prefilled message
    window.open(`https://wa.me/${profile.whatsapp}?text=${message}`, '_blank');
  };

  return (
    <section id="contact" className="relative py-16 md:py-24 px-4 md:px-8 border-t border-neutral-800/80 bg-black overflow-hidden">
      {/* Background radial lighting with electric neon blue */}
      <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] glow-spot-neon-blue pointer-events-none -z-10 blur-3xl opacity-35" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] glow-spot-neon-blue pointer-events-none -z-10 blur-3xl opacity-25" />

      <div className="max-w-7xl mx-auto w-full">
        
        {/* Section Header */}
        <div className="text-center mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
            Let's Work Together
          </span>
          <h2 className="font-['Big_Shoulders_Display'] text-5xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white">
            THANK YOU <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 drop-shadow-[0_0_25px_rgba(0,240,255,0.6)]">2026</span>
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 max-w-xl mx-auto">
            Available for new projects, continuous monthly partnerships, and strategic high-CTR redesigns tailored to your channel.
          </p>
        </div>

        {/* Contact Split: Left Socials & Right Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Direct Contacts & Channels */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 shadow-xl">
              <h3 className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-4">
                DIRECT CONTACT CHANNELS
              </h3>

              <div className="space-y-3">
                
                {/* WhatsApp */}
                <a
                  href={`https://wa.me/${profile.whatsapp}?text=Hello%20Igor!%20I%20saw%20your%20thumbnail%20portfolio%20and%20would%20like%20to%20request%20a%20quote.`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-neutral-900/90 hover:bg-neutral-800 border border-neutral-800 hover:border-cyan-400 text-neutral-200 transition-all group hover:shadow-[0_0_20px_rgba(0,240,255,0.25)]"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 flex items-center justify-center">
                      <MessageCircle className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors block">Professional WhatsApp</span>
                      <span className="text-[11px] text-cyan-400 font-mono">+55 (99) 9664-9651</span>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-neutral-500 group-hover:text-cyan-400 transition-colors" />
                </a>

                {/* Email */}
                <a
                  href={`mailto:${profile.email}?subject=YouTube%20Thumbnail%20Inquiry&body=Hi%20Igor,%20I%20am%20interested%20in%20hiring%20you%20for%20YouTube%20thumbnails.`}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-neutral-900/90 hover:bg-neutral-800 border border-neutral-800 hover:border-cyan-400 text-neutral-200 transition-all group hover:shadow-[0_0_20px_rgba(0,240,255,0.25)]"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 flex items-center justify-center">
                      <Mail className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors block">Direct Email</span>
                      <span className="text-[11px] text-neutral-400">{profile.email}</span>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-neutral-500 group-hover:text-cyan-400 transition-colors" />
                </a>

                {/* Discord */}
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-neutral-900/90 border border-neutral-800 text-neutral-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-neutral-800 text-cyan-400 border border-cyan-500/30 flex items-center justify-center font-bold text-sm shadow-[0_0_8px_rgba(0,240,255,0.2)]">
                      Ds
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white block">Discord</span>
                      <span className="text-[11px] font-mono text-cyan-300">{profile.discord}</span>
                    </div>
                  </div>
                  <button
                    onClick={handleCopyDiscord}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 hover:border-cyan-400 text-xs text-white transition-colors cursor-pointer"
                  >
                    {copiedDiscord ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-cyan-400" />
                        <span className="text-cyan-400 font-bold">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-neutral-300" />
                        <span>Copy Tag</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Instagram */}
                <a
                  href={`https://www.instagram.com/${profile.instagram}/`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-neutral-900/90 hover:bg-neutral-800 border border-neutral-800 hover:border-cyan-400 text-neutral-200 transition-all group hover:shadow-[0_0_20px_rgba(0,240,255,0.25)]"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 flex items-center justify-center">
                      <Instagram className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors block">Instagram</span>
                      <span className="text-[11px] text-cyan-400 font-mono">@{profile.instagram}</span>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-neutral-500 group-hover:text-cyan-400 transition-colors" />
                </a>

              </div>

              {/* Quality guarantee & fast turnaround */}
              <div className="mt-6 pt-4 border-t border-neutral-800/80 space-y-2 text-xs text-neutral-400">
                <div className="flex items-center gap-2 text-neutral-300">
                  <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Up to 2 full revision rounds included on every thumbnail.</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-300">
                  <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Fast delivery in 24h to 48h with crisp Full HD (1920x1080) files.</span>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Custom Commission / Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-neutral-950 border border-neutral-800 shadow-xl">
              
              <div className="mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 block mb-1">
                  Custom Commission
                </span>
                <h3 className="font-['Big_Shoulders_Display'] text-3xl font-extrabold uppercase text-white">
                  REQUEST A QUOTE / START A PROJECT
                </h3>
                <p className="text-xs text-neutral-400 mt-1">
                  Fill in the details below to receive a personalized proposal tailored to your channel's upload schedule.
                </p>
              </div>

              <form onSubmit={handleSendInquiry} className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                      Your Name or Channel Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex / Gaming Channel"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-black border border-neutral-800 focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(0,240,255,0.25)] focus:outline-none text-xs text-white placeholder-neutral-500 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                      Channel Link (YouTube)
                    </label>
                    <input
                      type="text"
                      placeholder="youtube.com/@yourchannel"
                      value={channelLink}
                      onChange={(e) => setChannelLink(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-black border border-neutral-800 focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(0,240,255,0.25)] focus:outline-none text-xs text-white placeholder-neutral-500 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                      Content Niche
                    </label>
                    <select
                      value={channelNiche}
                      onChange={(e) => setChannelNiche(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-black border border-neutral-800 focus:border-cyan-400 focus:outline-none text-xs text-white transition-all"
                    >
                      <option value="Gaming & Challenges">Gaming & Challenges</option>
                      <option value="GTA 5 / GTA 6">GTA 5 / GTA 6</option>
                      <option value="CS:GO / CS2">CS:GO / CS2</option>
                      <option value="Roblox">Roblox</option>
                      <option value="Other Gaming Niche">Other Gaming Niche</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                      Project Scope
                    </label>
                    <select
                      value={projectType}
                      onChange={(e) => setProjectType(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-black border border-neutral-800 focus:border-cyan-400 focus:outline-none text-xs text-white transition-all"
                    >
                      <option value="Thumbnails for Upcoming Videos">Thumbnails for Upcoming Videos</option>
                      <option value="Weekly Ongoing Production">Weekly Ongoing Production</option>
                      <option value="Past Video Redesign (A/B Test)">Past Video Redesign (A/B Test)</option>
                      <option value="Single Strategic Thumbnail">Single Strategic Thumbnail</option>
                      <option value="Custom Channel Branding / Banners">Custom Channel Branding / Banners</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    Project Details / Goals
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell me about your view goals, upload frequency, or upcoming video ideas..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-black border border-neutral-800 focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(0,240,255,0.25)] focus:outline-none text-xs text-white placeholder-neutral-500 transition-all"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-black font-black text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(0,240,255,0.45)] transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                >
                  <Send className="w-4 h-4 text-black" />
                  <span>Send Inquiry via WhatsApp</span>
                </button>

                <p className="text-[11px] text-center text-neutral-500">
                  Clicking will open a direct chat with Igor on WhatsApp with your prefilled details.
                </p>

              </form>

            </div>
          </div>

        </div>

        {/* Bottom Credits & Monogram Footer */}
        <div className="mt-20 pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-neutral-900 border border-cyan-500/40 flex items-center justify-center font-['Big_Shoulders_Display'] text-xs font-bold text-cyan-400 shadow-[0_0_8px_rgba(0,240,255,0.3)]">
              IT
            </div>
            <span>© 2026 Igor Thumbnail Maker · All rights reserved.</span>
          </div>

          <div className="flex items-center gap-4 text-neutral-400">
            <span className="text-neutral-300">High Conversion Focus</span>
            <span>·</span>
            <span className="text-neutral-300">A/B Testing</span>
            <span>·</span>
            <span className="text-neutral-300">Professional Design</span>
          </div>
        </div>

      </div>
    </section>
  );
};
