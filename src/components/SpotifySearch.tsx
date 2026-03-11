import { useState } from "react";
import type { SpotifyTrack } from "../spotify/types";
import { getAudioFeatures, getArtist } from "../spotify/api";
import { generateProgression, estimateFeaturesFromGenre } from "../music/chordGenerator";
import { generateTheoryNote, detectGenreLabel } from "../music/theoryGenerator";
import type { Song } from "../data/songs";

interface SpotifySearchProps {
  query: string;
  setQuery: (q: string) => void;
  results: SpotifyTrack[];
  loading: boolean;
  error: string | null;
  onSongAnalyzed: (song: Song) => void;
}

export default function SpotifySearch({
  query,
  setQuery,
  results,
  loading,
  error,
  onSongAnalyzed,
}: SpotifySearchProps) {
  const [analyzingId, setAnalyzingId] = useState<string | null>(null);

  const analyzeTrack = async (track: SpotifyTrack) => {
    setAnalyzingId(track.id);

    try {
      // Try to get audio features (may fail if deprecated for new apps)
      let features = await getAudioFeatures(track.id);
      let genres: string[] = [];

      // Get artist genres for fallback and genre labeling
      if (track.artists[0]) {
        const artist = await getArtist(track.artists[0].id);
        if (artist) genres = artist.genres;
      }

      // If audio features unavailable, estimate from genre
      if (!features) {
        features = estimateFeaturesFromGenre(genres) as any;
      }

      const energy = features?.energy ?? 0.5;
      const valence = features?.valence ?? 0.5;
      const tempo = features?.tempo ?? 120;
      const genreLabel = detectGenreLabel(genres);

      // Generate chord progression
      const prog = generateProgression(
        {
          key: features?.key,
          mode: features?.mode,
          energy,
          valence,
          tempo,
        },
        genres
      );

      // Generate theory note
      const theory = generateTheoryNote(prog, tempo, energy, valence, genreLabel);

      // Build Song object
      const song: Song = {
        id: `spotify-${track.id}`,
        title: track.name,
        artist: track.artists.map((a) => a.name).join(", "),
        difficulty: prog.difficulty,
        bpm: Math.round(tempo),
        chords: prog.chords,
        key: prog.keyName,
        theory,
        genre: genreLabel,
        source: "spotify",
        albumArt: track.album.images[0]?.url,
        previewUrl: track.preview_url ?? undefined,
        spotifyId: track.id,
        spotifyUrl: track.external_urls.spotify,
      };

      onSongAnalyzed(song);
    } catch (err) {
      console.error("Failed to analyze track:", err);
    } finally {
      setAnalyzingId(null);
    }
  };

  return (
    <div className="spotify-search">
      <div className="search-bar spotify-search-bar">
        <svg className="search-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#1DB954" strokeWidth="2" strokeLinecap="round">
          <circle cx="7" cy="7" r="4.5" />
          <path d="M10.5 10.5L14 14" />
        </svg>
        <input
          type="text"
          className="search-input"
          placeholder="Search any song on Spotify..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query && (
          <button className="search-clear" onClick={() => setQuery("")}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#999" strokeWidth="2" strokeLinecap="round">
              <path d="M2 2l8 8M10 2l-8 8" />
            </svg>
          </button>
        )}
      </div>

      {loading && (
        <div className="spotify-loading">
          <div className="spinner" />
          Searching...
        </div>
      )}

      {error && <div className="spotify-error">{error}</div>}

      {results.length > 0 && (
        <div className="spotify-results">
          {results.map((track) => (
            <div
              key={track.id}
              className="spotify-result-card"
              onClick={() => analyzeTrack(track)}
            >
              {track.album.images[2] ? (
                <img
                  className="spotify-result-art"
                  src={track.album.images[2].url}
                  alt={track.album.name}
                  width={48}
                  height={48}
                />
              ) : (
                <div className="spotify-result-art-placeholder" />
              )}
              <div className="spotify-result-info">
                <span className="spotify-result-title">{track.name}</span>
                <span className="spotify-result-artist">
                  {track.artists.map((a) => a.name).join(", ")}
                </span>
              </div>
              <button
                className={`btn-analyze ${analyzingId === track.id ? "analyzing" : ""}`}
                disabled={analyzingId !== null}
                onClick={(e) => {
                  e.stopPropagation();
                  analyzeTrack(track);
                }}
              >
                {analyzingId === track.id ? (
                  <div className="spinner-sm" />
                ) : (
                  "Analyze"
                )}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
