import React from 'react';

interface ArtistImageCardProps {
  name: string;
  imageUrl?: string;
  isLoading?: boolean;
  imgAltPrefix?: string;
  heightClass?: string;
}

export const ArtistImageCard: React.FC<ArtistImageCardProps> = ({
  name,
  imageUrl,
  isLoading = false,
  imgAltPrefix = 'Imagem de',
  heightClass = 'h-64',
}) => {
  return (
    <div className="md:col-span-1 rounded-lg border p-4 flex items-center justify-center bg-white border-green-500/10 shadow-[0_0_0_1px_rgba(16,16,16,0.05)] dark:bg-[#121212] dark:border-[#1ed7601a] dark:shadow-[0_0_0_1px_#1ed76010]">
      {isLoading ? (
        <div
          className={`${heightClass} w-full rounded bg-neutral-200 animate-pulse dark:bg-neutral-800`}
          aria-label="Carregando imagem do artista"
        />
      ) : imageUrl ? (
        <img
          src={imageUrl}
          alt={`${imgAltPrefix} ${name}`}
          className={`rounded-lg w-full object-cover shadow-lg ${heightClass}`}
        />
      ) : (
        <div
          className={`${heightClass} flex items-center justify-center rounded bg-neutral-100 text-6xl font-semibold text-neutral-400 w-full select-none dark:bg-neutral-900 dark:text-neutral-600`}
          aria-label={`Sem imagem para ${name}`}
        >
          {name.charAt(0).toUpperCase()}
        </div>
      )}
    </div>
  );
};

export default ArtistImageCard;
