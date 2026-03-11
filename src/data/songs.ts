export interface Song {
  id: string;
  title: string;
  artist: string;
  difficulty: 1 | 2 | 3;
  bpm: number;
  chords: string[];
  key: string;
  theory: string;
  genre: string;
  source?: "featured" | "spotify";
  albumArt?: string;
  previewUrl?: string;
  spotifyId?: string;
  spotifyUrl?: string;
}

export const SONGS: Song[] = [
  // ── Kanye West ──
  {
    id: "heartless",
    title: "Heartless",
    artist: "Kanye West",
    difficulty: 2,
    bpm: 87,
    chords: ["Am", "C", "G", "D"],
    key: "Am",
    genre: "Hip-Hop",
    theory: "This is a vi-I-V-II progression in A minor, one of the most universal chord loops in modern music. The Am sets a melancholy tone, C and G provide lift, and D creates tension that pulls you back to the start. Learn this shape and you unlock hundreds of pop and hip-hop songs."
  },
  {
    id: "runaway",
    title: "Runaway",
    artist: "Kanye West",
    difficulty: 2,
    bpm: 80,
    chords: ["E", "Am", "C", "D"],
    key: "E",
    genre: "Hip-Hop",
    theory: "The iconic piano riff translates beautifully to guitar. Starting on E major gives a bright, hopeful opening before Am drops you into something more emotional. The slow 80 BPM makes every chord change feel intentional -- perfect for working on clean transitions."
  },
  {
    id: "stronger",
    title: "Stronger",
    artist: "Kanye West",
    difficulty: 2,
    bpm: 104,
    chords: ["Am", "Em", "D", "Am"],
    key: "Am",
    genre: "Hip-Hop",
    theory: "A dark minor loop -- i-v-VII-i in A minor. The Am to Em movement is pure guitar gold, and the D chord provides a momentary lift before resolving back home. Try palm muting on the downstrokes for that punchy, electronic feel."
  },
  // ── Kendrick Lamar ──
  {
    id: "humble",
    title: "HUMBLE.",
    artist: "Kendrick Lamar",
    difficulty: 2,
    bpm: 150,
    chords: ["Dm", "Am", "Em", "Dm"],
    key: "Dm",
    genre: "Hip-Hop",
    theory: "Built entirely on minor chords, giving it that dark, aggressive energy. This is a i-v-ii-i movement in D minor that keeps tension relentlessly high. Minor keys dominate hip-hop because they convey intensity -- the fast BPM here demands tight rhythm."
  },
  {
    id: "love",
    title: "LOVE.",
    artist: "Kendrick Lamar",
    difficulty: 2,
    bpm: 100,
    chords: ["G", "Em", "C", "D"],
    key: "G",
    genre: "Hip-Hop",
    theory: "I-vi-IV-V in G major -- the classic 'doo-wop' progression used since the 1950s. The Em adds sweetness that softens the whole track. This is Kendrick at his most melodic, and the progression is why it feels warm and nostalgic."
  },
  // ── Yeat ──
  {
    id: "get-busy",
    title: "Get Busy",
    artist: "Yeat",
    difficulty: 1,
    bpm: 140,
    chords: ["Em", "G", "D", "Em"],
    key: "Em",
    genre: "Hip-Hop",
    theory: "Simple i-III-VII-i in E minor. The power of this progression lies in rhythm and repetition, not complexity. E minor is the easiest key on guitar -- your open strings naturally ring in key, so everything sounds good even when you're learning."
  },
  // ── AJR ──
  {
    id: "bang",
    title: "Bang!",
    artist: "AJR",
    difficulty: 3,
    bpm: 130,
    chords: ["C", "G", "Am", "F"],
    key: "C",
    genre: "Pop",
    theory: "The I-V-vi-IV -- literally the most famous progression in all of pop music. In C major, every chord except F is beginner-friendly. The F barre chord is your first real challenge, but master it and you level up permanently."
  },
  {
    id: "worlds-smallest-violin",
    title: "World's Smallest Violin",
    artist: "AJR",
    difficulty: 3,
    bpm: 75,
    chords: ["Am", "F", "C", "G"],
    key: "Am",
    genre: "Pop",
    theory: "vi-IV-I-V starting from the relative minor gives a bittersweet, theatrical quality. AJR loves building from quiet to loud -- try strumming softly at first, then building intensity on each repeat. The slow BPM gives you room to breathe."
  },
  // ── Travis Scott ──
  {
    id: "sicko-mode",
    title: "SICKO MODE",
    artist: "Travis Scott",
    difficulty: 2,
    bpm: 155,
    chords: ["Dm", "Bb", "Am", "Dm"],
    key: "Dm",
    genre: "Hip-Hop",
    theory: "The main vibe sits on i-VI-v-i in D minor. The Bb (B-flat) is a barre chord that adds that dark, cinematic feel Travis is known for. Practice switching between Dm and Bb slowly -- that transition is the key to nailing this one."
  },
  {
    id: "goosebumps",
    title: "goosebumps",
    artist: "Travis Scott",
    difficulty: 1,
    bpm: 130,
    chords: ["Em", "G", "D", "C"],
    key: "Em",
    genre: "Hip-Hop",
    theory: "i-III-VII-VI in E minor. All open chords, no barres -- perfect for beginners. The Em to G transition is one of the smoothest on guitar because your ring finger stays planted. Focus on keeping your strumming hand moving even during chord changes."
  },
  // ── Drake ──
  {
    id: "hold-on",
    title: "Hold On, We're Going Home",
    artist: "Drake",
    difficulty: 1,
    bpm: 100,
    chords: ["G", "D", "Em", "C"],
    key: "G",
    genre: "R&B",
    theory: "I-V-vi-IV in G major, the same bones as thousands of hits. Drake's smooth delivery matches the gentle progression perfectly. All four chords are open position and beginner-friendly -- this is an ideal first song to learn."
  },
  {
    id: "hotline-bling",
    title: "Hotline Bling",
    artist: "Drake",
    difficulty: 1,
    bpm: 135,
    chords: ["Am", "G", "Em", "Am"],
    key: "Am",
    genre: "R&B",
    theory: "Minimal minor loop: i-VII-v-i in A minor. The beauty is in the simplicity -- three chords, all open position. The repetitive nature lets you focus on rhythm and feel rather than frantic chord changes. Try a relaxed fingerpicking pattern."
  },
  // ── The Weeknd ──
  {
    id: "blinding-lights",
    title: "Blinding Lights",
    artist: "The Weeknd",
    difficulty: 2,
    bpm: 171,
    chords: ["Fm", "Cm", "Ab", "Eb"],
    key: "Fm",
    genre: "Pop",
    theory: "i-v-III-VII in F minor. The synth-wave feel comes from this dark minor key. These are barre chord shapes, making this a great intermediate challenge. Use a capo on fret 1 and play Em-Bm-G-D shapes for an easier version."
  },
  {
    id: "starboy",
    title: "Starboy",
    artist: "The Weeknd",
    difficulty: 2,
    bpm: 186,
    chords: ["Am", "F", "G", "Am"],
    key: "Am",
    genre: "Pop",
    theory: "i-VI-VII-i in A minor. The F to G movement creates a climbing tension that resolves back to Am. That resolution is what makes the chorus feel powerful. High BPM means you can simplify by strumming once per chord."
  },
  // ── Billie Eilish ──
  {
    id: "bad-guy",
    title: "bad guy",
    artist: "Billie Eilish",
    difficulty: 1,
    bpm: 135,
    chords: ["Am", "Em", "Am", "Em"],
    key: "Am",
    genre: "Pop",
    theory: "Just two chords -- Am and Em -- making this one of the easiest songs to learn on guitar. The minimalism is the point. Focus entirely on rhythm: try a muted staccato strum to match the song's punchy, bass-heavy production."
  },
  {
    id: "lovely",
    title: "lovely",
    artist: "Billie Eilish",
    difficulty: 2,
    bpm: 115,
    chords: ["Em", "C", "Am", "B"],
    key: "Em",
    genre: "Pop",
    theory: "i-VI-iv-V in E minor. The B major chord at the end is called the 'harmonic minor' sound -- it creates an almost classical tension before looping back. The B barre chord is challenging but the payoff in sound is worth the practice."
  },
  // ── Post Malone ──
  {
    id: "circles",
    title: "Circles",
    artist: "Post Malone",
    difficulty: 1,
    bpm: 120,
    chords: ["C", "G", "Am", "F"],
    key: "C",
    genre: "Pop",
    theory: "I-V-vi-IV again -- the pop progression that never dies. Post Malone's version adds a dreamy guitar tone. In C major this is as friendly as it gets for beginners. Once you can play this smoothly, try adding hammer-ons between C and Am."
  },
  {
    id: "sunflower",
    title: "Sunflower",
    artist: "Post Malone",
    difficulty: 1,
    bpm: 90,
    chords: ["D", "A", "G", "D"],
    key: "D",
    genre: "Pop",
    theory: "I-V-IV-I in D major -- bright, sunny, and effortless. All open chords with the simplest possible changes. The slow tempo and happy key make this a confidence-builder. Strum with a relaxed wrist and let the strings ring out."
  },
  // ── Juice WRLD ──
  {
    id: "lucid-dreams",
    title: "Lucid Dreams",
    artist: "Juice WRLD",
    difficulty: 2,
    bpm: 84,
    chords: ["Dm", "Am", "C", "G"],
    key: "Dm",
    genre: "Hip-Hop",
    theory: "i-v-VII-IV in D minor, sampling Sting's classic melody. The Dm to Am gives that signature emo-rap sadness. The slow BPM lets you savor each chord change. Try arpeggiated picking instead of strumming for a more emotional feel."
  },
  // ── Tyler, the Creator ──
  {
    id: "earfquake",
    title: "EARFQUAKE",
    artist: "Tyler, the Creator",
    difficulty: 2,
    bpm: 82,
    chords: ["G", "Am", "Em", "D"],
    key: "G",
    genre: "Hip-Hop",
    theory: "I-ii-vi-V in G major. Tyler's neo-soul influence shows in this warm, jazzy progression. The Am acting as the ii chord adds sophistication -- it's a small departure from the usual pop formula that gives Tyler's music its unique flavor."
  },
];
