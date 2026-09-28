import React from 'react';
import { Play, Zap, ArrowUpRight } from 'lucide-react';
import { INITIAL_REELS_DATA } from '../../data/reelsData';

interface ShowcaseSectionProps {
  onJumpToReel: (reelIndex: number) => void;
}

export const ShowcaseSection: React.FC<ShowcaseSectionProps> = ({ onJumpToReel }) => {
  return (
    <section id="showcase-section" className="py-24 px-4 sm:px-6 max-w-7xl mx-auto text-left relative">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-mono mb-4">
            <Zap className="w-3.5 h-3.5" />
            <span>TALENT SHOWCASE ENGINE</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight font-heading">
            BUILD. SHOW.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-fuchsia-400">
              GET DISCOVERED.
            </span>
          </h2>

          <p className="text-slate-400 text-sm sm:text-base mt-3 leading-relaxed">
            The world's fastest growing network of builders proving their capabilities through verifiable production code, reactive shaders, and distributed systems.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onJumpToReel(0)}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-indigo-500/20 hover:scale-105 transition-all flex items-center gap-2"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Launch Reels Stream</span>
          </button>
        </div>
      </div>

      {/* Grid of Showcase Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {INITIAL_REELS_DATA.map((reel, index) => (
          <div
            key={reel.id}
            onClick={() => onJumpToReel(index)}
            className="group relative rounded-2xl overflow-hidden glass-panel border border-white/10 hover:border-cyan-400/40 transition-all duration-300 hover:-translate-y-1.5 cursor-pointer shadow-xl flex flex-col"
          >
            {/* Card Thumbnail / Poster with Play Overlay */}
            <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
              <img
                src={reel.posterUrl}
                alt={reel.project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080811] via-transparent to-black/30" />

              {/* Live Play Badge */}
              <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[11px] font-mono flex items-center gap-1.5 group-hover:bg-cyan-500 group-hover:text-black transition-colors font-semibold">
                <Play className="w-3 h-3 fill-current" />
                <span>Watch Reel</span>
              </div>

              {/* Creator Pill */}
              <div className="absolute bottom-3 left-3 flex items-center gap-2 bg-black/60 backdrop-blur-md px-2.5 py-1.5 rounded-full border border-white/10">
                <img
                  src={reel.creator.avatar}
                  alt={reel.creator.name}
                  className="w-5 h-5 rounded-full object-cover"
                />
                <span className="text-xs font-semibold text-white">{reel.creator.name}</span>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-cyan-400 font-mono mb-2">
                  <span>{reel.skill}</span>
                  <span className="text-slate-400 font-mono">{reel.metrics.views} views</span>
                </div>

                <h4 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-1 mb-1.5">
                  {reel.project.title}
                </h4>

                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
                  {reel.project.tagline}
                </p>
              </div>

              {/* Tags and Action */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-1.5 flex-wrap">
                  {reel.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 text-slate-300 border border-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="p-1.5 rounded-lg text-slate-400 group-hover:text-white group-hover:bg-white/10 transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
