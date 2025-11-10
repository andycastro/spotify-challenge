import { SpotifyService } from '../services/spotifyService';
import type {
  SpotifyArtistAlbumsParams,
  SpotifyArtistAlbumsResponse,
} from '../types/spotifyTypes';

/**
 * Use case para obter álbuns de um artista com validação e regras simples.
 */
export class GetArtistAlbumsUseCase {
  /**
   * Executa a listagem de álbuns de um artista.
   * @param params Parâmetros contendo id e paginação.
   */
  static async execute(
    params: SpotifyArtistAlbumsParams
  ): Promise<SpotifyArtistAlbumsResponse> {
    const { id, limit = 20, offset = 0 } = params;

    if (!id || id.trim() === '') {
      throw new Error('ID do artista é obrigatório');
    }
    if (limit <= 0 || limit > 50) {
      throw new Error('Limit inválido (1-50)');
    }
    if (offset < 0) {
      throw new Error('Offset não pode ser negativo');
    }

    try {
      return await SpotifyService.getArtistAlbums({ ...params, limit, offset });
    } catch (error) {
      console.error('Erro ao buscar álbuns do artista:', error);
      throw new Error('Falha ao obter álbuns do artista');
    }
  }
}
