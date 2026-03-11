export interface SpotifyTrack {
  id: string;
  name: string;
  artists: { id: string; name: string }[];
  album: {
    name: string;
    images: { url: string; width: number; height: number }[];
  };
  preview_url: string | null;
  duration_ms: number;
  popularity: number;
  external_urls: { spotify: string };
}

export interface SpotifyAudioFeatures {
  key: number;           // 0-11 pitch class (C=0, C#=1, D=2 ... B=11)
  mode: number;          // 0 = minor, 1 = major
  tempo: number;
  energy: number;        // 0.0 - 1.0
  valence: number;       // 0.0 - 1.0 (happy vs sad)
  danceability: number;  // 0.0 - 1.0
  loudness: number;
  acousticness: number;
  instrumentalness: number;
  time_signature: number;
}

export interface SpotifyArtist {
  id: string;
  name: string;
  genres: string[];
}

export interface SpotifySearchResponse {
  tracks: {
    items: SpotifyTrack[];
    total: number;
  };
}

export interface SpotifyTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token?: string;
  scope: string;
}
