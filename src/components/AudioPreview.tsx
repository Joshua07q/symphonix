import { useState, useRef } from "react";

interface AudioPreviewProps {
  url: string;
  spotifyUrl?: string;
}

export default function AudioPreview({ url, spotifyUrl }: AudioPreviewProps) {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play();
      setPlaying(true);
    }
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    const pct = (audioRef.current.currentTime / audioRef.current.duration) * 100;
    setProgress(pct);
  };

  const handleEnded = () => {
    setPlaying(false);
    setProgress(0);
  };

  return (
    <div className="audio-preview">
      <audio
        ref={audioRef}
        src={url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        preload="none"
      />
      <button className="btn-preview-play" onClick={toggle}>
        {playing ? (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
            <rect x="2" y="1" width="3.5" height="12" rx="1" />
            <rect x="8.5" y="1" width="3.5" height="12" rx="1" />
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
            <path d="M2.5 1v12l10-6z" />
          </svg>
        )}
      </button>
      <div className="preview-bar">
        <div className="preview-bar-fill" style={{ width: `${progress}%` }} />
      </div>
      <span className="preview-label">30s preview</span>
      {spotifyUrl && (
        <a
          href={spotifyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-open-spotify"
        >
          Open in Spotify
        </a>
      )}
    </div>
  );
}
