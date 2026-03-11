import type { GeneratedProgression } from "./chordGenerator";

export function generateTheoryNote(
  prog: GeneratedProgression,
  tempo: number,
  energy: number,
  valence: number,
  genre: string
): string {
  const parts: string[] = [];

  // Opening - key and progression identity
  const numeralStr = prog.numerals.join("-");
  parts.push(
    `This song is in ${prog.keyName}, built on a ${numeralStr} progression (the "${prog.progressionName}" pattern).`
  );

  // Emotional character based on mode + valence
  if (prog.mode === "minor") {
    if (valence < 0.3) {
      parts.push(
        "The minor key gives it a dark, introspective quality -- that heaviness you feel is the natural tension of minor harmony pulling at the listener."
      );
    } else if (valence < 0.5) {
      parts.push(
        "The minor tonality creates a moody, atmospheric vibe. It's not quite sad -- more like looking out a rain-streaked window and finding beauty in it."
      );
    } else {
      parts.push(
        "Despite being in a minor key, the progression has an unexpected warmth to it. Minor doesn't always mean sad -- it can also mean deep, rich, and soulful."
      );
    }
  } else {
    if (valence > 0.7) {
      parts.push(
        "The major key and bright chord movement give this an uplifting, feel-good energy. This is the kind of progression that makes people want to sing along."
      );
    } else if (valence > 0.4) {
      parts.push(
        "In a major key, this progression balances brightness with emotional depth. The chord movement creates a satisfying sense of journey and resolution."
      );
    } else {
      parts.push(
        "Even though it's technically in a major key, the chord choices create a bittersweet quality. The tension between major tonality and darker emotion is what gives it character."
      );
    }
  }

  // Chord-specific insight
  const hasBarreChords = prog.chords.some((c) =>
    ["F", "Bm", "B", "Fm", "Cm", "Bb", "Ab", "Eb"].includes(c)
  );
  if (hasBarreChords) {
    parts.push(
      "This one includes barre chords, so consider using a capo to simplify the shapes while you're learning. Move the capo up and play easier open chord equivalents."
    );
  }

  // Tempo and energy advice
  if (tempo < 90) {
    parts.push(
      `At ${Math.round(tempo)} BPM, you have plenty of room to breathe between chord changes. Focus on making each strum clean and deliberate.`
    );
  } else if (tempo < 130) {
    parts.push(
      `The ${Math.round(tempo)} BPM tempo is a comfortable mid-range -- fast enough to groove, slow enough to think. Try a D-DU-UDU strum pattern.`
    );
  } else {
    parts.push(
      `At ${Math.round(tempo)} BPM this moves quickly. Start practicing at half speed and work your way up. Keep your strumming hand moving even when you miss a chord change.`
    );
  }

  // Genre context
  if (energy > 0.7) {
    parts.push(
      `The high energy calls for confident, full strums. Don't be shy -- dig into the strings and let it ring.`
    );
  } else if (energy < 0.4) {
    parts.push(
      "The mellow energy suits fingerpicking or gentle strumming. Try arpeggiating the chords (playing strings one at a time) for a more intimate sound."
    );
  }

  return parts.join(" ");
}

// Quick genre detection from Spotify artist genres
export function detectGenreLabel(genres: string[]): string {
  const joined = genres.join(" ").toLowerCase();
  if (joined.includes("hip hop") || joined.includes("rap")) return "Hip-Hop";
  if (joined.includes("r&b") || joined.includes("soul")) return "R&B";
  if (joined.includes("pop")) return "Pop";
  if (joined.includes("rock")) return "Rock";
  if (joined.includes("indie")) return "Indie";
  if (joined.includes("electronic") || joined.includes("edm")) return "Electronic";
  if (joined.includes("country")) return "Country";
  if (joined.includes("folk")) return "Folk";
  if (joined.includes("jazz")) return "Jazz";
  if (joined.includes("metal")) return "Metal";
  if (joined.includes("latin") || joined.includes("reggaeton")) return "Latin";
  if (joined.includes("punk")) return "Punk";
  if (joined.includes("classical")) return "Classical";
  return "Pop";
}
