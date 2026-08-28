/**
 * Entry point for the consent gate.
 *
 * Kept separate from consent.ts so that module stays free of side effects and
 * can be imported by tests without injecting scripts into the page.
 */
import { accept, decline, init, withdraw } from './consent';

declare global {
  interface Window {
    __wdConsent?: {
      accept: () => void;
      decline: () => void;
      withdraw: () => void;
    };
  }
}

// The banner's buttons are plain HTML in index.html, outside the React tree.
window.__wdConsent = { accept, decline, withdraw };

init();
