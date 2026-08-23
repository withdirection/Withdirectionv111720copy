import { describe, expect, it } from 'vitest';
import { SERVICE_OPTIONS } from '../../src/app/data/services';
import { read } from '../support/source';

/**
 * Enquiry forms must offer the services the site actually describes.
 *
 * Before this, the contact form and the consultation form each carried their
 * own hand-written list. Neither matched the other, and the consultation form
 * offered "Video Services" and "Government & International" — services that
 * appear nowhere on the Services page.
 */
describe('service options', () => {
  const servicesPage = read('src/app/pages/ServicesPage.tsx');
  const pageIds = new Set([...servicesPage.matchAll(/\bid:\s*'([^']+)'/g)].map((m) => m[1]));

  it('reads the Services page fixture correctly', () => {
    // Guards the assertions below against silently passing on an empty set.
    expect(pageIds.size).toBeGreaterThan(0);
  });

  it('offers only services the Services page describes', () => {
    const unknown = SERVICE_OPTIONS.filter(
      (option) => option.id !== 'other' && !pageIds.has(option.id),
    );

    expect(
      unknown.map((o) => o.id),
      'These appear in an enquiry form but nowhere on the Services page.',
    ).toEqual([]);
  });

  it('offers every service the Services page describes', () => {
    const offered = new Set(SERVICE_OPTIONS.map((o) => o.id));
    const missing = [...pageIds].filter((id) => !offered.has(id));

    expect(
      missing,
      'These are described on the Services page but cannot be selected when enquiring.',
    ).toEqual([]);
  });

  it('is the only source of options in both forms', () => {
    for (const file of ['src/app/components/Contact.tsx', 'src/app/pages/ContactPage.tsx']) {
      const src = read(file);
      expect(src, `${file} should map SERVICE_OPTIONS`).toContain('SERVICE_OPTIONS.map');

      // Only the empty "Select a service" prompt may be hardcoded.
      const hardcoded = [...src.matchAll(/<option value="([^"]+)"/g)].map((m) => m[1]);
      expect(hardcoded, `${file} still hardcodes service options`).toEqual([]);
    }
  });
});
