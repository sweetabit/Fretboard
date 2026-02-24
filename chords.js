// =============================================================================
// CHORD DATABASE
// =============================================================================
// Each entry: array of fingerings
// Each fingering = [E2, A, D, G, B, E4] (low string to high string)
//   null = muted string (don't play)
//   0    = open string
//   N    = fret number
//
// All fret numbers are relative to C root. The app transposes automatically.
// For example, [null,3,2,0,1,0] is the open C major shape.
// When you select E as root (offset=4), the app adds 4 to each fret,
// then shifts down 12 if possible — so barre shapes become open chords
// at the right frets.
//
// The app picks the lowest-position shape as default for each root.
// Shape order in the array = order shown in the position buttons.
//
// To add a new chord type: add a new key under 'Major' or 'Minor'
// with an array of fingering arrays.
// To add a new fingering: add a new [E2,A,D,G,B,E4] array to the list.
// =============================================================================

const CHORD_DB = {
  'Major': {
    'maj':  [
      [null,3,2,0,1,0],       // A-shape open (C)
      [8,10,10,9,8,8],        // E-shape barre
      [8,7,5,5,5,8],          // G-shape barre
      [null,null,10,12,13,12],// D-shape open
      [null,3,5,5,5,3],       // A-shape barre
      [3,3,5,5,5,3],          // E-shape barre (root-6)
      [null,null,null,5,5,5], // D-shape partial
    ],
    'maj7': [
      [null,3,2,0,0,0],  // A-shape open
      [null,null,2,1,1,0],// D-shape
      [null,null,null,5,5,4], // D-shape barre
      [null,3,5,4,5,3],       // C-shape barre
      [null,3,2,4,0,0],       // spread voicing
      [null,null,2,4,1,0],    // drop 2
    ],
    '7':    [
      [null,3,2,3,1,0],  // A-shape open
      [null,null,2,3,1,0],// D-shape
      [null,null,null,5,5,3], // D-shape barre
      [null,3,5,3,5,3],       // C-shape barre
      [3,3,2,3,1,null],       // root-6
      [null,null,2,0,1,0],    // partial open
    ],
    '6':    [
      [null,3,2,2,1,0],  // A-shape
      [null,null,2,2,1,0],// D-shape
      [null,null,null,5,5,5], // barre
      [null,3,2,2,3,0],       // alt voicing
      [null,3,5,5,5,5],       // C-shape
    ],
    '9':    [
      [null,3,2,3,3,0],  // A-shape
      [null,null,2,1,3,0],// D-shape
      [null,3,2,3,3,3],       // full barre
      [null,null,2,4,3,0],    // spread
      [3,3,2,3,3,null],       // root-6
    ],
    '11':   [
      [null,3,2,3,0,0],  // open
      [null,null,0,0,1,0],// partial
      [null,3,2,3,1,1],       // barre shape
      [null,3,0,0,0,0],       // simplified
      [3,3,2,0,0,0],          // root-6
    ],
    'aug':  [
      [null,3,2,1,1,0],  // A-shape
      [null,null,2,1,1,0],// D-shape
      [null,3,2,1,1,4],       // extended
      [null,null,null,5,5,6], // barre
      [4,3,2,1,null,null],    // root-6
    ],
    'dim':  [
      [null,null,1,2,1,2],// mid-neck
      [null,3,1,null,1,null], // sparse
      [null,null,1,2,1,null], // partial
      [null,3,4,2,4,null],    // barre shape
      [null,null,4,5,4,5],    // high position
    ],
    'sus2': [
      [null,3,0,0,1,0],  // open
      [null,null,null,5,5,0], // partial barre
      [null,3,0,0,3,0],       // alt open
      [null,3,5,5,3,3],       // barre
      [null,null,0,0,1,3],    // inversion
    ],
    'sus4': [
      [null,3,2,0,1,1],  // open
      [null,null,0,0,1,1],// partial
      [null,3,5,5,6,3],       // barre
      [null,3,0,0,1,0],       // simplified
      [3,3,5,5,6,null],       // root-6
    ],
  },
  'Minor': {
    'min':  [
      [null,3,1,0,1,0],       // Am-shape open
      [8,10,10,8,8,8],        // Em-shape barre
      [null,null,10,12,13,11],// Dm-shape open
      [null,3,5,5,4,3],       // Am-shape barre
      [3,3,5,5,4,3],          // Em-shape barre (root-6)
      [null,null,null,5,4,5], // Dm-shape partial
    ],
    'min7': [
      [null,3,1,0,1,0],  // Am7-shape
      [null,null,1,3,1,0],// partial
      [null,null,null,5,4,3], // Dm7-shape barre
      [null,3,5,5,4,6],       // C-shape
      [null,3,1,0,1,3],       // open spread
      [3,3,1,3,1,null],       // root-6
    ],
    '7':    [
      [null,3,1,3,1,0],  // dom7 w/ minor
      [null,null,1,3,1,0],// partial
      [null,3,5,3,4,3],       // barre
      [null,null,1,0,1,0],    // simplified
      [3,3,1,3,1,null],       // root-6
    ],
    '6':    [
      [null,3,1,2,1,0],  // open
      [null,null,1,2,1,0],// partial
      [null,3,5,5,4,5],       // barre
      [null,3,1,2,3,0],       // alt
      [null,null,1,2,1,3],    // inversion
    ],
    '9':    [
      [null,3,1,3,3,0],  // open
      [null,null,1,0,3,0],// partial
      [null,3,1,3,3,3],       // barre
      [null,null,1,3,3,3],    // mid
      [3,3,1,3,3,null],       // root-6
    ],
    '11':   [
      [null,3,1,3,0,0],  // open
      [null,null,0,0,1,0],// partial
      [null,3,1,3,1,1],       // barre
      [null,3,0,0,0,0],       // simplified
      [3,3,1,0,0,0],          // root-6
    ],
    'aug':  [
      [null,3,2,1,1,0],  // same as major aug
      [null,null,2,1,1,0],// partial
      [null,3,2,1,1,4],       // extended
      [null,null,null,5,5,6], // barre
      [4,3,2,1,null,null],    // root-6
    ],
    'dim':  [
      [null,null,1,2,1,2],// standard
      [null,3,1,null,1,null], // sparse
      [null,null,1,2,1,null], // partial
      [null,3,4,2,4,null],    // barre shape
      [null,null,4,5,4,5],    // high position
    ],
    'sus2': [
      [null,3,0,0,1,0],  // open
      [null,null,null,5,5,0], // partial
      [null,3,0,0,3,0],       // alt open
      [null,3,5,5,3,3],       // barre
      [null,null,0,0,1,3],    // inversion
    ],
    'sus4': [
      [null,3,1,0,1,1],  // open
      [null,null,0,0,1,1],// partial
      [null,3,5,5,6,3],       // barre
      [null,3,0,0,1,0],       // simplified
      [3,3,5,5,6,null],       // root-6
    ],
  },
};
