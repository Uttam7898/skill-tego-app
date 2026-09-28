import React, { useState } from 'react';
import { X, Send, Heart, MessageSquare } from 'lucide-react';
import type { ReelComment } from '../../types/reel';

interface CommentsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  comments: ReelComment[];
  onAddComment: (text: string) => void;
  reelTitle: string;
}

export const CommentsDrawer: React.FC<CommentsDrawerProps> = ({
  isOpen,
  onClose,
  comments,
  onAddComment,
  reelTitle,
}) => {
  const [inputText, setInputText] = useState('');
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onAddComment(inputText.trim());
    setInputText('');
  };

  const toggleCommentLike = (id: string) => {
    setLikedMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div
      className="absolute inset-0 z-50 bg-black/60 backdrop-blur-md flex flex-col justify-end transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        className="relative w-full max-h-[75%] bg-[#0e0e1a]/95 border-t border-white/15 rounded-t-2xl flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-bottom duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 bg-white/5">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-cyan-400" />
            <h3 className="font-semibold text-white text-sm">
              Discussion ({comments.length})
            </h3>
            <span className="text-[11px] text-slate-400 font-mono truncate max-w-[150px]">
              • {reelTitle}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Comments List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[380px]">
          {comments.map((comment) => {
            const isLiked = likedMap[comment.id] || comment.isLiked;
            return (
              <div key={comment.id} className="flex items-start gap-3 text-left group">
                <img
                  src={comment.avatar}
                  alt={comment.author}
                  className="w-8 h-8 rounded-full object-cover border border-white/10 mt-0.5"
                />
                <div className="flex-1 flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-white">{comment.author}</span>
                    {comment.role && (
                      <span className="text-[10px] text-cyan-300/80 font-medium">
                        {comment.role}
                      </span>
                    )}
                    <span className="text-[10px] text-slate-500">{comment.timestamp}</span>
                  </div>
                  <p className="text-xs text-slate-200 mt-1 leading-relaxed">{comment.content}</p>
                </div>

                <button
                  onClick={() => toggleCommentLike(comment.id)}
                  className="flex flex-col items-center gap-0.5 text-slate-400 hover:text-rose-400 transition-colors pt-1"
                >
                  <Heart
                    className={`w-3.5 h-3.5 ${
                      isLiked ? 'fill-rose-500 text-rose-500' : ''
                    }`}
                  />
                  <span className="text-[10px] font-mono">
                    {comment.likes + (isLiked ? 1 : 0)}
                  </span>
                </button>
              </div>
            );
          })}
        </div>

        {/* Input Field */}
        <form onSubmit={handleSubmit} className="p-3 border-t border-white/10 bg-black/40 flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask a technical question or share feedback..."
            className="flex-1 bg-white/10 border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/40 transition-all"
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="p-2 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:brightness-110 active:scale-95 transition-all shadow-md shadow-indigo-500/30"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
