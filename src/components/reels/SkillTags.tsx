import React from 'react';
import { Sparkles, Code2, Cpu, Flame, Layers } from 'lucide-react';

interface SkillTagsProps {
  tags: string[];
  activeColor?: string;
  onTagClick?: (tag: string) => void;
}

const getTagIcon = (tag: string) => {
  const lower = tag.toLowerCase();
  if (lower.includes('ai') || lower.includes('llm') || lower.includes('vision') || lower.includes('tensor')) {
    return <Cpu className="w-3 h-3 text-cyan-400" />;
  }
  if (lower.includes('react') || lower.includes('node') || lower.includes('go') || lower.includes('python') || lower.includes('type')) {
    return <Code2 className="w-3 h-3 text-indigo-400" />;
  }
  if (lower.includes('webgl') || lower.includes('three') || lower.includes('glsl') || lower.includes('motion')) {
    return <Sparkles className="w-3 h-3 text-fuchsia-400" />;
  }
  if (lower.includes('design') || lower.includes('css') || lower.includes('ui')) {
    return <Layers className="w-3 h-3 text-emerald-400" />;
  }
  return <Flame className="w-3 h-3 text-amber-400" />;
};

export const SkillTags: React.FC<SkillTagsProps> = ({ tags, onTagClick }) => {
  return (
    <div className="flex flex-wrap items-center gap-1.5 pt-1.5">
      {tags.map((tag, idx) => (
        <button
          key={`${tag}-${idx}`}
          onClick={(e) => {
            e.stopPropagation();
            onTagClick?.(tag);
          }}
          className="group inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-black/40 hover:bg-white/15 text-slate-200 hover:text-white border border-white/10 hover:border-white/30 backdrop-blur-md transition-all duration-200 active:scale-95 shadow-sm"
        >
          {getTagIcon(tag)}
          <span>{tag}</span>
        </button>
      ))}
    </div>
  );
};
