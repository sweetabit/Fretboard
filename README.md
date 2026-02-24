# Guitar Fretboard Visualizer

Interactive single-page web app for guitarists to visualize scales, chords, triads, and arpeggios on a guitar fretboard. Select a root note and a mode — corresponding notes are highlighted on the fretboard. Click any note to hear it.

## Features

### Simple Mode
- 12-fret fretboard with realistic proportions (12th-root-of-2 fret spacing)
- 6 strings in standard tuning (E A D G B E), varying thickness
- Fret markers at 3, 5, 7, 9, 12 (double dot)
- 12 root note buttons + 7 mode buttons (Ionian, Dorian, Phrygian, Lydian, Mixolydian, Aeolian, Locrian)
- Highlight states: no selection (all visible), root only (root orange, others dimmed), root + scale (root orange, scale notes blue, others dimmed)
- Click any note circle to play its sound — samples pitch-shifted via Web Audio API `playbackRate`
- Volume slider below the fretboard

### Advanced Mode
- **24-fret** extended fretboard
- **Show All Notes** toggle — displays non-scale notes as faded instead of hidden
- **Show Intervals** toggle — displays interval names (R, b2, 2, b3, 3, etc.) instead of note names
- Scale notes color-coded by quality: blue for major modes, purple for minor modes
- **Circle of Fifths** — interactive SVG circle showing major/minor keys; click any key to select it as root; highlights scale notes when a scale is active
- **Chords / Triads / Arpeggios** sub-block with three categories:

#### Chords
- Root note selector + quality (Major/Minor) + voicing type (maj, min, 7, maj7, min7, 6, 9, 11, aug, dim, sus2, sus4)
- Multiple fingering positions per chord with position selector buttons
- All shapes stored relative to C root; app transposes automatically via offset
- Auto-selects the lowest "campfire chord" voicing by default (open/low barre shapes)
- CAGED system shapes included (A-shape, E-shape, G-shape, D-shape, C-shape)
- Changing root note preserves the current type/voicing selection

#### Triads
- Quality: Major, Minor, Diminished, Augmented
- String sets: 6-5-4, 5-4-3, 4-3-2, 3-2-1
- Inversions: Root position, 1st inversion, 2nd inversion
- Positions computed algorithmically from intervals (not hardcoded) — finds the most compact, lowest voicing automatically
- When a scale is selected, non-triad scale notes shown as background context

#### Arpeggios
- Types: Major, Minor, Maj7, Min7, Dom7, Dim, Dim7, Aug, Min-b5, Maj9, Min9
- Displayed across the full fretboard on all strings
- When a scale is selected, non-arpeggio scale notes shown as background context

### Design
Ultra-minimalistic. Background `#262624`, flat colors, monospace typography, no gradients/shadows/rounded corners. Controls are flat text buttons. CSS Grid layout.

## Tech

Single `index.html` file with embedded CSS, JS, and base64-encoded WAV audio. Data constants externalized into `.js` files. No frameworks, no server required — works from `file://`.

**Audio samples:** 2 base samples from Ableton Live 12 Core Library (converted to 16-bit WAV, base64-embedded):
- `Guitar Strat Palm Mute C2` (65.41 Hz) — covers low/mid range
- `Guitar Jazz Mute C3` (130.81 Hz) — covers upper range
- Pitch shifting via `playbackRate` to reach all fretboard positions

## File Structure

```
Webpage Fretboard/
├── index.html          # Main app (HTML + CSS + JS + embedded audio)
├── chords.js           # Chord fingering database (CHORD_DB)
├── triads.js           # Triad intervals, inversions, string sets
├── arpeggios.js        # Arpeggio type definitions
├── README.md
└── samples/            # Source WAV files (not used at runtime — embedded in HTML)
    ├── Guitar Strat Palm Mute C2-16bit.wav
    ├── Guitar Jazz Mute C3-16bit.wav
    └── ...
```

### Editing Data Files

The chord, triad, and arpeggio data live in separate `.js` files that you can edit with any text editor. Each file has header comments explaining the format. After editing, save the file and refresh the browser.

- **chords.js** — Fingering arrays `[E2, A, D, G, B, E4]` relative to C root. `null` = muted, `0` = open.
- **triads.js** — Interval definitions, inversion orders, string set mappings.
- **arpeggios.js** — Interval arrays in semitones from root.

## Music Theory Data

```
Chromatic scale: C, Db, D, Eb, E, F, Gb, G, Ab, A, Bb, B
Standard tuning (high to low): E4, B3, G3, D3, A2, E2

Modes (semitone intervals from root):
  Ionian (Major):  0, 2, 4, 5, 7, 9, 11
  Dorian:          0, 2, 3, 5, 7, 9, 10
  Phrygian:        0, 1, 3, 5, 7, 8, 10
  Lydian:          0, 2, 4, 6, 7, 9, 11
  Mixolydian:      0, 2, 4, 5, 7, 9, 10
  Aeolian (Minor): 0, 2, 3, 5, 7, 8, 10
  Locrian:         0, 1, 3, 5, 6, 8, 10
```

## Roadmap

### Custom Samples
- Replace the 2 pitch-shifted base samples with individual WAV samples for each note
- More samples = less pitch shifting = more natural sound

### Server Deployment
- Deploy to a web server, buy a domain
- Switch from base64-embedded audio to external WAV files (smaller HTML, browser caching)

### iOS App (PWA)
- Wrap the web app for iOS distribution via PWA with service worker for offline support
- Touch interaction optimization
