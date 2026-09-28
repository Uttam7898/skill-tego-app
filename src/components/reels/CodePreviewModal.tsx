import React, { useState } from 'react';
import { X, Copy, Check, ExternalLink, Terminal, CheckCircle, Code2 } from 'lucide-react';
import type { Reel } from '../../types/reel';

interface CodePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  reel: Reel;
}

export const CodePreviewModal: React.FC<CodePreviewModalProps> = ({
  isOpen,
  onClose,
  reel,
}) => {
  const [copied, setCopied] = useState(false);
  if (!isOpen || !reel.project.codeSnippet) return null;

  const { codeSnippet, title, githubRepo, liveDemoUrl, performanceMetric } = reel.project;

  const handleCopyCode = () => {
    if (codeSnippet) {
      navigator.clipboard.writeText(codeSnippet.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-[#0b0c16] border border-white/15 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 bg-white/5">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400">
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-white text-sm">Verified Source Code</h3>
                <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  <CheckCircle className="w-3 h-3" /> SkillTego Verified Proof
                </span>
              </div>
              <p className="text-[11px] text-slate-400">{title} • {codeSnippet.fileName}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Toolbar */}
        <div className="flex items-center justify-between px-5 py-2.5 bg-black/40 border-b border-white/5 text-xs">
          <div className="flex items-center gap-3">
            <span className="font-mono text-cyan-400 font-medium">
              Language: {codeSnippet.language.toUpperCase()}
            </span>
            {performanceMetric && (
              <span className="text-slate-400 font-mono hidden sm:inline">
                Bench: {performanceMetric}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {githubRepo && (
              <a
                href={githubRepo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/15 text-slate-200 transition-colors text-xs font-mono"
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>GitHub Repo</span>
              </a>
            )}

            {liveDemoUrl && (
              <a
                href={liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-300 border border-indigo-400/30 transition-colors text-xs font-mono"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Live App</span>
              </a>
            )}

            <button
              onClick={handleCopyCode}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors text-xs font-mono"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Code Editor Body */}
        <div className="flex-1 overflow-auto p-5 bg-[#07080f] font-mono text-xs text-slate-200 leading-relaxed select-text">
          <pre className="overflow-x-auto whitespace-pre">
            <code>{codeSnippet.code}</code>
          </pre>
        </div>

        {/* Footer info */}
        <div className="px-5 py-3 border-t border-white/10 bg-white/5 flex items-center justify-between text-xs text-slate-400">
          <span>Author: <strong className="text-white">{reel.creator.name}</strong> ({reel.creator.role})</span>
          <span className="font-mono text-[11px] text-cyan-400">Hash: ST-{reel.id}-OK</span>
        </div>
      </div>
    </div>
  );
};
