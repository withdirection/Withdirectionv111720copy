import { describe as group, expect, it } from 'vitest';
import { lineOf, read, sourceFiles } from '../support/source';

interface Hit {
  file: string;
  line: number;
  match: string;
}

/** Scan the source tree for a pattern, ignoring the code comments we write about it. */
function scan(pattern: RegExp): Hit[] {
  const hits: Hit[] = [];
  for (const file of sourceFiles()) {
    const src = read(file);
    const re = new RegExp(pattern.source, `${pattern.flags.replace('g', '')}g`);
    for (const m of src.matchAll(re)) {
      hits.push({ file, line: lineOf(src, m.index!), match: m[0] });
    }
  }
  return hits;
}

const fmt = (hits: Hit[]) =>
  hits.map((h) => `  ${h.file}:${h.line}  "${h.match}"`).join('\n');

group('content guardrails', () => {
  it('ships no placeholder contact details or scaffolding text', () => {
    // 555-01xx is the North American fiction prefix; it was never a real number.
    const hits = scan(/\(?\b555\)?[-.\s]{0,2}\d{3}[-.\s]?\d{4}\b|\+1555\d{7}|lorem ipsum|example\.com/i);

    expect(
      hits,
      `Placeholder content is reachable in production:\n\n${fmt(hits)}\n`,
    ).toEqual([]);
  });

  it('honours the language the brand guide rules out', () => {
    // guidelines/Guidelines.md, "Language to AVOID". These are the firm's own
    // rules about deficit framing and business cliche, not a style preference.
    const banned = [
      /\bempower(?:ing|s|ed)?\b/i,
      /\bseamless(?:ly)?\b/i,
      /\bsolutions\b/i,
      /eliminating communication barriers/i,
      /overcome (?:their )?limitations/i,
      /giving deaf people a voice/i,
    ];

    const hits = banned.flatMap((pattern) => scan(pattern));

    expect(
      hits,
      `guidelines/Guidelines.md rules this language out:\n\n${fmt(hits)}\n`,
    ).toEqual([]);
  });
});
