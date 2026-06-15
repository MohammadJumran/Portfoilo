// A faint, organized field of real Ugaritic glyphs (U+10380–U+1039D) — one of
// the oldest known alphabets, from ancient Ugarit in Syria. It sits behind all
// content as a subtle "ancient cipher" texture that fits a security specialist.
//
// Rendered once as a single justified text block (cheap) and fixed to the
// viewport so it stays put while the page scrolls.

const UGARITIC_LETTERS = Array.from({ length: 30 }, (_, i) =>
  String.fromCodePoint(0x10380 + i)
);

// Deterministic, evenly-spread sequence so the texture looks organized, not random.
const GLYPHS = Array.from(
  { length: 2400 },
  (_, i) => UGARITIC_LETTERS[(i * 7 + (i % 13)) % UGARITIC_LETTERS.length]
).join(" ");

export const GlyphBackground = () => (
  <div
    className="fixed inset-0 -z-10 overflow-hidden pointer-events-none select-none"
    aria-hidden="true"
  >
    <p className="ugaritic-field parallax-soft">{GLYPHS}</p>
  </div>
);
