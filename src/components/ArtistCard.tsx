import { ExternalLink } from 'lucide-react';
import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import type { SpotifyArtist } from '../api';
import { formatFollowers } from '../utils';

interface ArtistCardProps {
  artist: SpotifyArtist;
}

export const ArtistCard: React.FC<ArtistCardProps> = React.memo(
  ({ artist }) => {
    const image = artist.images?.[0]?.url;
    const popularityPct = useMemo(
      () => Math.min(Math.max(artist.popularity ?? 0, 0), 100),
      [artist.popularity]
    );
    const topGenres = useMemo(
      () => (artist.genres ?? []).slice(0, 3),
      [artist.genres]
    );
    const navigate = useNavigate();

    return (
      <div
        className="group relative flex flex-col rounded-lg border border-[#1ed7601a] bg-[#121212] overflow-hidden shadow-[0_0_0_1px_#1ed76010] hover:shadow-[0_0_0_1px_#1ed76040,0_4px_16px_-2px_rgba(0,0,0,0.6)] transition duration-200 cursor-pointer"
        onClick={() => navigate(`/artist-detail/${artist.id}`)}
        role="button"
        tabIndex={0}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            navigate(`/artist-detail/${artist.id}`);
          }
        }}
        aria-label={`Ver detalhes do artista ${artist.name}`}
      >
        <div className="relative w-full h-[360px] md:h-[456px] bg-neutral-900">
          {image ? (
            <img
              src={image}
              alt={`Foto do artista ${artist.name}`}
              className="h-full w-full object-cover object-center transition duration-300 group-hover:scale-[1.02]"
              loading="lazy"
              decoding="async"
              height={456}
              width={456}
              sizes="(max-width: 768px) 360px, 456px"
            />
          ) : (
            <div
              className="flex h-full w-full items-center justify-center text-neutral-600 text-6xl font-semibold"
              aria-hidden="true"
            >
              {artist.name?.charAt(0).toUpperCase() || 'A'}
            </div>
          )}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition" />
          {artist.external_urls?.spotify && (
            <a
              href={artist.external_urls.spotify}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="absolute right-2 top-2 inline-flex items-center gap-1 rounded bg-black/50 px-2 py-1 text-[11px] font-medium text-neutral-200 backdrop-blur group-hover:bg-black/70 transition hover:bg-black/70"
              aria-label={`Abrir ${artist.name} no Spotify em nova aba`}
            >
              <ExternalLink className="h-3 w-3" aria-hidden="true" /> Spotify
            </a>
          )}
        </div>
        <div className="flex flex-1 flex-col p-3 gap-2">
          <div className="space-y-1">
            <h4
              className="text-sm font-semibold text-neutral-100 truncate"
              title={artist.name}
            >
              {artist.name}
            </h4>
            <p className="text-[11px] tracking-wide uppercase text-neutral-400">
              {formatFollowers(artist.followers.total)} seguidores
            </p>
          </div>
          {topGenres.length > 0 && (
            <ul className="flex flex-wrap gap-1 mt-auto" aria-label="Gêneros">
              {topGenres.map(g => (
                <li
                  key={g}
                  className="text-[10px] px-2 py-1 rounded-full border border-green-500/30 text-green-300 bg-green-500/5 hover:bg-green-500/10 transition cursor-default"
                >
                  {g}
                </li>
              ))}
            </ul>
          )}
          <div className="mt-1" data-testid="popularity-section">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-medium text-neutral-400 uppercase tracking-wide">
                Popularidade
              </span>
              <span className="text-[10px] font-semibold text-green-400">
                {popularityPct}%
              </span>
            </div>
            <div
              className="h-2 w-full rounded bg-neutral-800 overflow-hidden"
              role="progressbar"
              aria-valuenow={popularityPct}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Popularidade"
            >
              <div
                className="h-full bg-gradient-to-r from-[#1ed760] to-[#1db954] transition-all duration-500"
                style={{ width: `${popularityPct}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default ArtistCard;
