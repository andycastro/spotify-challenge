import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSpotifyArtistById } from '../api/queries/useSpotifyQueries';
import { formatFollowers } from '../utils';

export const ArtistDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: artist, isLoading, error } = useSpotifyArtistById(id, !!id);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4" />
          <p className="text-gray-600">Carregando artista...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500">Erro: {error.message}</p>;
  }

  if (!artist) {
    return <p className="text-gray-500">Artista não encontrado.</p>;
  }

  const genres = (artist.genres ?? []).slice(0, 10);

  const mockTracks = [
    {
      title: 'Track One',
      album: 'Album A',
      duration: '3:21',
      pop: 72,
    },
    {
      title: 'Track Two',
      album: 'Album B',
      duration: '2:58',
      pop: 65,
    },
    {
      title: 'Track Three',
      album: 'Album C',
      duration: '4:05',
      pop: 80,
    },
    {
      title: 'Track Four',
      album: 'Album D',
      duration: '5:12',
      pop: 55,
    },
    {
      title: 'Track Five',
      album: 'Album E',
      duration: '3:47',
      pop: 68,
    },
  ];

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
          {artist.images?.[0]?.url ? (
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
        </div>
      </div>

      <div className="bg-[#121212] rounded-lg border border-[#1ed7601a] shadow-[0_0_0_1px_#1ed76010] p-6">
        <h2 className="text-xl font-semibold mb-4">Músicas (mock)</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left bg-neutral-900">
                <th className="py-2 px-3 font-medium text-neutral-300">#</th>
                <th className="py-2 px-3 font-medium text-neutral-300">
                  Título
                </th>
                <th className="py-2 px-3 font-medium text-neutral-300">
                  Álbum
                </th>
                <th className="py-2 px-3 font-medium text-neutral-300">
                  Duração
                </th>
                <th className="py-2 px-3 font-medium text-neutral-300">
                  Popularidade
                </th>
              </tr>
            </thead>
            <tbody>
              {mockTracks.map((t, i) => (
                <tr
                  key={t.title}
                  className={
                    i % 2 === 0 ? 'bg-neutral-900/50' : 'bg-neutral-800/40'
                  }
                >
                  <td className="py-2 px-3 text-neutral-400">{i + 1}</td>
                  <td className="py-2 px-3 font-medium text-neutral-200">
                    {t.title}
                  </td>
                  <td className="py-2 px-3 text-neutral-300">{t.album}</td>
                  <td className="py-2 px-3 text-neutral-300">{t.duration}</td>
                  <td className="py-2 px-3 text-neutral-300">{t.pop}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ArtistDetail;
