import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router';
import axe from 'axe-core';

import { Layout } from '../../src/app/pages/Layout';
import { Home } from '../../src/app/pages/Home';
import { AboutPage } from '../../src/app/pages/AboutPage';
import { ServicesPage } from '../../src/app/pages/ServicesPage';
import { CommunityPage } from '../../src/app/pages/CommunityPage';
import { PortalPage } from '../../src/app/pages/PortalPage';
import { ResourcesPage } from '../../src/app/pages/ResourcesPage';
import { ContactPage } from '../../src/app/pages/ContactPage';
import { PrivacyPage } from '../../src/app/pages/PrivacyPage';
import { NotFound } from '../../src/app/pages/NotFound';

const ROUTES = [
  { path: '/', name: 'Home', Component: Home },
  { path: '/about', name: 'About', Component: AboutPage },
  { path: '/services', name: 'Services', Component: ServicesPage },
  { path: '/community', name: 'Community', Component: CommunityPage },
  { path: '/portal', name: 'Portal', Component: PortalPage },
  { path: '/resources', name: 'Resources', Component: ResourcesPage },
  { path: '/contact', name: 'Contact', Component: ContactPage },
  { path: '/privacy', name: 'Privacy', Component: PrivacyPage },
  { path: '/nope', name: 'NotFound', Component: NotFound },
] as const;

function renderRoute(path: string) {
  const router = createMemoryRouter(
    [
      {
        path: '/',
        Component: Layout,
        children: ROUTES.map(({ path: p, Component }) =>
          p === '/' ? { index: true, Component } : { path: p.slice(1), Component },
        ).concat([{ path: '*', Component: NotFound }]),
      },
    ],
    { initialEntries: [path] },
  );
  return render(<RouterProvider router={router} />);
}

describe.each(ROUTES)('$name route', ({ path }) => {
  it('renders without throwing', () => {
    expect(() => renderRoute(path)).not.toThrow();
  });

  it('renders inside the site chrome', () => {
    renderRoute(path);
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('has exactly one level-1 heading', () => {
    renderRoute(path);
    const main = screen.getByRole('main');
    expect(within(main).getAllByRole('heading', { level: 1 })).toHaveLength(1);
  });

  it('has no images missing alternative text', () => {
    const { container } = renderRoute(path);
    const undescribed = [...container.querySelectorAll('img')].filter(
      (img) => !img.hasAttribute('alt'),
    );
    expect(
      undescribed.map((img) => img.getAttribute('src')),
      'Decorative images need alt="", meaningful ones need a description.',
    ).toEqual([]);
  });

  it('passes axe with no violations', async () => {
    const { container } = renderRoute(path);

    const results = await axe.run(container, {
      // jsdom has no layout engine, so anything needing computed geometry or
      // painted colour cannot be evaluated here. Those belong in the Playwright
      // run against a real browser.
      rules: {
        'color-contrast': { enabled: false },
        'landmark-one-main': { enabled: false },
        region: { enabled: false },
      },
    });

    const summary = results.violations.map(
      (v) => `${v.id} (${v.impact}): ${v.help}\n    ${v.nodes.map((n) => n.html).join('\n    ')}`,
    );

    expect(summary, `Accessibility violations on ${path}:\n\n${summary.join('\n')}\n`).toEqual([]);
  }, 20000);
});

describe('external links', () => {
  it('open safely', () => {
    const { container } = renderRoute('/resources');
    const external = [...container.querySelectorAll('a[href^="http"]')];
    expect(external.length).toBeGreaterThan(0);

    for (const link of external) {
      if (link.getAttribute('target') === '_blank') {
        expect(link.getAttribute('rel') ?? '').toContain('noopener');
      }
    }
  });
});
