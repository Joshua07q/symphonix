export interface ChordDef {
  frets: number[];
  fingers: number[];
  notes: string[];
  barre: boolean;
  barFret?: number;
}

export const CHORD_DATA: Record<string, ChordDef> = {
  C:   { frets: [-1,3,2,0,1,0],   fingers: [0,3,2,0,1,0],   notes: ["C3","E3","G3","C4","E4"],         barre: false },
  D:   { frets: [-1,-1,0,2,3,2],  fingers: [0,0,0,1,3,2],   notes: ["D3","A3","D4","F#4"],             barre: false },
  E:   { frets: [0,2,2,1,0,0],    fingers: [0,2,3,1,0,0],   notes: ["E2","B2","E3","G#3","B3","E4"],   barre: false },
  Em:  { frets: [0,2,2,0,0,0],    fingers: [0,2,3,0,0,0],   notes: ["E2","B2","E3","G3","B3","E4"],    barre: false },
  Am:  { frets: [-1,0,2,2,1,0],   fingers: [0,0,2,3,1,0],   notes: ["A2","E3","A3","C4","E4"],         barre: false },
  G:   { frets: [3,2,0,0,0,3],    fingers: [2,1,0,0,0,3],   notes: ["G2","B2","D3","G3","B3","G4"],    barre: false },
  F:   { frets: [1,1,2,3,3,1],    fingers: [1,1,2,3,4,1],   notes: ["F2","C3","F3","A3","C4","F4"],    barre: true, barFret: 1 },
  Bm:  { frets: [-1,2,4,4,3,2],   fingers: [0,1,3,4,2,1],   notes: ["B2","F#3","B3","D4","F#4"],       barre: true, barFret: 2 },
  A:   { frets: [-1,0,2,2,2,0],   fingers: [0,0,1,2,3,0],   notes: ["A2","E3","A3","C#4","E4"],        barre: false },
  Dm:  { frets: [-1,-1,0,2,3,1],  fingers: [0,0,0,2,3,1],   notes: ["D3","A3","D4","F4"],              barre: false },
  B:   { frets: [-1,2,4,4,4,2],   fingers: [0,1,2,3,4,1],   notes: ["B2","F#3","B3","D#4","F#4"],      barre: true, barFret: 2 },
  Fm:  { frets: [1,1,3,3,2,1],    fingers: [1,1,3,4,2,1],   notes: ["F2","C3","F3","Ab3","C4","F4"],   barre: true, barFret: 1 },
  Cm:  { frets: [-1,3,5,5,4,3],   fingers: [0,1,3,4,2,1],   notes: ["C3","G3","C4","Eb4","G4"],        barre: true, barFret: 3 },
  Gm:  { frets: [3,1,0,0,3,3],    fingers: [3,1,0,0,3,4],   notes: ["G2","Bb2","D3","G3","Bb3","G4"],  barre: false },
  Bb:  { frets: [-1,1,3,3,3,1],   fingers: [0,1,2,3,4,1],   notes: ["Bb2","F3","Bb3","D4","F4"],       barre: true, barFret: 1 },
  Ab:  { frets: [4,6,6,5,4,4],    fingers: [1,3,4,2,1,1],   notes: ["Ab2","Eb3","Ab3","C4","Eb4","Ab4"], barre: true, barFret: 4 },
  Eb:  { frets: [-1,-1,1,3,4,3],  fingers: [0,0,1,2,4,3],   notes: ["Eb3","Bb3","Eb4","G4"],           barre: false },
};

export const STRING_NAMES = ["E", "A", "D", "G", "B", "e"];

export const ALL_CHORD_NAMES = Object.keys(CHORD_DATA);
