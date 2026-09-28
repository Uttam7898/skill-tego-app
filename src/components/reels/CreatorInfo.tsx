import React, { useState } from 'react';
import { CheckCircle2, UserPlus, Check, ExternalLink, Code, Activity } from 'lucide-react';
import type { Reel } from '../../types/reel';
import { SkillTags } from './SkillTags';

interface CreatorInfoProps {
  reel: Reel;
  onFollowToggle?: (creatorId: string) => void;
  onOpenCodePreview?: () => void;
  onTagClick?: (tag: string) => void;
}

export const CreatorInfo: React.FC<CreatorInfoProps> = ({
  reel,
  onFollowToggle,
  onOpenCodePreview,
  onTagClick,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { creator, project, tags, skill } = reel;

  return (
    <div className="flex flex-col gap-2 max-w-[84%] sm:max-w-[80%] text-left select-none pointer-events-auto">
      {/* Frosted Glass Creator & Project Card */}
      <div className="p-3 sm:p-3.5 rounded-2xl bg-black/65 backdrop-blur-xl border border-white/20 shadow-2xl space-y-2">
        {/* Creator Row */}
        <div className="flex items-center gap-2.5">
          <div className="relative group cursor-pointer flex-shrink-0">
            <div className="w-10 h-10 rounded-full p-[2px] bg-gradient-to-tr from-indigo-500 via-cyan-400 to-fuchsia-500 shadow-md shadow-indigo-500/30">
              <img
                src={creator.avatar}
                alt={creator.name}
                className="w-full h-full rounded-full object-cover border border-black/70"
              />
            </div>
            {creator.verified && (
              <div className="absolute -bottom-1 -right-1 bg-indigo-600 text-white rounded-full p-0.5 shadow-md">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-300 fill-cyan-400/30" />
              </div>
            )}
          </div>

          <div className="flex flex-col min-w-0 flex-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h4 className="font-bold text-white text-sm tracking-tight truncate hover:underline cursor-pointer">
                {creator.name}
              </h4>
              
              {/* Follow Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onFollowToggle?.(creator.id);
                }}
                className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold transition-all duration-300 active:scale-95 ${
                  creator.isFollowing
                    ? 'bg-white/20 text-slate-200 border border-white/25'
                    : 'bg-gradient-to-r from-indigo-500 to-cyan-500 text-white shadow-md shadow-indigo-500/30 hover:brightness-110'
                }`}
              >
                {creator.isFollowing ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span>Following</span>
                  </>
                ) : (
                  <>
                    <UserPlus className="w-3 h-3" />
                    <span>Follow</span>
                  </>
                )}
              </button>
            </div>

            <div className="flex items-center gap-1.5 text-[11px] text-cyan-300 font-medium truncate">
              <span>{creator.role}</span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-300 font-mono">{skill}</span>
            </div>
          </div>
        </div>

        {/* Project Header & Live Metric */}
        <div className="space-y-1 pt-1 border-t border-white/10">
          <div className="flex items-center gap-1.5 flex-wrap">
            <h3 className="text-white font-bold text-sm sm:text-base leading-snug drop-shadow-sm">
              {project.title}
            </h3>
            {project.performanceMetric && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/25 text-emerald-300 border border-emerald-400/40 shadow-sm">
                <Activity className="w-2.5 h-2.5 text-emerald-400 animate-pulse" />
                {project.performanceMetric}
              </span>
            )}
          </div>

          <p className="text-slate-200 text-xs font-normal leading-relaxed">
            "{project.tagline}"
          </p>

          {isExpanded && (
            <p className="text-slate-300 text-xs mt-1.5 p-2 rounded-lg bg-white/5 border border-white/10 leading-relaxed font-normal">
              {project.description}
            </p>
          )}

          {/* Quick Action Links */}
          <div className="flex items-center gap-3 text-[11px] font-medium pt-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(!isExpanded);
              }}
              className="text-slate-400 hover:text-white transition-colors underline-offset-2 hover:underline"
            >
              {isExpanded ? 'Less' : 'Story...'}
            </button>

            {project.codeSnippet && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenCodePreview?.();
                }}
                className="inline-flex items-center gap-1 text-cyan-300 hover:text-cyan-200 transition-colors font-mono font-semibold"
              >
                <Code className="w-3 h-3" />
                <span>Source Code</span>
              </button>
            )}

            {project.liveDemoUrl && (
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1 text-indigo-300 hover:text-indigo-200 transition-colors"
              >
                <ExternalLink className="w-3 h-3" />
                <span>Live Demo</span>
              </a>
            )}
          </div>
        </div>

        {/* Skill Tags */}
        <SkillTags tags={tags} onTagClick={onTagClick} />
      </div>
    </div>
  );
};
