import React, { useState, useEffect, useRef, useCallback } from 'react';
import type { Reel } from '../../types/reel';
import { ReelCard } from './ReelCard';
import { AmbientBackground } from './AmbientBackground';
import { Play, Pause, Volume2, VolumeX, ArrowDown, Compass } from 'lucide-react';

interface ReelsContainerProps {
  reels: Reel[];
  onExitReels?: () => void;
}

export const ReelsContainer: React.FC<ReelsContainerProps> = ({
  reels: initialReels,
  onExitReels,
}) => {
  const [reels, setReels] = useState<Reel[]>(initialReels);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);
  const [progressPercent, setProgressPercent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Inactivity timeout ref to resume auto-scroll after manual interaction
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autoAdvanceTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartYRef = useRef<number>(0);
  const touchEndYRef = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalReels = reels.length;
  const currentReel = reels[currentIndex] || reels[0];

  // Reset idle timer
  const registerUserInteraction = useCallback(() => {
    setIsAutoplayPaused(true);
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);

    // Resume autoplay after 5 seconds of inactivity
    idleTimerRef.current = setTimeout(() => {
      setIsAutoplayPaused(false);
    }, 5000);
  }, []);

  // Smooth transition to target index
  const goToReel = useCallback(
    (index: number) => {
      if (index < 0 || index >= totalReels || isTransitioning) return;
      setIsTransitioning(true);
      setProgressPercent(0);
      setCurrentIndex(index);
      setIsPlaying(true);

      setTimeout(() => {
        setIsTransitioning(false);
      }, 500);
    },
    [totalReels, isTransitioning]
  );

  const nextReel = useCallback(() => {
    if (currentIndex < totalReels - 1) {
      goToReel(currentIndex + 1);
    } else {
      // Loop back to first reel or transition smoothly
      goToReel(0);
    }
  }, [currentIndex, totalReels, goToReel]);

  const prevReel = useCallback(() => {
    if (currentIndex > 0) {
      goToReel(currentIndex - 1);
    }
  }, [currentIndex, goToReel]);

  // Autoplay timer simulation if video duration isn't firing progress (or standard 12s timer)
  useEffect(() => {
    if (isAutoplayPaused || !isPlaying) {
      if (autoAdvanceTimerRef.current) clearInterval(autoAdvanceTimerRef.current);
      return;
    }

    const interval = 100; // tick every 100ms
    const step = 100 / (12000 / interval); // ~12 seconds per reel

    autoAdvanceTimerRef.current = setInterval(() => {
      setProgressPercent((prev) => {
        if (prev >= 100) {
          nextReel();
          return 0;
        }
        return prev + step;
      });
    }, interval);

    return () => {
      if (autoAdvanceTimerRef.current) clearInterval(autoAdvanceTimerRef.current);
    };
  }, [currentIndex, isAutoplayPaused, isPlaying, nextReel]);

  // Video progress callback from <video> timeupdate
  const handleVideoProgress = (percent: number) => {
    if (!isNaN(percent) && percent > 0) {
      setProgressPercent(percent);
    }
  };

  const handleVideoEnded = () => {
    nextReel();
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowDown', 'PageDown', 'j'].includes(e.key)) {
        e.preventDefault();
        registerUserInteraction();
        nextReel();
      } else if (['ArrowUp', 'PageUp', 'k'].includes(e.key)) {
        e.preventDefault();
        registerUserInteraction();
        prevReel();
      } else if (e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault();
        registerUserInteraction();
        setIsPlaying((prev) => !prev);
      } else if (e.key === 'm' || e.key === 'M') {
        e.preventDefault();
        setIsMuted((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextReel, prevReel, registerUserInteraction]);

  // Wheel scroll with debounced momentum
  const wheelLockRef = useRef<boolean>(false);
  const handleWheel = (e: React.WheelEvent) => {
    registerUserInteraction();
    if (wheelLockRef.current) return;

    if (Math.abs(e.deltaY) > 40) {
      wheelLockRef.current = true;
      if (e.deltaY > 0) {
        nextReel();
      } else {
        prevReel();
      }

      setTimeout(() => {
        wheelLockRef.current = false;
      }, 700);
    }
  };

  // Touch Swipe Handlers for Mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartYRef.current = e.touches[0].clientY;
    touchEndYRef.current = e.touches[0].clientY;
    registerUserInteraction();
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = () => {
    const distance = touchStartYRef.current - touchEndYRef.current;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      nextReel();
    } else if (distance < -minSwipeDistance) {
      prevReel();
    }
  };

  // Like Toggle
  const handleToggleLike = (reelId: string) => {
    registerUserInteraction();
    setReels((prev) =>
      prev.map((r) =>
        r.id === reelId ? { ...r, isLiked: !r.isLiked } : r
      )
    );
  };

  // Save Toggle
  const handleToggleSave = (reelId: string) => {
    registerUserInteraction();
    setReels((prev) =>
      prev.map((r) =>
        r.id === reelId ? { ...r, isSaved: !r.isSaved } : r
      )
    );
  };

  // Follow Creator Toggle
  const handleFollowToggle = (creatorId: string) => {
    registerUserInteraction();
    setReels((prev) =>
      prev.map((r) =>
        r.creator.id === creatorId
          ? {
              ...r,
              creator: {
                ...r.creator,
                isFollowing: !r.creator.isFollowing,
                followersCount: r.creator.isFollowing
                  ? r.creator.followersCount - 1
                  : r.creator.followersCount + 1,
              },
            }
          : r
      )
    );
  };

  // Add Comment
  const handleAddComment = (reelId: string, text: string) => {
    registerUserInteraction();
    const newComment = {
      id: `c-${Date.now()}`,
      author: 'You (Recruiter / Peer)',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      role: 'Talent Scout',
      timestamp: 'Just now',
      content: text,
      likes: 0,
    };

    setReels((prev) =>
      prev.map((r) =>
        r.id === reelId
          ? {
              ...r,
              metrics: { ...r.metrics, comments: r.metrics.comments + 1 },
              commentsList: [newComment, ...r.commentsList],
            }
          : r
      )
    );
  };

  return (
    <section
      id="skill-reels-experience"
      ref={containerRef}
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseEnter={registerUserInteraction}
      className="relative w-full h-screen bg-[#05050b] text-white flex flex-col items-center justify-center overflow-hidden select-none"
    >
      {/* Dynamic Desktop Ambient Aura & Telemetry HUD */}
      <AmbientBackground currentReel={currentReel} />

      {/* Top Experience Floating Bar */}
      <div className="absolute top-4 inset-x-0 mx-auto max-w-5xl px-4 flex items-center justify-between z-30 pointer-events-none">
        <div className="flex items-center gap-2 pointer-events-auto">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/50 border border-white/15 backdrop-blur-xl text-xs font-semibold shadow-lg">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            <span className="text-white tracking-wide font-mono">LIVE DEMO STREAM</span>
            <span className="text-slate-500">•</span>
            <span className="text-cyan-400 font-mono text-[11px]">{currentIndex + 1}/{totalReels}</span>
          </div>

          {isAutoplayPaused && (
            <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 backdrop-blur-md text-[11px] font-mono animate-in fade-in">
              <span>Paused on interaction</span>
            </div>
          )}
        </div>

        {/* Global Controls & Exit Button */}
        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            onClick={() => {
              registerUserInteraction();
              setIsPlaying(!isPlaying);
            }}
            className="p-2 rounded-full bg-black/50 hover:bg-white/15 text-slate-300 hover:text-white border border-white/10 backdrop-blur-md transition-all text-xs flex items-center gap-1.5"
            title={isPlaying ? 'Pause Auto-Play' : 'Resume Auto-Play'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span className="hidden md:inline font-mono">{isPlaying ? 'Autoplay ON' : 'Paused'}</span>
          </button>

          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-2 rounded-full bg-black/50 hover:bg-white/15 text-slate-300 hover:text-white border border-white/10 backdrop-blur-md transition-all text-xs"
            title={isMuted ? 'Unmute All' : 'Mute All'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-cyan-400" />}
          </button>

          {onExitReels && (
            <button
              onClick={onExitReels}
              className="px-3.5 py-1.5 rounded-full bg-indigo-600/30 hover:bg-indigo-600/60 text-indigo-200 border border-indigo-500/40 backdrop-blur-md transition-all text-xs font-semibold flex items-center gap-1.5"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Explore Talent</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Reel Slider Container with Vertical Momentum easing */}
      <div className="relative w-full h-full flex items-center justify-center">
        {reels.map((reel, idx) => {
          const isActive = idx === currentIndex;
          const isPrev = idx < currentIndex;

          return (
            <div
              key={reel.id}
              className={`absolute inset-0 flex items-center justify-center transition-all duration-700 cubic-bezier(0.16, 1, 0.3, 1) ${
                isActive ? 'z-20 pointer-events-auto' : 'z-0 pointer-events-none'
              }`}
              style={{
                transform: isActive ? 'translateY(0%) scale(1)' : isPrev ? 'translateY(-100%) scale(0.95)' : 'translateY(100%) scale(0.95)',
                opacity: isActive ? 1 : 0,
                filter: isTransitioning && !isActive ? 'blur(8px)' : 'none',
              }}
            >
              {(isActive || Math.abs(idx - currentIndex) <= 1) && (
                <ReelCard
                  reel={reel}
                  isActive={isActive}
                  isMuted={isMuted}
                  isPlaying={isPlaying && isActive}
                  isAutoplayPaused={isAutoplayPaused}
                  totalReels={totalReels}
                  currentIndex={currentIndex}
                  progressPercent={isActive ? progressPercent : 0}
                  onProgress={handleVideoProgress}
                  onVideoEnded={handleVideoEnded}
                  onTogglePlay={() => {
                    registerUserInteraction();
                    setIsPlaying(!isPlaying);
                  }}
                  onToggleMute={() => setIsMuted(!isMuted)}
                  onToggleLike={handleToggleLike}
                  onToggleSave={handleToggleSave}
                  onFollowToggle={handleFollowToggle}
                  onAddComment={handleAddComment}
                  onSelectReel={(targetIdx) => {
                    registerUserInteraction();
                    goToReel(targetIdx);
                  }}
                  onPrevReel={() => {
                    registerUserInteraction();
                    prevReel();
                  }}
                  onNextReel={() => {
                    registerUserInteraction();
                    nextReel();
                  }}
                  hasPrev={currentIndex > 0}
                  hasNext={currentIndex < totalReels - 1}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Hint Banner for Mobile / Desktop */}
      <div className="absolute bottom-2 inset-x-0 flex items-center justify-center z-30 pointer-events-none text-[11px] text-slate-400 font-mono opacity-60">
        <span className="hidden sm:inline">Scroll or use ↑ / ↓ keys to navigate reels</span>
        <span className="sm:hidden flex items-center gap-1">Swipe up for next reel <ArrowDown className="w-3 h-3 animate-bounce" /></span>
      </div>
    </section>
  );
};
