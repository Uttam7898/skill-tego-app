import React, { useState } from 'react';
import type { Reel } from '../../types/reel';
import { ReelVideo } from './ReelVideo';
import { CreatorInfo } from './CreatorInfo';
import { ReelControls } from './ReelControls';
import { ReelProgress } from './ReelProgress';
import { CommentsDrawer } from './CommentsDrawer';
import { ShareModal } from './ShareModal';
import { CodePreviewModal } from './CodePreviewModal';

interface ReelCardProps {
  reel: Reel;
  isActive: boolean;
  isMuted: boolean;
  isPlaying: boolean;
  isAutoplayPaused: boolean;
  totalReels: number;
  currentIndex: number;
  progressPercent: number;
  onProgress: (percent: number) => void;
  onVideoEnded: () => void;
  onTogglePlay: () => void;
  onToggleMute: () => void;
  onToggleLike: (reelId: string) => void;
  onToggleSave: (reelId: string) => void;
  onFollowToggle: (creatorId: string) => void;
  onAddComment: (reelId: string, text: string) => void;
  onSelectReel: (index: number) => void;
  onPrevReel?: () => void;
  onNextReel?: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
  onTagClick?: (tag: string) => void;
}

export const ReelCard: React.FC<ReelCardProps> = ({
  reel,
  isActive,
  isMuted,
  isPlaying,
  isAutoplayPaused,
  totalReels,
  currentIndex,
  progressPercent,
  onProgress,
  onVideoEnded,
  onTogglePlay,
  onToggleMute,
  onToggleLike,
  onToggleSave,
  onFollowToggle,
  onAddComment,
  onSelectReel,
  onPrevReel,
  onNextReel,
  hasPrev,
  hasNext,
  onTagClick,
}) => {
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);

  return (
    <div className="relative w-full h-full flex items-center justify-center p-0 sm:p-4 md:p-6 overflow-hidden">
      {/* 9:16 Center Phone / Reel Viewport Container */}
      <div
        className="relative w-full h-full sm:h-[92vh] sm:max-w-[420px] md:max-w-[430px] lg:max-w-[440px] sm:aspect-[9/16] bg-[#070712] sm:rounded-3xl overflow-hidden shadow-[0_20px_70px_rgba(0,0,0,0.8)] sm:border sm:border-white/20 transition-all duration-500"
        style={{
          boxShadow: isActive
            ? `0 0 50px -10px ${reel.ambientColor}66, 0 25px 60px -15px rgba(0,0,0,0.9)`
            : undefined,
        }}
      >
        {/* Story Progress Indicator (Top & Right) */}
        <ReelProgress
          totalReels={totalReels}
          currentIndex={currentIndex}
          progressPercent={progressPercent}
          onSelectReel={onSelectReel}
          accentColor={reel.ambientColor}
        />

        {/* Video Player + Live Canvas Simulation */}
        <ReelVideo
          reelId={reel.id}
          videoUrl={reel.videoUrl}
          posterUrl={reel.posterUrl}
          isActive={isActive}
          isMuted={isMuted}
          isPlaying={isPlaying}
          onProgress={onProgress}
          onVideoEnded={onVideoEnded}
          onTogglePlay={onTogglePlay}
          onDoubleTapLike={() => onToggleLike(reel.id)}
          ambientColor={reel.ambientColor}
          secondaryColor={reel.secondaryColor}
          codeSnippet={reel.project.codeSnippet}
        />

        {/* Bottom Overlay Info & Controls */}
        <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 flex items-end justify-between z-20 pointer-events-none">
          {/* Left: Creator Info, Description & Skill Tags */}
          <CreatorInfo
            reel={reel}
            onFollowToggle={onFollowToggle}
            onOpenCodePreview={() => setIsCodeModalOpen(true)}
            onTagClick={onTagClick}
          />

          {/* Right: Action Buttons Rail */}
          <ReelControls
            reel={reel}
            isMuted={isMuted}
            isPlaying={isPlaying}
            isAutoplayPaused={isAutoplayPaused}
            onToggleLike={() => onToggleLike(reel.id)}
            onOpenComments={() => setIsCommentsOpen(true)}
            onOpenShare={() => setIsShareOpen(true)}
            onToggleSave={() => onToggleSave(reel.id)}
            onToggleMute={onToggleMute}
            onTogglePlay={onTogglePlay}
            onOpenCodePreview={() => setIsCodeModalOpen(true)}
            onPrevReel={onPrevReel}
            onNextReel={onNextReel}
            hasPrev={hasPrev}
            hasNext={hasNext}
          />
        </div>

        {/* Slide-up Comments Drawer */}
        <CommentsDrawer
          isOpen={isCommentsOpen}
          onClose={() => setIsCommentsOpen(false)}
          comments={reel.commentsList}
          onAddComment={(text) => onAddComment(reel.id, text)}
          reelTitle={reel.project.title}
        />
      </div>

      {/* Share Modal */}
      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        reel={reel}
      />

      {/* Code Snippet Modal */}
      <CodePreviewModal
        isOpen={isCodeModalOpen}
        onClose={() => setIsCodeModalOpen(false)}
        reel={reel}
      />
    </div>
  );
};
