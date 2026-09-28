import { useRef } from 'react';
import { Navbar } from './components/navbar/Navbar';
import { HeroSection } from './components/hero/HeroSection';
import { ShowcaseSection } from './components/showcase/ShowcaseSection';
import { TransitionHook } from './components/transition/TransitionHook';
import { ReelsContainer } from './components/reels/ReelsContainer';
import { CTASection } from './components/cta/CTASection';
import { Footer } from './components/footer/Footer';
import { INITIAL_REELS_DATA } from './data/reelsData';

export function App() {
  const reelsSectionRef = useRef<HTMLDivElement>(null);
  const showcaseSectionRef = useRef<HTMLDivElement>(null);
  const ctaSectionRef = useRef<HTMLDivElement>(null);

  const scrollToReels = () => {
    if (reelsSectionRef.current) {
      reelsSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToShowcase = () => {
    if (showcaseSectionRef.current) {
      showcaseSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToCTA = () => {
    if (ctaSectionRef.current) {
      ctaSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#05050b] text-slate-100 flex flex-col font-['Plus_Jakarta_Sans',sans-serif] selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Navigation Header */}
      <Navbar
        onScrollToReels={scrollToReels}
        onScrollToShowcase={scrollToShowcase}
      />

      {/* Hero Section */}
      <HeroSection
        onEnterReels={scrollToReels}
        onExploreShowcase={scrollToShowcase}
      />

      {/* 1. BUILD. SHOW. GET DISCOVERED. Showcase Section */}
      <div ref={showcaseSectionRef}>
        <ShowcaseSection onJumpToReel={scrollToReels} />
      </div>

      {/* 2. Transition Hook: "DON'T JUST SHOW YOUR SKILLS." -> "SHOW THEM IN ACTION." */}
      <TransitionHook onEnterReels={scrollToReels} />

      {/* 3. The Signature 100vh Full-Screen Auto-Play Reels Experience */}
      <div ref={reelsSectionRef} className="w-full relative">
        <ReelsContainer
          reels={INITIAL_REELS_DATA}
          onExitReels={scrollToCTA}
        />
      </div>

      {/* 4. Creator Call to Action & Proof Submission */}
      <div ref={ctaSectionRef}>
        <CTASection onRecordReel={scrollToReels} />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
