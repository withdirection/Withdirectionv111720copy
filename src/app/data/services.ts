/**
 * The services offered, as presented in enquiry forms.
 *
 * These ids must match the service section ids on ServicesPage, which is what
 * the site actually advertises. Previously the contact form and the
 * consultation form each carried their own hand-written list, and neither
 * matched the other or the Services page — the consultation form offered
 * "Video Services" and "Government & International", which are not services
 * the site describes anywhere.
 *
 * tests/guardrails/services-in-sync.test.ts pins this to ServicesPage.
 */
export interface ServiceOption {
  /** Matches the corresponding section id on ServicesPage. */
  id: string;
  label: string;
}

export const SERVICE_OPTIONS: readonly ServiceOption[] = [
  { id: 'interpreting', label: 'Sign Language Interpreting Services' },
  { id: 'translation', label: 'Sign Language Translation Services' },
  { id: 'corporate', label: 'Corporate Consulting' },
  { id: 'expert', label: 'Expert Services' },
  { id: 'training', label: 'Tailored Trainings & Workshops' },
  { id: 'events', label: 'Special Events Coordination' },
  { id: 'other', label: 'Something else' },
];
