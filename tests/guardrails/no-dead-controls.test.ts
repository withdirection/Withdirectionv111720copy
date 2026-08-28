import { describe as group, expect, it } from 'vitest';
import { describe as format, findOpeningTags } from '../support/source';

/**
 * Every interactive control must actually do something.
 *
 * This is a source scan rather than a DOM assertion on purpose: React attaches
 * handlers at the root via event delegation, so a rendered <button> reports
 * `onclick === null` whether or not it is wired up. The DOM genuinely cannot
 * answer this question — the source can.
 */
group('no dead controls', () => {
  it('every <button> has a handler, a submit type, or an explicit opt-out', () => {
    const dead = findOpeningTags('button').filter(
      (tag) =>
        !/\bonClick=/.test(tag.text) &&
        !/\btype="submit"/.test(tag.text) &&
        !/\bdata-inert-control\b/.test(tag.text),
    );

    expect(
      dead,
      `These buttons render and animate but do nothing when pressed.\n` +
        `Wire an onClick, make it a submit button, use a <Link> if it navigates,\n` +
        `or mark it data-inert-control if it is genuinely decorative.\n\n` +
        `${format(dead)}\n`,
    ).toEqual([]);
  });

  it('every <form> intercepts its own submission', () => {
    const unhandled = findOpeningTags('form').filter(
      (tag) => !/\bonSubmit=/.test(tag.text) && !/\baction=/.test(tag.text),
    );

    expect(
      unhandled,
      `A <form> with no onSubmit and no action performs a native GET to the\n` +
        `current URL. Any input carrying a name attribute is then written into\n` +
        `the query string, where analytics records it as page_location and the\n` +
        `browser keeps it in history.\n\n` +
        `${format(unhandled)}\n`,
    ).toEqual([]);
  });

  it('no <a> is a placeholder href', () => {
    const placeholders = findOpeningTags('a').filter((tag) =>
      /href="(#|javascript:void\(0\)|)"/.test(tag.text),
    );

    expect(
      placeholders,
      `Anchors with an empty or placeholder href look like links but go nowhere:\n\n${format(placeholders)}\n`,
    ).toEqual([]);
  });
});
