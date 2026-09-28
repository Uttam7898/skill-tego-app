import React, { useState, useEffect } from 'react';
import { Sparkles, Play, Search, ArrowRight } from 'lucide-react';

interface NavbarProps {
  onScrollToReels: () => void;
  onScrollToShowcase: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onScrollToReels, onScrollToShowcase }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#080811]/85 backdrop-blur-xl border-b border-white/10 py-3 shadow-2xl'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-[1.5px] shadow-lg shadow-indigo-500/25 group-hover:shadow-cyan-500/40 transition-shadow">
            <div className="w-full h-full bg-[#090a16] rounded-[10px] flex items-center justify-center">
              <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-300 to-white text-lg font-heading">
                ST
              </span>
            </div>
          </div>
          <div className="flex flex-col text-left">
            <span className="font-extrabold text-white text-lg tracking-tight font-heading group-hover:text-cyan-300 transition-colors">
              SkillTego
            </span>
            <span className="text-[10px] font-mono text-cyan-400 -mt-1 tracking-widest uppercase">
              Proof of Work
            </span>
          </div>
        </a>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-1.5 p-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
          <button
            onClick={onScrollToShowcase}
            className="px-4 py-1.5 rounded-full text-xs font-medium text-slate-300 hover:text-white hover:bg-white/10 transition-all"
          >
            Showcase
          </button>
          <button
            onClick={onScrollToReels}
            className="px-4 py-1.5 rounded-full text-xs font-semibold text-cyan-300 hover:text-white hover:bg-cyan-500/20 transition-all flex items-center gap-1.5"
          >
            <Play className="w-3 h-3 fill-cyan-400 text-cyan-400" />
            <span>Live Reels</span>
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
          </button>
          <a
            href="#showcase-section"
            onClick={(e) => {
              e.preventDefault();
              onScrollToShowcase();
            }}
            className="px-4 py-1.5 rounded-full text-xs font-medium text-slate-300 hover:text-white hover:bg-white/10 transition-all"
          >
            Verified Talent
          </a>
          <a
            href="#skill-reels-experience"
            onClick={(e) => {
              e.preventDefault();
              onScrollToReels();
            }}
            className="px-4 py-1.5 rounded-full text-xs font-medium text-slate-300 hover:text-white hover:bg-white/10 transition-all"
          >
            Bounties
          </a>
        </nav>

        {/* Right CTA */}
        <div className="flex items-center gap-3">
          <button
            onClick={onScrollToReels}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-slate-200 transition-all"
          >
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <span>Search Skills</span>
          </button>

          <button
            onClick={onScrollToReels}
            className="relative group inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-cyan-500 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-indigo-500/25 hover:shadow-cyan-500/35 transition-all hover:scale-[1.02] active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-200" />
            <span>Watch Live Reels</span>
            <ArrowRight className="w-3.5 h-3.5 text-white/80 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </header>
  );
};
