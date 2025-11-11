import React from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation('common');
  return (
    <div
      className={[
        'md:col-span-2 space-y-6 rounded-lg border p-6 transition-colors',
        'bg-white border-green-500/10 shadow-[0_0_0_1px_rgba(16,16,16,0.05)]',
        'dark:bg-[#121212] dark:border-[#1ed7601a] dark:shadow-[0_0_0_1px_#1ed76010]',
        className,
      ].join(' ')}
    >
      {isLoading ? (
        <div className="space-y-4" aria-label={t('artist.loadingInfo')}>
          <div className="h-6 w-48 rounded animate-pulse bg-neutral-200 dark:bg-neutral-800" />
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="h-5 w-full rounded animate-pulse bg-neutral-200 dark:bg-neutral-800"
              />
            ))}
          </div>
          <div className="h-6 w-32 rounded animate-pulse bg-neutral-200 dark:bg-neutral-800" />
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <span
                key={`genre-skel-${i}`}
                className="h-6 w-16 rounded animate-pulse bg-neutral-200 dark:bg-neutral-800"
              />
            ))}
          </div>
        </div>
      ) : (
        <>
          <section className="space-y-4">
            <h2 className="text-xl font-semibold mb-2 text-neutral-900 dark:text-neutral-100">
              {t('artist.general.title')}
            </h2>
            <ul className="divide-y text-sm divide-neutral-200 text-neutral-600 dark:divide-neutral-800 dark:text-neutral-300">
              <li className="py-2 flex justify-between">
                <span className="font-medium text-neutral-500 dark:text-neutral-400">
                  {t('artist.followers')}
                </span>
                <span className="text-neutral-700 dark:text-neutral-300">
                  {formatFollowers(artist.followers.total)}
                </span>
              </li>
              <li className="py-2 flex justify-between">
                <span className="font-medium text-neutral-500 dark:text-neutral-400">
                  {t('artist.popularity')}
                </span>
                <span className="text-green-600 dark:text-green-400 font-medium">
                  {artist.popularity}%
                </span>
              </li>
              <li className="py-2 flex justify-between">
                <span className="font-medium text-neutral-500 dark:text-neutral-400">
                  {t('artist.id')}
                </span>
                <span className="font-mono text-xs break-all text-neutral-700 dark:text-neutral-300">
                  {artist.id}
                </span>
              </li>
              <li className="py-2 flex justify-between">
                <span className="font-medium text-neutral-500 dark:text-neutral-400">
                  {t('artist.type')}
                </span>
                <span className="text-neutral-700 dark:text-neutral-300">
                  {artist.type}
                </span>
              </li>
              <li className="py-2 flex justify-between">
                <span className="font-medium text-neutral-500 dark:text-neutral-400">
                  {t('artist.uri')}
                </span>
                <span className="font-mono text-xs break-all text-neutral-700 dark:text-neutral-300">
                  {artist.uri}
                </span>
              </li>
            </ul>
          </section>
          {genres.length > 0 && (
            <section className="space-y-3">
              <h2 className="text-xl font-semibold mb-2 text-neutral-900 dark:text-neutral-100">
                {t('artist.genres.title')}
              </h2>
              <ul className="flex flex-wrap gap-2">
                {genres.map(g => (
                  <li
                    key={g}
                    className="text-xs px-3 py-1 rounded-full border transition cursor-default
                      border-green-600/25 text-green-700 bg-green-600/10 hover:bg-green-600/20
                      dark:border-green-500/40 dark:text-green-300 dark:bg-green-500/10 dark:hover:bg-green-500/20"
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
