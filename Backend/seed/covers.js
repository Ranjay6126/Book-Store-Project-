/**
 * Generates a book-cover image as an SVG data URL.
 *
 * Keeping covers as generated SVG (rather than binary JPEGs) means the seed
 * data stays readable, diff-able and tiny, while still giving every book a
 * distinct piece of artwork.
 */

const escapeXml = (s = "") =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

/** Greedy word wrap into at most `maxLines` lines of `maxChars`. */
const wrap = (text, maxChars, maxLines) => {
  const words = String(text).split(/\s+/).filter(Boolean);
  const lines = [];
  let line = "";

  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (next.length <= maxChars) {
      line = next;
    } else {
      if (line) lines.push(line);
      line = word;
      if (lines.length === maxLines) break;
    }
  }
  if (line && lines.length < maxLines) lines.push(line);

  if (lines.length === maxLines) {
    const consumed = lines.join(" ").split(/\s+/).length;
    if (consumed < words.length) {
      lines[maxLines - 1] = lines[maxLines - 1].replace(/[.,;:]?$/, "…");
    }
  }
  return lines;
};

/**
 * @param {object} opts
 * @param {string} opts.title
 * @param {string} opts.author
 * @param {number|string} opts.year
 * @param {string} opts.genre
 * @param {[string,string]} opts.colors  gradient stops
 * @param {string} opts.motif  one of: gears, bolt, bat, floral, wave, mask, glass, globe
 */
