/**
 * Notion Events API
 *
 * This module provides functions to interact with the Community Events Calendar
 * Notion database. It supports two modes:
 *
 * 1. MCP Mode: Uses Notion MCP tools directly (for Claude-powered environments)
 * 2. REST Mode: Uses the serverless API endpoint (for production frontend)
 */

// Notion database ID for Community Events Calendar
export const EVENTS_DATABASE_ID = '23f0f36a-53bf-4d16-9a4f-50688f41dd6a';

// Event types matching the Notion database
export interface NotionEventProperties {
  'Event Title': { title: Array<{ plain_text: string }> };
  'Host Organization': { rich_text: Array<{ plain_text: string }> };
  'Event Date': { date: { start: string; end?: string } | null };
  'Start Time': { rich_text: Array<{ plain_text: string }> };
  'End Time': { rich_text: Array<{ plain_text: string }> };
  'Location': { rich_text: Array<{ plain_text: string }> };
  'Event Type': { select: { name: string } | null };
  'Event Description': { rich_text: Array<{ plain_text: string }> };
  'Access Type': { multi_select: Array<{ name: string }> };
  'Format': { select: { name: string } | null };
  'Public Visibility': { checkbox: boolean };
  'Submission Status': { select: { name: string } | null };
}

export interface NotionPage {
  id: string;
  properties: NotionEventProperties;
}

// Website event format (matches CommunityPage.tsx)
export interface CommunityEvent {
  id: string;
  title: string;
  organization: string;
  date: string;
  time: string;
  location: string;
  type: string;
  description: string;
  accessible: boolean;
  deafLed: boolean;
  virtual: boolean;
}

// Event submission data
export interface EventSubmission {
  title: string;
  organization: string;
  date: string; // ISO date string (YYYY-MM-DD)
  startTime: string; // e.g., "2:00 PM"
  endTime?: string; // e.g., "3:30 PM"
  location: string;
  type: string;
  description: string;
  accessTypes?: string[]; // e.g., ["ASL Interpretation", "Deaf-Led"]
  format?: 'In-Person' | 'Virtual' | 'Hybrid';
  contactEmail?: string;
  contactName?: string;
}

/**
 * Format a date string to human-readable format
 * Input: "2026-03-15" or ISO date
 * Output: "March 15, 2026"
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

/**
 * Format time range from start and end times
 * Input: "14:00" and "15:30" or "2:00 PM" and "3:30 PM"
 * Output: "2:00 PM - 3:30 PM"
 */
export function formatTimeRange(startTime: string, endTime?: string): string {
  // If already in readable format, use as-is
  if (startTime.includes('AM') || startTime.includes('PM')) {
    if (endTime && (endTime.includes('AM') || endTime.includes('PM'))) {
      return `${startTime} - ${endTime}`;
    }
    return startTime;
  }

  // Convert 24-hour format to 12-hour format
  const formatTime = (time: string): string => {
    const [hours, minutes] = time.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
  };

  const formattedStart = formatTime(startTime);
  if (endTime) {
    const formattedEnd = formatTime(endTime);
    return `${formattedStart} - ${formattedEnd}`;
  }
  return formattedStart;
}

/**
 * Transform Notion page data to website event format
 */
export function transformNotionToEvent(page: NotionPage): CommunityEvent {
  const props = page.properties;

  // Extract text from rich_text or title fields
  const getPlainText = (
    field: { rich_text?: Array<{ plain_text: string }>; title?: Array<{ plain_text: string }> } | undefined
  ): string => {
    if (!field) return '';
    const items = 'title' in field ? field.title : field.rich_text;
    return items?.map(t => t.plain_text).join('') || '';
  };

  // Get title
  const title = props['Event Title']?.title?.map(t => t.plain_text).join('') || 'Untitled Event';

  // Get organization
  const organization = getPlainText(props['Host Organization'] as { rich_text: Array<{ plain_text: string }> }) || 'Unknown Organization';

  // Get date
  const eventDate = props['Event Date']?.date?.start;
  const date = eventDate ? formatDate(eventDate) : 'Date TBD';

  // Get time
  const startTime = getPlainText(props['Start Time'] as { rich_text: Array<{ plain_text: string }> });
  const endTime = getPlainText(props['End Time'] as { rich_text: Array<{ plain_text: string }> });
  const time = startTime ? formatTimeRange(startTime, endTime) : 'Time TBD';

  // Get location
  const location = getPlainText(props['Location'] as { rich_text: Array<{ plain_text: string }> }) || 'Location TBD';

  // Get event type
  const type = props['Event Type']?.select?.name || 'Event';

  // Get description
  const description = getPlainText(props['Event Description'] as { rich_text: Array<{ plain_text: string }> }) || '';

  // Check access types for Deaf-Led
  const accessTypes = props['Access Type']?.multi_select || [];
  const deafLed = accessTypes.some(at => at.name.toLowerCase().includes('deaf-led'));

  // Check format for virtual
  const format = props['Format']?.select?.name || '';
  const virtual = format.toLowerCase() === 'virtual';

  return {
    id: page.id,
    title,
    organization,
    date,
    time,
    location,
    type,
    description,
    accessible: true, // All events in this database are accessible
    deafLed,
    virtual,
  };
}

