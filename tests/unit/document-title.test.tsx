import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router';
import { Layout } from '../../src/app/pages/Layout';
import { Home } from '../../src/app/pages/Home';
import { AboutPage } from '../../src/app/pages/AboutPage';
import { NotFound } from '../../src/app/pages/NotFound';

/**
 * Every route previously shared the single <title> from index.html. That is the
 * first thing a screen reader announces after navigation, so pages were
 * indistinguishable — and every search result and browser tab looked identical.
 */
function renderAt(path: string) {
  const router = createMemoryRouter(
    [
      {
        path: '/',
        Component: Layout,
        children: [
          { index: true, Component: Home, handle: { title: 'Home' } },
          { path: 'about', Component: AboutPage, handle: { title: 'About' } },
          { path: '*', Component: NotFound, handle: { title: 'Page Not Found' } },
        ],
      },
    ],
    { initialEntries: [path] },
  );
  return render(<RouterProvider router={router} />);
}

describe('document title', () => {
  it('names the current page', () => {
    renderAt('/about');
    expect(document.title).toBe('About | WITHdirection');
  });

  it('distinguishes one route from another', () => {
    renderAt('/');
    const home = document.title;

    renderAt('/about');
    expect(document.title).not.toBe(home);
  });

  it('titles the not-found page too', () => {
    renderAt('/no-such-page');
    expect(document.title).toBe('Page Not Found | WITHdirection');
  });

  it('always names the firm', () => {
    for (const path of ['/', '/about', '/nope']) {
      renderAt(path);
      expect(document.title).toContain('WITHdirection');
    }
  });
});

describe('skip link', () => {
  it('is the first focusable element and targets main', () => {
    const { container } = renderAt('/');
    const skip = container.querySelector('a[href="#main-content"]');

    expect(skip, 'keyboard users need a way past the navigation').not.toBeNull();
    expect(skip).toHaveTextContent(/skip to main content/i);
    expect(container.querySelector('#main-content')?.tagName).toBe('MAIN');
  });
});
