export interface SpotifyImage {
  height: number;
  url: string;
  width: number;
}

export interface SpotifyFollowers {
  href: string | null;
  total: number;
}

export interface SpotifyExternalUrls {
  spotify: string;
}

export interface SpotifyArtist {
  external_urls: SpotifyExternalUrls;
  followers: SpotifyFollowers;
  genres: string[];
  href: string;
  id: string;
  images: SpotifyImage[];
  name: string;
  popularity: number;
  type: 'artist';
  uri: string;
}

export interface SpotifySearchResponse {
  artists: {
    href: string;
    items: SpotifyArtist[];
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
  };
}

export interface SpotifySearchParams {
  q: string;
  type: 'artist' | 'album' | 'track' | 'playlist' | 'show' | 'episode';
  limit?: number;
  offset?: number;
  market?: string;
}
