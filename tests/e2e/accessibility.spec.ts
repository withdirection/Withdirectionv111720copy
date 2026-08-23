import { expect, test } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';

const axeSource = readFileSync(
  createRequire(import.meta.url).resolve('axe-core/axe.min.js'),
  'utf8',
);

const ROUTES = ['/', '/about', '/services', '/community', '/portal', '/resources', '/contact', '/privacy'];

interface AxeViolation {
  id: string;
  impact: string;
  help: string;
  nodes: { html: string; failureSummary?: string }[];
}

/**
 * The rules jsdom cannot answer.
 *
 * The unit suite runs axe on every route already, but with colour-contrast and
 * the layout-dependent rules switched off — jsdom has no layout engine and no
 * painted colour, so it cannot evaluate them. This is where they get checked.
 */
async function runAxe(page: import('@playwright/test').Page): Promise<AxeViolation[]> {
  await page.addScriptTag({ content: axeSource });
  return page.evaluate(async () => {
    // @ts-expect-error injected at runtime
    const results = await window.axe.run(document, {
      runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] },
      // colour-contrast has its own block below, with its own reporting.
      rules: { 'color-contrast': { enabled: false } },
    });
    return results.violations;
  });
}

const describeViolations = (violations: AxeViolation[]) =>
  violations
    .map(
      (v) =>
        `${v.id} (${v.impact}): ${v.help}\n` +
        v.nodes.slice(0, 5).map((n) => `    ${n.html}`).join('\n'),
    )
    .join('\n\n');

for (const route of ROUTES) {
  test(`${route} has no WCAG violations in a real browser`, async ({ page }) => {
    await page.goto(route, { waitUntil: 'networkidle' });

    const violations = await runAxe(page);

    expect(violations.map((v) => v.id), `\n${describeViolations(violations)}\n`).toEqual([]);
  });
}

test('the skip link is reachable by keyboard and moves focus to main', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });

  await page.keyboard.press('Tab');
  const skip = page.locator('a[href="#main-content"]');
  await expect(skip, 'the skip link must be the first stop for a keyboard user').toBeFocused();
  await expect(skip, 'it must become visible once focused').toBeVisible();

  await page.keyboard.press('Enter');
  await expect(page.locator('#main-content')).toBeFocused();
});

test('the mobile menu closes on Escape and returns focus', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/', { waitUntil: 'networkidle' });

  const toggle = page.getByRole('button', { name: /toggle menu/i });
  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('#mobile-menu')).toBeVisible();

  await page.keyboard.press('Escape');

  await expect(page.locator('#mobile-menu')).toBeHidden();
  await expect(toggle, 'focus must not be stranded on a hidden element').toBeFocused();
});

test('honours a reduced-motion preference', async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: 'reduce' });
  const page = await context.newPage();
  await page.goto('/', { waitUntil: 'networkidle' });

  // Sample an element the design animates on hover.
  const duration = await page
    .locator('header a[href="/services"]')
    .first()
    .evaluate((el) => getComputedStyle(el).transitionDuration);

  expect(
    parseFloat(duration),
    'transitions should collapse to effectively zero under prefers-reduced-motion',
  ).toBeLessThan(0.05);

  await context.close();
});


/**
 * Colour contrast, checked in a real browser because jsdom cannot paint.
 *
 * The brand accents come in pairs, and which one to use depends on the ground
 * behind them — this is the thing to get right when adding new components:
 *
 *                    on #FFF   on #F5F7FA   on navy #14213D
 *   #00A9E0 bright      2.71 ✗     2.52 ✗        5.90 ✓
 *   #0078B4 deep        4.85 ✓     4.52 ✓        3.54 ✗
 *   #CB6CE6 bright      3.08 ✗     2.87 ✗        5.19 ✓
 *   #B52ADC deep        4.85 ✓     4.52 ✓        3.54 ✗
 *
 * So: deep on light surfaces and inside filled buttons behind white text;
 * bright for text and icons on the navy sections, where lightness is what
 * creates the contrast. Reaching for the wrong one fails here.
 *
 * Two things worth knowing before picking a value:
 *
 * The deep blue is rotated 5° toward blue (200°, against the brand's 194.7°).
 * Darkening alone made it read green, because green dominates at low lightness.
 *
 * Both deep values are set against #F5F7FA, not #FFFFFF. The site uses that
 * grey for panels, and a value tuned only to white lands around 4.19 on it —
 * passing on one light surface and failing on the other.
 */
test.describe('colour contrast', () => {
  for (const route of ROUTES) {
    test(`${route} meets AA contrast`, async ({ page }) => {
      await page.goto(route, { waitUntil: 'networkidle' });
      await page.addScriptTag({ content: axeSource });

      const violations = await page.evaluate(async () => {
        // @ts-expect-error injected at runtime
        const results = await window.axe.run(document, {
          runOnly: { type: 'rule', values: ['color-contrast'] },
        });
        return results.violations as AxeViolation[];
      });

      expect(violations.map((v) => v.id), `\n${describeViolations(violations)}\n`).toEqual([]);
    });
  }
});

test('the mobile menu toggle stays on screen on a phone', async ({ page }) => {
  // The logo was a fixed 160px tall, which its aspect ratio made 387px wide.
  // On a 390px viewport that pushed the toggle to x=403 — off-screen, with no
  // horizontal scroll to reach it, so mobile visitors could not navigate at all.
  await page.goto('/', { waitUntil: 'domcontentloaded' });

  // The header is responsive through CSS alone, so resizing re-lays it out —
  // no need to reload for each width.
  for (const width of [320, 390, 430]) {
    await page.setViewportSize({ width, height: 844 });

    const box = await page.getByRole('button', { name: /toggle menu/i }).boundingBox();
    expect(box, `no toggle at ${width}px`).not.toBeNull();
    expect(box!.x + box!.width, `toggle runs off the right edge at ${width}px`).toBeLessThanOrEqual(width);
    expect(box!.x, `toggle runs off the left edge at ${width}px`).toBeGreaterThanOrEqual(0);
  }
});
