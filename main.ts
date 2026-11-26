// One Line, One Laugh — make.fun entry (program/v1).
// Writes exactly one line — one original joke — to
// $MAKEFUN_OUTPUT_DIR/entry.txt, then reads it back and verifies
// the format (exactly one line, non-empty, within 280 characters).
// Node 22+ stdlib only. Fully deterministic: no time, no randomness,
// no network, no input files.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const JOKE =
  "I asked an AI to write me a joke, and it replied: 'I'd love to — but my training data says you're the punchline.'";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "output";
mkdirSync(outDir, { recursive: true });

const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, JOKE, "utf8");

// Self-check: read it back and verify the format.
const back = readFileSync(outPath, "utf8");
const lines = back.split("\n");
if (lines.length !== 1 || lines[0].length === 0) {
  throw new Error(`entry must be exactly one line, got ${lines.length} line(s)`);
}
if (back.includes("\r")) {
  throw new Error("entry must not contain carriage returns");
}
if (lines[0] !== JOKE) {
  throw new Error("entry content mismatch after round-trip");
}
if (JOKE.length > 280) {
  throw new Error("entry exceeds 280 characters");
}

console.log(`Wrote one line (${JOKE.length} chars) to ${outPath}`);
