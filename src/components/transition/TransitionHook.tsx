import React from 'react';
import { ArrowDown, Play, Flame } from 'lucide-react';

interface TransitionHookProps {
  onEnterReels: () => void;
}

export const TransitionHook: React.FC<TransitionHookProps> = ({ onEnterReels }) => {
  return (
    <section className="relative py-28 px-4 flex flex-col items-center justify-center text-center overflow-hidden bg-gradient-to-b from-[#05050a] via-[#0b0c1b] to-[#05050a]">
      {/* Background Energy Lines & Glows */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/30 via-transparent to-transparent pointer-events-none" />
      <div className="w-px h-24 bg-gradient-to-b from-transparent via-cyan-400 to-indigo-500 mb-8 animate-pulse" />

      {/* Transition Typography */}
      <div className="max-w-4xl space-y-4 mb-10 select-none">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-mono mb-2">
          <Flame className="w-3.5 h-3.5 fill-rose-500" />
          <span>SIGNATURE STREAM PORTAL</span>
        </div>

        <h3 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-400 font-heading">
          DON'T JUST SHOW YOUR SKILLS.
        </h3>

        <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white font-heading leading-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-300 to-fuchsia-400 drop-shadow-[0_0_35px_rgba(99,102,241,0.4)]">
            SHOW THEM IN ACTION.
          </span>
        </h2>

        <p className="max-w-xl mx-auto text-slate-400 text-sm sm:text-base mt-4 font-normal">
          Step into our high-speed, live reel stream. Watch real engineering logic, shader physics, and machine learning pipelines live in motion.
        </p>
      </div>

      {/* Enter Action Button */}
      <button
        onClick={onEnterReels}
        className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-600 to-cyan-500 text-white font-bold text-base shadow-2xl shadow-indigo-500/40 hover:shadow-cyan-500/50 hover:scale-105 active:scale-95 transition-all duration-300"
      >
        <span className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-cyan-400 to-indigo-500 opacity-50 blur group-hover:opacity-100 transition-opacity" />
        <div className="relative flex items-center gap-3">
          <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
            <Play className="w-3.5 h-3.5 fill-white translate-x-0.5" />
          </div>
          <span>Enter Live Reels Arena</span>
          <ArrowDown className="w-4 h-4 animate-bounce group-hover:translate-y-0.5 transition-transform" />
        </div>
      </button>

      {/* Downward Connector line */}
      <div className="w-px h-16 bg-gradient-to-b from-indigo-500 via-cyan-400 to-transparent mt-12" />
    </section>
  );
};
