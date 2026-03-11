import * as Tone from "tone";
import { CHORD_DATA } from "../data/chords";

let synth: Tone.PolySynth | null = null;
let audioStarted = false;

export async function ensureAudio(): Promise<boolean> {
  if (!audioStarted) {
    await Tone.start();
    audioStarted = true;
  }
  if (!synth) {
    synth = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: "triangle" as const },
      envelope: { attack: 0.02, decay: 0.3, sustain: 0.2, release: 1.2 },
      volume: -8,
    }).toDestination();
  }
  return true;
}

export function isAudioStarted(): boolean {
  return audioStarted;
}

export async function playChord(chordName: string): Promise<void> {
  await ensureAudio();
  const ch = CHORD_DATA[chordName];
  if (!ch || !synth) return;

  const notes = ch.notes;
  // Strum effect: stagger notes by 8ms each for realism
  const now = Tone.now();
  notes.forEach((note, i) => {
    synth!.triggerAttackRelease(note, "4n", now + i * 0.008);
  });
}

export async function playNote(note: string, duration: string = "8n"): Promise<void> {
  await ensureAudio();
  if (!synth) return;
  synth.triggerAttackRelease(note, duration);
}

// Play a scale: array of notes with timing
export async function playScale(notes: string[], interval: number = 200): Promise<void> {
  await ensureAudio();
  if (!synth) return;
  const now = Tone.now();
  notes.forEach((note, i) => {
    synth!.triggerAttackRelease(note, "8n", now + i * (interval / 1000));
  });
}

// Teaching sounds
export async function playStrumPattern(chordName: string, pattern: string, bpm: number): Promise<() => void> {
  await ensureAudio();
  const ch = CHORD_DATA[chordName];
  if (!ch || !synth) return () => {};

  let cancelled = false;
  const beatMs = (60 / bpm) * 1000;
  const halfBeat = beatMs / 2;

  const chars = pattern.split("");
  let i = 0;

  const step = () => {
    if (cancelled || i >= chars.length) return;
    const c = chars[i];
    if (c === "D" || c === "U") {
      const notes = ch.notes;
      const now = Tone.now();
      const order = c === "U" ? [...notes].reverse() : notes;
      order.forEach((note, j) => {
        synth!.triggerAttackRelease(note, "16n", now + j * 0.006);
      });
    }
    i++;
    if (i < chars.length) {
      setTimeout(step, c === "." ? halfBeat : halfBeat);
    }
  };

  step();
  return () => { cancelled = true; };
}
