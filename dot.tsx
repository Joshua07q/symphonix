import { useState, useEffect, useRef, useCallback } from "react";
import * as Tone from "tone";

// ── Data ──────────────────────────────────────────────────────────────

const CHORD_DATA = {
  C:  { frets: [0,3,2,0,1,0], fingers: [0,3,2,0,1,0], freq: ["C4","E3","C3","G3","E4","C5"], barr: false },
  D:  { frets: [-1,-1,0,2,3,2], fingers: [0,0,0,1,3,2], freq: ["D4","A3","D4","F#4","A4","D5"], barr: false },
  E:  { frets: [0,2,2,1,0,0], fingers: [0,2,3,1,0,0], freq: ["E2","B2","E3","G#3","B3","E4"], barr: false },
  Em: { frets: [0,2,2,0,0,0], fingers: [0,2,3,0,0,0], freq: ["E2","B2","E3","G3","B3","E4"], barr: false },
  Am: { frets: [-1,0,2,2,1,0], fingers: [0,0,2,3,1,0], freq: ["A2","E3","A3","C4","E4","A4"], barr: false },
  G:  { frets: [3,2,0,0,0,3], fingers: [2,1,0,0,0,3], freq: ["G2","B2","D3","G3","B3","G4"], barr: false },
  F:  { frets: [1,1,2,3,3,1], fingers: [1,1,2,3,4,1], freq: ["F2","C3","F3","A3","C4","F4"], barr: true },
  Bm: { frets: [-1,2,4,4,3,2], fingers: [0,1,3,4,2,1], freq: ["B2","F#3","B3","D4","F#4","B4"], barr: true },
  A:  { frets: [-1,0,2,2,2,0], fingers: [0,0,1,2,3,0], freq: ["A2","E3","A3","C#4","E4","A4"], barr: false },
  Dm: { frets: [-1,-1,0,2,3,1], fingers: [0,0,0,2,3,1], freq: ["D3","A3","D4","F4","A4","D5"], barr: false },
  B:  { frets: [-1,2,4,4,4,2], fingers: [0,1,2,3,4,1], freq: ["B2","F#3","B3","D#4","F#4","B4"], barr: true },
  Fm: { frets: [1,1,3,3,2,1], fingers: [1,1,3,4,2,1], freq: ["F2","C3","F3","Ab3","C4","F4"], barr: true },
};

const STRING_NAMES = ["E","A","D","G","B","e"];

const SONGS = [
  {
    title: "Heartless",
    artist: "Kanye West",
    difficulty: 2,
    bpm: 87,
    chords: ["Am","C","G","D"],
    key: "Am",
    theory: "Classic vi–I–V–II progression in A minor. The Am gives it that melancholy feel, while the G and D lift the chorus. This is one of the most common pop/hip-hop progressions — learn it and you unlock hundreds of songs."
  },
  {
    title: "HUMBLE.",
    artist: "Kendrick Lamar",
    difficulty: 2,
    bpm: 150,
    chords: ["Dm","Am","Em","Dm"],
    key: "Dm",
    theory: "Built on minor chords throughout, giving it a dark, aggressive tone. The i–v–ii–i movement in D minor keeps tension high. Minor keys dominate in hip-hop because they convey intensity and edge."
  },
  {
    title: "Gët Busy",
    artist: "Yeat",
    difficulty: 1,
    bpm: 140,
    chords: ["Em","G","D","Em"],
    key: "Em",
    theory: "Simple i–III–VII–i in E minor. The power of this progression is in the rhythm and repetition. E minor is the easiest key on guitar — your open strings naturally ring in key."
  },
  {
    title: "Bang!",
    artist: "AJR",
    difficulty: 3,
    bpm: 130,
    chords: ["C","G","Am","F"],
    key: "C",
    theory: "The I–V–vi–IV progression — literally the most popular progression in all of pop music. In the key of C, every chord is beginner-friendly. Master this and you can play thousands of songs."
  },
  {
    title: "Runaway",
    artist: "Kanye West",
    difficulty: 2,
    bpm: 80,
    chords: ["E","Am","C","D"],
    key: "E",
    theory: "The opening piano riff translates beautifully to guitar. The E major start creates brightness before dropping into Am for emotional contrast. The slow BPM makes this perfect for practice."
  },
  {
    title: "LOVE.",
    artist: "Kendrick Lamar",
    difficulty: 2,
    bpm: 100,
    chords: ["G","Em","C","D"],
    key: "G",
    theory: "I–vi–IV–V in G major. This is the 'doo-wop' progression that's been used since the 1950s. The Em adds sweetness, making it perfect for Kendrick's softer side."
  },
  {
    title: "World's Smallest Violin",
    artist: "AJR",
    difficulty: 3,
    bpm: 75,
    chords: ["Am","F","C","G"],
    key: "Am",
    theory: "vi–IV–I–V starting from the relative minor gives a bittersweet, theatrical quality. AJR loves building from quiet to loud — try strumming softly at first, then building intensity."
  },
  {
    title: "Stronger",
    artist: "Kanye West",
    difficulty: 2,
    bpm: 104,
    chords: ["Am","Em","D","Am"],
    key: "Am",
    theory: "Dark minor loop — the Am to Em movement is pure guitar gold. The D chord adds a momentary lift before resolving back. Practice palm muting on this one for that punchy electronic feel."
  },
];

