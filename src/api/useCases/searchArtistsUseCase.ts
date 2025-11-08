import { SpotifyService } from '../services/spotifyService';
import type { SpotifyArtist } from '../types/spotifyTypes';

/**
 * Use case para buscar artistas populares
 */
export class SearchArtistsUseCase {
  /**
   * Busca artistas populares baseado em uma query
   */
  static async execute(
    query: string,
    limit: number = 20,
    offset: number = 0
  ): Promise<SpotifyArtist[]> {
    try {
      const response = await SpotifyService.searchArtists({
        q: query,
        type: 'artist',
        limit,
        offset,
      });

      return response.artists.items;
    } catch (error) {
      console.error('Erro ao buscar artistas:', error);
      throw new Error('Falha ao buscar artistas no Spotify');
    }
  }

  /**
   * Busca artistas com o endpoint específico solicitado
   */
  static async executeWithDefaults(): Promise<SpotifyArtist[]> {
    return this.execute('a', 20, 20);
  }

  /**
   * Filtra artistas por popularidade mínima
   */
  static async executeWithPopularityFilter(
    query: string,
    minPopularity: number = 50,
    limit: number = 20
  ): Promise<SpotifyArtist[]> {
    const artists = await this.execute(query, limit);
    return artists.filter(artist => artist.popularity >= minPopularity);
  }
}
