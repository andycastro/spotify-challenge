import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth, useSpotifySearchArtistsDefault } from '../api';
import { useSpotifySearchArtists } from '../api/queries/useSpotifyQueries';
import type { SpotifyArtist } from '../api/types/spotifyTypes';
import {
  ArtistCard,
  ArtistCardSkeleton,
  ErrorState,
  IsNotAuthSpotify,
  SpotifyConnecting,
} from '../components';
import { GeneratedPagination } from '../components/ui/pagination';

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
  const { t } = useTranslation('common');
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

  const [defaultOffset, setDefaultOffset] = useState(0);
  const DEFAULT_LIMIT = 20;
  const {
    data: defaultData,
    isLoading: isLoadingDefault,
    isFetching: isFetchingDefault,
    error: defaultError,
  } = useSpotifySearchArtistsDefault(
    'a',
    DEFAULT_LIMIT,
    defaultOffset,
    isAuthenticated
  );
  const [initialDefaultTotal, setInitialDefaultTotal] = useState<number | null>(
    null
  );
  useEffect(() => {
    if (defaultData && initialDefaultTotal == null) {
      setInitialDefaultTotal(defaultData.artists.total);
    }
  }, [defaultData, initialDefaultTotal]);

  const [searchOffset, setSearchOffset] = useState(0);
  const SEARCH_LIMIT = 10;
  useEffect(() => {
    setSearchOffset(0);
  }, [debouncedSearchTerm]);
  const {
    data: searchData,
    isLoading: isLoadingSearch,
    isFetching: isFetchingSearch,
    error: searchError,
  } = useSpotifySearchArtists(
    {
      q: debouncedSearchTerm,
      type: 'artist',
      limit: SEARCH_LIMIT,
      offset: searchOffset,
    },
    isSearchEnabled
  );
  const [initialSearchTotal, setInitialSearchTotal] = useState<number | null>(
    null
  );
  useEffect(() => {
    if (searchData && initialSearchTotal == null) {
      setInitialSearchTotal(searchData.artists.total);
    }
  }, [searchData, initialSearchTotal]);
  useEffect(() => {
    if (debouncedSearchTerm) {
      setInitialSearchTotal(null);
    }
  }, [debouncedSearchTerm]);

  if (authLoading) {
    return <SpotifyConnecting />;
  }

  if (!isAuthenticated) {
    return <IsNotAuthSpotify />;
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{t('home.title')}</h2>
        <div className="flex items-center space-x-4">
          {tokenInfo.hasToken && (
            <div className="text-sm">
              <p className="text-xs text-gray-500 mt-1">
                {t('home.token.expires')}:{' '}
                {Math.floor((tokenInfo.expiresIn || 0) / 60)}min
              </p>
            </div>
          )}
          <button
            onClick={refreshToken}
            className="px-3 py-1 text-xs bg-blue-100 text-blue-800 rounded hover:bg-blue-200 transition-colors"
          >
            {t('home.token.renew')}
          </button>
        </div>
      </div>

      {!trimmedSearchTerm && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">
            {t('home.featured.title')}
          </h3>
          <p className="text-gray-600 mb-4">{t('home.featured.description')}</p>
          {isLoadingDefault && (
            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
              aria-busy="true"
              aria-label={t('home.loadingFeaturedAria')}
            >
              {Array.from({ length: 6 }).map((_, i) => (
                <ArtistCardSkeleton key={i} />
              ))}
            </div>
          )}
          {defaultError && !isLoadingDefault && (
            <ErrorState
              message={defaultError.message}
              title={t('home.errorFeaturedTitle')}
              onRetry={() => {
                setDefaultOffset(prev => prev);
              }}
            />
          )}
          {defaultData && !isLoadingDefault && (
            <>
              <div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
                aria-live="polite"
              >
                {isFetchingDefault
                  ? Array.from({ length: Math.min(DEFAULT_LIMIT, 6) }).map(
                      (_, i) => (
                        <ArtistCardSkeleton key={`default-skeleton-${i}`} />
                      )
                    )
                  : defaultData.artists.items.map((artist: SpotifyArtist) => (
                      <ArtistCard key={artist.id} artist={artist} />
                    ))}
              </div>
              <GeneratedPagination
                page={
                  Math.floor(
                    defaultData.artists.offset / defaultData.artists.limit
                  ) + 1
                }
                totalPages={Math.ceil(
                  (initialDefaultTotal ?? defaultData.artists.total) /
                    defaultData.artists.limit
                )}
                hasNext={Boolean(defaultData.artists.next)}
                isFetching={isFetchingDefault}
                onChange={p =>
                  setDefaultOffset((p - 1) * defaultData.artists.limit)
                }
              />
            </>
          )}
        </div>
      )}

      {trimmedSearchTerm && (
        <div>
          <h3 className="text-lg font-semibold mb-2">
            {t('home.search.resultsFor', { term: trimmedSearchTerm })}
          </h3>
          {trimmedSearchTerm.length < 2 && (
            <p className="text-orange-600 mb-4">{t('home.search.minChars')}</p>
          )}
          {isSearchEnabled &&
            !isLoadingSearch &&
            !searchData &&
            !searchError &&
            debouncedSearchTerm === trimmedSearchTerm && (
              <p className="text-orange-600 mb-4">
                {t('home.search.notExecuted')}
              </p>
            )}
          {(isLoadingSearch ||
            (trimmedSearchTerm.length >= 2 &&
              debouncedSearchTerm !== trimmedSearchTerm)) && (
            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
              aria-busy="true"
              aria-label={t('home.searchingArtistsAria')}
            >
              {Array.from({ length: 6 }).map((_, i) => (
                <ArtistCardSkeleton key={i} />
              ))}
            </div>
          )}
          {searchError && (
            <ErrorState
              message={searchError.message}
              title={t('home.errorSearchTitle')}
              onRetry={() => {
                setSearchOffset(prev => prev);
              }}
            />
          )}
          {searchData && searchData.artists.items.length === 0 && (
            <p className="text-yellow-600 mb-4">
              {t('home.search.noneFound', { term: trimmedSearchTerm })}
            </p>
          )}
          {searchData && searchData.artists.items.length > 0 && (
            <>
              <div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
                aria-live="polite"
              >
                {isFetchingSearch
                  ? Array.from({ length: Math.min(SEARCH_LIMIT, 6) }).map(
                      (_, i) => (
                        <ArtistCardSkeleton key={`search-skeleton-${i}`} />
                      )
                    )
                  : searchData.artists.items.map((artist: SpotifyArtist) => (
                      <ArtistCard key={artist.id} artist={artist} />
                    ))}
              </div>
              <GeneratedPagination
                page={
                  Math.floor(
                    searchData.artists.offset / searchData.artists.limit
                  ) + 1
                }
                totalPages={Math.ceil(
                  (initialSearchTotal ?? searchData.artists.total) /
                    searchData.artists.limit
                )}
                hasNext={Boolean(searchData.artists.next)}
                isFetching={isFetchingSearch}
                onChange={p =>
                  setSearchOffset((p - 1) * searchData.artists.limit)
                }
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};
