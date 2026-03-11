import { useState, useEffect, useCallback } from "react";
import { SONGS, Song } from "./data/songs";
import { isAudioStarted, ensureAudio } from "./audio/synth";
import { useSpotifyAuth } from "./hooks/useSpotifyAuth";
import { useSpotifySearch } from "./hooks/useSpotifySearch";
import SongCard from "./components/SongCard";
import SongDetail from "./components/SongDetail";
import ChordLibrary from "./components/ChordLibrary";
import TheoryLessons from "./components/TheoryLessons";
import PracticeTracker from "./components/PracticeTracker";
import SpotifyLogin from "./components/SpotifyLogin";
import SpotifySearch from "./components/SpotifySearch";

type Tab = "songs" | "chords" | "theory" | "practice";
type SongStatus = "none" | "learning" | "learned";
type TrackerState = Record<string, SongStatus>;

const TABS: { id: Tab; label: string }[] = [
  { id: "songs", label: "Songs" },
  { id: "chords", label: "Chords" },
  { id: "theory", label: "Theory" },
  { id: "practice", label: "Practice" },
];

function loadTracker(): TrackerState {
  try {
    const raw = localStorage.getItem("symphonix-tracker");
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function loadPracticedChords(): Set<string> {
  try {
    const raw = localStorage.getItem("symphonix-practiced-chords");
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch {
    return new Set();
  }
}

export default function App() {
  const [tab, setTab] = useState<Tab>("songs");
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [audioReady, setAudioReady] = useState(isAudioStarted());
  const [tracker, setTracker] = useState<TrackerState>(loadTracker);
  const [practicedChords, setPracticedChords] = useState<Set<string>>(loadPracticedChords);
  const [featuredSearch, setFeaturedSearch] = useState("");

  // Spotify integration
  const spotify = useSpotifyAuth();
  const spotifySearch = useSpotifySearch(spotify.isConnected);

  // Persist tracker
  useEffect(() => {
    localStorage.setItem("symphonix-tracker", JSON.stringify(tracker));
  }, [tracker]);

  useEffect(() => {
    localStorage.setItem("symphonix-practiced-chords", JSON.stringify([...practicedChords]));
  }, [practicedChords]);

  const handleAudioInit = async () => {
    await ensureAudio();
    setAudioReady(true);
  };

  const handleTabChange = (t: Tab) => {
    setTab(t);
    setSelectedSong(null);
    setFeaturedSearch("");
  };

  const handleToggleTracker = useCallback((songId: string) => {
    setTracker((prev) => {
      const current = prev[songId] || "none";
      const next: SongStatus = current === "none" ? "learning" : current === "learning" ? "learned" : "none";
      return { ...prev, [songId]: next };
    });
  }, []);

  const handleChordPracticed = useCallback((chord: string) => {
    setPracticedChords((prev) => {
      const next = new Set(prev);
      next.add(chord);
      return next;
    });
  }, []);

  const handleSpotifySongAnalyzed = useCallback((song: Song) => {
    setSelectedSong(song);
  }, []);

  // Filter featured songs
  const filteredSongs = featuredSearch
    ? SONGS.filter(
        (s) =>
          s.title.toLowerCase().includes(featuredSearch.toLowerCase()) ||
          s.artist.toLowerCase().includes(featuredSearch.toLowerCase()) ||
          s.genre.toLowerCase().includes(featuredSearch.toLowerCase()) ||
          s.chords.some((c) => c.toLowerCase() === featuredSearch.toLowerCase())
      )
    : SONGS;

  const learnedCount = Object.values(tracker).filter((s) => s === "learned").length;

  return (
    <div className="app">
      {/* Audio init overlay */}
      {!audioReady && (
        <div className="audio-overlay" onClick={handleAudioInit}>
          <div className="audio-overlay-content">
            <div className="audio-icon">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round">
                <path d="M8 12v8M12 8v16M16 10v12M20 6v20M24 12v8" />
              </svg>
            </div>
            <span className="audio-overlay-text">Tap to enable audio</span>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="header">
        <div className="header-inner">
          <div className="header-top-row">
            <div className="header-brand">
              <h1 className="header-title">Symphonix</h1>
              <p className="header-subtitle">Search any song. Learn the chords. Understand the theory.</p>
            </div>
          </div>
        </div>
      </header>

      {/* Tab bar */}
      <nav className="tab-bar">
        <div className="tab-bar-inner">
          {TABS.map((t) => (
            <button
              key={t.id}
              className={`tab-btn ${tab === t.id ? "active" : ""}`}
              onClick={() => handleTabChange(t.id)}
            >
              {t.label}
              {t.id === "practice" && learnedCount > 0 && (
                <span className="tab-badge">{learnedCount}</span>
              )}
            </button>
          ))}
        </div>
      </nav>

      {/* Content */}
      <main className="content">
        {/* ── Songs Tab ── */}
        {tab === "songs" && !selectedSong && (
          <div className="songs-view">
            {/* Spotify Connection */}
            <SpotifyLogin
              isConnected={spotify.isConnected}
              hasClientId={spotify.hasClientId}
              onLogin={spotify.login}
              onLogout={spotify.logout}
            />

            {/* Spotify Search (when connected) */}
            {spotify.isConnected && (
              <SpotifySearch
                query={spotifySearch.query}
                setQuery={spotifySearch.setQuery}
                results={spotifySearch.results}
                loading={spotifySearch.loading}
                error={spotifySearch.error}
                onSongAnalyzed={handleSpotifySongAnalyzed}
              />
            )}

            {/* Featured Songs */}
            <div className="featured-section">
              <h3 className="featured-label">
                {spotify.isConnected ? "Featured Songs" : "Song Library"}
              </h3>
              <div className="search-bar">
                <svg className="search-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#999" strokeWidth="2" strokeLinecap="round">
                  <circle cx="7" cy="7" r="4.5" />
                  <path d="M10.5 10.5L14 14" />
                </svg>
                <input
                  type="text"
                  className="search-input"
                  placeholder="Filter by song, artist, genre, chord..."
                  value={featuredSearch}
                  onChange={(e) => setFeaturedSearch(e.target.value)}
                />
                {featuredSearch && (
                  <button className="search-clear" onClick={() => setFeaturedSearch("")}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#999" strokeWidth="2" strokeLinecap="round">
                      <path d="M2 2l8 8M10 2l-8 8" />
                    </svg>
                  </button>
                )}
              </div>
              <div className="song-count">{filteredSongs.length} songs</div>
              <div className="song-list">
                {filteredSongs.map((s) => (
                  <SongCard
                    key={s.id}
                    song={s}
                    onClick={setSelectedSong}
                    status={tracker[s.id] || "none"}
                  />
                ))}
                {filteredSongs.length === 0 && (
                  <div className="empty-state">No songs match your search.</div>
                )}
              </div>
            </div>
          </div>
        )}

        {tab === "songs" && selectedSong && (
          <SongDetail song={selectedSong} onBack={() => setSelectedSong(null)} />
        )}

        {/* ── Chords Tab ── */}
        {tab === "chords" && (
          <ChordLibrary onChordPracticed={handleChordPracticed} />
        )}

        {/* ── Theory Tab ── */}
        {tab === "theory" && <TheoryLessons />}

        {/* ── Practice Tab ── */}
        {tab === "practice" && (
          <PracticeTracker
            tracker={tracker}
            practicedChords={practicedChords}
            onToggle={handleToggleTracker}
          />
        )}
      </main>
    </div>
  );
}
