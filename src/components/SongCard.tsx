import type { Song } from "../data/songs";

interface SongCardProps {
  song: Song;
  onClick: (song: Song) => void;
  status?: "none" | "learning" | "learned";
}

const diffColors = [
  {},
  { bg: "#e8f5e9", fg: "#2e7d32" },
  { bg: "#fff8e1", fg: "#f57f17" },
  { bg: "#fce4ec", fg: "#c62828" },
];

export default function SongCard({ song, onClick, status }: SongCardProps) {
  const dc = diffColors[song.difficulty];

  return (
    <div className="song-card" onClick={() => onClick(song)}>
      <div className="song-card-left">
        <div className="song-card-title">
          {status === "learned" && <span className="status-dot learned" />}
          {status === "learning" && <span className="status-dot learning" />}
          {song.title}
        </div>
        <div className="song-card-artist">{song.artist}</div>
      </div>
      <div className="song-card-right">
        <span className="song-card-genre">{song.genre}</span>
        <span className="song-card-bpm">{song.bpm} BPM</span>
        <span className="song-card-diff" style={{ background: dc.bg, color: dc.fg }}>
          {"●".repeat(song.difficulty)}{"○".repeat(3 - song.difficulty)}
        </span>
      </div>
    </div>
  );
}
