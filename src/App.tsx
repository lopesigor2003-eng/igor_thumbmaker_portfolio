/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ContactSection } from './components/ContactSection';
import { FeedSimulatorModal } from './components/FeedSimulatorModal';
import { ThumbnailDetailModal } from './components/ThumbnailDetailModal';
import {
  INITIAL_USER_PROFILE,
  INITIAL_THUMBNAILS,
} from './data/portfolioData';
import { ThumbnailProject, UserProfileData } from './types/portfolio';

export default function App() {
  const [profile] = useState<UserProfileData>(() => {
    try {
      const saved = localStorage.getItem('igor_portfolio_profile');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (!parsed.avatarUrl || parsed.avatarUrl.includes('avatar_designer_hero')) {
          parsed.avatarUrl = INITIAL_USER_PROFILE.avatarUrl;
        }
        parsed.role = INITIAL_USER_PROFILE.role;
        parsed.tagline = INITIAL_USER_PROFILE.tagline;
        parsed.whatsapp = INITIAL_USER_PROFILE.whatsapp;
        parsed.instagram = INITIAL_USER_PROFILE.instagram;
        parsed.bio = INITIAL_USER_PROFILE.bio;
        localStorage.setItem('igor_portfolio_profile', JSON.stringify(parsed));
        return parsed;
      }
      return INITIAL_USER_PROFILE;
    } catch {
      return INITIAL_USER_PROFILE;
    }
  });

  const [thumbnails] = useState<ThumbnailProject[]>(() => {
    try {
      const saved = localStorage.getItem('igor_portfolio_thumbnails');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (
          Array.isArray(parsed) &&
          parsed.some(
            (t: any) =>
              t.category === 'gaming' ||
              t.category === 'storytelling' ||
              t.category === 'podcasts' ||
              t.category === 'tech' ||
              t.category === 'ab_test' ||
              t.id?.startsWith('thumb-1') ||
              t.id?.startsWith('thumb-2') ||
              t.id?.startsWith('thumb-3')
          )
        ) {
          localStorage.setItem('igor_portfolio_thumbnails', JSON.stringify(INITIAL_THUMBNAILS));
          return INITIAL_THUMBNAILS;
        }
        return parsed;
      }
      return INITIAL_THUMBNAILS;
    } catch {
      return INITIAL_THUMBNAILS;
    }
  });

  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isFeedSimulatorOpen, setIsFeedSimulatorOpen] = useState(false);
  const [selectedThumbForDetail, setSelectedThumbForDetail] = useState<ThumbnailProject | null>(null);
  const [selectedThumbForSimulator, setSelectedThumbForSimulator] = useState<ThumbnailProject | null>(null);

  // Scroll listener to update active section in navbar
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'projects', 'contact'];
      const scrollY = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollY >= top && scrollY < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard navigation & escape handler for modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsFeedSimulatorOpen(false);
        setSelectedThumbForDetail(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenFeedSimulator = (thumb?: ThumbnailProject) => {
    if (thumb) {
      setSelectedThumbForSimulator(thumb);
    } else {
      setSelectedThumbForSimulator(thumbnails[0]);
    }
    setIsFeedSimulatorOpen(true);
  };

  return (
    <div className="min-h-screen bg-black text-neutral-100 flex flex-col font-sans selection:bg-white selection:text-black antialiased">
      
      {/* Top sticky navigation adhering to 3-zone contract */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenFeedSimulator={() => handleOpenFeedSimulator()}
      />

      {/* Main Content Sections */}
      <main className="flex-1 flex flex-col">
        {/* Slide 1: Hero & Presentation Title */}
        <HeroSection
          profile={profile}
          onNavigate={handleNavigate}
          onOpenFeedSimulator={() => handleOpenFeedSimulator()}
        />

        {/* Slide 2: About Me & Metrics */}
        <AboutSection
          profile={profile}
          onNavigate={handleNavigate}
        />

        {/* Slide 3: Recap Projects & Thumbnail Gallery */}
        <ProjectsSection
          thumbnails={thumbnails}
          onSelectThumbnail={(thumb) => setSelectedThumbForDetail(thumb)}
          onSimulateThumbnail={(thumb) => handleOpenFeedSimulator(thumb)}
        />

        {/* Slide 4: Contact Me & Inquiry Form */}
        <ContactSection
          profile={profile}
        />
      </main>

      {/* Interactive YouTube Feed Simulator Modal */}
      <FeedSimulatorModal
        isOpen={isFeedSimulatorOpen}
        onClose={() => setIsFeedSimulatorOpen(false)}
        thumbnails={thumbnails}
        selectedThumbnail={selectedThumbForSimulator}
      />

      {/* Thumbnail Details & Strategy Modal */}
      <ThumbnailDetailModal
        thumbnail={selectedThumbForDetail}
        onClose={() => setSelectedThumbForDetail(null)}
        onOpenFeedSimulator={(thumb) => handleOpenFeedSimulator(thumb)}
      />

    </div>
  );
}
