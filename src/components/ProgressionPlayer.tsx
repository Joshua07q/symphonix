import { useState, useEffect, useRef, useCallback } from "react";
import { ensureAudio, playChord } from "../audio/synth";
import type { Song } from "../data/songs";

interface ProgressionPlayerProps {
  song: Song;
}

export default function ProgressionPlayer({ song }: ProgressionPlayerProps) {
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(-1);
  const [bpm, setBpm] = useState(song.bpm);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const idxRef = useRef(0);

  const stop = useCallback(() => {
    setPlaying(false);
    setCurrent(-1);
    idxRef.current = 0;
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    stop();
    setBpm(song.bpm);
  }, [song, stop]);

  const togglePlay = async () => {
    await ensureAudio();
    if (playing) {
      stop();
      return;
    }
    setPlaying(true);
    idxRef.current = 0;
    setCurrent(0);
    playChord(song.chords[0]);

    const ms = (60 / bpm) * 2 * 1000; // 2 beats per chord
    intervalRef.current = setInterval(() => {
      idxRef.current = (idxRef.current + 1) % song.chords.length;
      setCurrent(idxRef.current);
      playChord(song.chords[idxRef.current]);
    }, ms);
  };

  const handleBpmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = +e.target.value;
    setBpm(v);
    if (playing) stop();
  };

  return (
    <div className="player">
      <div className="player-chords">
        {song.chords.map((ch, i) => (
          <div
            key={i}
            className={`player-chord-badge ${current === i ? "active" : ""}`}
            onClick={() => playChord(ch)}
          >
            {ch}
          </div>
        ))}
      </div>

      <div className="player-controls">
        <button className={`btn-play ${playing ? "is-playing" : ""}`} onClick={togglePlay}>
          {playing ? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <rect x="2" y="2" width="4" height="12" rx="1" />
              <rect x="10" y="2" width="4" height="12" rx="1" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M3 1.5v13l11-6.5z" />
            </svg>
          )}
          <span>{playing ? "Stop" : "Play"}</span>
        </button>

        <div className="bpm-control">
          <span className="bpm-label">BPM</span>
          <input
            type="range"
            min={40}
            max={200}
            value={bpm}
            onChange={handleBpmChange}
            className="bpm-slider"
          />
          <span className="bpm-value">{bpm}</span>
        </div>
      </div>
    </div>
  );
}
