import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { SpotifyService } from '../services/spotifyService';
import type {
  SpotifyArtist,
  SpotifySearchParams,
  SpotifySearchResponse,
} from '../types/spotifyTypes';

/**
 * Hook para buscar artistas no Spotify
 */
export const useSpotifySearchArtists = (
  params: SpotifySearchParams,
  enabled: boolean = true
): UseQueryResult<SpotifySearchResponse, Error> => {
  return useQuery({
    queryKey: ['spotify-search-artists', params],
    queryFn: () => SpotifyService.searchArtists(params),
    enabled,
    staleTime: 5 * 60 * 1000, // 5 minutos
    gcTime: 10 * 60 * 1000, // 10 minutos
  });
};

/**
 * Hook para buscar artistas com parâmetros padrão
 */
export const useSpotifySearchArtistsDefault = (
  query?: string,
  limit?: number,
  offset?: number,
  enabled: boolean = true
): UseQueryResult<SpotifySearchResponse, Error> => {
  return useQuery({
    queryKey: ['spotify-search-artists-default', query, limit, offset],
    queryFn: () =>
      SpotifyService.searchArtistsWithDefaults(query, limit, offset),
    enabled,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

/**
 * Hook para buscar artista por nome
 */
export const useSpotifySearchArtistByName = (
  artistName: string,
  limit?: number,
  enabled: boolean = true
): UseQueryResult<SpotifySearchResponse, Error> => {
  return useQuery({
    queryKey: ['spotify-search-artist-by-name', artistName, limit],
    queryFn: () => SpotifyService.searchArtistByName(artistName, limit),
    enabled: enabled && !!artistName,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

/**
 * Hook para buscar artista por ID
 */
export const useSpotifyArtistById = (
  id: string | undefined,
  enabled: boolean = true
): UseQueryResult<SpotifyArtist, Error> => {
  return useQuery({
    queryKey: ['spotify-artist-by-id', id],
    queryFn: () => SpotifyService.getArtistById(id as string),
    enabled: enabled && !!id,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};
