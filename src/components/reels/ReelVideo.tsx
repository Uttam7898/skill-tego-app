import React, { useRef, useEffect, useState } from 'react';
import { Play, Loader2, Heart, Sparkles, Terminal, Video } from 'lucide-react';
import confetti from 'canvas-confetti';
import { InteractiveReelCanvas } from './InteractiveReelCanvas';

interface ReelVideoProps {
  reelId: string;
  videoUrl: string;
  posterUrl: string;
  isActive: boolean;
  isMuted: boolean;
  isPlaying: boolean;
  onProgress: (percent: number) => void;
  onVideoEnded: () => void;
  onTogglePlay: () => void;
  onDoubleTapLike: () => void;
  ambientColor?: string;
  secondaryColor?: string;
  codeSnippet?: {
    language: string;
    fileName: string;
    code: string;
  };
}

export type ViewMode = 'hybrid' | 'simulation' | 'video' | 'code';

export const ReelVideo: React.FC<ReelVideoProps> = ({
  reelId,
  videoUrl,
  posterUrl,
  isActive,
  isMuted,
  isPlaying,
  onProgress,
  onVideoEnded,
  onTogglePlay,
  onDoubleTapLike,
  ambientColor = '#6366f1',
  secondaryColor = '#06b6d4',
  codeSnippet,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [showHeartPop, setShowHeartPop] = useState(false);
  const [heartCoords, setHeartCoords] = useState({ x: 50, y: 50 });
  const [viewMode, setViewMode] = useState<ViewMode>('hybrid');
  const lastTapRef = useRef<number>(0);

  // Sync playback state with isActive & isPlaying
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isActive && isPlaying) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.log('Autoplay deferred:', err.message);
        });
      }
    } else {
      video.pause();
      if (!isActive) {
        video.currentTime = 0;
      }
    }
  }, [isActive, isPlaying]);

  // Sync mute state
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    const progress = (video.currentTime / video.duration) * 100;
    onProgress(progress);
  };

  const handleTap = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300;

    let clientX = 0;
    let clientY = 0;
    if ('touches' in e && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else if ('clientX' in e) {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    const y = ((clientY - rect.top) / rect.height) * 100;

    if (now - lastTapRef.current < DOUBLE_TAP_DELAY) {
      setHeartCoords({ x: Math.max(10, Math.min(90, x)), y: Math.max(10, Math.min(90, y)) });
      setShowHeartPop(true);
      setTimeout(() => setShowHeartPop(false), 900);
      onDoubleTapLike();

      confetti({
        particleCount: 30,
        spread: 70,
        origin: { x: clientX / window.innerWidth, y: clientY / window.innerHeight },
        colors: ['#ec4899', '#f43f5e', '#6366f1', '#06b6d4'],
      });
    } else {
      setTimeout(() => {
        if (Date.now() - lastTapRef.current >= DOUBLE_TAP_DELAY) {
          onTogglePlay();
        }
      }, DOUBLE_TAP_DELAY);
    }
    lastTapRef.current = now;
  };

  return (
    <div
      onClick={handleTap}
      className="relative w-full h-full bg-[#05050a] flex items-center justify-center overflow-hidden cursor-pointer select-none"
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        src={videoUrl}
        poster={posterUrl}
        playsInline
        muted={isMuted}
        loop={false}
        preload="auto"
        onTimeUpdate={handleTimeUpdate}
        onEnded={onVideoEnded}
        onWaiting={() => setIsLoading(true)}
        onPlaying={() => setIsLoading(false)}
        onLoadedData={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
        className={`w-full h-full object-cover object-center transition-all duration-700 ease-out ${
          viewMode === 'simulation' || viewMode === 'code' ? 'opacity-20 scale-105 filter blur-sm' : 'opacity-85'
        }`}
      />

      {/* Interactive Live Simulated Canvas Visualizer */}
      {(viewMode === 'hybrid' || viewMode === 'simulation') && (
        <InteractiveReelCanvas
          reelId={reelId}
          ambientColor={ambientColor}
          secondaryColor={secondaryColor}
          isPlaying={isPlaying && isActive}
        />
      )}

      {/* Live In-Reel Code View if in 'code' mode */}
      {viewMode === 'code' && codeSnippet && (
        <div className="absolute inset-x-4 top-20 bottom-36 z-20 glass-panel p-4 rounded-2xl overflow-hidden flex flex-col text-left font-mono border border-cyan-400/30 shadow-2xl animate-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-white/10 text-xs text-cyan-300">
            <span className="flex items-center gap-1.5 font-bold">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              {codeSnippet.fileName}
            </span>
            <span className="text-[10px] bg-cyan-500/20 px-2 py-0.5 rounded text-cyan-300">AST Verified</span>
          </div>
          <pre className="flex-1 overflow-auto text-[11px] text-slate-200 mt-3 leading-relaxed whitespace-pre font-mono select-text">
            <code>{codeSnippet.code}</code>
          </pre>
        </div>
      )}

      {/* Fallback Poster Background if error */}
      {hasError && (
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/90 via-slate-900 to-black flex items-center justify-center">
          <img src={posterUrl} alt="Preview" className="w-full h-full object-cover opacity-40" />
        </div>
      )}

      {/* Top View Mode Switcher Pills (Video / Hybrid / Code) */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute top-12 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1 p-1 rounded-full bg-black/65 backdrop-blur-xl border border-white/20 shadow-xl"
      >
        <button
          onClick={() => setViewMode('hybrid')}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold transition-all ${
            viewMode === 'hybrid'
              ? 'bg-gradient-to-r from-indigo-500 to-cyan-500 text-white shadow-md'
              : 'text-slate-300 hover:text-white'
          }`}
          title="Hybrid Stream + Visualizer"
        >
          <Sparkles className="w-2.5 h-2.5" />
          <span>Interactive</span>
        </button>

        <button
          onClick={() => setViewMode('video')}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold transition-all ${
            viewMode === 'video'
              ? 'bg-gradient-to-r from-indigo-500 to-cyan-500 text-white shadow-md'
              : 'text-slate-300 hover:text-white'
          }`}
          title="Raw Video Stream"
        >
          <Video className="w-2.5 h-2.5" />
          <span>Video</span>
        </button>

        {codeSnippet && (
          <button
            onClick={() => setViewMode(viewMode === 'code' ? 'hybrid' : 'code')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold transition-all ${
              viewMode === 'code'
                ? 'bg-cyan-500 text-black shadow-md'
                : 'text-slate-300 hover:text-white'
            }`}
            title="Inspect Live Code"
          >
            <Terminal className="w-2.5 h-2.5" />
            <span>AST Code</span>
          </button>
        )}
      </div>

      {/* Loading Spinner */}
      {isLoading && isActive && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[2px] z-10">
          <div className="p-3 rounded-full bg-black/60 border border-white/10 text-cyan-400">
            <Loader2 className="w-7 h-7 animate-spin" />
          </div>
        </div>
      )}

      {/* Big Play Overlay indicator when paused */}
      {!isPlaying && isActive && !isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] z-20 transition-opacity">
          <div className="w-16 h-16 rounded-full bg-white/20 border border-white/30 backdrop-blur-md flex items-center justify-center text-white shadow-2xl scale-110 transition-transform">
            <Play className="w-8 h-8 fill-white translate-x-0.5" />
          </div>
        </div>
      )}

      {/* Double Tap Heart Pop Animation */}
      {showHeartPop && (
        <div
          className="absolute z-40 pointer-events-none transform -translate-x-1/2 -translate-y-1/2 animate-heart-pop"
          style={{ left: `${heartCoords.x}%`, top: `${heartCoords.y}%` }}
        >
          <div className="relative">
            <Heart className="w-24 h-24 text-rose-500 fill-rose-500 drop-shadow-[0_0_30px_rgba(244,63,94,0.9)]" />
          </div>
        </div>
      )}

      {/* High-contrast Bottom & Top Gradient Scrims */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/90 via-black/40 to-transparent pointer-events-none z-10" />
      <div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-black/95 via-black/75 to-transparent pointer-events-none z-10" />

      {/* Ambient Video Edge Glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30 mix-blend-screen"
        style={{
          boxShadow: `inset 0 0 70px ${ambientColor}`,
        }}
      />
    </div>
  );
};
