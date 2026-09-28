import React, { useState } from 'react';
import { X, Copy, Check, Share2, MessageCircle, Send, Globe, MessageSquare } from 'lucide-react';
import type { Reel } from '../../types/reel';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  reel: Reel;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, reel }) => {
  const [copied, setCopied] = useState(false);
  if (!isOpen) return null;

  const shareUrl = `${window.location.origin}#reel-${reel.id}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm bg-[#0f1123] border border-white/15 rounded-2xl p-6 shadow-2xl text-left"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5 mb-3">
          <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
            <Share2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-white text-base">Share Skill Demonstration</h3>
            <p className="text-xs text-slate-400">{reel.creator.name} • {reel.project.title}</p>
          </div>
        </div>

        {/* Social Buttons */}
        <div className="grid grid-cols-4 gap-2.5 my-5">
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out ${reel.creator.name}'s project: ${reel.project.title} on SkillTego!`)}&url=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-white/5 hover:bg-sky-500/20 text-slate-300 hover:text-sky-400 border border-white/10 hover:border-sky-500/40 transition-all text-xs font-medium"
          >
            <Globe className="w-5 h-5" />
            <span>X / Post</span>
          </a>

          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-white/5 hover:bg-blue-600/20 text-slate-300 hover:text-blue-400 border border-white/10 hover:border-blue-500/40 transition-all text-xs font-medium"
          >
            <MessageSquare className="w-5 h-5" />
            <span>LinkedIn</span>
          </a>

          <a
            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`Watch ${reel.creator.name} demonstrate: ${reel.project.title} ${shareUrl}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-white/5 hover:bg-emerald-600/20 text-slate-300 hover:text-emerald-400 border border-white/10 hover:border-emerald-500/40 transition-all text-xs font-medium"
          >
            <MessageCircle className="w-5 h-5" />
            <span>WhatsApp</span>
          </a>

          <button
            onClick={handleCopy}
            className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-white/5 hover:bg-indigo-600/20 text-slate-300 hover:text-indigo-400 border border-white/10 hover:border-indigo-500/40 transition-all text-xs font-medium"
          >
            <Send className="w-5 h-5" />
            <span>Direct</span>
          </button>
        </div>

        {/* Copy Link Input */}
        <div className="flex items-center gap-2 p-1.5 bg-black/50 border border-white/10 rounded-xl">
          <input
            type="text"
            readOnly
            value={shareUrl}
            className="flex-1 bg-transparent px-2.5 text-xs text-slate-300 focus:outline-none font-mono truncate"
          />
          <button
            onClick={handleCopy}
            className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              copied
                ? 'bg-emerald-500 text-white'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Copied!</span>
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
    </div>
  );
};
