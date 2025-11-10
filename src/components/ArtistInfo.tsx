import React from 'react';
import { formatFollowers } from '../utils';

interface ArtistInfoProps {
  artist: {
    followers: { total: number };
    popularity: number;
    id: string;
    type: string;
    uri: string;
    name: string;
  };
  genres: string[];
  isLoading?: boolean;
  className?: string;
}

export const ArtistInfo: React.FC<ArtistInfoProps> = ({
  artist,
  genres,
  isLoading = false,
  className = '',
}) => {
  return (
    <div
      className={[
        'md:col-span-2 space-y-6 bg-[#121212] rounded-lg border border-[#1ed7601a] shadow-[0_0_0_1px_#1ed76010] p-6',
        className,
      ].join(' ')}
    >
      {isLoading ? (
        <div
          className="space-y-4"
          aria-label="Carregando informações do artista"
        >
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
      ) : (
        <>
          <section className="space-y-4">
            <h2 className="text-xl font-semibold mb-2">Informações Gerais</h2>
            <ul className="divide-y divide-neutral-800 text-sm text-neutral-300">
              <li className="py-2 flex justify-between">
                <span className="font-medium text-neutral-400">Seguidores</span>
                <span>{formatFollowers(artist.followers.total)}</span>
              </li>
              <li className="py-2 flex justify-between">
                <span className="font-medium text-neutral-400">
                  Popularidade
                </span>
                <span>{artist.popularity}%</span>
              </li>
              <li className="py-2 flex justify-between">
                <span className="font-medium text-neutral-400">ID</span>
                <span className="font-mono text-xs break-all">{artist.id}</span>
              </li>
              <li className="py-2 flex justify-between">
                <span className="font-medium text-neutral-400">Tipo</span>
                <span>{artist.type}</span>
              </li>
              <li className="py-2 flex justify-between">
                <span className="font-medium text-neutral-400">URI</span>
                <span className="font-mono text-xs break-all">
                  {artist.uri}
                </span>
              </li>
            </ul>
          </section>
          {genres.length > 0 && (
            <section className="space-y-3">
              <h2 className="text-xl font-semibold mb-2">Gêneros</h2>
              <ul className="flex flex-wrap gap-2">
                {genres.map(g => (
                  <li
                    key={g}
                    className="text-xs px-3 py-1 rounded-full border border-green-500/40 text-green-300 bg-green-500/10"
                  >
                    {g}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </>
      )}
    </div>
  );
};

export default ArtistInfo;
