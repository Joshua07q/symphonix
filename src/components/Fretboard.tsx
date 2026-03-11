import { CHORD_DATA, STRING_NAMES } from "../data/chords";
import { playChord } from "../audio/synth";

interface FretboardProps {
  chord: string;
  size?: "small" | "large";
  showFingers?: boolean;
  onPlay?: (chord: string) => void;
}

export default function Fretboard({ chord, size = "small", showFingers = true, onPlay }: FretboardProps) {
  const data = CHORD_DATA[chord];
  if (!data) return null;

  const frets = data.frets;
  const fingers = data.fingers;
  const numFrets = 5;

  const w = size === "large" ? 180 : 120;
  const h = size === "large" ? 220 : 160;
  const scale = size === "large" ? 1.5 : 1;
  const padLeft = 20 * scale;
  const padTop = 22 * scale;
  const stringSpacing = 16.8 * scale;
  const fretSpacing = 26 * scale;
  const dotR = size === "large" ? 10 : 7;
  const nutW = (5 * stringSpacing);

  const handlePlay = () => {
    if (onPlay) onPlay(chord);
    else playChord(chord);
  };

  return (
    <div className="fretboard-wrap">
      <button className="fretboard-label" onClick={handlePlay}>
        {chord}
        {data.barre && <span className="barre-badge">barre</span>}
      </button>
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="fretboard-svg">
        {/* Nut */}
        <rect
          x={padLeft - 2}
          y={padTop - 2}
          width={nutW + 4}
          height={4 * scale}
          rx={1}
          fill="#111"
        />
        {/* Frets */}
        {Array.from({ length: numFrets }).map((_, i) => (
          <line
            key={`fret-${i}`}
            x1={padLeft - 2}
            y1={padTop + (i + 1) * fretSpacing}
            x2={padLeft + nutW + 2}
            y2={padTop + (i + 1) * fretSpacing}
            stroke="#d0d0d0"
            strokeWidth={1.5}
          />
        ))}
        {/* Strings */}
        {Array.from({ length: 6 }).map((_, i) => (
          <line
            key={`str-${i}`}
            x1={padLeft + i * stringSpacing}
            y1={padTop}
            x2={padLeft + i * stringSpacing}
            y2={padTop + numFrets * fretSpacing}
            stroke={i < 3 ? "#888" : "#aaa"}
            strokeWidth={i < 3 ? 1.8 : 1.2}
          />
        ))}
        {/* Finger dots / open / muted */}
        {frets.map((f, i) => {
          const x = padLeft + i * stringSpacing;
          if (f === -1) {
            return (
              <text
                key={`dot-${i}`}
                x={x}
                y={padTop - 8 * scale}
                textAnchor="middle"
                fontSize={11 * scale}
                fill="#999"
                fontFamily="system-ui"
              >
                x
              </text>
            );
          }
          if (f === 0) {
            return (
              <circle
                key={`dot-${i}`}
                cx={x}
                cy={padTop - 8 * scale}
                r={4 * scale}
                fill="none"
                stroke="#111"
                strokeWidth={1.5}
              />
            );
          }
          const y = padTop + (f - 0.5) * fretSpacing;
          return (
            <g key={`dot-${i}`}>
              <circle cx={x} cy={y} r={dotR} fill="#111" />
              {showFingers && fingers[i] > 0 && (
                <text
                  x={x}
                  y={y + (size === "large" ? 4 : 3.5)}
                  textAnchor="middle"
                  fontSize={size === "large" ? 11 : 9}
                  fill="#fff"
                  fontWeight="bold"
                  fontFamily="system-ui"
                >
                  {fingers[i]}
                </text>
              )}
            </g>
          );
        })}
        {/* String labels */}
        {STRING_NAMES.map((s, i) => (
          <text
            key={`label-${i}`}
            x={padLeft + i * stringSpacing}
            y={padTop + numFrets * fretSpacing + 16 * scale}
            textAnchor="middle"
            fontSize={9 * scale}
            fill="#aaa"
            fontFamily="monospace"
          >
            {s}
          </text>
        ))}
      </svg>
    </div>
  );
}
