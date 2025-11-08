import { createContext } from 'react';

export interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  tokenInfo: {
    hasToken: boolean;
    expiresAt?: number;
    expiresIn?: number;
  };
  authenticate: () => Promise<void>;
  refreshToken: () => Promise<void>;
  clearAuth: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
