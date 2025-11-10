import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  useSpotifyArtistAlbums,
  useSpotifyArtistById,
} from '../api/queries/useSpotifyQueries';
import {
  ArtistAlbumsTable,
  ArtistDetailSkeleton,
  ErrorState,
} from '../components';
import { formatFollowers } from '../utils';

export const ArtistDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: artist, isLoading, error } = useSpotifyArtistById(id, !!id);

  const DEFAULT_LIMIT = 20;
  const [albumsOffset, setAlbumsOffset] = useState(0);
  const {
    data: albumsData,
    isLoading: albumsLoading,
    isFetching: albumsFetching,
    error: albumsError,
  } = useSpotifyArtistAlbums(
    {
      id: id || '',
      limit: DEFAULT_LIMIT,
      offset: albumsOffset,
      include_groups: 'album,single,compilation,appears_on',
    },
    !!id && !isLoading && !!artist
  );

  if (error) {
    return (
      <ErrorState message={error.message} title="Erro ao carregar artista" />
    );
  }

  if (isLoading) {
    return <ArtistDetailSkeleton />;
  }

  if (!artist) {
    return <p className="text-gray-500">Artista não encontrado.</p>;
  }

  const genres = (artist.genres ?? []).slice(0, 10);

  const currentAlbumPage = albumsData
    ? Math.floor(albumsData.offset / albumsData.limit) + 1
    : 1;
  const totalAlbumPages = albumsData
    ? Math.ceil(albumsData.total / albumsData.limit)
    : 1;
  const canPrevAlbums = !!albumsData && albumsData.offset > 0;
  const canNextAlbums =
    !!albumsData &&
    albumsData.next !== null &&
    albumsData.offset + albumsData.limit < albumsData.total;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">{artist.name}</h1>
        <div className="flex gap-3">
          {artist.external_urls?.spotify && (
            <a
              href={artist.external_urls.spotify}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm px-3 py-2 rounded bg-green-600 text-white hover:bg-green-700 transition"
            >
              <span className="font-medium">Abrir no Spotify</span>
            </a>
          )}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm px-3 py-2 rounded bg-neutral-800 text-neutral-200 hover:bg-neutral-700 transition"
          >
            Voltar
          </Link>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1 bg-[#121212] rounded-lg border border-[#1ed7601a] shadow-[0_0_0_1px_#1ed76010] p-4 flex items-center justify-center">
          {isLoading ? (
            <div
              className="h-64 w-full rounded bg-neutral-800 animate-pulse"
              aria-label="Carregando imagem do artista"
            />
          ) : artist.images?.[0]?.url ? (
            <img
              src={artist.images[0].url}
              alt={`Imagem de ${artist.name}`}
              className="rounded-lg w-full object-cover shadow-lg"
            />
          ) : (
            <div className="h-64 flex items-center justify-center rounded bg-neutral-900 text-6xl font-semibold text-neutral-600 w-full">
              {artist.name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <div className="md:col-span-2 space-y-6 bg-[#121212] rounded-lg border border-[#1ed7601a] shadow-[0_0_0_1px_#1ed76010] p-6">
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
                <h2 className="text-xl font-semibold mb-2">
                  Informações Gerais
                </h2>
                <ul className="divide-y divide-neutral-800 text-sm text-neutral-300">
                  <li className="py-2 flex justify-between">
                    <span className="font-medium text-neutral-400">
                      Seguidores
                    </span>
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
                    <span className="font-mono text-xs break-all">
                      {artist.id}
                    </span>
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
      </div>

      <ArtistAlbumsTable
        data={albumsData}
        loading={albumsLoading}
        fetching={albumsFetching}
        error={albumsError as Error | null}
        currentPage={currentAlbumPage}
        totalPages={totalAlbumPages}
        canPrev={canPrevAlbums}
        canNext={canNextAlbums}
        onPrev={() =>
          setAlbumsOffset(Math.max(albumsOffset - DEFAULT_LIMIT, 0))
        }
        onNext={() => setAlbumsOffset(albumsOffset + DEFAULT_LIMIT)}
      />
    </div>
  );
};

export default ArtistDetail;
