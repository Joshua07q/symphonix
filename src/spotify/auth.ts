import { generateCodeVerifier, generateCodeChallenge } from "./pkce";
import {
  getClientId,
  getRedirectUri,
  SCOPES,
  SPOTIFY_AUTH_URL,
  SPOTIFY_TOKEN_URL,
} from "./config";
import type { SpotifyTokenResponse } from "./types";

const VERIFIER_KEY = "spotify_code_verifier";
const TOKEN_KEY = "spotify_access_token";
const REFRESH_KEY = "spotify_refresh_token";
const EXPIRY_KEY = "spotify_token_expiry";

export async function initiateLogin(): Promise<void> {
  const clientId = getClientId();
  if (!clientId) throw new Error("No Spotify Client ID configured");

  const verifier = generateCodeVerifier();
  sessionStorage.setItem(VERIFIER_KEY, verifier);

  const challenge = await generateCodeChallenge(verifier);
  const params = new URLSearchParams({
    client_id: clientId,
    response_type: "code",
    redirect_uri: getRedirectUri(),
    scope: SCOPES,
    code_challenge_method: "S256",
    code_challenge: challenge,
  });

  window.location.href = `${SPOTIFY_AUTH_URL}?${params.toString()}`;
}

export async function handleCallback(): Promise<boolean> {
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");
  const error = params.get("error");

  if (error || !code) return false;

  const verifier = sessionStorage.getItem(VERIFIER_KEY);
  const clientId = getClientId();
  if (!verifier || !clientId) return false;

  const body = new URLSearchParams({
    client_id: clientId,
    grant_type: "authorization_code",
    code,
    redirect_uri: getRedirectUri(),
    code_verifier: verifier,
  });

  const res = await fetch(SPOTIFY_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });

  if (!res.ok) return false;

  const data: SpotifyTokenResponse = await res.json();
  storeTokens(data);
  sessionStorage.removeItem(VERIFIER_KEY);

  // Clean URL
  window.history.replaceState({}, document.title, window.location.pathname);
  return true;
}

export async function refreshAccessToken(): Promise<boolean> {
  const refreshToken = localStorage.getItem(REFRESH_KEY);
  const clientId = getClientId();
  if (!refreshToken || !clientId) return false;

  const body = new URLSearchParams({
    client_id: clientId,
    grant_type: "refresh_token",
    refresh_token: refreshToken,
  });

  const res = await fetch(SPOTIFY_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });

  if (!res.ok) {
    logout();
    return false;
  }

  const data: SpotifyTokenResponse = await res.json();
  storeTokens(data);
  return true;
}

function storeTokens(data: SpotifyTokenResponse): void {
  localStorage.setItem(TOKEN_KEY, data.access_token);
  if (data.refresh_token) {
    localStorage.setItem(REFRESH_KEY, data.refresh_token);
  }
  const expiry = Date.now() + data.expires_in * 1000 - 60000; // 1min buffer
  localStorage.setItem(EXPIRY_KEY, expiry.toString());
}

export function getAccessToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function isTokenExpired(): boolean {
  const expiry = localStorage.getItem(EXPIRY_KEY);
  if (!expiry) return true;
  return Date.now() > parseInt(expiry, 10);
}

export function isAuthenticated(): boolean {
  return !!getAccessToken() && !isTokenExpired();
}

export function logout(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_KEY);
  localStorage.removeItem(EXPIRY_KEY);
}

export async function getValidToken(): Promise<string | null> {
  if (isTokenExpired()) {
    const refreshed = await refreshAccessToken();
    if (!refreshed) return null;
  }
  return getAccessToken();
}
