import axios from 'axios';
import { SpotifyAuthService } from '../services/spotifyAuthService';

const axiosInstance = axios.create({
  baseURL: 'https://api.spotify.com/v1/',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  async config => {
    try {
      // Tenta obter um token válido automaticamente
      const token = await SpotifyAuthService.getValidToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.warn('Não foi possível obter token do Spotify:', error);
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Trata erros de resposta
axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 401) {
      console.warn('🔄 Token expirado, tentando renovar...');

      try {
        await SpotifyAuthService.refreshToken();

        const originalRequest = error.config;
        if (!originalRequest._retry) {
          originalRequest._retry = true;
          const newToken = await SpotifyAuthService.getValidToken();
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        console.error('Falha ao renovar token:', refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
