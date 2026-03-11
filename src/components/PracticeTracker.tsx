import { SONGS } from "../data/songs";

type SongStatus = "none" | "learning" | "learned";
type TrackerState = Record<string, SongStatus>;

interface PracticeTrackerProps {
  tracker: TrackerState;
  practicedChords: Set<string>;
  onToggle: (songId: string) => void;
}

export default function PracticeTracker({ tracker, practicedChords, onToggle }: PracticeTrackerProps) {
  const learnedCount = Object.values(tracker).filter((s) => s === "learned").length;
  const learningCount = Object.values(tracker).filter((s) => s === "learning").length;

  return (
    <div className="practice-tracker">
      {/* Stats */}
      <div className="tracker-stats">
        <div className="stat-card">
          <span className="stat-number">{learnedCount}</span>
          <span className="stat-label">Learned</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{learningCount}</span>
          <span className="stat-label">In Progress</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{SONGS.length - learnedCount - learningCount}</span>
          <span className="stat-label">Not Started</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="tracker-progress-bar">
        <div
          className="tracker-progress-fill learned"
          style={{ width: `${(learnedCount / SONGS.length) * 100}%` }}
        />
        <div
          className="tracker-progress-fill learning"
          style={{ width: `${(learningCount / SONGS.length) * 100}%` }}
        />
      </div>

      {/* Song checklist */}
      <div className="tracker-list">
        <h3 className="section-label">Song Checklist</h3>
        {SONGS.map((song) => {
          const status = tracker[song.id] || "none";
          return (
            <div key={song.id} className="tracker-item" onClick={() => onToggle(song.id)}>
              <div className={`tracker-check ${status}`}>
                {status === "learned" && (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M3 7l3 3 5-6" />
                  </svg>
                )}
                {status === "learning" && (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round">
                    <path d="M4 7h6" />
                  </svg>
                )}
              </div>
              <div className="tracker-item-info">
                <span className="tracker-item-title">{song.title}</span>
                <span className="tracker-item-artist">{song.artist}</span>
              </div>
              <span className={`tracker-status-label ${status}`}>
                {status === "learned" ? "Learned" : status === "learning" ? "Learning" : ""}
              </span>
            </div>
          );
        })}
      </div>

      {/* Practiced chords */}
      {practicedChords.size > 0 && (
        <div className="tracker-chords">
          <h3 className="section-label">Chords Practiced</h3>
          <div className="practiced-chord-grid">
            {[...practicedChords].map((ch) => (
              <span key={ch} className="practiced-chord">{ch}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
