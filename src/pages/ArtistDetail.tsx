import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  useSpotifyArtistAlbums,
  useSpotifyArtistById,
} from '../api/queries/useSpotifyQueries';
import { ArtistDetailSkeleton, ErrorState } from '../components';
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
  const canPrevAlbums = albumsData ? albumsData.offset > 0 : false;
  const canNextAlbums = albumsData
    ? albumsData.next !== null &&
      albumsData.offset + albumsData.limit < albumsData.total
    : false;

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

      <div className="bg-[#121212] rounded-lg border border-[#1ed7601a] shadow-[0_0_0_1px_#1ed76010] p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Álbuns</h2>
          <div className="flex gap-2 items-center">
            <button
              disabled={!canPrevAlbums || albumsLoading || albumsFetching}
              onClick={() =>
                setAlbumsOffset(Math.max(albumsOffset - DEFAULT_LIMIT, 0))
              }
              className="px-3 py-1 text-xs rounded bg-neutral-800 disabled:opacity-40 hover:bg-neutral-700 transition"
            >
              Anterior
            </button>
            <button
              disabled={!canNextAlbums || albumsLoading || albumsFetching}
              onClick={() => setAlbumsOffset(albumsOffset + DEFAULT_LIMIT)}
              className="px-3 py-1 text-xs rounded bg-neutral-800 disabled:opacity-40 hover:bg-neutral-700 transition"
            >
              Próximo
            </button>
            <span className="text-xs text-neutral-400">
              Página {currentAlbumPage} / {totalAlbumPages}
            </span>
          </div>
        </div>
        {albumsError && (
          <ErrorState
            message={albumsError.message}
            title="Erro ao carregar álbuns"
          />
        )}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left bg-neutral-900">
                <th className="py-2 px-3 font-medium text-neutral-300">#</th>
                <th className="py-2 px-3 font-medium text-neutral-300">Capa</th>
                <th className="py-2 px-3 font-medium text-neutral-300">Nome</th>
                <th className="py-2 px-3 font-medium text-neutral-300">Tipo</th>
                <th className="py-2 px-3 font-medium text-neutral-300">
                  Lançamento
                </th>
                <th className="py-2 px-3 font-medium text-neutral-300">
                  Faixas
                </th>
              </tr>
            </thead>
            <tbody>
              {albumsLoading &&
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
                  </tr>
                ))}
              {!albumsLoading &&
                albumsData &&
                albumsData.items.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="py-6 text-center text-neutral-400"
                    >
                      Nenhum álbum encontrado.
                    </td>
                  </tr>
                )}
              {!albumsLoading &&
                albumsData &&
                albumsData.items.map((album, i) => {
                  const rowIndex = albumsData.offset + i + 1;
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
                            alt={`Capa do álbum ${album.name}`}
                            className="h-12 w-12 object-cover rounded"
                            loading="lazy"
                          />
                        ) : (
                          <div className="h-12 w-12 flex items-center justify-center bg-neutral-800 rounded text-[10px] text-neutral-500">
                            Sem imagem
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
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        {albumsFetching && !albumsLoading && (
          <p className="text-xs text-neutral-500">Atualizando...</p>
        )}
      </div>
    </div>
  );
};

export default ArtistDetail;
