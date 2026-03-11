import { SPOTIFY_API_BASE } from "./config";
import { getValidToken } from "./auth";
import type {
  SpotifyTrack,
  SpotifyAudioFeatures,
  SpotifySearchResponse,
  SpotifyArtist,
} from "./types";

async function spotifyFetch<T>(endpoint: string): Promise<T | null> {
  const token = await getValidToken();
  if (!token) return null;

  const res = await fetch(`${SPOTIFY_API_BASE}${endpoint}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) return null;
  return res.json();
}

export async function searchTracks(query: string): Promise<SpotifyTrack[]> {
  if (!query.trim()) return [];
  const encoded = encodeURIComponent(query);
  const data = await spotifyFetch<SpotifySearchResponse>(
    `/search?q=${encoded}&type=track&limit=20`
  );
  return data?.tracks?.items ?? [];
}

export async function getAudioFeatures(
  trackId: string
): Promise<SpotifyAudioFeatures | null> {
  return spotifyFetch<SpotifyAudioFeatures>(`/audio-features/${trackId}`);
}

export async function getArtist(
  artistId: string
): Promise<SpotifyArtist | null> {
  return spotifyFetch<SpotifyArtist>(`/artists/${artistId}`);
}

export async function getTrack(
  trackId: string
): Promise<SpotifyTrack | null> {
  return spotifyFetch<SpotifyTrack>(`/tracks/${trackId}`);
}