const THEORY_TIPS = [
  { title: "The I-V-vi-IV", body: "C–G–Am–F (in key of C). This single progression powers most of pop music. Learn it in every key and you're unstoppable." },
  { title: "Minor = Mood", body: "Minor chords (Am, Em, Dm) sound sad or intense. Hip-hop and R&B lean heavily on minor keys for emotional weight." },
  { title: "Barre Chord Hack", body: "F and Bm are the first barre chords to learn. Press your index finger flat across all strings — it acts like a movable capo." },
  { title: "Rhythm > Notes", body: "A simple chord played with great rhythm sounds better than complex chords with bad timing. Practice with a metronome." },
  { title: "Transposing", body: "If a song's chords are too hard, use a capo to shift the key. Capo on fret 2 turns Em shapes into F#m sounds." },
  { title: "Power Chords", body: "Just the root and fifth — two fingers, any fret. Used in rock and punk but also great for hip-hop guitar covers." },
];

// ── Synth ─────────────────────────────────────────────────────────────

let synth = null;
const initSynth = async () => {
  await Tone.start();
  if (!synth) {
    synth = new Tone.PolySynth(Tone.Synth, {
      maxPolyphony: 6,
      voice: Tone.Synth,
      options: {
        oscillator: { type: "triangle" },
        envelope: { attack: 0.02, decay: 0.3, sustain: 0.2, release: 1.2 },
        volume: -8,
      }
    }).toDestination();
  }
};

const playChord = async (chordName) => {
  await initSynth();
  const ch = CHORD_DATA[chordName];
  if (!ch) return;
  const notes = ch.freq.filter((_, i) => ch.frets[i] !== -1);
  synth.triggerAttackRelease(notes, "8n");
};

// ── Components ────────────────────────────────────────────────────────

const Fretboard = ({ chord, onPlay }) => {
  const data = CHORD_DATA[chord];
  if (!data) return null;
  const frets = data.frets;
  const numFrets = 5;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
      <div
        onClick={() => onPlay(chord)}
        style={{
          cursor: "pointer",
          padding: "6px 20px",
          borderRadius: 6,
          background: "#111",
          color: "#fff",
          fontSize: 14,
          fontWeight: 600,
          letterSpacing: 1,
          userSelect: "none",
          transition: "background 0.15s",
        }}
        onMouseEnter={e => e.target.style.background = "#333"}
        onMouseLeave={e => e.target.style.background = "#111"}
      >
        {chord}
      </div>
      <svg width={120} height={160} viewBox="0 0 120 160" style={{ display: "block" }}>
        {/* Nut */}
        <rect x={18} y={18} width={84} height={4} rx={1} fill="#111" />
        {/* Frets */}
        {Array.from({ length: numFrets }).map((_, i) => (
          <line key={i} x1={18} y1={22 + (i + 1) * 26} x2={102} y2={22 + (i + 1) * 26} stroke="#ccc" strokeWidth={1.5} />
        ))}
        {/* Strings */}
        {Array.from({ length: 6 }).map((_, i) => (
          <line key={i} x1={20 + i * 16.8} y1={18} x2={20 + i * 16.8} y2={22 + numFrets * 26} stroke="#888" strokeWidth={i < 3 ? 1.8 : 1.2} />
        ))}
        {/* Dots */}
        {frets.map((f, i) => {
          const x = 20 + i * 16.8;
          if (f === -1) return (
            <text key={i} x={x} y={12} textAnchor="middle" fontSize={11} fill="#999" fontFamily="system-ui">✕</text>
          );
          if (f === 0) return (
            <circle key={i} cx={x} cy={12} r={4} fill="none" stroke="#111" strokeWidth={1.5} />
          );
          const y = 22 + (f - 0.5) * 26;
          return (
            <circle key={i} cx={x} cy={y} r={7} fill="#111" />
          );
        })}
        {/* String labels */}
        {STRING_NAMES.map((s, i) => (
          <text key={i} x={20 + i * 16.8} y={22 + numFrets * 26 + 16} textAnchor="middle" fontSize={9} fill="#aaa" fontFamily="monospace">{s}</text>
        ))}
      </svg>
    </div>
  );
};

