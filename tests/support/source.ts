import { readFileSync, readdirSync } from 'node:fs';
import { join, relative } from 'node:path';

export const SRC_ROOT = join(process.cwd(), 'src');

/** Every .tsx file under src/, as repo-relative paths. */
export function sourceFiles(): string[] {
  const out: string[] = [];
  const walk = (dir: string) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.name.endsWith('.tsx')) out.push(relative(process.cwd(), full));
    }
  };
  walk(SRC_ROOT);
  return out.sort();
}

export function read(file: string): string {
  return readFileSync(join(process.cwd(), file), 'utf8');
}

/** 1-indexed line number of a character offset. */
export function lineOf(source: string, index: number): number {
  return source.slice(0, index).split('\n').length;
}

export interface Tag {
  file: string;
  line: number;
  /** The full opening tag text, e.g. `<button onClick={...} className="...">`. */
  text: string;
}

/**
 * Find every opening tag of the given element name across the source tree.
 *
 * JSX attribute values can contain `>` inside braces (`style={{ a: b > c }}`),
 * so this tracks brace depth and quoting rather than scanning to the first `>`.
 */
export function findOpeningTags(name: string, files = sourceFiles()): Tag[] {
  const tags: Tag[] = [];

  for (const file of files) {
    const src = read(file);
    const opener = new RegExp(`<${name}(?=[\\s/>])`, 'g');
    let match: RegExpExecArray | null;

    while ((match = opener.exec(src)) !== null) {
      let depth = 0;
      let quote: string | null = null;
      let end = -1;

      for (let i = match.index; i < src.length; i++) {
        const ch = src[i];
        if (quote) {
          if (ch === quote) quote = null;
          continue;
        }
        if (ch === '"' || ch === "'" || ch === '`') quote = ch;
        else if (ch === '{') depth++;
        else if (ch === '}') depth--;
        else if (ch === '>' && depth === 0) {
          end = i;
          break;
        }
      }
      if (end === -1) continue;

      tags.push({
        file,
        line: lineOf(src, match.index),
        text: src.slice(match.index, end + 1),
      });
    }
  }
  return tags;
}

/** Format offenders for an assertion message, one `file:line` per row. */
export function describe(tags: Tag[]): string {
  return tags.map((t) => `  ${t.file}:${t.line}  ${collapse(t.text)}`).join('\n');
}

function collapse(text: string): string {
  const flat = text.replace(/\s+/g, ' ');
  return flat.length > 100 ? `${flat.slice(0, 97)}...` : flat;
}
