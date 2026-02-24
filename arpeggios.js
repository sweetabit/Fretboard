// =============================================================================
// ARPEGGIO DATABASE
// =============================================================================
// Each arpeggio type = array of intervals in semitones from root.
// Displayed across the full fretboard on all strings.
//
// To add a new arpeggio type: add a new key with an array of semitone intervals.
// Example: 'Add9': [0, 4, 7, 14]
//
// Interval reference:
//   0  = Root (R)       1  = minor 2nd (b2)   2  = major 2nd (2)
//   3  = minor 3rd (b3) 4  = major 3rd (3)    5  = perfect 4th (4)
//   6  = tritone (b5)   7  = perfect 5th (5)  8  = minor 6th (b6)
//   9  = major 6th (6)  10 = minor 7th (b7)   11 = major 7th (7)
//   12 = octave          14 = major 9th (9)
// =============================================================================

const ARPEGGIO_TYPES = {
  'Major':  [0, 4, 7],
  'Minor':  [0, 3, 7],
  'Maj7':   [0, 4, 7, 11],
  'Min7':   [0, 3, 7, 10],
  'Dom7':   [0, 4, 7, 10],
  'Dim':    [0, 3, 6],
  'Dim7':   [0, 3, 6, 9],
  'Aug':    [0, 4, 8],
  'Min♭5':  [0, 3, 6, 10],
  'Maj9':   [0, 4, 7, 11, 14],
  'Min9':   [0, 3, 7, 10, 14],
};
