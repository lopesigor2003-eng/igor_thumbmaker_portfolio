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
  Star,
  CheckCircle2,
  Quote,
} from 'lucide-react';

interface ContactSectionProps {
  profile: UserProfileData;
}

const CREATOR_TESTIMONIALS = [
  {
    id: 'roblox-review',
    creatorName: 'Lucas "MaxPlay"',
    channelName: 'MaxPlay Roblox',
    subs: '1.4M Subscribers',
    game: 'Roblox',
    metric: '+132% CTR',
    metricLabel: 'Jump vs channel average',
    avatarLetter: 'M',
    avatarBg: 'bg-gradient-to-tr from-fuchsia-600 to-rose-500',
    quote:
      'Igor completely transformed our channel\'s CTR. Our lava escape video jumped from our usual 7.2% to an insane 16.7% CTR in the first 24 hours. The vibrant saturation and exaggerated avatar expressions he creates literally dominate the mobile feed. Hands down the best thumbnail artist we’ve worked with.',
  },
  {
    id: 'gta-review',
    creatorName: 'Santos "RP"',
    channelName: 'Santos Elite GTA',
    subs: '890K Subscribers',
    game: 'GTA 5',
    metric: '1.8M Views',
    metricLabel: 'Generated in first 3 days',
    avatarLetter: 'S',
    avatarBg: 'bg-gradient-to-tr from-amber-500 to-orange-600',
    quote:
      'In the GTA 5 niche, competition on the homepage is brutal. Igor’s use of volumetric lighting and cinematic smoke effects made our police chase video stand out instantly. We hit 1.8M views in just 3 days on a single upload. Super fast 24h turnaround and always delivers on point.',
  },
  {
    id: 'csgo-review',
    creatorName: 'Dmitri "Vortex"',
    channelName: 'Vortex Clutch Esports',
    subs: '620K Subscribers',
    game: 'CS:GO / CS2',
    metric: '15.8% CTR',
    metricLabel: 'Sustained for 2+ weeks',
    avatarLetter: 'V',
    avatarBg: 'bg-gradient-to-tr from-blue-600 to-indigo-600',
    quote:
      'Finding a designer who truly understands competitive FPS storytelling is rare. Igor captured the exact high-stakes clutch moment with the AWP muzzle flash and clean silhouette rim lighting. The click-through rate stayed above 15% for over two weeks. Essential partner for any serious gaming creator.',
  },
];