export function makeCover({ title, author, year, genre, colors, motif }) {
  const [c1, c2] = colors;
  const W = 480;
  const H = 720;

  const titleLines = wrap(title.toUpperCase(), 15, 4);
  const titleStart = 300 - (titleLines.length - 1) * 24;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${escapeXml(title)} cover">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${c1}"/>
      <stop offset="100%" stop-color="${c2}"/>
    </linearGradient>
    <radialGradient id="vig" cx="50%" cy="38%" r="72%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.20"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0.42"/>
    </radialGradient>
    <linearGradient id="spine" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#000" stop-opacity="0.38"/>
      <stop offset="55%" stop-color="#000" stop-opacity="0.06"/>
      <stop offset="100%" stop-color="#fff" stop-opacity="0.05"/>
    </linearGradient>
    <pattern id="grid" width="34" height="34" patternUnits="userSpaceOnUse">
      <path d="M34 0H0v34" fill="none" stroke="#ffffff" stroke-opacity="0.07" stroke-width="1"/>
    </pattern>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#grid)"/>
  <rect width="${W}" height="${H}" fill="url(#vig)"/>
  <rect width="34" height="${H}" fill="url(#spine)"/>

  <!-- inner keyline -->
  <rect x="30" y="30" width="${W - 60}" height="${H - 60}" fill="none"
        stroke="#ffffff" stroke-opacity="0.30" stroke-width="1.5"/>
  <rect x="40" y="40" width="${W - 80}" height="${H - 80}" fill="none"
        stroke="#ffffff" stroke-opacity="0.13" stroke-width="1"/>

  <!-- motif -->
  <g transform="translate(${W / 2} 150)" opacity="0.92">${MOTIFS[motif] ?? MOTIFS.glass}</g>

  <!-- rule -->
  <path d="M120 236 H${W - 120}" stroke="#ffffff" stroke-opacity="0.45" stroke-width="1.5"/>

  <!-- title -->
  <g font-family="Georgia, 'Times New Roman', serif" text-anchor="middle" fill="#ffffff">
    ${titleLines
      .map(
        (line, i) =>
          `<text x="${W / 2}" y="${titleStart + i * 48}" font-size="40" font-weight="700" letter-spacing="1.5">${escapeXml(line)}</text>`,
      )
      .join("\n    ")}
  </g>

  <!-- author -->
  <text x="${W / 2}" y="${titleStart + titleLines.length * 48 + 34}" text-anchor="middle"
        font-family="Georgia, 'Times New Roman', serif" font-size="21"
        fill="#ffffff" fill-opacity="0.9" font-style="italic">${escapeXml(author)}</text>

  <!-- footer -->
  <path d="M150 ${H - 132} H${W - 150}" stroke="#ffffff" stroke-opacity="0.35" stroke-width="1"/>
  <text x="${W / 2}" y="${H - 100}" text-anchor="middle"
        font-family="Helvetica, Arial, sans-serif" font-size="13"
        letter-spacing="4" fill="#ffffff" fill-opacity="0.85">${escapeXml(
          String(genre).toUpperCase(),
        )}</text>
  <text x="${W / 2}" y="${H - 72}" text-anchor="middle"
        font-family="Helvetica, Arial, sans-serif" font-size="12"
        letter-spacing="3" fill="#ffffff" fill-opacity="0.6">${escapeXml(String(year))}</text>
</svg>`;

  return `data:image/svg+xml;base64,${Buffer.from(svg, "utf8").toString("base64")}`;
}

/* ---------------- motifs, drawn centred on (0,0) ---------------- */
const MOTIFS = {
  // interlocking clock gears — The Time Machine
  gears: `
    <circle r="46" fill="none" stroke="#fff" stroke-opacity="0.85" stroke-width="3"/>
    <circle r="30" fill="none" stroke="#fff" stroke-opacity="0.55" stroke-width="2"/>
    <circle r="6" fill="#fff" fill-opacity="0.9"/>
    ${Array.from({ length: 12 })
      .map(
        (_, i) =>
          `<g transform="rotate(${i * 30})"><rect x="-3.5" y="-58" width="7" height="13" rx="2" fill="#fff" fill-opacity="0.85"/></g>`,
      )
      .join("")}
    <path d="M0 -26 V0 H20" stroke="#fff" stroke-opacity="0.9" stroke-width="3" fill="none" stroke-linecap="round"/>`,

  // lightning bolt over a flask — Frankenstein
  bolt: `
    <path d="M8 -60 L-26 6 H-4 L-14 60 L26 -8 H2 Z" fill="#fff" fill-opacity="0.92"/>
    <circle r="56" fill="none" stroke="#fff" stroke-opacity="0.4" stroke-width="2" stroke-dasharray="6 8"/>`,

  // bat — Dracula
  bat: `
    <path d="M0 -14 C-8 -30 -22 -34 -30 -22 C-36 -34 -52 -36 -62 -26 C-50 -24 -44 -14 -44 -2
             C-30 -8 -16 -2 0 16 C16 -2 30 -8 44 -2 C44 -14 50 -24 62 -26
             C52 -36 36 -34 30 -22 C22 -34 8 -30 0 -14 Z"
          fill="#fff" fill-opacity="0.92"/>
    <circle r="58" fill="none" stroke="#fff" stroke-opacity="0.35" stroke-width="2"/>`,

  // floral wreath — Pride and Prejudice
  floral: `
    <circle r="52" fill="none" stroke="#fff" stroke-opacity="0.55" stroke-width="2"/>
    ${Array.from({ length: 8 })
      .map(
        (_, i) =>
          `<g transform="rotate(${i * 45})"><ellipse cx="0" cy="-52" rx="9" ry="17" fill="#fff" fill-opacity="0.8"/></g>`,
      )
      .join("")}
    <circle r="13" fill="#fff" fill-opacity="0.92"/>`,

  // whale tail over waves — Moby-Dick
  wave: `
    <path d="M0 6 C-10 -18 -30 -34 -46 -40 C-30 -30 -18 -14 -10 6 Z" fill="#fff" fill-opacity="0.9"/>
    <path d="M0 6 C10 -18 30 -34 46 -40 C30 -30 18 -14 10 6 Z" fill="#fff" fill-opacity="0.9"/>
    <path d="M-62 26 q15 -12 31 0 t31 0 t31 0" stroke="#fff" stroke-opacity="0.7" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M-62 44 q15 -12 31 0 t31 0 t31 0" stroke="#fff" stroke-opacity="0.45" stroke-width="3" fill="none" stroke-linecap="round"/>`,

  // split face — Jekyll and Hyde
  mask: `
    <path d="M0 -52 a52 52 0 0 0 0 104 Z" fill="#fff" fill-opacity="0.92"/>
    <path d="M0 -52 a52 52 0 0 1 0 104 Z" fill="#fff" fill-opacity="0.28"/>
    <circle r="52" fill="none" stroke="#fff" stroke-opacity="0.75" stroke-width="2.5"/>
    <circle cx="-22" cy="-12" r="5" fill="#1b1b1b" fill-opacity="0.75"/>
    <circle cx="22" cy="-12" r="5" fill="#fff" fill-opacity="0.85"/>`,

  // magnifying glass — Sherlock Holmes
  glass: `
    <circle cx="-8" cy="-12" r="34" fill="none" stroke="#fff" stroke-opacity="0.9" stroke-width="5"/>
    <circle cx="-8" cy="-12" r="26" fill="#fff" fill-opacity="0.14"/>
    <path d="M16 12 L48 44" stroke="#fff" stroke-opacity="0.9" stroke-width="9" stroke-linecap="round"/>`,

  // globe — Around the World in Eighty Days
  globe: `
    <circle r="48" fill="none" stroke="#fff" stroke-opacity="0.9" stroke-width="3"/>
    <ellipse rx="48" ry="18" fill="none" stroke="#fff" stroke-opacity="0.6" stroke-width="2"/>
    <ellipse rx="20" ry="48" fill="none" stroke="#fff" stroke-opacity="0.6" stroke-width="2"/>
    <path d="M-48 0 H48" stroke="#fff" stroke-opacity="0.6" stroke-width="2"/>
    <circle r="4" cx="26" cy="-26" fill="#fff" fill-opacity="0.95"/>`,
};

export default makeCover;
