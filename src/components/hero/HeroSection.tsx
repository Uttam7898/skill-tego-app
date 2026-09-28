import React from 'react';
import { Play, Code2, ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  onEnterReels: () => void;
  onExploreShowcase: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onEnterReels,
  onExploreShowcase,
}) => {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-28 pb-16 px-4 overflow-hidden text-center select-none">
      {/* Dynamic Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-r from-indigo-600/25 via-fuchsia-600/20 to-cyan-500/25 rounded-full filter blur-[120px] pointer-events-none -z-10 animate-pulse-glow" />
      <div className="absolute top-12 left-10 w-72 h-72 bg-indigo-500/15 rounded-full filter blur-[90px] pointer-events-none -z-10" />
      <div className="absolute bottom-12 right-10 w-80 h-80 bg-cyan-500/15 rounded-full filter blur-[100px] pointer-events-none -z-10" />

      {/* Cyber Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl shadow-xl mb-8 animate-in fade-in slide-in-from-top-4 duration-500">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        <span className="text-xs font-mono font-medium text-slate-200">
          The New Standard for Technical Proof of Work
        </span>
        <span className="text-slate-500">•</span>
        <span className="text-xs font-mono text-cyan-400 font-semibold">v2.4 Live</span>
      </div>

      {/* Main Hero Headline */}
      <h1 className="max-w-4xl text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.1] mb-6 font-heading">
        Where Skills Speak{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-300 to-fuchsia-400">
          Louder Than Resumes.
        </span>
      </h1>

      {/* Subheadline */}
      <p className="max-w-2xl text-slate-300 text-base sm:text-xl font-normal leading-relaxed mb-10">
        Stop writing bullet points about what you can do. Watch live interactive streams of top engineers, designers, and AI creators deploying real projects in seconds.
      </p>

      {/* Dual CTA Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-14">
        <button
          onClick={onEnterReels}
          className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-cyan-500 text-white font-bold text-base shadow-xl shadow-indigo-500/30 hover:shadow-cyan-500/40 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-3 group"
        >
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <Play className="w-4 h-4 fill-white translate-x-0.5" />
          </div>
          <span>Watch Live Skill Reels</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>

        <button
          onClick={onExploreShowcase}
          className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white font-semibold text-base border border-white/15 backdrop-blur-md transition-all duration-200 active:scale-95 flex items-center justify-center gap-2"
        >
          <Code2 className="w-4 h-4 text-cyan-400" />
          <span>Explore Verified Showcase</span>
        </button>
      </div>

      {/* Live Proof of Work Counter Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-4xl w-full">
        <div className="glass-panel p-4 rounded-2xl text-center">
          <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">14,200+</div>
          <div className="text-xs text-slate-400 mt-1">Verified Skill Reels</div>
        </div>

        <div className="glass-panel p-4 rounded-2xl text-center">
          <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400 font-mono">100%</div>
          <div className="text-xs text-slate-400 mt-1">Code & AST Proof</div>
        </div>

        <div className="glass-panel p-4 rounded-2xl text-center">
          <div className="text-2xl sm:text-3xl font-extrabold text-indigo-400 font-mono">850+</div>
          <div className="text-xs text-slate-400 mt-1">Hiring Engineering Teams</div>
        </div>

        <div className="glass-panel p-4 rounded-2xl text-center">
          <div className="text-2xl sm:text-3xl font-extrabold text-fuchsia-400 font-mono">3.4x</div>
          <div className="text-xs text-slate-400 mt-1">Faster Recruiter Hires</div>
        </div>
      </div>
    </section>
  );
};
