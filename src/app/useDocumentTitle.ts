import { useEffect } from 'react';
import { useMatches } from 'react-router';

const SITE = 'WITHdirection';
const TAGLINE = 'Deaf-Led Sign Language Interpreting and Consulting';

/** Routes declare their own title through `handle`. */
export interface RouteHandle {
  title?: string;
}

/**
 * Keep <title> in step with the active route.
 *
 * Every page previously shared the single title set in index.html. That leaves
 * screen reader users with no way to tell pages apart — the title is the first
 * thing announced on navigation — and gives every page the same search result
 * and the same entry in a list of open tabs.
 */
export function useDocumentTitle(): void {
  const matches = useMatches();

  useEffect(() => {
    const titled = [...matches]
      .reverse()
      .find((match) => (match.handle as RouteHandle | undefined)?.title);

    const pageTitle = (titled?.handle as RouteHandle | undefined)?.title;

    document.title = pageTitle ? `${pageTitle} | ${SITE}` : `${SITE} | ${TAGLINE}`;
  }, [matches]);
}
