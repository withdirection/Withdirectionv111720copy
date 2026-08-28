import { expect, test } from '@playwright/test';

/**
 * The consent gate, exercised in a real browser against the production build.
 *
 * The unit tests cover the module's logic; these prove the wiring — that the
 * bootstrap runs before anything else, the banner's inline onclick handlers
 * reach it, and no tracker slips out over the network.
 */

const TRACKERS = /googletagmanager\.com|google-analytics\.com|mailerlite\.com|tally\.so/;

/** Record every request to a third-party tracker, whether or not it succeeds. */
function watchTrackers(page: import('@playwright/test').Page): string[] {
  const seen: string[] = [];
  page.on('request', (request) => {
    const { hostname } = new URL(request.url());
    if (TRACKERS.test(hostname)) seen.push(hostname);
  });
  return seen;
}

const banner = '#wd-cookie-banner';

test.describe('cookie consent', () => {
  test('asks before loading anything', async ({ page }) => {
    const trackers = watchTrackers(page);

    await page.goto('/', { waitUntil: 'networkidle' });

    await expect(page.locator(banner)).toBeVisible();
    expect(trackers, 'nothing may load before the visitor decides').toEqual([]);
  });

  test('declining loads no trackers, and is remembered', async ({ page }) => {
    const trackers = watchTrackers(page);

    await page.goto('/', { waitUntil: 'networkidle' });
    await page.click(`${banner} button:has-text("Decline")`);

    await expect(page.locator(banner)).toBeHidden();
    expect(trackers).toEqual([]);

    await page.reload({ waitUntil: 'networkidle' });
    await expect(page.locator(banner)).toBeHidden();
    expect(trackers, 'the refusal must survive a reload').toEqual([]);
  });

  test('accepting loads analytics, marketing and Tally', async ({ page }) => {
    const trackers = watchTrackers(page);

    await page.goto('/', { waitUntil: 'networkidle' });
    await page.click(`${banner} button:has-text("Accept")`);
    await expect(page.locator(banner)).toBeHidden();

    await expect
      .poll(() => [...new Set(trackers)].sort(), { timeout: 10_000 })
      .toEqual(expect.arrayContaining(['assets.mailerlite.com', 'tally.so']));
  });

  test('consent can be withdrawn from the footer', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    await page.click(`${banner} button:has-text("Decline")`);
    await expect(page.locator(banner)).toBeHidden();

    await page.click('footer button:has-text("Cookie settings")');
    await expect(
      page.locator(banner),
      'withdrawing consent must be as easy as giving it',
    ).toBeVisible();
  });

  test('the banner links to a privacy policy that exists', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    // The banner lives outside the React tree, so this is a full page load
    // rather than a client-side transition.
    await page.click(`${banner} a:has-text("Privacy Policy")`);
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveURL(/\/privacy$/);
    await expect(page.locator('main h1')).toContainText('Privacy');
  });
});

test.describe('navigation', () => {
  const ROUTES = ['/', '/about', '/services', '/community', '/portal', '/resources', '/contact', '/privacy'];

  for (const route of ROUTES) {
    test(`${route} loads on a direct hit`, async ({ page }) => {
      const response = await page.goto(route, { waitUntil: 'domcontentloaded' });
      expect(response?.status(), `${route} must not 404 when opened directly`).toBeLessThan(400);
      await expect(page.locator('main h1')).toBeVisible();
    });
  }

  test('scroll position resets between routes', async ({ page }) => {
    await page.goto('/community', { waitUntil: 'networkidle' });
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(0);

    await page.click('header a[href="/about"]');
    await expect(page).toHaveURL(/\/about$/);
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
  });
});

test.describe('contact form', () => {
  test('keeps submissions out of the URL', async ({ page }) => {
    await page.goto('/contact', { waitUntil: 'networkidle' });

    await page.fill('#name', 'Jordan Reyes');
    await page.fill('#email', 'jordan@example.org');
    await page.fill('#message', 'Court hearing on 3 March, ASL and IS needed.');
    await page.click('button:has-text("Send Message")');

    await expect(page.locator('[role="status"]')).toContainText(/not connected yet/i);
    expect(page.url(), 'field values must never reach the query string').not.toContain('jordan');
    expect(new URL(page.url()).search).toBe('');
  });
});