export const ContactSection: React.FC<ContactSectionProps> = ({ profile }) => {
  const [clientName, setClientName] = useState('');
  const [channelLink, setChannelLink] = useState('');
  const [channelNiche, setChannelNiche] = useState('Gaming & Challenges');
  const [projectType, setProjectType] = useState('Thumbnails for Upcoming Videos');
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
        
        {/* Creator Testimonials / Social Proof Block (Roblox, GTA 5, CS:GO) */}
        <div className="mb-20">
          <div className="text-center mb-10 space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-400 block">
              Creator Testimonials · Proven Results
            </span>
            <h3 className="font-['Big_Shoulders_Display'] text-4xl sm:text-5xl font-black uppercase tracking-tight text-white">
              WHAT TOP YOUTUBERS <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-600 drop-shadow-[0_0_25px_rgba(37,99,235,0.65)]">SAY</span>
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-lg mx-auto">
              Real feedback from gaming creators who leveled up their click-through rate, views, and channel growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CREATOR_TESTIMONIALS.map((item) => (
              <div
                key={item.id}
                className="relative rounded-2xl bg-neutral-950 border border-neutral-800 hover:border-blue-500 p-6 flex flex-col justify-between transition-all duration-300 group hover:shadow-[0_0_30px_rgba(37,99,235,0.3)]"
              >
                {/* Decorative subtle ambient quote icon */}
                <Quote className="absolute top-4 right-4 w-8 h-8 text-neutral-800/60 group-hover:text-blue-500/30 transition-colors pointer-events-none" />

                <div>
                  {/* Top: Star rating & Game Tag */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-neutral-900 border border-neutral-800 text-blue-300">
                      {item.game}
                    </span>
                  </div>

                  {/* Quote text */}
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed italic mb-6">
                    "{item.quote}"
                  </p>
                </div>

                {/* Bottom: Creator Profile & Key Result Metric */}
                <div className="pt-4 border-t border-neutral-900 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full ${item.avatarBg} flex items-center justify-center text-white font-bold text-sm shadow-md`}>
                        {item.avatarLetter}
                      </div>
                      <div>
                        <div className="flex items-center gap-1">
                          <span className="text-xs font-bold text-white group-hover:text-blue-300 transition-colors">
                            {item.channelName}
                          </span>
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                        </div>
                        <span className="text-[11px] text-neutral-400 block">
                          {item.creatorName} · {item.subs}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Result Pill */}
                  <div className="flex items-center justify-between p-2 rounded-lg bg-neutral-900/80 border border-blue-500/30 text-xs">
                    <span className="font-['Big_Shoulders_Display'] text-base font-extrabold text-blue-400 tracking-wide">
                      {item.metric}
                    </span>
                    <span className="text-[10px] text-neutral-400 font-medium">
                      {item.metricLabel}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section Header */}
        <div className="text-center mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-400">
            Let's Work Together
          </span>
          <h2 className="font-['Big_Shoulders_Display'] text-5xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white">
            THANK <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-600 drop-shadow-[0_0_25px_rgba(37,99,235,0.65)]">YOU</span>
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
              <h3 className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-4">
                DIRECT CONTACT CHANNELS
              </h3>

              <div className="space-y-3">
                
                {/* WhatsApp */}
                <a
                  href={`https://wa.me/${profile.whatsapp}?text=Hello%20Igor!%20I%20saw%20your%20thumbnail%20portfolio%20and%20would%20like%20to%20request%20a%20quote.`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-neutral-900/90 hover:bg-neutral-800 border border-neutral-800 hover:border-blue-500 text-neutral-200 transition-all group hover:shadow-[0_0_20px_rgba(37,99,235,0.35)]"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-600/10 text-blue-400 border border-blue-500/30 flex items-center justify-center">
                      <MessageCircle className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white group-hover:text-blue-300 transition-colors block">Professional WhatsApp</span>
                      <span className="text-[11px] text-blue-400 font-mono">+55 (99) 9664-9651</span>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-neutral-500 group-hover:text-blue-400 transition-colors" />
                </a>

                {/* Email */}
                <a
                  href={`mailto:${profile.email}?subject=YouTube%20Thumbnail%20Inquiry&body=Hi%20Igor,%20I%20am%20interested%20in%20hiring%20you%20for%20YouTube%20thumbnails.`}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-neutral-900/90 hover:bg-neutral-800 border border-neutral-800 hover:border-blue-500 text-neutral-200 transition-all group hover:shadow-[0_0_20px_rgba(37,99,235,0.35)]"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-600/10 text-blue-400 border border-blue-500/30 flex items-center justify-center">
                      <Mail className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white group-hover:text-blue-300 transition-colors block">Direct Email</span>
                      <span className="text-[11px] text-neutral-400">{profile.email}</span>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-neutral-500 group-hover:text-blue-400 transition-colors" />
                </a>

                {/* Discord */}
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-neutral-900/90 border border-neutral-800 text-neutral-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-neutral-800 text-blue-400 border border-blue-500/30 flex items-center justify-center font-bold text-sm shadow-[0_0_8px_rgba(37,99,235,0.3)]">
                      Ds
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white block">Discord</span>
                      <span className="text-[11px] font-mono text-blue-300">{profile.discord}</span>
                    </div>
                  </div>
                  <button
                    onClick={handleCopyDiscord}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 hover:border-blue-500 text-xs text-white transition-colors cursor-pointer"
                  >
                    {copiedDiscord ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-blue-400" />
                        <span className="text-blue-400 font-bold">Copied!</span>
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
                  className="flex items-center justify-between p-3.5 rounded-xl bg-neutral-900/90 hover:bg-neutral-800 border border-neutral-800 hover:border-blue-500 text-neutral-200 transition-all group hover:shadow-[0_0_20px_rgba(37,99,235,0.35)]"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-600/10 text-blue-400 border border-blue-500/30 flex items-center justify-center">
                      <Instagram className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white group-hover:text-blue-300 transition-colors block">Instagram</span>
                      <span className="text-[11px] text-blue-400 font-mono">@{profile.instagram}</span>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-neutral-500 group-hover:text-blue-400 transition-colors" />
                </a>

              </div>

              {/* Quality guarantee & fast turnaround */}
              <div className="mt-6 pt-4 border-t border-neutral-800/80 space-y-2 text-xs text-neutral-400">
                <div className="flex items-center gap-2 text-neutral-300">
                  <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Up to 2 full revision rounds included on every thumbnail.</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-300">
                  <Sparkles className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Fast delivery in 24h to 48h with crisp Full HD (1920x1080) files.</span>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Custom Commission / Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-neutral-950 border border-neutral-800 shadow-xl">
              
              <div className="mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-400 block mb-1">
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
                      className="w-full px-4 py-2.5 rounded-xl bg-black border border-neutral-800 focus:border-blue-500 focus:shadow-[0_0_15px_rgba(37,99,235,0.3)] focus:outline-none text-xs text-white placeholder-neutral-500 transition-all"
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
                      className="w-full px-4 py-2.5 rounded-xl bg-black border border-neutral-800 focus:border-blue-500 focus:shadow-[0_0_15px_rgba(37,99,235,0.3)] focus:outline-none text-xs text-white placeholder-neutral-500 transition-all"
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
                      className="w-full px-4 py-2.5 rounded-xl bg-black border border-neutral-800 focus:border-blue-500 focus:outline-none text-xs text-white transition-all"
                    >
                      <option value="GTA 5 / GTA 6">GTA 5 / GTA 6</option>
                      <option value="Roblox">Roblox</option>
                      <option value="Terror / Horror">Terror / Horror</option>
                      <option value="Viagem / Travel">Viagem / Travel</option>
                      <option value="Vlogs / Lifestyle">Vlogs / Lifestyle</option>
                      <option value="Gaming & Challenges">Gaming & Challenges</option>
                      <option value="Other High-CTR Niche">Other High-CTR Niche</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                      Project Scope
                    </label>
                    <select
                      value={projectType}
                      onChange={(e) => setProjectType(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-black border border-neutral-800 focus:border-blue-500 focus:outline-none text-xs text-white transition-all"
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
                    className="w-full px-4 py-2.5 rounded-xl bg-black border border-neutral-800 focus:border-blue-500 focus:shadow-[0_0_15px_rgba(37,99,235,0.3)] focus:outline-none text-xs text-white placeholder-neutral-500 transition-all"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(37,99,235,0.55)] transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                >
                  <Send className="w-4 h-4 text-white" />
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
            <div className="w-6 h-6 rounded bg-neutral-900 border border-blue-500/50 flex items-center justify-center font-['Big_Shoulders_Display'] text-xs font-bold text-blue-400 shadow-[0_0_8px_rgba(37,99,235,0.4)]">
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
