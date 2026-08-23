import { describe, expect, it } from 'vitest';
import {
  type CommunityEvent,
  calendarMonths,
  events,
  filterEvents,
  formatEventDate,
  parseEventDate,
  upcomingEvents,
} from '../../src/app/data/events';

const event = (over: Partial<CommunityEvent> = {}): CommunityEvent => ({
  id: 1,
  title: 'Test event',
  organization: 'WITHdirection',
  date: '2026-03-15',
  time: '2:00 PM',
  location: 'Brooklyn',
  type: 'Workshop',
  description: 'A test event.',
  accessible: true,
  deafLed: false,
  virtual: false,
  ...over,
});

describe('filterEvents', () => {
  const sample = [
    event({ id: 1, type: 'Museum Access' }),
    event({ id: 2, type: 'Arts & Culture', deafLed: true }),
    event({ id: 3, type: 'Workshop' }),
    event({ id: 4, type: 'Community Event', deafLed: true, virtual: true }),
    event({ id: 5, type: 'Performance' }),
  ];

  const ids = (filter: string) => filterEvents(sample, filter).map((e) => e.id);

  it('returns everything for "all"', () => {
    expect(ids('all')).toEqual([1, 2, 3, 4, 5]);
  });

  it('does not hand back the caller\'s own array', () => {
    const result = filterEvents(sample, 'all');
    expect(result).not.toBe(sample);
  });

  it('selects Deaf-led and virtual events by their flags', () => {
    expect(ids('deaf-led')).toEqual([2, 4]);
    expect(ids('virtual')).toEqual([4]);
  });

  it('treats arts as an explicit set of types, not a substring match', () => {
    expect(ids('arts')).toEqual([1, 2, 5]);

    // The old implementation matched event.type.includes('Museum'), so a type
    // merely containing the word would have been swept into this bucket.
    const decoy = [event({ id: 9, type: 'Workshop', title: 'Museum staff training' })];
    expect(filterEvents(decoy, 'arts')).toEqual([]);
  });

  it('falls back to an exact type match', () => {
    expect(ids('Workshop')).toEqual([3]);
    expect(ids('Community Event')).toEqual([4]);
  });

  it('returns nothing for an unknown filter rather than everything', () => {
    expect(ids('does-not-exist')).toEqual([]);
  });
});

describe('parseEventDate', () => {
  it('reads an ISO date as local midnight', () => {
    const date = parseEventDate('2026-03-15');
    expect(date.getFullYear()).toBe(2026);
    expect(date.getMonth()).toBe(2);
    expect(date.getDate()).toBe(15);
  });

  it('does not drift a day west of Greenwich', () => {
    // new Date('2026-03-15') parses as UTC midnight, which is 14 March locally
    // for any negative offset — Brooklyn included.
    expect(parseEventDate('2026-03-15').getDate()).toBe(15);
  });
});

describe('upcomingEvents', () => {
  const past = event({ id: 1, date: '2026-01-01' });
  const today = event({ id: 2, date: '2026-06-15' });
  const soon = event({ id: 3, date: '2026-06-20' });
  const later = event({ id: 4, date: '2026-09-01' });
  const now = new Date(2026, 5, 15);

  it('drops events that have already happened', () => {
    expect(upcomingEvents([past, soon], now).map((e) => e.id)).toEqual([3]);
  });

  it("keeps today's events", () => {
    expect(upcomingEvents([today], now).map((e) => e.id)).toEqual([2]);
  });

  it('orders soonest first', () => {
    expect(upcomingEvents([later, soon, today], now).map((e) => e.id)).toEqual([2, 3, 4]);
  });

  it('returns empty rather than throwing when everything has passed', () => {
    expect(upcomingEvents([past], now)).toEqual([]);
  });
});

describe('calendarMonths', () => {
  it('puts the 1st in the correct weekday column', () => {
    // 1 March 2026 was a Sunday, so no leading blanks. The old hardcoded grid
    // inserted six, pushing every event a full week out of place.
    const [march] = calendarMonths([event({ date: '2026-03-15' })]);
    expect(march.leadingBlanks).toBe(0);

    // 1 April 2026 was a Wednesday. The old code appended April with no offset.
    const [april] = calendarMonths([event({ date: '2026-04-12' })]);
    expect(april.leadingBlanks).toBe(3);
  });

  it('handles any month, not just March and April', () => {
    const months = calendarMonths([
      event({ id: 1, date: '2026-09-10' }),
      event({ id: 2, date: '2027-01-05' }),
    ]);
    expect(months.map((m) => m.label)).toEqual(['September 2026', 'January 2027']);
  });

  it('gives each month its real length', () => {
    const [feb] = calendarMonths([event({ date: '2028-02-01' })]);
    expect(feb.days).toHaveLength(29); // 2028 is a leap year
  });

  it('files each event on its own day', () => {
    const [march] = calendarMonths([
      event({ id: 1, date: '2026-03-15' }),
      event({ id: 2, date: '2026-03-15' }),
      event({ id: 3, date: '2026-03-20' }),
    ]);
    expect(march.days[14].events.map((e) => e.id)).toEqual([1, 2]);
    expect(march.days[19].events.map((e) => e.id)).toEqual([3]);
    expect(march.days[0].events).toEqual([]);
  });

  it('orders months chronologically across a year boundary', () => {
    const months = calendarMonths([
      event({ id: 1, date: '2027-02-01' }),
      event({ id: 2, date: '2026-12-01' }),
    ]);
    expect(months.map((m) => m.label)).toEqual(['December 2026', 'February 2027']);
  });
});

describe('event data', () => {
  it('uses ISO dates that parse to the date they spell', () => {
    for (const e of events) {
      expect(e.date, `event ${e.id}`).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(Number.isNaN(parseEventDate(e.date).getTime()), `event ${e.id}`).toBe(false);
    }
  });

  it('gives every event the fields the page renders', () => {
    for (const e of events) {
      expect(e.title, `event ${e.id}`).toBeTruthy();
      expect(e.organization, `event ${e.id}`).toBeTruthy();
      expect(e.location, `event ${e.id}`).toBeTruthy();
      expect(e.time, `event ${e.id}`).toBeTruthy();
    }
  });

  it('has unique ids', () => {
    expect(new Set(events.map((e) => e.id)).size).toBe(events.length);
  });
});

describe('formatEventDate', () => {
  it('renders a readable date', () => {
    expect(formatEventDate('2026-03-15')).toBe('March 15, 2026');
  });
});
