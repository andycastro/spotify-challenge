import { Download } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { SpotifyArtistAlbumsResponse } from '../api/types/spotifyTypes';
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

  const STORAGE_KEY = 'saved.albums';

  const loadSaved = () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return setSavedIds(new Set());
      const parsed: { id: string }[] = JSON.parse(raw);
      setSavedIds(new Set(parsed.map(p => p.id)));
    } catch {
      setSavedIds(new Set());
    }
  };

  useEffect(() => {
    loadSaved();
  }, []);

  const handleRemoved = (id: string) => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const list: { id: string }[] = JSON.parse(raw);
      const next = list.filter(a => a.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      loadSaved();
    } catch {
      /* todo - não esquecer de add exceção */
    }
  };
  return (
    <div className="bg-[#121212] rounded-lg border border-[#1ed7601a] shadow-[0_0_0_1px_#1ed76010] p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{t('albums.title')}</h2>
        <div className="flex gap-2 items-center">
          <button
            disabled={!canPrev || loading || fetching}
            onClick={onPrev}
            className="px-3 py-1 text-xs rounded bg-neutral-800 disabled:opacity-40 hover:bg-neutral-700 transition"
          >
            {t('albums.prev')}
          </button>
          <button
            disabled={!canNext || loading || fetching}
            onClick={onNext}
            className="px-3 py-1 text-xs rounded bg-neutral-800 disabled:opacity-40 hover:bg-neutral-700 transition"
          >
            {t('albums.next')}
          </button>
          <span className="text-xs text-neutral-400">
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
            <tr className="text-left bg-neutral-900">
              <th className="py-2 px-3 font-medium text-neutral-300">
                {t('albums.index')}
              </th>
              <th className="py-2 px-3 font-medium text-neutral-300">
                {t('albums.cover')}
              </th>
              <th className="py-2 px-3 font-medium text-neutral-300">
                {t('albums.name')}
              </th>
              <th className="py-2 px-3 font-medium text-neutral-300">
                {t('albums.type')}
              </th>
              <th className="py-2 px-3 font-medium text-neutral-300">
                {t('albums.release')}
              </th>
              <th className="py-2 px-3 font-medium text-neutral-300">
                {t('albums.tracks')}
              </th>
              <th className="py-2 px-3 font-medium text-neutral-300">
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
                    i % 2 === 0 ? 'bg-neutral-900/40' : 'bg-neutral-800/40'
                  }
                >
                  <td className="py-3 px-3">
                    <div className="h-4 w-6 bg-neutral-800 rounded animate-pulse" />
                  </td>
                  <td className="py-3 px-3">
                    <div className="h-12 w-12 bg-neutral-800 rounded animate-pulse" />
                  </td>
                  <td className="py-3 px-3">
                    <div className="h-4 w-40 bg-neutral-800 rounded animate-pulse" />
                  </td>
                  <td className="py-3 px-3">
                    <div className="h-4 w-20 bg-neutral-800 rounded animate-pulse" />
                  </td>
                  <td className="py-3 px-3">
                    <div className="h-4 w-24 bg-neutral-800 rounded animate-pulse" />
                  </td>
                  <td className="py-3 px-3">
                    <div className="h-4 w-12 bg-neutral-800 rounded animate-pulse" />
                  </td>
                  <td className="py-3 px-3">
                    <div className="h-4 w-20 bg-neutral-800 rounded animate-pulse" />
                  </td>
                </tr>
              ))}
            {!loading && data && data.items.length === 0 && (
              <tr>
                <td colSpan={7} className="py-6 text-center text-neutral-400">
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
                        ? 'bg-neutral-900/50'
                        : 'bg-neutral-800/40'
                    }
                  >
                    <td className="py-2 px-3 text-neutral-400 w-12">
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
                        <div className="h-12 w-12 flex items-center justify-center bg-neutral-800 rounded text-[10px] text-neutral-500">
                          {t('albums.noImage')}
                        </div>
                      )}
                    </td>
                    <td className="py-2 px-3 font-medium text-neutral-200">
                      {album.name}
                    </td>
                    <td className="py-2 px-3 text-neutral-300">
                      {album.album_type}
                    </td>
                    <td className="py-2 px-3 text-neutral-300">
                      {album.release_date}
                    </td>
                    <td className="py-2 px-3 text-neutral-300">
                      {album.total_tracks}
                    </td>
                    <td className="py-2 px-3 text-neutral-300">
                      {savedIds.has(album.id) ? (
                        <button
                          type="button"
                          onClick={() => handleRemoved(album.id)}
                          className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded bg-red-600/10 hover:bg-red-600/20 text-red-400 border border-red-600/30 transition"
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
                              className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded bg-green-600/10 hover:bg-green-600/20 text-green-400 border border-green-600/30 transition"
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
        <p className="text-xs text-neutral-500">Atualizando...</p>
      )}
    </div>
  );
};

export default ArtistAlbumsTable;
