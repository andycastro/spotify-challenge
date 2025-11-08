import axios from 'axios';

interface SpotifyTokenResponse {
  access_token: string;
  token_type: 'Bearer';
  expires_in: number;
}

interface TokenData {
  accessToken: string;
  expiresAt: number;
}

export class SpotifyAuthService {
  private static readonly TOKEN_URL = 'https://accounts.spotify.com/api/token';
  private static readonly STORAGE_KEY = 'spotify_token_data';
  private static tokenData: TokenData | null = null;

  /**
   * Obtém um novo token de acesso usando Client Credentials
   */
  private static async fetchNewToken(): Promise<TokenData> {
    const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
    const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      throw new Error(
        'Client ID e Client Secret do Spotify são obrigatórios. Configure VITE_SPOTIFY_CLIENT_ID e VITE_SPOTIFY_CLIENT_SECRET no arquivo .env'
      );
    }

    const credentials = btoa(`${clientId}:${clientSecret}`);

    try {
      const response = await axios.post<SpotifyTokenResponse>(
        this.TOKEN_URL,
        'grant_type=client_credentials',
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${credentials}`,
          },
        }
      );

      const { access_token, expires_in } = response.data;
      const expiresAt = Date.now() + expires_in * 1000; // converter para milliseconds

      const tokenData: TokenData = {
        accessToken: access_token,
        expiresAt,
      };

      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(tokenData));
      this.tokenData = tokenData;

      console.log('✅ Token do Spotify obtido com sucesso');
      return tokenData;
    } catch (error) {
      console.error('Erro ao obter token do Spotify:', error);
      throw new Error('Falha na autenticação com Spotify');
    }
  }

  private static loadTokenFromStorage(): TokenData | null {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (!stored) return null;

      const tokenData: TokenData = JSON.parse(stored);

      const fiveMinutesInMs = 5 * 60 * 1000;
      if (Date.now() + fiveMinutesInMs >= tokenData.expiresAt) {
        localStorage.removeItem(this.STORAGE_KEY);
        return null;
      }

      return tokenData;
    } catch (error) {
      console.warn('Erro ao carregar token do storage:', error);
      localStorage.removeItem(this.STORAGE_KEY);
      return null;
    }
  }

  /**
   * Obtém um token válido (do cache ou busca um novo)
   */
  static async getValidToken(): Promise<string> {
    // Tentar usar token em memória
    if (
      this.tokenData &&
      Date.now() < this.tokenData.expiresAt - 5 * 60 * 1000
    ) {
      return this.tokenData.accessToken;
    }

    // Tenta carregar do localStorage
    const storedToken = this.loadTokenFromStorage();
    if (storedToken) {
      this.tokenData = storedToken;
      return storedToken.accessToken;
    }

    // Buscar novo token
    const newTokenData = await this.fetchNewToken();
    return newTokenData.accessToken;
  }

  /**
   * Força renovação do token
   */
  static async refreshToken(): Promise<string> {
    localStorage.removeItem(this.STORAGE_KEY);
    this.tokenData = null;
    const newTokenData = await this.fetchNewToken();
    return newTokenData.accessToken;
  }

  /**
   * Limpa token da memória e storage
   */
  static clearToken(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    this.tokenData = null;
  }

  /**
   * Verifica se as credenciais estão configuradas
   */
  static hasCredentials(): boolean {
    const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
    const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
    return !!(clientId && clientSecret);
  }

  /**
   * Retorna informações sobre o token atual
   */
  static getTokenInfo(): {
    hasToken: boolean;
    expiresAt?: number;
    expiresIn?: number;
  } {
    if (!this.tokenData) {
      const stored = this.loadTokenFromStorage();
      if (stored) {
        this.tokenData = stored;
      }
    }

    if (!this.tokenData) {
      return { hasToken: false };
    }

    const expiresIn = Math.max(
      0,
      Math.floor((this.tokenData.expiresAt - Date.now()) / 1000)
    );

    return {
      hasToken: true,
      expiresAt: this.tokenData.expiresAt,
      expiresIn,
    };
  }
}
