import axiosInstance from '../configs/axiosInstanceConfig';
import type {
  SpotifyArtist,
  SpotifyArtistAlbumsParams,
  SpotifyArtistAlbumsResponse,
  SpotifySearchParams,
  SpotifySearchResponse,
} from '../types/spotifyTypes';

export class SpotifyService {
  /**
   * Busca artistas no Spotify
   * @param params - Parâmetros de busca
   * @returns Promise com a resposta da API do Spotify
   */
  static async searchArtists(
    params: SpotifySearchParams
  ): Promise<SpotifySearchResponse> {
    const searchParams = new URLSearchParams({
      q: params.q,
      type: params.type,
      ...(params.limit && { limit: params.limit.toString() }),
      ...(params.offset && { offset: params.offset.toString() }),
      ...(params.market && { market: params.market }),
    });

    const response = await axiosInstance.get<SpotifySearchResponse>(
      `/search?${searchParams.toString()}`
    );

    return response.data;
  }

  /**
   * Busca artistas com parâmetros específicos do exemplo fornecido
   * @param query - Termo de busca (padrão: "a")
   * @param limit - Número de resultados (padrão: 20)
   * @param offset - Offset para paginação (padrão: 20)
   * @returns Promise com a resposta da API do Spotify
   */
  static async searchArtistsWithDefaults(
    query: string = 'a',
    limit: number = 20,
    offset: number = 20
  ): Promise<SpotifySearchResponse> {
    return this.searchArtists({
      q: query,
      type: 'artist',
      limit,
      offset,
    });
  }

  /**
   * Busca um artista específico pelo nome
   * @param artistName - Nome do artista
   * @param limit - Número de resultados (padrão: 10)
   * @returns Promise com a resposta da API do Spotify
   */
  static async searchArtistByName(
    artistName: string,
    limit: number = 10
  ): Promise<SpotifySearchResponse> {
    return this.searchArtists({
      q: artistName,
      type: 'artist',
      limit,
      offset: 0,
    });
  }

  /**
   * Busca dados detalhados de um artista específico pelo ID
   * @param id - ID do artista no Spotify
   * @returns Promise com o objeto completo do artista
   */
  static async getArtistById(id: string): Promise<SpotifyArtist> {
    const response = await axiosInstance.get<SpotifyArtist>(`/artists/${id}`);
    return response.data;
  }

  /**
   * Lista álbuns de um artista (paginado)
   * @param params - Parâmetros (id obrigatório, demais opcionais)
   */
  static async getArtistAlbums(
    params: SpotifyArtistAlbumsParams
  ): Promise<SpotifyArtistAlbumsResponse> {
    const { id, limit = 20, offset = 0, include_groups, market } = params;
    const searchParams = new URLSearchParams({
      limit: limit.toString(),
      offset: offset.toString(),
      ...(include_groups && { include_groups }),
      ...(market && { market }),
    });

    const response = await axiosInstance.get<SpotifyArtistAlbumsResponse>(
      `/artists/${id}/albums?${searchParams.toString()}`
    );
    return response.data;
  }
}
