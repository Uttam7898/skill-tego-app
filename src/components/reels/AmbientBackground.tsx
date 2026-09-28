import React from 'react';
import type { Reel } from '../../types/reel';
import { Terminal, Zap } from 'lucide-react';

interface AmbientBackgroundProps {
  currentReel: Reel;
}

export const AmbientBackground: React.FC<AmbientBackgroundProps> = ({ currentReel }) => {
  const { ambientColor, secondaryColor, project, tags } = currentReel;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0 hidden lg:block">
      {/* Blurred Video Clone / Radial Glow Halo */}
      <div
        className="absolute inset-0 opacity-25 filter blur-[90px] transition-all duration-1000 transform scale-125"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${ambientColor} 0%, ${secondaryColor} 40%, transparent 75%)`,
        }}
      />

      {/* Floating Dynamic Ambient Circles */}
      <div
        className="absolute top-1/4 left-16 w-80 h-80 rounded-full filter blur-[100px] opacity-35 animate-pulse-glow transition-colors duration-1000"
        style={{ backgroundColor: ambientColor }}
      />
      <div
        className="absolute bottom-1/4 right-16 w-96 h-96 rounded-full filter blur-[120px] opacity-30 animate-pulse-glow transition-colors duration-1000"
        style={{ backgroundColor: secondaryColor, animationDelay: '2s' }}
      />

      {/* Cyber Grid Backdrop */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />

      {/* Left Ambient HUD: Live Creator Telemetry & Skill Graph */}
      <div className="absolute left-10 xl:left-16 top-1/2 -translate-y-1/2 w-64 xl:w-72 flex flex-col gap-4 text-left">
        <div className="glass-panel p-4 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-xl transition-all duration-500">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-300">Live Skill Telemetry</span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center text-slate-400">
              <span>Creator Status:</span>
              <span className="text-emerald-400 font-mono font-semibold">Active Demonstration</span>
            </div>
            <div className="flex justify-between items-center text-slate-400">
              <span>Verified Proof:</span>
              <span className="text-cyan-400 font-mono">100% On-Chain / AST</span>
            </div>
            <div className="flex justify-between items-center text-slate-400">
              <span>Domain:</span>
              <span className="text-white font-medium">{currentReel.skill}</span>
            </div>
          </div>

          {/* Mini Skill Radar / Frequency Bar */}
          <div className="mt-3 pt-3 border-t border-white/10">
            <div className="flex justify-between text-[10px] font-mono text-slate-400 mb-1">
              <span>Skill Depth Signal</span>
              <span className="text-indigo-300">98.6%</span>
            </div>
            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: '88%',
                  background: `linear-gradient(90deg, ${ambientColor}, ${secondaryColor})`,
                }}
              />
            </div>
          </div>
        </div>

        {/* Floating Skill Node Badges */}
        <div className="flex flex-col gap-2">
          {tags.slice(0, 3).map((tag, i) => (
            <div
              key={tag}
              className="glass-pill px-3 py-2 rounded-xl flex items-center gap-2 text-xs text-slate-300 border border-white/10 shadow-lg animate-float"
              style={{ animationDelay: `${i * 1.2}s` }}
            >
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-mono">{tag} Module</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right Ambient HUD: Project Specs & Live Stream Meta */}
      <div className="absolute right-10 xl:right-16 top-1/2 -translate-y-1/2 w-64 xl:w-72 flex flex-col gap-4 text-left">
        <div className="glass-panel p-4 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-xl transition-all duration-500">
          <div className="flex items-center gap-2 mb-2">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-300">Architecture Specs</span>
          </div>

          <h5 className="font-bold text-white text-sm line-clamp-1">{project.title}</h5>
          <p className="text-[11px] text-slate-400 mt-1 leading-snug line-clamp-3">
            {project.description}
          </p>

          <div className="mt-3 pt-3 border-t border-white/10 grid grid-cols-2 gap-2 text-center text-[10px] font-mono">
            <div className="p-2 rounded-lg bg-white/5 border border-white/5">
              <span className="text-slate-400 block">Likes</span>
              <span className="text-rose-400 font-bold text-xs">{currentReel.metrics.likes}</span>
            </div>
            <div className="p-2 rounded-lg bg-white/5 border border-white/5">
              <span className="text-slate-400 block">Live Views</span>
              <span className="text-cyan-400 font-bold text-xs">{currentReel.metrics.views}</span>
            </div>
          </div>
        </div>

        {/* Global Action Tip */}
        <div className="glass-pill p-3 rounded-xl border border-white/10 text-[11px] text-slate-400 leading-tight">
          <span className="text-white font-semibold block mb-0.5">💡 Keyboard Controls:</span>
          Use <kbd className="bg-white/10 px-1 py-0.5 rounded text-white font-mono">↑</kbd> / <kbd className="bg-white/10 px-1 py-0.5 rounded text-white font-mono">↓</kbd> to jump reels, <kbd className="bg-white/10 px-1 py-0.5 rounded text-white font-mono">Space</kbd> to pause, <kbd className="bg-white/10 px-1 py-0.5 rounded text-white font-mono">M</kbd> to mute.
        </div>
      </div>
    </div>
  );
};
