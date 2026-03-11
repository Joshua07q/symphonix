import { resolveNumeral, getKeyName, getRootNote } from "./keyMap";
import { PROGRESSION_TEMPLATES, type ProgressionTemplate } from "./progressions";
import { ALL_CHORD_NAMES, CHORD_DATA } from "../data/chords";
import type { SpotifyAudioFeatures } from "../spotify/types";

export interface GeneratedProgression {
  chords: string[];
  numerals: string[];
  progressionName: string;
  keyName: string;
  rootNote: string;
  mode: "major" | "minor";
  difficulty: 1 | 2 | 3;
}

// Chords we have fretboard data for
const AVAILABLE = new Set(ALL_CHORD_NAMES);

// Enharmonic fallbacks for chords we might not have
const ENHARMONIC: Record<string, string> = {
  "Db": "C#", "C#": "Db",
  "Eb": "D#", "D#": "Eb",
  "Gb": "F#", "F#": "Gb",
  "Ab": "G#", "G#": "Ab",
  "Bb": "A#", "A#": "Bb",
  "Dbm": "C#m", "C#m": "Dbm",
  "Ebm": "D#m", "D#m": "Ebm",
  "Gbm": "F#m", "F#m": "Gbm",
  "Abm": "G#m", "G#m": "Abm",
  "Bbm": "A#m", "A#m": "Bbm",
};

function findAvailableChord(chord: string): string {
  if (AVAILABLE.has(chord)) return chord;
  const alt = ENHARMONIC[chord];
  if (alt && AVAILABLE.has(alt)) return alt;
  // Strip 'dim' -> try minor
  if (chord.endsWith("dim")) {
    const base = chord.replace("dim", "m");
    if (AVAILABLE.has(base)) return base;
  }
  return chord; // return as-is, UI will handle missing gracefully
}

function scoreTemplate(
  template: ProgressionTemplate,
  mode: "major" | "minor",
  energy: number,
  valence: number,
  genres: string[]
): number {
  if (template.mode !== mode) return 0;

  const [eLow, eHigh] = template.energyRange;
  const [vLow, vHigh] = template.valenceRange;

  // Energy fit (1.0 if in range, decays outside)
  let eFit = 1;
  if (energy < eLow) eFit = Math.max(0, 1 - (eLow - energy) * 3);
  else if (energy > eHigh) eFit = Math.max(0, 1 - (energy - eHigh) * 3);

  // Valence fit
  let vFit = 1;
  if (valence < vLow) vFit = Math.max(0, 1 - (vLow - valence) * 3);
  else if (valence > vHigh) vFit = Math.max(0, 1 - (valence - vHigh) * 3);

  // Genre bonus
  const genreBonus = genres.some((g) =>
    template.genres.some((tg) => g.toLowerCase().includes(tg) || tg.includes(g.toLowerCase()))
  )
    ? 1.5
    : 1.0;

  return template.weight * eFit * vFit * genreBonus;
}

// Estimate barre chord count for difficulty
const BARRE_CHORDS = new Set(
  ALL_CHORD_NAMES.filter((name) => CHORD_DATA[name]?.barre)
);

function estimateDifficulty(chords: string[]): 1 | 2 | 3 {
  const barreCount = chords.filter((c) => BARRE_CHORDS.has(c)).length;
  if (barreCount === 0) return 1;
  if (barreCount <= 2) return 2;
  return 3;
}

export function generateProgression(
  features: Partial<SpotifyAudioFeatures>,
  genres: string[] = []
): GeneratedProgression {
  const key = features.key ?? 0;
  const modeNum = features.mode ?? 1;
  const mode: "major" | "minor" = modeNum === 1 ? "major" : "minor";
  const energy = features.energy ?? 0.5;
  const valence = features.valence ?? 0.5;

  // Score all templates
  const scored = PROGRESSION_TEMPLATES.map((t) => ({
    template: t,
    score: scoreTemplate(t, mode, energy, valence, genres),
  }))
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score);

  // Pick from top 3 with weighted random for variety
  const topN = scored.slice(0, 3);
  const totalScore = topN.reduce((sum, s) => sum + s.score, 0);
  let rand = Math.random() * totalScore;
  let selected = topN[0]?.template ?? PROGRESSION_TEMPLATES[0];

  for (const s of topN) {
    rand -= s.score;
    if (rand <= 0) {
      selected = s.template;
      break;
    }
  }

  // Resolve numerals to concrete chords
  const chords = selected.numerals.map((num) => {
    const raw = resolveNumeral(num, key, modeNum);
    return findAvailableChord(raw);
  });

  const keyName = getKeyName(key, modeNum);
  const rootNote = getRootNote(key);

  return {
    chords,
    numerals: selected.numerals,
    progressionName: selected.name,
    keyName,
    rootNote,
    mode,
    difficulty: estimateDifficulty(chords),
  };
}

// Genre-based feature estimation when Spotify audio features are unavailable
export function estimateFeaturesFromGenre(
  genres: string[]
): Partial<SpotifyAudioFeatures> {
  const joined = genres.join(" ").toLowerCase();

  if (joined.includes("hip hop") || joined.includes("rap") || joined.includes("trap")) {
    return { energy: 0.7, valence: 0.35, mode: 0, danceability: 0.75, tempo: 140 };
  }
  if (joined.includes("r&b") || joined.includes("soul")) {
    return { energy: 0.5, valence: 0.45, mode: 0, danceability: 0.7, tempo: 100 };
  }
  if (joined.includes("pop")) {
    return { energy: 0.65, valence: 0.6, mode: 1, danceability: 0.7, tempo: 120 };
  }
  if (joined.includes("rock") || joined.includes("punk")) {
    return { energy: 0.8, valence: 0.5, mode: 1, danceability: 0.5, tempo: 130 };
  }
  if (joined.includes("indie") || joined.includes("alternative")) {
    return { energy: 0.55, valence: 0.5, mode: 1, danceability: 0.55, tempo: 115 };
  }
  if (joined.includes("electronic") || joined.includes("edm") || joined.includes("dance")) {
    return { energy: 0.85, valence: 0.6, mode: 1, danceability: 0.85, tempo: 128 };
  }
  if (joined.includes("country") || joined.includes("folk")) {
    return { energy: 0.55, valence: 0.65, mode: 1, danceability: 0.55, tempo: 110 };
  }
  if (joined.includes("jazz")) {
    return { energy: 0.4, valence: 0.5, mode: 1, danceability: 0.5, tempo: 100 };
  }
  if (joined.includes("metal")) {
    return { energy: 0.95, valence: 0.3, mode: 0, danceability: 0.4, tempo: 150 };
  }
  if (joined.includes("latin") || joined.includes("reggaeton")) {
    return { energy: 0.75, valence: 0.7, mode: 1, danceability: 0.8, tempo: 95 };
  }
  // Default
  return { energy: 0.6, valence: 0.5, mode: 1, danceability: 0.6, tempo: 120 };
}
