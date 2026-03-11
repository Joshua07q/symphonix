export interface TheoryLesson {
  id: string;
  title: string;
  body: string;
}

export const THEORY_LESSONS: TheoryLesson[] = [
  {
    id: "i-v-vi-iv",
    title: "The I-V-vi-IV Progression",
    body: `This is the most popular chord progression in modern music. In the key of C, it's C-G-Am-F. In G, it's G-D-Em-C.

The Roman numerals tell you the chord's position in the scale: I is the root (home base), V creates tension, vi adds emotion, and IV gives momentum back to I.

Songs using this: "Bang!" (AJR), "Circles" (Post Malone), "Hold On" (Drake), and literally thousands more. Learn this in 2-3 keys and you can jam along to almost anything on the radio.`
  },
  {
    id: "minor-vs-major",
    title: "Minor vs Major Keys",
    body: `Major keys sound happy, bright, and resolved. Minor keys sound sad, dark, or intense.

Most hip-hop and R&B sits in minor keys (Am, Em, Dm are favorites) because minor = mood. Pop songs lean major for that uplifting, singable feel.

The trick: every major key has a "relative minor" that shares the same chords. C major and A minor use the exact same notes -- it's just about which chord feels like home. If a song starts on Am and keeps returning there, you're in A minor even though the chords look like C major.`
  },
  {
    id: "barre-chords",
    title: "Barre Chord Technique",
    body: `Barre chords are the gateway to playing any chord anywhere on the neck. Your index finger acts as a movable capo, pressing across all 6 strings.

The two essential shapes: the E-shape barre (like F) and the A-shape barre (like Bm). Once you learn these two shapes, you can slide them up and down the neck to play any major or minor chord.

Tips for cleaner barres:
- Place your index finger close to the fret (not on top of it)
- Roll your finger slightly to the side -- the bony edge presses harder
- Keep your thumb behind the neck, directly opposite your index finger
- It WILL hurt at first. Your hand will build strength over 2-3 weeks
- Practice the F chord for 30 seconds every session -- consistency beats marathon practice`
  },
  {
    id: "rhythm-strumming",
    title: "Rhythm and Strumming Basics",
    body: `Rhythm is more important than knowing lots of chords. A simple chord played with great rhythm sounds better than complex chords with bad timing.

Start with all downstrums on the beat: D D D D (1 2 3 4). Once that's solid, add upstrums on the "ands": D DU UDU (1 2&3&4&).

The most common strum pattern in pop: D DU UDU. Say it out loud as you play. Your strumming hand should NEVER stop moving -- even on rests, keep the motion going and just miss the strings.

Practice with a metronome or drum beat app. Start at 60 BPM and only speed up when you can play without thinking about the pattern.`
  },
  {
    id: "capo",
    title: "Transposing with a Capo",
    body: `A capo clamps across the fretboard and raises the pitch of all strings. It lets you play easy open chord shapes in any key.

Example: "Blinding Lights" uses Fm-Cm-Ab-Eb (all barre chords). Put a capo on fret 1 and play Em-Bm-G-D instead -- much easier shapes, same song.

Capo math: each fret raises the pitch by one half step. Capo on fret 2 means your "C shape" actually sounds like D. Your "G shape" sounds like A.

Pro tip: if you're singing along and the key is too low or too high for your voice, move the capo up or down to shift the pitch until it fits. The chord shapes stay the same.`
  },
  {
    id: "power-chords",
    title: "Power Chords",
    body: `Power chords use just two notes: the root and the fifth. No third means they're neither major nor minor -- they work everywhere.

Shape: index finger on the root note (6th or 5th string), ring finger two frets up on the next string. That's it. Two fingers, any fret.

Power chords are the backbone of rock and punk, but they're also perfect for hip-hop guitar covers when you want that raw, aggressive energy. Palm mute the strings for a tight, punchy sound or let them ring for fullness.

The root note name = the chord name. Root on 5th fret of the 6th string? That's an A power chord (A5).`
  },
  {
    id: "chord-charts",
    title: "Reading Chord Charts",
    body: `Chord diagrams show you exactly where to put your fingers:

- Vertical lines = strings (thickest E on the left, thinnest e on the right)
- Horizontal lines = frets (the thick bar at top is the nut)
- Black dots = where to press
- O above a string = play it open
- X above a string = don't play it (mute it)
- Numbers inside dots = which finger to use (1=index, 2=middle, 3=ring, 4=pinky)

When you see a chord name in a song (Am, G, D), find its diagram, place your fingers, and strum. With practice, your fingers will memorize the shapes and you won't need the diagrams anymore.`
  },
  {
    id: "strum-patterns",
    title: "Common Strum Patterns",
    body: `D = downstrum, U = upstrum, . = rest/miss

Pattern 1 (beginner): D . D . D . D .
Steady downstrums on every beat. Boring but essential for building timing.

Pattern 2 (folk/pop): D . D U . U D U
The "island strum" -- works for almost any acoustic song.

Pattern 3 (pop/rock): D . DU . UDU
The most versatile pattern in pop music. Used in "Circles," "Bang!," and countless others.

Pattern 4 (hip-hop): D..D..U..D..
Sparse, muted strums. Palm mute between hits for that tight, rhythmic feel.

Pattern 5 (ballad): D...DU..DU..
Slow and spacious. Let chords ring out. Perfect for "Runaway" or "Lucid Dreams."

The golden rule: your strumming hand moves DOWN on beats (1,2,3,4) and UP on the "ands" (&). Even when you skip a strum, keep the hand moving.`
  },
  {
    id: "pentatonic",
    title: "The Pentatonic Scale",
    body: `The pentatonic scale is 5 notes that sound good over almost everything. It's the secret weapon for improvising solos and riffs.

In A minor pentatonic: A C D E G. On guitar, the first "box" pattern starts at the 5th fret. Learn this one shape and you can solo over every Am, C, G, and D progression in this app.

Why it works: the pentatonic removes the two notes that might clash with the chords. What's left always sounds "right" -- you literally can't play a wrong note.

Start by playing the scale slowly up and down. Then try playing random notes from the pattern over a chord progression. You'll be surprised how quickly it sounds like real improvisation. Every blues, rock, and hip-hop solo you've ever heard uses this scale.`
  },
];
