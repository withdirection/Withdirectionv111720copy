/**
 * Community calendar data and the logic that shapes it.
 *
 * Extracted from CommunityPage so the filtering and date handling can be tested
 * directly rather than through the DOM.
 *
 * Dates are ISO (YYYY-MM-DD) rather than display strings. The previous version
 * stored "March 15, 2026" and parsed it with `split(' ')`, matching against the
 * literal month names 'March' and 'April' — which meant any event outside those
 * two months silently vanished from the calendar view.
 *
 * Placeholder content: these entries came from the original design mock. Until
 * this is fed from a CMS, expect the list to be empty in production — the page
 * renders an honest empty state rather than showing expired events as upcoming.
 */

export type EventType =
  | 'Museum Access'
  | 'Arts & Culture'
  | 'Workshop'
  | 'Community Event'
  | 'Performance';

export interface CommunityEvent {
  id: number | string;
  title: string;
  organization: string;
  /** ISO date, YYYY-MM-DD. */
  date: string;
  time: string;
  location: string;
  type: string;
  description: string;
  accessible: boolean;
  deafLed: boolean;
  virtual: boolean;
}

export const events: CommunityEvent[] = [
  {
    id: 1,
    title: 'ASL Tour: Contemporary Art Exhibition',
    organization: 'Whitney Museum of American Art',
    date: '2026-03-15',
    time: '2:00 PM - 3:30 PM',
    location: 'Whitney Museum, Manhattan',
    type: 'Museum Access',
    description: 'Join us for an ASL-interpreted tour of the latest contemporary art exhibition.',
    accessible: true,
    deafLed: false,
    virtual: false,
  },
  {
    id: 2,
    title: 'Deaf Artists Showcase',
    organization: 'Brooklyn Museum',
    date: '2026-03-22',
    time: '6:00 PM - 8:00 PM',
    location: 'Brooklyn Museum, Brooklyn',
    type: 'Arts & Culture',
    description: 'A Deaf-led celebration of visual arts featuring local Deaf artists.',
    accessible: true,
    deafLed: true,
    virtual: false,
  },
  {
    id: 3,
    title: 'Drawing Workshop with ASL Interpretation',
    organization: 'The Drawing Center',
    date: '2026-03-28',
    time: '1:00 PM - 4:00 PM',
    location: 'The Drawing Center, SoHo',
    type: 'Workshop',
    description: 'Hands-on drawing workshop with professional ASL interpretation provided.',
    accessible: true,
    deafLed: false,
    virtual: false,
  },
  {
    id: 4,
    title: 'Community Sign Language Social',
    organization: 'Brooklyn Public Library',
    date: '2026-04-05',
    time: '7:00 PM - 9:00 PM',
    location: 'Brooklyn Public Library, Central Branch',
    type: 'Community Event',
    description: 'Open social event for ASL learners and the Deaf community to connect.',
    accessible: true,
    deafLed: true,
    virtual: false,
  },
  {
    id: 5,
    title: 'Accessible Theatre Performance: Spring Awakening',
    organization: 'Signature Theatre',
    date: '2026-04-12',
    time: '7:30 PM',
    location: 'Signature Theatre, Manhattan',
    type: 'Performance',
    description: 'ASL-interpreted performance with Deaf and hearing actors.',
    accessible: true,
    deafLed: false,
    virtual: false,
  },
  {
    id: 6,
    title: 'Virtual ASL Coffee Chat',
    organization: 'WITHdirection',
    date: '2026-03-25',
    time: '10:00 AM - 11:00 AM',
    location: 'Virtual (Zoom)',
    type: 'Community Event',
    description:
      'Join us online for a casual conversation in ASL. Perfect for practicing and connecting with others.',
    accessible: true,
    deafLed: true,
    virtual: true,
  },
  {
    id: 7,
    title: 'Online Workshop: Deaf Culture 101',
    organization: 'WITHdirection',
    date: '2026-04-02',
    time: '6:00 PM - 7:30 PM',
    location: 'Virtual (Zoom)',
    type: 'Workshop',
    description:
      'Learn about Deaf culture, etiquette, and community values in this interactive online session.',
    accessible: true,
    deafLed: true,
    virtual: true,
  },
];

