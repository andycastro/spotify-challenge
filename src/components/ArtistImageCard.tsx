import React from 'react';

interface ArtistImageCardProps {
  name: string;
  imageUrl?: string;
  isLoading?: boolean;
  className?: string;
  imgAltPrefix?: string;
  heightClass?: string;
}

export const ArtistImageCard: React.FC<ArtistImageCardProps> = ({
  name,
  imageUrl,
  isLoading = false,
  className = '',
  imgAltPrefix = 'Imagem de',
  heightClass = 'h-64',
}) => {
  return (
    <div
      className={[
        'md:col-span-1 bg-[#121212] rounded-lg border border-[#1ed7601a] shadow-[0_0_0_1px_#1ed76010] p-4 flex items-center justify-center',
        className,
      ].join(' ')}
    >
      {isLoading ? (
        <div
          className={`${heightClass} w-full rounded bg-neutral-800 animate-pulse`}
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
          className={[
            heightClass,
            'flex items-center justify-center rounded bg-neutral-900 text-6xl font-semibold text-neutral-600 w-full select-none',
          ].join(' ')}
          aria-label={`Sem imagem para ${name}`}
        >
          {name.charAt(0).toUpperCase()}
        </div>
      )}
    </div>
  );
};

export default ArtistImageCard;
