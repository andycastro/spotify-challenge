import React, { useEffect, useMemo, useState } from 'react';
import {
  useAuth,
  useSpotifySearchArtistByName,
  useSpotifySearchArtistsDefault,
} from '../api';
import { ArtistCard } from './ArtistCard';
import { SpotifySetupInstructions } from './SpotifySetupInstructions';

interface HomeProps {
  searchTerm: string;
}

const useDebounce = (value: string, delay: number): string => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export const Home: React.FC<HomeProps> = ({ searchTerm }) => {
  const {
    isAuthenticated,
    isLoading: authLoading,
    tokenInfo,
    refreshToken,
  } = useAuth();

  const trimmedSearchTerm = useMemo(() => searchTerm.trim(), [searchTerm]);

  const debouncedSearchTerm = useDebounce(trimmedSearchTerm, 400);

  const isSearchEnabled = useMemo(
    () =>
      isAuthenticated &&
      !!debouncedSearchTerm &&
      debouncedSearchTerm.length >= 2,
    [isAuthenticated, debouncedSearchTerm]
  );

  const {
    data: defaultData,
    isLoading: isLoadingDefault,
    error: defaultError,
  } = useSpotifySearchArtistsDefault('a', 20, 20, isAuthenticated);

  const {
    data: searchData,
    isLoading: isLoadingSearch,
    error: searchError,
  } = useSpotifySearchArtistByName(debouncedSearchTerm, 10, isSearchEnabled);

  if (authLoading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Conectando com Spotify...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Spotify Artist Search
          </h2>
          <p className="text-gray-600">
            Descubra artistas usando a API oficial do Spotify
          </p>
        </div>
        <SpotifySetupInstructions />
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Spotify Artist Search</h2>
        <div className="flex items-center space-x-4">
          {tokenInfo.hasToken && (
            <div className="text-sm">
              <p className="text-xs text-gray-500 mt-1">
                Expira em: {Math.floor((tokenInfo.expiresIn || 0) / 60)}min
              </p>
            </div>
          )}
          <button
            onClick={refreshToken}
            className="px-3 py-1 text-xs bg-blue-100 text-blue-800 rounded hover:bg-blue-200 transition-colors"
          >
            Renovar Token
          </button>
        </div>
      </div>

      {!trimmedSearchTerm && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Artistas em destaque</h3>
          <p className="text-gray-600 mb-4">
            Confira alguns artistas populares ou use o campo de busca no
            cabeçalho para encontrar seus favoritos
          </p>
          {isLoadingDefault && <p>Carregando artistas...</p>}
          {defaultError && (
            <p className="text-red-500">Erro: {defaultError.message}</p>
          )}
          {defaultData && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {defaultData.artists.items.map(artist => (
                <ArtistCard key={artist.id} artist={artist} />
              ))}
            </div>
          )}
        </div>
      )}

      {trimmedSearchTerm && (
        <div>
          <h3 className="text-lg font-semibold mb-2">
            Resultados para "{trimmedSearchTerm}"
          </h3>
          {trimmedSearchTerm.length < 2 && (
            <p className="text-orange-600 mb-4">
              Digite pelo menos 2 caracteres para buscar
            </p>
          )}
          {isSearchEnabled &&
            !isLoadingSearch &&
            !searchData &&
            !searchError &&
            debouncedSearchTerm === trimmedSearchTerm && (
              <p className="text-orange-600 mb-4">
                Busca não executada. Verifique autenticação.
              </p>
            )}
          {(isLoadingSearch ||
            (trimmedSearchTerm.length >= 2 &&
              debouncedSearchTerm !== trimmedSearchTerm)) && <p>Buscando...</p>}
          {searchError && (
            <p className="text-red-500">Erro: {searchError.message}</p>
          )}
          {searchData && searchData.artists.items.length === 0 && (
            <p className="text-yellow-600 mb-4">
              Nenhum resultado encontrado para "{trimmedSearchTerm}"
            </p>
          )}
          {searchData && searchData.artists.items.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {searchData.artists.items.map(artist => (
                <ArtistCard key={artist.id} artist={artist} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
