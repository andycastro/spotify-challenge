export { SpotifyAuthService } from './services/spotifyAuthService';
export { SpotifyService } from './services/spotifyService';

export type * from './types/spotifyTypes';

export * from './queries/useSpotifyQueries';

export { AuthProvider } from './contexts/AuthContext';
export { AuthContext } from './contexts/AuthContextObject';
export type { AuthContextType } from './contexts/AuthContextObject';
export { useAuth } from './hooks/useAuth';

export { SearchArtistsUseCase } from './useCases/searchArtistsUseCase';

export { default as axiosInstance } from './configs/axiosInstanceConfig';
export {
  createQueryClient,
  queryClient,
  queryClientConfig,
} from './configs/queryClientConfig';