export const FILTERS = [
  { key: 'all', label: 'All Events' },
  { key: 'deaf-led', label: 'Deaf-Led' },
  { key: 'virtual', label: 'Virtual' },
  { key: 'arts', label: 'Arts & Culture' },
  { key: 'Workshop', label: 'Workshops' },
  { key: 'Community Event', label: 'Community' },
] as const;

export type FilterKey = (typeof FILTERS)[number]['key'];

/** Types the 'arts' filter covers. Previously a substring match, which meant a
 *  new type containing the word "Museum" would silently join this bucket. */
const ARTS_TYPES: readonly string[] = ['Arts & Culture', 'Museum Access', 'Performance'];

export function filterEvents(list: readonly CommunityEvent[], filter: string): CommunityEvent[] {
  switch (filter) {
    case 'all':
      return [...list];
    case 'deaf-led':
      return list.filter((event) => event.deafLed);
    case 'virtual':
      return list.filter((event) => event.virtual);
    case 'arts':
      return list.filter((event) => ARTS_TYPES.includes(event.type));
    default:
      return list.filter((event) => event.type === filter);
  }
}

/** Parse an ISO date as local midnight. `new Date('2026-03-15')` would be UTC,
 *  which shifts the day backwards for anyone west of Greenwich. */
export function parseEventDate(iso: string): Date {
  const [year, month, day] = iso.split('-').map(Number);
  return new Date(year, month - 1, day);
}

/** Events on or after `today`, soonest first. */
export function upcomingEvents(
  list: readonly CommunityEvent[],
  today: Date = new Date(),
): CommunityEvent[] {
  const midnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  return list
    .filter((event) => parseEventDate(event.date) >= midnight)
    .sort((a, b) => a.date.localeCompare(b.date));
}

/** "2026-03-15" -> "March 15, 2026", for display only. */
export function formatEventDate(iso: string): string {
  return parseEventDate(iso).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export interface CalendarMonth {
  year: number;
  /** 0-indexed, as JavaScript Date uses. */
  month: number;
  label: string;
  /** Blank cells before the 1st, so it lands in the right weekday column. */
  leadingBlanks: number;
  days: { day: number; events: CommunityEvent[] }[];
}

/**
 * Group events into month grids, computing the weekday offset for each month.
 *
 * The previous implementation hardcoded a March–April 2026 grid with six
 * leading blanks, commented "starting on Saturday". 1 March 2026 was a Sunday,
 * so every event rendered six columns adrift, and April was appended with no
 * offset at all.
 */
export function calendarMonths(list: readonly CommunityEvent[]): CalendarMonth[] {
  const byMonth = new Map<string, CommunityEvent[]>();

  for (const event of list) {
    const date = parseEventDate(event.date);
    const key = `${date.getFullYear()}-${date.getMonth()}`;
    const bucket = byMonth.get(key);
    if (bucket) bucket.push(event);
    else byMonth.set(key, [event]);
  }

  return [...byMonth.entries()]
    .map(([key, monthEvents]) => {
      const [year, month] = key.split('-').map(Number);
      const daysInMonth = new Date(year, month + 1, 0).getDate();

      return {
        year,
        month,
        label: new Date(year, month, 1).toLocaleDateString('en-US', {
          month: 'long',
          year: 'numeric',
        }),
        leadingBlanks: new Date(year, month, 1).getDay(),
        days: Array.from({ length: daysInMonth }, (_, i) => {
          const day = i + 1;
          return {
            day,
            events: monthEvents.filter((e) => parseEventDate(e.date).getDate() === day),
          };
        }),
      };
    })
    .sort((a, b) => a.year - b.year || a.month - b.month);
}