/**
 * Build the Notion filter for public, approved events
 */
export function buildPublicEventsFilter() {
  return {
    and: [
      {
        property: 'Public Visibility',
        checkbox: {
          equals: true,
        },
      },
      {
        or: [
          {
            property: 'Submission Status',
            select: {
              equals: 'Approved',
            },
          },
          {
            property: 'Submission Status',
            select: {
              equals: 'Scheduled',
            },
          },
          {
            property: 'Submission Status',
            select: {
              equals: 'Confirmed',
            },
          },
        ],
      },
    ],
  };
}

/**
 * Build Notion page properties for event submission
 */
export function buildEventSubmissionProperties(data: EventSubmission) {
  const properties: Record<string, unknown> = {
    'Event Title': {
      title: [
        {
          text: {
            content: data.title,
          },
        },
      ],
    },
    'Host Organization': {
      rich_text: [
        {
          text: {
            content: data.organization,
          },
        },
      ],
    },
    'Event Date': {
      date: {
        start: data.date,
      },
    },
    'Start Time': {
      rich_text: [
        {
          text: {
            content: data.startTime,
          },
        },
      ],
    },
    'Location': {
      rich_text: [
        {
          text: {
            content: data.location,
          },
        },
      ],
    },
    'Event Type': {
      select: {
        name: data.type,
      },
    },
    'Event Description': {
      rich_text: [
        {
          text: {
            content: data.description,
          },
        },
      ],
    },
    'Public Visibility': {
      checkbox: false, // New submissions are not public until approved
    },
    'Submission Status': {
      select: {
        name: 'Submitted',
      },
    },
  };

  // Add optional fields
  if (data.endTime) {
    properties['End Time'] = {
      rich_text: [
        {
          text: {
            content: data.endTime,
          },
        },
      ],
    };
  }

  if (data.format) {
    properties['Format'] = {
      select: {
        name: data.format,
      },
    };
  }

  if (data.accessTypes && data.accessTypes.length > 0) {
    properties['Access Type'] = {
      multi_select: data.accessTypes.map(name => ({ name })),
    };
  }

  if (data.contactEmail) {
    properties['Contact Email'] = {
      email: data.contactEmail,
    };
  }

  if (data.contactName) {
    properties['Contact Name'] = {
      rich_text: [
        {
          text: {
            content: data.contactName,
          },
        },
      ],
    };
  }

  return properties;
}

// ============================================================================
// REST API Mode (for production frontend)
// ============================================================================

const API_BASE_URL = '/api/events';

/**
 * Fetch public events from the serverless API
 */
export async function fetchPublicEventsREST(): Promise<CommunityEvent[]> {
  const response = await fetch(API_BASE_URL);

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(error.error || `Failed to fetch events: ${response.status}`);
  }

  const data = await response.json();
  return data.events;
}

/**
 * Submit a new event via the serverless API
 */
export async function submitEventREST(eventData: EventSubmission): Promise<{ success: boolean; pageId?: string; error?: string }> {
  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(eventData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || `Failed to submit event: ${response.status}`);
  }

  return data;
}

// ============================================================================
// MCP Mode (for Claude-powered environments)
// These functions are stubs that document the MCP tool calls needed.
// In practice, Claude would call these tools directly.
// ============================================================================

/**
 * Fetch public events using Notion MCP tools
 *
 * MCP Tool: mcp__Notion__notion-fetch
 * Parameters:
 *   - resource: notion://database/23f0f36a-53bf-4d16-9a4f-50688f41dd6a/query
 *   - filter: buildPublicEventsFilter()
 */
export async function fetchPublicEventsMCP(): Promise<CommunityEvent[]> {
  // This would be called via MCP in a Claude environment
  // The actual implementation uses the mcp__Notion__notion-fetch tool
  throw new Error(
    'fetchPublicEventsMCP must be called via Claude MCP tools. ' +
    'Use fetchPublicEventsREST for browser environments.'
  );
}

/**
 * Submit a new event using Notion MCP tools
 *
 * MCP Tool: mcp__Notion__notion-create-pages
 * Parameters:
 *   - parent_database_id: "23f0f36a-53bf-4d16-9a4f-50688f41dd6a"
 *   - properties: buildEventSubmissionProperties(eventData)
 */
export async function submitEventMCP(eventData: EventSubmission): Promise<{ success: boolean; pageId: string }> {
  // This would be called via MCP in a Claude environment
  // The actual implementation uses the mcp__Notion__notion-create-pages tool
  throw new Error(
    'submitEventMCP must be called via Claude MCP tools. ' +
    'Use submitEventREST for browser environments.'
  );
}
