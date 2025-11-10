import React from 'react';

export const ArtistImageSkeleton: React.FC = () => (
  <div
    className="h-64 w-full rounded bg-neutral-800 animate-pulse"
    aria-label="Carregando imagem do artista"
  />
);

export default ArtistImageSkeleton;
