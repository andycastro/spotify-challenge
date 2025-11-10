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

export interface SpotifySimplifiedArtist {
  external_urls: SpotifyExternalUrls;
  href: string;
  id: string;
  name: string;
  type: 'artist';
  uri: string;
}

export interface SpotifyAlbum {
  album_type: string;
  total_tracks: number;
  available_markets: string[];
  external_urls: SpotifyExternalUrls;
  href: string;
  id: string;
  images: SpotifyImage[];
  name: string;
  release_date: string;
  release_date_precision: 'year' | 'month' | 'day';
  type: 'album';
  uri: string;
  artists: SpotifySimplifiedArtist[];
  album_group?: string;
}

export interface SpotifyArtistAlbumsResponse {
  href: string;
  items: SpotifyAlbum[];
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
}

export interface SpotifyArtistAlbumsParams {
  id: string;
  limit?: number;
  offset?: number;
  include_groups?: string;
  market?: string;
}
