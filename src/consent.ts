/**
 * Cookie consent gate.
 *
 * Nothing that tracks a visitor may load before they make a choice. This module
 * owns that decision and is the only place tracking scripts are injected.
 *
 * It was previously inline in index.html, which made it untestable — and it had
 * a hole: the Tally embed sat outside the gate and loaded unconditionally, for
 * declining visitors too.
 *
 * Loading order is safe as a module: this script is what injects Google
 * Analytics and MailerLite, so nothing can race ahead of it.
 */

export const CONSENT_KEY = 'wd_cookie_consent';

const GA_MEASUREMENT_ID = 'G-E8DW0N1C65';
const MAILERLITE_ACCOUNT = '1917077';
const MAILERLITE_POPUP = '9zYRLy';
const TALLY_SRC = 'https://tally.so/widgets/embed.js';

export type ConsentDecision = 'accepted' | 'declined' | null;

/**
 * localStorage throws rather than returning null in some privacy modes, so
 * every access is guarded. A visitor who blocks storage is treated as not
 * having decided, which means nothing loads for them.
 */
export function readDecision(): ConsentDecision {
  try {
    const stored = localStorage.getItem(CONSENT_KEY);
    return stored === 'accepted' || stored === 'declined' ? stored : null;
  } catch {
    return null;
  }
}

function persist(decision: Exclude<ConsentDecision, null>): void {
  try {
    localStorage.setItem(CONSENT_KEY, decision);
  } catch {
    /* Storage unavailable: the choice applies to this page view only. */
  }
}

function appendScript(id: string, src: string): void {
  if (document.getElementById(id)) return;
  const script = document.createElement('script');
  script.id = id;
  script.async = true;
  script.src = src;
  document.head.appendChild(script);
}

function loadAnalytics(): void {
  if (document.getElementById('ga-script')) return;
  appendScript('ga-script', `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`);

  const w = window as unknown as {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  };
  w.dataLayer = w.dataLayer || [];
  w.gtag = function gtag(...args: unknown[]) {
    w.dataLayer!.push(args);
  };
  w.gtag('js', new Date());
  w.gtag('config', GA_MEASUREMENT_ID, { anonymize_ip: true });
}

function loadMarketing(showPopup: boolean): void {
  const w = window as unknown as { ml?: ((...a: unknown[]) => void) & { q?: unknown[] } };

  if (!document.getElementById('mailerlite-script')) {
    appendScript('mailerlite-script', 'https://assets.mailerlite.com/js/universal.js');
    const queue: unknown[] = [];
    const ml = ((...args: unknown[]) => {
      queue.push(args);
    }) as NonNullable<typeof w.ml>;
    ml.q = queue;
    w.ml = ml;
    w.ml('account', MAILERLITE_ACCOUNT);
    if (showPopup) {
      window.setTimeout(() => w.ml?.('show', MAILERLITE_POPUP, true), 2500);
    }
  }

  // Tally powers embedded forms, which are marketing-adjacent third-party
  // content. It previously loaded regardless of the visitor's choice.
  appendScript('tally-script', TALLY_SRC);
}

function hideBanner(): void {
  document.getElementById('wd-cookie-banner')?.setAttribute('hidden', '');
}

export function accept(): void {
  persist('accepted');
  loadAnalytics();
  loadMarketing(true);
  hideBanner();
}

export function decline(): void {
  persist('declined');
  hideBanner();
}

/**
 * Apply a decision already on record, and reveal the banner when there is none.
 * Returns the decision so callers and tests can assert on it.
 */
export function init(): ConsentDecision {
  const decision = readDecision();

  if (decision === 'accepted') {
    loadAnalytics();
    loadMarketing(false);
    hideBanner();
  } else if (decision === 'declined') {
    hideBanner();
  } else {
    document.getElementById('wd-cookie-banner')?.removeAttribute('hidden');
  }

  return decision;
}

/**
 * Withdraw a decision already given, and ask again.
 *
 * GDPR expects withdrawing consent to be no harder than giving it. Previously
 * the banner never returned once dismissed, so there was no way back.
 */
export function withdraw(): void {
  try {
    localStorage.removeItem(CONSENT_KEY);
  } catch {
    /* Nothing was stored to begin with. */
  }
  document.getElementById('wd-cookie-banner')?.removeAttribute('hidden');
}
