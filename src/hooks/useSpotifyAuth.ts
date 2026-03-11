import { useState, useEffect, useCallback } from "react";
import {
  isAuthenticated,
  handleCallback,
  initiateLogin,
  logout as doLogout,
  getValidToken,
} from "../spotify/auth";
import { getClientId } from "../spotify/config";

export interface SpotifyAuthState {
  isConnected: boolean;
  hasClientId: boolean;
  accessToken: string | null;
  login: () => Promise<void>;
  logout: () => void;
}

export function useSpotifyAuth(): SpotifyAuthState {
  const [isConnected, setIsConnected] = useState(isAuthenticated());
  const hasClientId = !!getClientId();
  const [accessToken, setAccessToken] = useState<string | null>(null);

  // Handle OAuth callback on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.has("code")) {
      handleCallback().then((success) => {
        if (success) {
          setIsConnected(true);
          getValidToken().then(setAccessToken);
        }
      });
    } else if (isAuthenticated()) {
      getValidToken().then(setAccessToken);
    }
  }, []);

  const login = useCallback(async () => {
    await initiateLogin();
  }, []);

  const logout = useCallback(() => {
    doLogout();
    setIsConnected(false);
    setAccessToken(null);
  }, []);

  return {
    isConnected,
    hasClientId,
    accessToken,
    login,
    logout,
  };
}
