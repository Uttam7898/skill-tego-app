import React from 'react';

interface ReelProgressProps {
  totalReels: number;
  currentIndex: number;
  progressPercent: number; // 0 to 100 for currently active reel
  onSelectReel: (index: number) => void;
  accentColor?: string;
}

export const ReelProgress: React.FC<ReelProgressProps> = ({
  totalReels,
  currentIndex,
  progressPercent,
  onSelectReel,
  accentColor = '#6366f1',
}) => {
  return (
    <>
      {/* Top Segmented Story Progress Bar */}
      <div className="absolute top-3 left-3 right-3 flex items-center gap-1.5 z-30 pointer-events-auto">
        {Array.from({ length: totalReels }).map((_, idx) => {
          const isPassed = idx < currentIndex;
          const isCurrent = idx === currentIndex;
          const fillWidth = isPassed ? 100 : isCurrent ? progressPercent : 0;

          return (
            <div
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                onSelectReel(idx);
              }}
              className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden cursor-pointer hover:h-1.5 transition-all duration-150 backdrop-blur-sm"
              title={`Jump to Reel ${idx + 1}`}
            >
              <div
                className="h-full rounded-full transition-all duration-75 ease-linear"
                style={{
                  width: `${fillWidth}%`,
                  backgroundColor: isCurrent ? accentColor : '#ffffff',
                  boxShadow: isCurrent ? `0 0 10px ${accentColor}` : 'none',
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Right Side Vertical Progress Indicator (As specified: ● ● ● ● ● and 01 / 05) */}
      <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-3 z-30 select-none pointer-events-auto py-3 px-1.5 rounded-full bg-black/35 backdrop-blur-md border border-white/10 shadow-xl">
        {/* Numeric Step Indicator (01 / 05) */}
        <div className="text-[10px] font-mono font-bold text-white/90 tracking-tighter mb-1">
          {String(currentIndex + 1).padStart(2, '0')}
          <span className="text-white/40 block text-[9px]">/ {String(totalReels).padStart(2, '0')}</span>
        </div>

        {/* Vertical Dots */}
        <div className="flex flex-col items-center gap-2.5">
          {Array.from({ length: totalReels }).map((_, idx) => {
            const isCurrent = idx === currentIndex;
            const isPassed = idx < currentIndex;

            return (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectReel(idx);
                }}
                className="relative group p-1 focus:outline-none"
                title={`Go to Reel ${idx + 1}`}
              >
                {/* Dot Base */}
                <span
                  className={`block rounded-full transition-all duration-300 ${
                    isCurrent
                      ? 'w-2.5 h-6 bg-gradient-to-b from-indigo-400 to-cyan-400 shadow-lg shadow-cyan-400/50 scale-100'
                      : isPassed
                      ? 'w-2 h-2 bg-white/70 hover:bg-white hover:scale-125'
                      : 'w-2 h-2 bg-white/25 hover:bg-white/50 hover:scale-125'
                  }`}
                />

                {/* Pulsing Aura for active dot */}
                {isCurrent && (
                  <span
                    className="absolute inset-0 rounded-full animate-ping opacity-40 -z-10"
                    style={{ backgroundColor: accentColor }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};
