import React from 'react';
import { Sparkles, Video, ArrowRight, CheckCircle2 } from 'lucide-react';

interface CTASectionProps {
  onRecordReel?: () => void;
}

export const CTASection: React.FC<CTASectionProps> = ({ onRecordReel }) => {
  return (
    <section className="py-28 px-4 sm:px-6 max-w-6xl mx-auto text-center relative overflow-hidden select-none">
      <div className="relative rounded-3xl p-8 sm:p-14 overflow-hidden border border-white/15 bg-gradient-to-b from-[#0e0f21] via-[#090a16] to-[#06060c] shadow-2xl">
        {/* Glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-500/20 rounded-full filter blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full filter blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 text-xs font-mono mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>JOIN 14,000+ VERIFIED BUILDERS</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight mb-6 font-heading">
            Ready to Prove Your Skills to the World?
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-10">
            Publish your 30-second live proof-of-work reel, connect your GitHub repositories, and get discovered by top technology teams globally.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onRecordReel}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-cyan-500 text-white font-bold text-base shadow-xl shadow-indigo-500/30 hover:shadow-cyan-500/40 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2.5"
            >
              <Video className="w-5 h-5" />
              <span>Create Your Proof Reel</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white font-semibold text-base border border-white/10 backdrop-blur-md transition-all">
              Hire Verified Talent
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 mt-12 text-xs text-slate-400 font-medium">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>No fluff, 100% verified demo code</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Direct engineer & recruiter DMs</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Zero recruiter spam</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
