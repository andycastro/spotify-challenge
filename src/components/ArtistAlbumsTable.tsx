import { Download } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import type { SpotifyArtistAlbumsResponse } from '../api/types/spotifyTypes';
import {
  loadSavedAlbums,
  removeAlbumFromStorage,
} from '../validation/savedAlbumSchema';
import { SaveAlbumDrawer } from './SaveAlbumDrawer';
import { ErrorState } from './ui-states/ErrorState';

interface ArtistAlbumsTableProps {
  data?: SpotifyArtistAlbumsResponse;
  loading: boolean;
  fetching: boolean;
  error?: Error | null;
  currentPage: number;
  totalPages: number;
  canPrev: boolean;
  canNext: boolean;
  onPrev: () => void;
  onNext: () => void;
}

export const ArtistAlbumsTable: React.FC<ArtistAlbumsTableProps> = ({
  data,
  loading,
  fetching,
  error,
  currentPage,
  totalPages,
  canPrev,
  canNext,
  onPrev,
  onNext,
}) => {
  const { t } = useTranslation('common');
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());

  const loadSaved = () => {
    const entries = loadSavedAlbums();
    setSavedIds(new Set(entries.map(e => e.id)));
  };

  useEffect(() => {
    loadSaved();
  }, []);

  const handleRemoved = (id: string) => {
    removeAlbumFromStorage(id);
    loadSaved();
    toast.success(t('album.remove.toast'));
  };
  return (
    <div
      className="rounded-lg border p-6 space-y-4
        bg-white border-green-500/10 shadow-[0_0_0_1px_rgba(16,16,16,0.06)]
        dark:bg-[#121212] dark:border-[#1ed7601a] dark:shadow-[0_0_0_1px_#1ed76010]"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
          {t('albums.title')}
        </h2>
        <div className="flex gap-2 items-center">
          <button
            disabled={!canPrev || loading || fetching}
            onClick={onPrev}
            className="px-3 py-1 text-xs rounded transition disabled:opacity-40
              bg-neutral-100 hover:bg-neutral-200 text-neutral-700
              dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:text-neutral-200"
          >
            {t('albums.prev')}
          </button>
          <button
            disabled={!canNext || loading || fetching}
            onClick={onNext}
            className="px-3 py-1 text-xs rounded transition disabled:opacity-40
              bg-neutral-100 hover:bg-neutral-200 text-neutral-700
              dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:text-neutral-200"
          >
            {t('albums.next')}
          </button>
          <span className="text-xs text-neutral-500 dark:text-neutral-400">
            {t('pagination.pageOf', {
              current: currentPage,
              total: totalPages,
            })}
          </span>
        </div>
      </div>
      {error && (
        <ErrorState message={error.message} title={t('error.loadAlbums')} />
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left bg-neutral-100 dark:bg-neutral-900">
              <th className="py-2 px-3 font-medium text-neutral-600 dark:text-neutral-300">
                {t('albums.index')}
              </th>
              <th className="py-2 px-3 font-medium text-neutral-600 dark:text-neutral-300">
                {t('albums.cover')}
              </th>
              <th className="py-2 px-3 font-medium text-neutral-600 dark:text-neutral-300">
                {t('albums.name')}
              </th>
              <th className="py-2 px-3 font-medium text-neutral-600 dark:text-neutral-300">
                {t('albums.type')}
              </th>
              <th className="py-2 px-3 font-medium text-neutral-600 dark:text-neutral-300">
                {t('albums.release')}
              </th>
              <th className="py-2 px-3 font-medium text-neutral-600 dark:text-neutral-300">
                {t('albums.tracks')}
              </th>
              <th className="py-2 px-3 font-medium text-neutral-600 dark:text-neutral-300">
                {t('album.save')}
              </th>
            </tr>
          </thead>
          <tbody>
            {loading &&
              Array.from({ length: 6 }).map((_, i) => (
                <tr
                  key={`album-skel-${i}`}
                  className={
                    i % 2 === 0
                      ? 'bg-neutral-50 dark:bg-neutral-900/40'
                      : 'bg-neutral-100 dark:bg-neutral-800/40'
                  }
                >
                  <td className="py-3 px-3">
                    <div className="h-4 w-6 rounded animate-pulse bg-neutral-200 dark:bg-neutral-800" />
                  </td>
                  <td className="py-3 px-3">
                    <div className="h-12 w-12 rounded animate-pulse bg-neutral-200 dark:bg-neutral-800" />
                  </td>
                  <td className="py-3 px-3">
                    <div className="h-4 w-40 rounded animate-pulse bg-neutral-200 dark:bg-neutral-800" />
                  </td>
                  <td className="py-3 px-3">
                    <div className="h-4 w-20 rounded animate-pulse bg-neutral-200 dark:bg-neutral-800" />
                  </td>
                  <td className="py-3 px-3">
                    <div className="h-4 w-24 rounded animate-pulse bg-neutral-200 dark:bg-neutral-800" />
                  </td>
                  <td className="py-3 px-3">
                    <div className="h-4 w-12 rounded animate-pulse bg-neutral-200 dark:bg-neutral-800" />
                  </td>
                  <td className="py-3 px-3">
                    <div className="h-4 w-20 rounded animate-pulse bg-neutral-200 dark:bg-neutral-800" />
                  </td>
                </tr>
              ))}
            {!loading && data && data.items.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="py-6 text-center text-neutral-500 dark:text-neutral-400"
                >
                  {t('albums.none')}
                </td>
              </tr>
            )}
            {!loading &&
              data &&
              data.items.map((album, i) => {
                const rowIndex = data.offset + i + 1;
                return (
                  <tr
                    key={album.id}
                    className={
                      rowIndex % 2 === 0
                        ? 'bg-neutral-50 dark:bg-neutral-900/50'
                        : 'bg-neutral-100 dark:bg-neutral-800/40'
                    }
                  >
                    <td className="py-2 px-3 text-neutral-500 dark:text-neutral-400 w-12">
                      {rowIndex}
                    </td>
                    <td className="py-2 px-3">
                      {album.images?.[2]?.url ? (
                        <img
                          src={album.images[2].url}
                          alt={t('albums.coverAlt', { name: album.name })}
                          className="h-12 w-12 object-cover rounded"
                          loading="lazy"
                        />
                      ) : (
                        <div
                          className="h-12 w-12 flex items-center justify-center rounded text-[10px]
                            bg-neutral-100 text-neutral-500
                            dark:bg-neutral-800 dark:text-neutral-500"
                        >
                          {t('albums.noImage')}
                        </div>
                      )}
                    </td>
                    <td className="py-2 px-3 font-medium text-neutral-900 dark:text-neutral-200">
                      {album.name}
                    </td>
                    <td className="py-2 px-3 text-neutral-600 dark:text-neutral-300">
                      {album.album_type}
                    </td>
                    <td className="py-2 px-3 text-neutral-600 dark:text-neutral-300">
                      {album.release_date}
                    </td>
                    <td className="py-2 px-3 text-neutral-600 dark:text-neutral-300">
                      {album.total_tracks}
                    </td>
                    <td className="py-2 px-3 text-neutral-600 dark:text-neutral-300">
                      {savedIds.has(album.id) ? (
                        <button
                          type="button"
                          onClick={() => handleRemoved(album.id)}
                          className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded transition
                            bg-red-600/10 hover:bg-red-600/20 text-red-600 border border-red-600/30
                            dark:bg-red-600/10 dark:hover:bg-red-600/20 dark:text-red-400 dark:border-red-600/30"
                          aria-label={t('album.remove')}
                        >
                          <Download className="h-3.5 w-3.5 rotate-180" />
                          <span className="hidden sm:inline">
                            {t('album.remove')}
                          </span>
                        </button>
                      ) : (
                        <SaveAlbumDrawer
                          album={album}
                          onSaved={() => loadSaved()}
                          trigger={
                            <button
                              type="button"
                              className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded transition
                                border-green-600/25 text-green-700 bg-green-600/10 hover:bg-green-600/20
                                dark:border-green-600/30 dark:text-green-400 dark:bg-green-600/10 dark:hover:bg-green-600/20"
                              aria-label={t('album.save')}
                            >
                              <Download className="h-3.5 w-3.5" />
                              <span className="hidden sm:inline">
                                {t('album.save')}
                              </span>
                            </button>
                          }
                        />
                      )}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      {fetching && !loading && (
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          Atualizando...
        </p>
      )}
    </div>
  );
};

export default ArtistAlbumsTable;
