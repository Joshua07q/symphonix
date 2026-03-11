import { useState, useCallback } from "react";
import { ALL_CHORD_NAMES, CHORD_DATA } from "../data/chords";
import { playChord } from "../audio/synth";
import Fretboard from "./Fretboard";

interface ChordLibraryProps {
  onChordPracticed?: (chord: string) => void;
}

export default function ChordLibrary({ onChordPracticed }: ChordLibraryProps) {
  const [selected, setSelected] = useState("C");

  const handlePlay = useCallback((chord: string) => {
    playChord(chord);
    onChordPracticed?.(chord);
  }, [onChordPracticed]);

  const data = CHORD_DATA[selected];

  return (
    <div className="chord-library">
      <div className="chord-grid">
        {ALL_CHORD_NAMES.map((ch) => (
          <button
            key={ch}
            className={`chord-btn ${selected === ch ? "active" : ""} ${CHORD_DATA[ch].barre ? "is-barre" : ""}`}
            onClick={() => { setSelected(ch); handlePlay(ch); }}
          >
            {ch}
          </button>
        ))}
      </div>

      <div className="chord-detail-card">
        <Fretboard
          chord={selected}
          size="large"
          showFingers={true}
          onPlay={handlePlay}
        />

        <div className="chord-info">
          {data?.barre && (
            <span className="barre-tag">Barre Chord</span>
          )}
          <div className="chord-notes">
            Notes: {data?.notes.join(" - ")}
          </div>
          <p className="chord-hint">Tap the chord name to hear it</p>
        </div>
      </div>
    </div>
  );
}
