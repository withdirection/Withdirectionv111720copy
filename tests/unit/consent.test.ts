import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { accept, decline, init, readDecision, withdraw } from '../../src/consent';

/** Third-party hosts that must never be contacted without an opt-in. */
const TRACKING_HOSTS = ['googletagmanager.com', 'mailerlite.com', 'tally.so'];

const injectedSrcs = () =>
  [...document.querySelectorAll('script[src]')].map((s) => s.getAttribute('src') ?? '');

const trackingLoaded = () =>
  injectedSrcs().filter((src) => TRACKING_HOSTS.some((host) => src.includes(host)));

function renderBanner() {
  document.body.innerHTML = '<div id="wd-cookie-banner" hidden></div>';
  return document.getElementById('wd-cookie-banner')!;
}

describe('consent gate', () => {
  beforeEach(() => {
    localStorage.clear();
    document.head.innerHTML = '';
    document.body.innerHTML = '';
    const w = window as unknown as Record<string, unknown>;
    delete w.dataLayer;
    delete w.gtag;
    delete w.ml;
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('before a decision is made', () => {
    it('loads nothing at all', () => {
      init();
      expect(trackingLoaded()).toEqual([]);
    });

    it('asks, by revealing the banner', () => {
      const banner = renderBanner();
      init();
      expect(banner.hasAttribute('hidden')).toBe(false);
    });
  });

  describe('when the visitor declines', () => {
    it('loads no tracking, including Tally', () => {
      // Tally used to sit outside the gate and load for everyone.
      decline();
      expect(trackingLoaded()).toEqual([]);
    });

    it('remembers the refusal across visits', () => {
      decline();
      expect(readDecision()).toBe('declined');

      init();
      expect(trackingLoaded()).toEqual([]);
    });

    it('dismisses the banner', () => {
      const banner = renderBanner();
      banner.removeAttribute('hidden');
      decline();
      expect(banner.hasAttribute('hidden')).toBe(true);
    });
  });

  describe('when the visitor accepts', () => {
    it('loads analytics, marketing and Tally', () => {
      accept();
      const loaded = trackingLoaded().join(' ');
      for (const host of TRACKING_HOSTS) {
        expect(loaded, `${host} should load after opt-in`).toContain(host);
      }
    });

    it('anonymises IP addresses', () => {
      accept();
      const calls = (window as unknown as { dataLayer: unknown[][] }).dataLayer;
      const config = calls.find((args) => args[0] === 'config');
      expect(config?.[2]).toMatchObject({ anonymize_ip: true });
    });

    it('remembers the opt-in across visits without loading twice', () => {
      accept();
      const first = trackingLoaded().length;

      init();
      expect(readDecision()).toBe('accepted');
      expect(trackingLoaded()).toHaveLength(first);
    });

    it('shows the newsletter popup on first opt-in only', () => {
      vi.useFakeTimers();
      accept();
      vi.runAllTimers();

      const ml = (window as unknown as { ml: { q: unknown[][] } }).ml;
      expect(ml.q.some((args) => args[0] === 'show')).toBe(true);
    });
  });

  describe('withdrawing consent', () => {
    it('clears the decision and asks again', () => {
      const banner = renderBanner();
      accept();
      expect(readDecision()).toBe('accepted');

      withdraw();

      expect(readDecision()).toBeNull();
      expect(banner.hasAttribute('hidden')).toBe(false);
    });
  });

  describe('when localStorage is unavailable', () => {
    it('treats the visitor as undecided rather than throwing', () => {
      const getItem = vi
        .spyOn(Storage.prototype, 'getItem')
        .mockImplementation(() => {
          throw new DOMException('denied', 'SecurityError');
        });
      const setItem = vi
        .spyOn(Storage.prototype, 'setItem')
        .mockImplementation(() => {
          throw new DOMException('denied', 'SecurityError');
        });

      expect(() => init()).not.toThrow();
      expect(readDecision()).toBeNull();
      expect(trackingLoaded()).toEqual([]);

      // A choice still applies to the current page view.
      expect(() => decline()).not.toThrow();

      getItem.mockRestore();
      setItem.mockRestore();
    });
  });
});
