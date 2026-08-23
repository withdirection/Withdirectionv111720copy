import { describe as group, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { lineOf, read, sourceFiles } from '../support/source';

/**
 * Declared route paths, parsed from routes.tsx rather than imported.
 *
 * Importing the module would call createBrowserRouter at collection time, which
 * needs a DOM history and pulls in every page component. The route table is a
 * flat literal, so reading it is both cheaper and less brittle.
 */
function declaredRoutes(): Set<string> {
  const src = readFileSync('src/app/routes.tsx', 'utf8');
  const paths = new Set<string>(['/']);
  for (const m of src.matchAll(/path:\s*"([^"]+)"/g)) {
    const p = m[1];
    if (p !== '*') paths.add(p.startsWith('/') ? p : `/${p}`);
  }
  return paths;
}

interface Ref {
  file: string;
  line: number;
  target: string;
}

/**
 * Every internal navigation target: `to="/x"` and `href="/x"`.
 *
 * index.html is included deliberately — the cookie consent banner links to a
 * privacy policy from there, outside the React tree.
 */
function internalRefs(): Ref[] {
  const refs: Ref[] = [];
  for (const file of [...sourceFiles(), 'index.html']) {
    if (file.endsWith('routes.tsx')) continue;
    const src = read(file);
    for (const m of src.matchAll(/\b(?:to|href)="(\/[^"]*)"/g)) {
      refs.push({ file, line: lineOf(src, m.index!), target: m[1] });
    }
  }
  return refs;
}

const fmt = (refs: Ref[]) =>
  refs.map((r) => `  ${r.file}:${r.line}  ->  ${r.target}`).join('\n');

group('internal links', () => {
  const routes = declaredRoutes();

  it('every internal link points at a declared route', () => {
    const broken = internalRefs().filter((r) => !routes.has(r.target.split('#')[0]));

    expect(
      broken,
      `These links resolve to the 404 page.\n` +
        `Declared routes: ${[...routes].sort().join(', ')}\n\n${fmt(broken)}\n`,
    ).toEqual([]);
  });

  it('every hash fragment points at an element that exists on the target page', () => {
    const pageFor: Record<string, string> = {
      '/': 'src/app/pages/Home.tsx',
      '/about': 'src/app/pages/AboutPage.tsx',
      '/services': 'src/app/pages/ServicesPage.tsx',
      '/community': 'src/app/pages/CommunityPage.tsx',
      '/portal': 'src/app/pages/PortalPage.tsx',
      '/resources': 'src/app/pages/ResourcesPage.tsx',
      '/contact': 'src/app/pages/ContactPage.tsx',
    };

    // A page renders the components it imports, so ids can live in either.
    const idsReachableFrom = (page: string): Set<string> => {
      const ids = new Set<string>();
      const collect = (file: string) => {
        const src = read(file);
        // Literal ids: <section id="contact">
        for (const m of src.matchAll(/\bid="([^"{]+)"/g)) ids.add(m[1]);
        // Data-driven ids: services.map(s => <section id={s.id}>) fed by
        // a literal array of { id: 'interpreting', ... } objects.
        if (/\bid=\{[^}]+\}/.test(src)) {
          for (const m of src.matchAll(/\bid:\s*'([^']+)'/g)) ids.add(m[1]);
        }
        for (const m of src.matchAll(/from '\.\.\/components\/([A-Za-z]+)'/g)) {
          try {
            collect(`src/app/components/${m[1]}.tsx`);
          } catch {
            /* component resolved elsewhere; the link test above covers it */
          }
        }
      };
      collect(page);
      return ids;
    };

    const dangling = internalRefs()
      .filter((r) => r.target.includes('#'))
      .filter((r) => {
        const [path, hash] = r.target.split('#');
        const page = pageFor[path];
        return !page || !idsReachableFrom(page).has(hash);
      });

    expect(
      dangling,
      `These deep links scroll nowhere — no element on the target page has that id:\n\n${fmt(dangling)}\n`,
    ).toEqual([]);
  });
});
