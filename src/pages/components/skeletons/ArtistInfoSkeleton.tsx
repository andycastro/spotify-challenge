import React from 'react';

export const ArtistInfoSkeleton: React.FC = () => (
  <div className="space-y-4" aria-label="Carregando informações do artista">
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
);

export default ArtistInfoSkeleton;