const ProgressionPlayer = ({ song }) => {
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(-1);
  const [bpm, setBpm] = useState(song.bpm);
  const intervalRef = useRef(null);

  const stop = useCallback(() => {
    setPlaying(false);
    setCurrent(-1);
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  useEffect(() => { return () => { if (intervalRef.current) clearInterval(intervalRef.current); }; }, []);
  useEffect(() => { stop(); setBpm(song.bpm); }, [song, stop]);

  const play = async () => {
    await initSynth();
    if (playing) { stop(); return; }
    setPlaying(true);
    let idx = 0;
    setCurrent(0);
    playChord(song.chords[0]);
    const ms = (60 / bpm) * 2 * 1000;
    intervalRef.current = setInterval(() => {
      idx = (idx + 1) % song.chords.length;
      setCurrent(idx);
      playChord(song.chords[idx]);
    }, ms);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
        {song.chords.map((ch, i) => (
          <div
            key={i}
            style={{
              padding: "12px 20px",
              borderRadius: 8,
              background: current === i ? "#111" : "#f5f5f5",
              color: current === i ? "#fff" : "#111",
              fontWeight: 700,
              fontSize: 20,
              fontFamily: "monospace",
              transition: "all 0.15s",
              minWidth: 60,
              textAlign: "center",
              transform: current === i ? "scale(1.1)" : "scale(1)",
            }}
          >
            {ch}
          </div>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
        <button
          onClick={play}
          style={{
            padding: "8px 24px",
            borderRadius: 6,
            background: playing ? "#e0e0e0" : "#111",
            color: playing ? "#111" : "#fff",
            border: "none",
            cursor: "pointer",
            fontWeight: 600,
            fontSize: 14,
          }}
        >
          {playing ? "Stop" : "▶ Play"}
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 12, color: "#888" }}>BPM</span>
          <input
            type="range"
            min={40}
            max={200}
            value={bpm}
            onChange={e => {
              const v = +e.target.value;
              setBpm(v);
              if (playing) { stop(); }
            }}
            style={{ width: 100, accentColor: "#111" }}
          />
          <span style={{ fontSize: 13, fontFamily: "monospace", color: "#555", minWidth: 28 }}>{bpm}</span>
        </div>
      </div>
    </div>
  );
};

// ── Main App ──────────────────────────────────────────────────────────

export default function GuitarHub() {
  const [tab, setTab] = useState("songs");
  const [selectedSong, setSelectedSong] = useState(null);
  const [selectedChord, setSelectedChord] = useState("C");

  const tabs = [
    { id: "songs", label: "Songs" },
    { id: "chords", label: "Chords" },
    { id: "theory", label: "Theory" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#fafafa", fontFamily: "'Inter', system-ui, -apple-system, sans-serif", color: "#111" }}>
      {/* Header */}
      <div style={{ padding: "28px 24px 20px", borderBottom: "1px solid #eee", background: "#fff" }}>
        <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, letterSpacing: -0.5 }}>Guitar Hub</h1>
        <p style={{ margin: "4px 0 0", fontSize: 13, color: "#888" }}>Learn songs. Understand theory. Play guitar.</p>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 0, borderBottom: "1px solid #eee", background: "#fff", padding: "0 24px" }}>
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => { setTab(t.id); setSelectedSong(null); }}
            style={{
              padding: "12px 20px",
              background: "none",
              border: "none",
              borderBottom: tab === t.id ? "2px solid #111" : "2px solid transparent",
              fontWeight: tab === t.id ? 700 : 400,
              color: tab === t.id ? "#111" : "#999",
              cursor: "pointer",
              fontSize: 14,
              transition: "all 0.15s",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ padding: 24, maxWidth: 600, margin: "0 auto" }}>

        {/* ─── Songs Tab ─── */}
        {tab === "songs" && !selectedSong && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {SONGS.map((s, i) => (
              <div
                key={i}
                onClick={() => setSelectedSong(s)}
                style={{
                  padding: "16px 20px",
                  borderRadius: 10,
                  background: "#fff",
                  border: "1px solid #eee",
                  cursor: "pointer",
                  transition: "all 0.15s",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#ccc"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#eee"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>{s.title}</div>
                  <div style={{ fontSize: 13, color: "#888", marginTop: 2 }}>{s.artist}</div>
                </div>
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <span style={{ fontSize: 11, color: "#aaa", fontFamily: "monospace" }}>{s.bpm} BPM</span>
                  <span style={{ fontSize: 11, background: s.difficulty <= 1 ? "#e8f5e9" : s.difficulty <= 2 ? "#fff8e1" : "#fce4ec", color: s.difficulty <= 1 ? "#2e7d32" : s.difficulty <= 2 ? "#f57f17" : "#c62828", padding: "2px 8px", borderRadius: 4, fontWeight: 600 }}>
                    {"●".repeat(s.difficulty)}{"○".repeat(3 - s.difficulty)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "songs" && selectedSong && (
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <button
              onClick={() => setSelectedSong(null)}
              style={{ alignSelf: "flex-start", background: "none", border: "none", cursor: "pointer", fontSize: 13, color: "#888", padding: 0 }}
            >
              ← Back to songs
            </button>
            <div>
              <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700 }}>{selectedSong.title}</h2>
              <p style={{ margin: "4px 0 0", fontSize: 14, color: "#888" }}>{selectedSong.artist} · Key of {selectedSong.key}</p>
            </div>

            {/* Player */}
            <div style={{ padding: 20, borderRadius: 12, background: "#fff", border: "1px solid #eee" }}>
              <ProgressionPlayer song={selectedSong} />
            </div>

            {/* Chord diagrams */}
            <div>
              <h3 style={{ fontSize: 13, fontWeight: 600, color: "#888", textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}>Chord Shapes</h3>
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
                {[...new Set(selectedSong.chords)].map(ch => (
                  <Fretboard key={ch} chord={ch} onPlay={playChord} />
                ))}
              </div>
            </div>

            {/* Theory */}
            <div style={{ padding: 20, borderRadius: 12, background: "#f8f8f8", border: "1px solid #eee" }}>
              <h3 style={{ fontSize: 13, fontWeight: 600, color: "#888", textTransform: "uppercase", letterSpacing: 1, margin: "0 0 8px" }}>Theory Note</h3>
              <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: "#444" }}>{selectedSong.theory}</p>
            </div>
          </div>
        )}

        {/* ─── Chords Tab ─── */}
        {tab === "chords" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {Object.keys(CHORD_DATA).map(ch => (
                <button
                  key={ch}
                  onClick={() => setSelectedChord(ch)}
                  style={{
                    padding: "6px 14px",
                    borderRadius: 6,
                    background: selectedChord === ch ? "#111" : "#fff",
                    color: selectedChord === ch ? "#fff" : "#111",
                    border: "1px solid",
                    borderColor: selectedChord === ch ? "#111" : "#ddd",
                    cursor: "pointer",
                    fontWeight: 600,
                    fontSize: 13,
                    fontFamily: "monospace",
                    transition: "all 0.15s",
                  }}
                >
                  {ch}
                </button>
              ))}
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, padding: 20, borderRadius: 12, background: "#fff", border: "1px solid #eee" }}>
              <Fretboard chord={selectedChord} onPlay={playChord} />
              {CHORD_DATA[selectedChord]?.barr && (
                <span style={{ fontSize: 12, color: "#c62828", background: "#fce4ec", padding: "2px 10px", borderRadius: 4 }}>Barre chord</span>
              )}
              <p style={{ fontSize: 12, color: "#aaa", margin: 0 }}>Tap the chord name to hear it</p>
            </div>
          </div>
        )}

        {/* ─── Theory Tab ─── */}
        {tab === "theory" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {THEORY_TIPS.map((t, i) => (
              <details
                key={i}
                style={{ padding: "16px 20px", borderRadius: 10, background: "#fff", border: "1px solid #eee", cursor: "pointer" }}
              >
                <summary style={{ fontWeight: 700, fontSize: 15, listStyle: "none", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  {t.title}
                  <span style={{ fontSize: 11, color: "#ccc", transition: "transform 0.15s" }}>▼</span>
                </summary>
                <p style={{ margin: "12px 0 0", fontSize: 14, lineHeight: 1.6, color: "#555" }}>{t.body}</p>
              </details>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
