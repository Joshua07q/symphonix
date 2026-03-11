// Maps Spotify's numeric key (0-11) + mode to note names and diatonic chords

export const NOTE_NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

// Enharmonic display preferences (flats for certain keys)
const FLAT_MAP: Record<string, string> = {
  "C#": "Db", "D#": "Eb", "F#": "Gb", "G#": "Ab", "A#": "Bb",
};

// Major scale intervals (semitones from root)
const MAJOR_INTERVALS = [0, 2, 4, 5, 7, 9, 11];
// Natural minor scale intervals
const MINOR_INTERVALS = [0, 2, 3, 5, 7, 8, 10];

// Chord qualities for each degree in major: I ii iii IV V vi vii°
const MAJOR_QUALITIES = ["", "m", "m", "", "", "m", "dim"];
// Chord qualities for each degree in minor: i ii° III iv v VI VII
const MINOR_QUALITIES = ["m", "dim", "", "m", "m", "", ""];

// Keys that conventionally use flats
const FLAT_KEYS = new Set([1, 3, 5, 6, 8, 10]); // Db, Eb, F, Gb, Ab, Bb

export function getKeyName(key: number, mode: number): string {
  const note = NOTE_NAMES[key % 12];
  const useFlats = FLAT_KEYS.has(key % 12);
  const displayNote = useFlats && FLAT_MAP[note] ? FLAT_MAP[note] : note;
  return mode === 0 ? `${displayNote}m` : displayNote;
}

export function getRootNote(key: number): string {
  const note = NOTE_NAMES[key % 12];
  const useFlats = FLAT_KEYS.has(key % 12);
  return useFlats && FLAT_MAP[note] ? FLAT_MAP[note] : note;
}

export function getScaleNotes(key: number, mode: number): string[] {
  const intervals = mode === 1 ? MAJOR_INTERVALS : MINOR_INTERVALS;
  return intervals.map((interval) => {
    const idx = (key + interval) % 12;
    const note = NOTE_NAMES[idx];
    const useFlats = FLAT_KEYS.has(key % 12);
    return useFlats && FLAT_MAP[note] ? FLAT_MAP[note] : note;
  });
}

export function getDiatonicChords(key: number, mode: number): string[] {
  const scaleNotes = getScaleNotes(key, mode);
  const qualities = mode === 1 ? MAJOR_QUALITIES : MINOR_QUALITIES;
  return scaleNotes.map((note, i) => `${note}${qualities[i]}`);
}

// Roman numeral to scale degree index
const NUMERAL_MAP: Record<string, { degree: number; quality: string }> = {
  "I":    { degree: 0, quality: "" },
  "i":    { degree: 0, quality: "m" },
  "II":   { degree: 1, quality: "" },
  "ii":   { degree: 1, quality: "m" },
  "III":  { degree: 2, quality: "" },
  "iii":  { degree: 2, quality: "m" },
  "IV":   { degree: 3, quality: "" },
  "iv":   { degree: 3, quality: "m" },
  "V":    { degree: 4, quality: "" },
  "v":    { degree: 4, quality: "m" },
  "VI":   { degree: 5, quality: "" },
  "vi":   { degree: 5, quality: "m" },
  "VII":  { degree: 6, quality: "" },
  "vii":  { degree: 6, quality: "m" },
};

export function resolveNumeral(numeral: string, key: number, mode: number): string {
  const entry = NUMERAL_MAP[numeral];
  if (!entry) return "C"; // fallback
  const scaleNotes = getScaleNotes(key, mode);
  return `${scaleNotes[entry.degree]}${entry.quality}`;
}
