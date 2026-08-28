import { useState, useEffect, useCallback } from 'react';
import {
  CommunityEvent,
  EventSubmission,
  fetchPublicEventsREST,
  submitEventREST,
} from '../api/notionEvents';

interface UseNotionEventsResult {
  /** List of community events from Notion */
  events: CommunityEvent[];
  /** Loading state for initial fetch */
  loading: boolean;
  /** Error message if fetch failed */
  error: string | null;
  /** Refetch events from the API */
  refetch: () => Promise<void>;
  /** Submit a new event to Notion */
  submitEvent: (data: EventSubmission) => Promise<{ success: boolean; error?: string }>;
  /** Loading state for event submission */
  submitting: boolean;
}

/**
 * React hook for fetching and managing Notion community events
 *
 * @example
 * ```tsx
 * function CommunityPage() {
 *   const { events, loading, error, submitEvent, submitting } = useNotionEvents();
 *
 *   if (loading) return <LoadingSpinner />;
 *   if (error) return <ErrorMessage message={error} />;
 *
 *   return (
 *     <div>
 *       {events.map(event => (
 *         <EventCard key={event.id} event={event} />
 *       ))}
 *     </div>
 *   );
 * }
 * ```
 */
export function useNotionEvents(): UseNotionEventsResult {
  const [events, setEvents] = useState<CommunityEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const fetchedEvents = await fetchPublicEventsREST();
      setEvents(fetchedEvents);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch events';
      setError(message);
      console.error('Error fetching events:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const submitEvent = useCallback(async (data: EventSubmission): Promise<{ success: boolean; error?: string }> => {
    setSubmitting(true);

    try {
      const result = await submitEventREST(data);
      // Refetch events after successful submission (though new events won't show until approved)
      if (result.success) {
        // Optionally refetch to show any changes
        // await fetchEvents();
      }
      return { success: true };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to submit event';
      console.error('Error submitting event:', err);
      return { success: false, error: message };
    } finally {
      setSubmitting(false);
    }
  }, []);

  // Fetch events on mount
  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return {
    events,
    loading,
    error,
    refetch: fetchEvents,
    submitEvent,
    submitting,
  };
}

/**
 * Hook for filtering events
 *
 * @example
 * ```tsx
 * const { events } = useNotionEvents();
 * const filteredEvents = useFilteredEvents(events, 'deaf-led');
 * ```
 */
export function useFilteredEvents(
  events: CommunityEvent[],
  filter: 'all' | 'deaf-led' | 'virtual' | 'arts' | string
): CommunityEvent[] {
  return events.filter(event => {
    if (filter === 'all') return true;
    if (filter === 'deaf-led') return event.deafLed;
    if (filter === 'virtual') return event.virtual;
    if (filter === 'arts') {
      return (
        event.type.includes('Arts') ||
        event.type.includes('Museum') ||
        event.type.includes('Performance')
      );
    }
    // Filter by event type
    return event.type === filter;
  });
}

/**
 * Hook for sorting events by date
 */
export function useSortedEvents(
  events: CommunityEvent[],
  direction: 'asc' | 'desc' = 'asc'
): CommunityEvent[] {
  return [...events].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return direction === 'asc'
      ? dateA.getTime() - dateB.getTime()
      : dateB.getTime() - dateA.getTime();
  });
}

export default useNotionEvents;
