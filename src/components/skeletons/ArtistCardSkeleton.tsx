import React from 'react';

export const ArtistCardSkeleton: React.FC = () => {
  return (
    <div
      className="relative flex flex-col rounded-lg border overflow-hidden animate-pulse
        bg-white border-green-500/10 shadow-[0_0_0_1px_rgba(16,16,16,0.05)]
        dark:bg-[#121212] dark:border-[#1ed7601a] dark:shadow-[0_0_0_1px_#1ed76010]"
      aria-hidden="true"
    >
      <div className="w-full h-[456px] bg-neutral-200 dark:bg-neutral-800" />
      <div className="flex flex-1 flex-col p-3 gap-3">
        <div className="space-y-2">
          <div className="h-4 w-3/4 rounded bg-neutral-200 dark:bg-neutral-700" />
          <div className="h-3 w-1/2 rounded bg-neutral-200 dark:bg-neutral-800" />
        </div>
        <div className="flex gap-2 mt-auto">
          <div className="h-5 w-14 rounded-full bg-neutral-200 dark:bg-neutral-800" />
          <div className="h-5 w-12 rounded-full bg-neutral-200 dark:bg-neutral-800" />
          <div className="h-5 w-16 rounded-full bg-neutral-200 dark:bg-neutral-800" />
        </div>
        <div className="space-y-1">
          <div className="h-2 w-full rounded bg-neutral-200 dark:bg-neutral-800" />
        </div>
      </div>
    </div>
  );
};

export default ArtistCardSkeleton;
