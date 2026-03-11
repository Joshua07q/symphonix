import type { Song } from "../data/songs";
import ProgressionPlayer from "./ProgressionPlayer";
import Fretboard from "./Fretboard";
import AudioPreview from "./AudioPreview";
import { playChord } from "../audio/synth";

interface SongDetailProps {
  song: Song;
  onBack: () => void;
}

export default function SongDetail({ song, onBack }: SongDetailProps) {
  const uniqueChords = [...new Set(song.chords)];
  const isSpotify = song.source === "spotify";

  return (
    <div className="song-detail">
      <button className="btn-back" onClick={onBack}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M9 2L4 7l5 5" />
        </svg>
        Back
      </button>

      {/* Header with optional album art */}
      <div className={`song-detail-header ${isSpotify ? "with-art" : ""}`}>
        {song.albumArt && (
          <img className="song-detail-art" src={song.albumArt} alt={song.title} />
        )}
        <div className="song-detail-header-text">
          <h2 className="song-detail-title">{song.title}</h2>
          <p className="song-detail-meta">
            {song.artist} &middot; Key of {song.key} &middot; {song.bpm} BPM
          </p>
          <div className="song-detail-tags">
            <span className="tag">{song.genre}</span>
            <span className="tag">{"●".repeat(song.difficulty)} {["", "Easy", "Medium", "Hard"][song.difficulty]}</span>
            {isSpotify && <span className="tag tag-spotify">via Spotify</span>}
          </div>
        </div>
      </div>

      {/* Audio Preview (Spotify 30s clip) */}
      {song.previewUrl && (
        <div className="card">
          <h3 className="section-label">Listen</h3>
          <AudioPreview url={song.previewUrl} spotifyUrl={song.spotifyUrl} />
        </div>
      )}

      {/* Open in Spotify (when no preview available) */}
      {!song.previewUrl && song.spotifyUrl && (
        <a
          href={song.spotifyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="card spotify-link-card"
        >
          <svg width="20" height="20" viewBox="0 0 16 16" fill="#1DB954">
            <path d="M8 0a8 8 0 100 16A8 8 0 008 0zm3.67 11.55a.5.5 0 01-.68.17c-1.88-1.15-4.24-1.41-7.02-.77a.5.5 0 11-.22-.97c3.04-.7 5.65-.4 7.75.89a.5.5 0 01.17.68zm.98-2.18a.62.62 0 01-.85.21c-2.15-1.32-5.43-1.7-7.97-.93a.62.62 0 01-.36-1.19c2.9-.88 6.51-.45 8.97 1.06a.62.62 0 01.21.85zm.08-2.27C10.44 5.6 6.07 5.46 3.54 6.23a.75.75 0 11-.43-1.43c2.9-.88 7.72-.71 10.76 1.1a.75.75 0 01-.14 1.2z"/>
          </svg>
          <span>Listen on Spotify</span>
        </a>
      )}

      {/* Progression Player */}
      <div className="card">
        <h3 className="section-label">Progression</h3>
        <ProgressionPlayer song={song} />
      </div>

      {/* Chord Diagrams */}
      <div className="card">
        <h3 className="section-label">Chord Shapes</h3>
        <div className="chord-diagrams-row">
          {uniqueChords.map((ch) => (
            <Fretboard
              key={ch}
              chord={ch}
              size="small"
              showFingers={true}
              onPlay={playChord}
            />
          ))}
        </div>
      </div>

      {/* Theory Note */}
      <div className="card card-theory">
        <h3 className="section-label">Theory Note</h3>
        <p className="theory-text">{song.theory}</p>
      </div>

      {/* Quick Tips */}
      <div className="card">
        <h3 className="section-label">Practice Tips</h3>
        <ul className="tips-list">
          <li>Start at {Math.round(song.bpm * 0.6)} BPM and work up to full speed</li>
          <li>Focus on clean chord transitions before worrying about strumming</li>
          <li>Tap each chord above to hear how it should sound individually</li>
          {song.chords.some(c => ["F", "Bm", "B", "Fm", "Bb", "Cm", "Ab"].includes(c)) && (
            <li>This song includes barre chords -- consider using a capo for easier shapes</li>
          )}
        </ul>
      </div>
    </div>
  );
}
