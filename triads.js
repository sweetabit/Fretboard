// =============================================================================
// TRIAD DATABASE
// =============================================================================
// Triads are computed algorithmically from intervals — no manual fret positions.
// The app finds the best (most compact, lowest) voicing automatically.
//
// TRIAD_INTERVALS: semitones from root for each quality
//   To add a new quality: add a new key with [root, 3rd, 5th] in semitones.
//   Example: 'Sus4': [0, 5, 7]
//
// INVERSION_ORDER: which triad degree goes on each string [low, mid, high]
//   0 = root, 1 = 3rd, 2 = 5th
//
// STRING_SETS: maps button labels to guitar string indices
//   Index 0 = high E, 1 = B, 2 = G, 3 = D, 4 = A, 5 = low E
// =============================================================================

const TRIAD_INTERVALS = {
  'Major':      [0, 4, 7],
  'Minor':      [0, 3, 7],
  'Diminished': [0, 3, 6],
  'Augmented':  [0, 4, 8],
};

// Inversion note order: which triad degree goes on [low, mid, high] string
// 0=root, 1=3rd, 2=5th
const INVERSION_ORDER = {
  'Root': [0, 1, 2],  // Root position: R-3-5 (root on lowest string)
  '1st':  [1, 2, 0],  // 1st inversion: 3-5-R (3rd on lowest string)
  '2nd':  [2, 0, 1],  // 2nd inversion: 5-R-3 (5th on lowest string)
};

// String set mapping: label -> [stringIdx low, mid, high] (display order, 0=highE..5=lowE)
const STRING_SETS = {
  '6-5-4': [5, 4, 3],  // E-A-D
  '5-4-3': [4, 3, 2],  // A-D-G
  '4-3-2': [3, 2, 1],  // D-G-B
  '3-2-1': [2, 1, 0],  // G-B-E
};
