import React from 'react';
import { Globe, Code2, MessageSquare } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/10 bg-[#040409] text-slate-400 py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-cyan-400 p-[1px]">
            <div className="w-full h-full bg-[#080811] rounded-[7px] flex items-center justify-center">
              <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-300 text-xs font-heading">
                ST
              </span>
            </div>
          </div>
          <span className="font-bold text-white tracking-tight">SkillTego</span>
          <span className="text-xs text-slate-500">• Demonstrating technical brilliance in action.</span>
        </div>

        <div className="flex items-center gap-6 text-xs">
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
          <a href="#" className="hover:text-white transition-colors">Reels Guidelines</a>
          <a href="#" className="hover:text-white transition-colors">API Docs</a>
        </div>

        <div className="flex items-center gap-4 text-slate-400">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" title="GitHub">
            <Code2 className="w-4 h-4" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors" title="X / Twitter">
            <Globe className="w-4 h-4" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors" title="Community">
            <MessageSquare className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
};
