// Spotify Client ID from environment variable
export function getClientId(): string | null {
  return import.meta.env.VITE_SPOTIFY_CLIENT_ID || null;
}

export function getRedirectUri(): string {
  return window.location.origin + (import.meta.env.BASE_URL || "/");
}

export const SCOPES = "user-read-private";

export const SPOTIFY_AUTH_URL = "https://accounts.spotify.com/authorize";
export const SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token";
export const SPOTIFY_API_BASE = "https://api.spotify.com/v1";
