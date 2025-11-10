import { SpotifyService } from '../services/spotifyService';
import type { SpotifyArtist } from '../types/spotifyTypes';

/**
 * Use case responsável por obter detalhes de um artista específico
 */
export class GetArtistByIdUseCase {
  /**
   * Executa a busca de um artista pelo ID
   * @param id ID do artista
   */
  static async execute(id: string): Promise<SpotifyArtist> {
    if (!id || id.trim() === '') {
      throw new Error('ID do artista é obrigatório');
    }

    try {
      return await SpotifyService.getArtistById(id);
    } catch (error) {
      console.error('Erro no use case GetArtistByIdUseCase:', error);
      throw new Error('Não foi possível obter os dados do artista');
    }
  }
}
