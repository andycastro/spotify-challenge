import React, { useCallback, useEffect, useState } from 'react';
import { SpotifyAuthService } from '../services/spotifyAuthService';
import type { AuthContextType } from './AuthContextObject';
import { AuthContext } from './AuthContextObject';

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tokenInfo, setTokenInfo] = useState(SpotifyAuthService.getTokenInfo());

  const updateTokenInfo = useCallback(() => {
    const info = SpotifyAuthService.getTokenInfo();
    setTokenInfo(info);
    setIsAuthenticated(info.hasToken);
  }, []);

  const authenticate = useCallback(async () => {
    if (!SpotifyAuthService.hasCredentials()) {
      setError('Client ID e Client Secret não configurados');
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      await SpotifyAuthService.getValidToken();
      updateTokenInfo();
      setError(null);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Erro na autenticação';
      setError(message);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  }, [updateTokenInfo]);

  const refreshToken = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      await SpotifyAuthService.refreshToken();
      updateTokenInfo();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Erro ao renovar token';
      setError(message);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  }, [updateTokenInfo]);

  const clearAuth = useCallback(() => {
    SpotifyAuthService.clearToken();
    setIsAuthenticated(false);
    setTokenInfo({ hasToken: false });
    setError(null);
  }, []);

  // Renova token automaticamente
  useEffect(() => {
    if (!isAuthenticated || !tokenInfo.expiresIn) return;

    // Antecipa renovação em 5 minutos antes de expirar
    const renewTime = Math.max(0, (tokenInfo.expiresIn - 5 * 60) * 1000);

    if (renewTime <= 0) {
      refreshToken();
      return;
    }

    const timeoutId = setTimeout(() => {
      refreshToken();
    }, renewTime);

    return () => clearTimeout(timeoutId);
  }, [isAuthenticated, tokenInfo.expiresIn, refreshToken]);

  useEffect(() => {
    authenticate();
  }, [authenticate]);

  // Verifica token periodicamente
  useEffect(() => {
    const interval = setInterval(() => {
      updateTokenInfo();
    }, 60000);

    return () => clearInterval(interval);
  }, [updateTokenInfo]);

  const contextValue: AuthContextType = {
    isAuthenticated,
    isLoading,
    error,
    tokenInfo,
    authenticate,
    refreshToken,
    clearAuth,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
