import React from 'react';
import { Heart, MessageCircle, Share2, Bookmark, Volume2, VolumeX, Code, Play, Pause, ChevronUp, ChevronDown } from 'lucide-react';
import type { Reel } from '../../types/reel';

interface ReelControlsProps {
  reel: Reel;
  isMuted: boolean;
  isPlaying: boolean;
  isAutoplayPaused: boolean;
  onToggleLike: () => void;
  onOpenComments: () => void;
  onOpenShare: () => void;
  onToggleSave: () => void;
  onToggleMute: () => void;
  onTogglePlay: () => void;
  onOpenCodePreview: () => void;
  onPrevReel?: () => void;
  onNextReel?: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
}

export const ReelControls: React.FC<ReelControlsProps> = ({
  reel,
  isMuted,
  isPlaying,
  onToggleLike,
  onOpenComments,
  onOpenShare,
  onToggleSave,
  onToggleMute,
  onTogglePlay,
  onOpenCodePreview,
  onPrevReel,
  onNextReel,
  hasPrev = true,
  hasNext = true,
}) => {
  const { metrics, isLiked, isSaved } = reel;

  const formatCount = (count: number) => {
    if (count >= 1000000) return (count / 1000000).toFixed(1) + 'M';
    if (count >= 1000) return (count / 1000).toFixed(1) + 'k';
    return count.toString();
  };

  return (
    <div className="flex flex-col items-center gap-4 text-white select-none pointer-events-auto z-20">
      {/* Up navigation chevron for desktop/touch */}
      {hasPrev && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrevReel?.();
          }}
          className="hidden sm:flex items-center justify-center w-9 h-9 rounded-full bg-black/40 hover:bg-white/20 text-slate-300 hover:text-white border border-white/10 backdrop-blur-md transition-all active:scale-90"
          title="Previous Reel (Arrow Up)"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}

      {/* Like Button */}
      <div className="flex flex-col items-center gap-1 group">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleLike();
          }}
          className={`relative flex items-center justify-center w-12 h-12 rounded-full backdrop-blur-md transition-all duration-300 active:scale-75 shadow-lg ${
            isLiked
              ? 'bg-rose-500/20 text-rose-500 border border-rose-500/40 shadow-rose-500/30'
              : 'bg-black/40 hover:bg-white/20 text-white border border-white/15'
          }`}
          title="Like"
        >
          <Heart
            className={`w-6 h-6 transition-transform duration-300 group-hover:scale-110 ${
              isLiked ? 'fill-rose-500 text-rose-500 scale-110' : ''
            }`}
          />
        </button>
        <span className="text-xs font-semibold text-slate-200 tracking-wide font-mono drop-shadow">
          {formatCount(metrics.likes + (isLiked ? 1 : 0))}
        </span>
      </div>

      {/* Comment Button */}
      <div className="flex flex-col items-center gap-1 group">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenComments();
          }}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-black/40 hover:bg-white/20 text-white border border-white/15 backdrop-blur-md transition-all duration-300 active:scale-75 shadow-lg group-hover:border-cyan-400/40"
          title="Comments"
        >
          <MessageCircle className="w-6 h-6 transition-transform duration-300 group-hover:scale-110 text-cyan-300" />
        </button>
        <span className="text-xs font-semibold text-slate-200 tracking-wide font-mono drop-shadow">
          {formatCount(metrics.comments)}
        </span>
      </div>

      {/* Share Button */}
      <div className="flex flex-col items-center gap-1 group">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenShare();
          }}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-black/40 hover:bg-white/20 text-white border border-white/15 backdrop-blur-md transition-all duration-300 active:scale-75 shadow-lg group-hover:border-indigo-400/40"
          title="Share"
        >
          <Share2 className="w-5 h-5 transition-transform duration-300 group-hover:scale-110 text-indigo-300" />
        </button>
        <span className="text-xs font-semibold text-slate-200 tracking-wide font-mono drop-shadow">
          {formatCount(metrics.shares)}
        </span>
      </div>

      {/* Save Button */}
      <div className="flex flex-col items-center gap-1 group">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleSave();
          }}
          className={`flex items-center justify-center w-12 h-12 rounded-full backdrop-blur-md transition-all duration-300 active:scale-75 shadow-lg ${
            isSaved
              ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40 shadow-amber-500/30'
              : 'bg-black/40 hover:bg-white/20 text-white border border-white/15'
          }`}
          title="Save to Portfolio"
        >
          <Bookmark
            className={`w-5 h-5 transition-transform duration-300 group-hover:scale-110 ${
              isSaved ? 'fill-amber-400 text-amber-400 scale-110' : ''
            }`}
          />
        </button>
        <span className="text-xs font-semibold text-slate-200 tracking-wide font-mono drop-shadow">
          {formatCount(metrics.saves + (isSaved ? 1 : 0))}
        </span>
      </div>

      {/* Code Snippet Inspector */}
      {reel.project.codeSnippet && (
        <div className="flex flex-col items-center gap-1 group">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenCodePreview();
            }}
            className="flex items-center justify-center w-11 h-11 rounded-full bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-300 border border-indigo-400/30 backdrop-blur-md transition-all duration-300 active:scale-75 shadow-lg shadow-indigo-500/20"
            title="Inspect Code"
          >
            <Code className="w-5 h-5" />
          </button>
          <span className="text-[10px] font-mono text-indigo-300 font-semibold">Code</span>
        </div>
      )}

      {/* Sound Toggle */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleMute();
        }}
        className={`flex items-center justify-center w-10 h-10 rounded-full backdrop-blur-md transition-all duration-300 active:scale-90 ${
          isMuted
            ? 'bg-black/50 text-slate-400 border border-white/10'
            : 'bg-cyan-500/30 text-cyan-300 border border-cyan-400/50 shadow-md shadow-cyan-500/30'
        }`}
        title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
      >
        {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 animate-pulse" />}
      </button>

      {/* Play / Pause Toggle */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onTogglePlay();
        }}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-black/40 hover:bg-white/20 text-slate-300 hover:text-white border border-white/10 backdrop-blur-md transition-all duration-300 active:scale-90"
        title={isPlaying ? 'Pause Reel' : 'Play Reel'}
      >
        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white translate-x-0.5" />}
      </button>

      {/* Down navigation chevron */}
      {hasNext && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNextReel?.();
          }}
          className="hidden sm:flex items-center justify-center w-9 h-9 rounded-full bg-black/40 hover:bg-white/20 text-slate-300 hover:text-white border border-white/10 backdrop-blur-md transition-all active:scale-90"
          title="Next Reel (Arrow Down)"
        >
          <ChevronDown className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};
