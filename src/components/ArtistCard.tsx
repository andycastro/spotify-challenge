import { ExternalLink } from 'lucide-react';
import React from 'react';
import type { SpotifyArtist } from '../api';

interface ArtistCardProps {
  artist: SpotifyArtist;
}

function formatFollowers(total: number): string {
  if (total >= 1_000_000) return (total / 1_000_000).toFixed(1) + 'M';
  if (total >= 1_000) return (total / 1_000).toFixed(1) + 'K';
  return String(total);
}

export const ArtistCard: React.FC<ArtistCardProps> = ({ artist }) => {
  const image = artist.images?.[0]?.url;
  const popularityPct = Math.min(Math.max(artist.popularity, 0), 100);
  const topGenres = artist.genres.slice(0, 3);

  return (
    <div className="group relative flex flex-col rounded-lg border border-[#1ed7601a] bg-[#121212] overflow-hidden shadow-[0_0_0_1px_#1ed76010] hover:shadow-[0_0_0_1px_#1ed76040,0_4px_16px_-2px_rgba(0,0,0,0.6)] transition duration-200">
      <div className="relative w-full h-[456px] bg-neutral-900">
        {image ? (
          <img
            src={image}
            alt={artist.name}
            className="h-full w-full object-cover object-center transition duration-300 group-hover:scale-[1.02]"
            loading="lazy"
            height={456}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-neutral-600 text-6xl font-semibold">
            {artist.name.charAt(0).toUpperCase()}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition"></div>
        {artist.external_urls?.spotify && (
          <a
            href={artist.external_urls.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute right-2 top-2 inline-flex items-center gap-1 rounded bg-black/50 px-2 py-1 text-[11px] font-medium text-neutral-200 backdrop-blur hover:bg-black/70 transition"
          >
            <ExternalLink className="h-3 w-3" /> Spotify
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
          <div className="flex flex-wrap gap-1 mt-auto">
            {topGenres.map(g => (
              <span
                key={g}
                className="text-[10px] px-2 py-1 rounded-full border border-green-500/30 text-green-400/90 bg-green-500/5 hover:bg-green-500/10 transition"
              >
                {g}
              </span>
            ))}
          </div>
        )}
        <div className="mt-1">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-medium text-neutral-400 uppercase tracking-wide">
              Popularidade
            </span>
            <span className="text-[10px] font-semibold text-green-400">
              {popularityPct}%
            </span>
          </div>
          <div className="h-2 w-full rounded bg-neutral-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#1ed760] to-[#1db954] transition-all duration-300"
              style={{ width: `${popularityPct}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistCard;
