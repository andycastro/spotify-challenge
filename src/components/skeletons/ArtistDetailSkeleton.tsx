import React from 'react';

// Full-page skeleton for initial artist + albums loading on detail view
export const ArtistDetailSkeleton: React.FC = () => {
  return (
    <div className="space-y-6" aria-hidden="true">
      {/* Header skeleton */}
      <div className="flex items-center justify-between">
        <div className="h-10 w-64 bg-neutral-800 rounded animate-pulse" />
        <div className="flex gap-3">
          <div className="h-9 w-40 bg-neutral-800 rounded animate-pulse" />
          <div className="h-9 w-24 bg-neutral-800 rounded animate-pulse" />
        </div>
      </div>

      {/* Artist info grid skeleton */}
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1 bg-[#121212] rounded-lg border border-[#1ed7601a] shadow-[0_0_0_1px_#1ed76010] p-4 flex items-center justify-center">
          <div className="h-64 w-full rounded bg-neutral-800 animate-pulse" />
        </div>
        <div className="md:col-span-2 space-y-6 bg-[#121212] rounded-lg border border-[#1ed7601a] shadow-[0_0_0_1px_#1ed76010] p-6">
          <div className="space-y-4">
            <div className="h-6 w-48 bg-neutral-800 rounded animate-pulse" />
            <div className="space-y-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="h-5 w-full bg-neutral-800 rounded animate-pulse"
                />
              ))}
            </div>
            <div className="h-6 w-32 bg-neutral-800 rounded animate-pulse" />
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <span
                  key={`genre-skel-${i}`}
                  className="h-6 w-16 bg-neutral-800 rounded animate-pulse"
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Albums section skeleton */}
      <div className="bg-[#121212] rounded-lg border border-[#1ed7601a] shadow-[0_0_0_1px_#1ed76010] p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="h-6 w-32 bg-neutral-800 rounded animate-pulse" />
          <div className="flex gap-2 items-center">
            <div className="h-6 w-16 bg-neutral-800 rounded animate-pulse" />
            <div className="h-6 w-16 bg-neutral-800 rounded animate-pulse" />
            <div className="h-4 w-28 bg-neutral-800 rounded animate-pulse" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left bg-neutral-900">
                {Array.from({ length: 6 }).map((_, i) => (
                  <th key={i} className="py-2 px-3">
                    <div className="h-4 w-20 bg-neutral-800 rounded animate-pulse" />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 6 }).map((_, i) => (
                <tr
                  key={`album-skel-load-${i}`}
                  className={
                    i % 2 === 0 ? 'bg-neutral-900/40' : 'bg-neutral-800/40'
                  }
                >
                  {Array.from({ length: 6 }).map((_, j) => (
                    <td key={j} className="py-3 px-3">
                      <div className="h-4 w-full bg-neutral-800 rounded animate-pulse" />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ArtistDetailSkeleton;
