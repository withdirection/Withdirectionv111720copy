import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * Vercel Serverless Function for Community Events
 *
 * This endpoint interfaces with the Notion API to:
 * - GET: Fetch public, approved events from the Community Events Calendar
 * - POST: Submit a new event (with status "Submitted" for moderation)
 *
 * Environment Variables:
 * - NOTION_API_KEY: Notion integration token with access to the database
 */

const NOTION_API_BASE = 'https://api.notion.com/v1';
const NOTION_VERSION = '2022-06-28';
const DATABASE_ID = '23f0f36a-53bf-4d16-9a4f-50688f41dd6a';

interface NotionRichText {
  plain_text: string;
}

interface NotionEventProperties {
  'Event Title': { title: NotionRichText[] };
  'Host Organization': { rich_text: NotionRichText[] };
  'Event Date': { date: { start: string; end?: string } | null };
  'Start Time': { rich_text: NotionRichText[] };
  'End Time': { rich_text: NotionRichText[] };
  'Location': { rich_text: NotionRichText[] };
  'Event Type': { select: { name: string } | null };
  'Event Description': { rich_text: NotionRichText[] };
  'Access Type': { multi_select: { name: string }[] };
  'Format': { select: { name: string } | null };
  'Public Visibility': { checkbox: boolean };
  'Submission Status': { select: { name: string } | null };
}

interface NotionPage {
  id: string;
  properties: NotionEventProperties;
}

interface NotionQueryResponse {
  results: NotionPage[];
  has_more: boolean;
  next_cursor: string | null;
}

interface CommunityEvent {
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

interface EventSubmission {
  title: string;
  organization: string;
  date: string;
  startTime: string;
  endTime?: string;
  location: string;
  type: string;
  description: string;
  accessTypes?: string[];
  format?: 'In-Person' | 'Virtual' | 'Hybrid';
  contactEmail?: string;
  contactName?: string;
}

// ============================================================================
// Helper Functions
// ============================================================================

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

function formatTimeRange(startTime: string, endTime?: string): string {
  if (startTime.includes('AM') || startTime.includes('PM')) {
    if (endTime && (endTime.includes('AM') || endTime.includes('PM'))) {
      return `${startTime} - ${endTime}`;
    }
    return startTime;
  }

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

function transformNotionToEvent(page: NotionPage): CommunityEvent {
  const props = page.properties;

  const getPlainText = (field: { rich_text?: NotionRichText[]; title?: NotionRichText[] } | undefined): string => {
    if (!field) return '';
    const items = 'title' in field ? field.title : field.rich_text;
    return items?.map(t => t.plain_text).join('') || '';
  };

  const title = props['Event Title']?.title?.map(t => t.plain_text).join('') || 'Untitled Event';
  const organization = getPlainText(props['Host Organization'] as { rich_text: NotionRichText[] }) || 'Unknown Organization';

  const eventDate = props['Event Date']?.date?.start;
  const date = eventDate ? formatDate(eventDate) : 'Date TBD';

  const startTime = getPlainText(props['Start Time'] as { rich_text: NotionRichText[] });
  const endTime = getPlainText(props['End Time'] as { rich_text: NotionRichText[] });
  const time = startTime ? formatTimeRange(startTime, endTime) : 'Time TBD';

  const location = getPlainText(props['Location'] as { rich_text: NotionRichText[] }) || 'Location TBD';
  const type = props['Event Type']?.select?.name || 'Event';
  const description = getPlainText(props['Event Description'] as { rich_text: NotionRichText[] }) || '';

  const accessTypes = props['Access Type']?.multi_select || [];
  const deafLed = accessTypes.some(at => at.name.toLowerCase().includes('deaf-led'));

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
    accessible: true,
    deafLed,
    virtual,
  };
}

// ============================================================================
// Notion API Functions
// ============================================================================

async function queryNotionDatabase(apiKey: string): Promise<NotionPage[]> {
  const allResults: NotionPage[] = [];
  let hasMore = true;
  let startCursor: string | undefined;

  while (hasMore) {
    const body: Record<string, unknown> = {
      filter: {
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
      },
      sorts: [
        {
          property: 'Event Date',
          direction: 'ascending',
        },
      ],
      page_size: 100,
    };

    if (startCursor) {
      body.start_cursor = startCursor;
    }

    const response = await fetch(`${NOTION_API_BASE}/databases/${DATABASE_ID}/query`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'Notion-Version': NOTION_VERSION,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(`Notion API error: ${response.status} - ${JSON.stringify(error)}`);
    }

    const data: NotionQueryResponse = await response.json();
    allResults.push(...data.results);
    hasMore = data.has_more;
    startCursor = data.next_cursor || undefined;
  }

  return allResults;
}

async function createNotionPage(apiKey: string, eventData: EventSubmission): Promise<{ id: string }> {
  const properties: Record<string, unknown> = {
    'Event Title': {
      title: [
        {
          text: {
            content: eventData.title,
          },
        },
      ],
    },
    'Host Organization': {
      rich_text: [
        {
          text: {
            content: eventData.organization,
          },
        },
      ],
    },
    'Event Date': {
      date: {
        start: eventData.date,
      },
    },
    'Start Time': {
      rich_text: [
        {
          text: {
            content: eventData.startTime,
          },
        },
      ],
    },
    'Location': {
      rich_text: [
        {
          text: {
            content: eventData.location,
          },
        },
      ],
    },
    'Event Type': {
      select: {
        name: eventData.type,
      },
    },
    'Event Description': {
      rich_text: [
        {
          text: {
            content: eventData.description,
          },
        },
      ],
    },
    'Public Visibility': {
      checkbox: false,
    },
    'Submission Status': {
      select: {
        name: 'Submitted',
      },
    },
  };

  if (eventData.endTime) {
    properties['End Time'] = {
      rich_text: [
        {
          text: {
            content: eventData.endTime,
          },
        },
      ],
    };
  }

  if (eventData.format) {
    properties['Format'] = {
      select: {
        name: eventData.format,
      },
    };
  }

  if (eventData.accessTypes && eventData.accessTypes.length > 0) {
    properties['Access Type'] = {
      multi_select: eventData.accessTypes.map(name => ({ name })),
    };
  }

  if (eventData.contactEmail) {
    properties['Contact Email'] = {
      email: eventData.contactEmail,
    };
  }

  if (eventData.contactName) {
    properties['Contact Name'] = {
      rich_text: [
        {
          text: {
            content: eventData.contactName,
          },
        },
      ],
    };
  }

  const response = await fetch(`${NOTION_API_BASE}/pages`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'Notion-Version': NOTION_VERSION,
    },
    body: JSON.stringify({
      parent: {
        database_id: DATABASE_ID,
      },
      properties,
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(`Notion API error: ${response.status} - ${JSON.stringify(error)}`);
  }

  const data = await response.json();
  return { id: data.id };
}

// ============================================================================
// Request Validation
// ============================================================================

function validateEventSubmission(data: unknown): EventSubmission | { error: string } {
  if (!data || typeof data !== 'object') {
    return { error: 'Request body must be an object' };
  }

  const body = data as Record<string, unknown>;

  const requiredFields = ['title', 'organization', 'date', 'startTime', 'location', 'type', 'description'];
  for (const field of requiredFields) {
    if (!body[field] || typeof body[field] !== 'string') {
      return { error: `Missing or invalid required field: ${field}` };
    }
  }

  // Validate date format (YYYY-MM-DD)
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(body.date as string)) {
    return { error: 'Date must be in YYYY-MM-DD format' };
  }

  // Validate format if provided
  if (body.format && !['In-Person', 'Virtual', 'Hybrid'].includes(body.format as string)) {
    return { error: 'Format must be one of: In-Person, Virtual, Hybrid' };
  }

  return body as unknown as EventSubmission;
}

// ============================================================================
// Main Handler
// ============================================================================

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const apiKey = process.env.NOTION_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Server configuration error: NOTION_API_KEY not set' });
  }

  try {
    if (req.method === 'GET') {
      // Fetch public, approved events
      const pages = await queryNotionDatabase(apiKey);
      const events = pages.map(transformNotionToEvent);

      return res.status(200).json({
        events,
        count: events.length,
        fetchedAt: new Date().toISOString(),
      });
    }

    if (req.method === 'POST') {
      // Submit a new event
      const validationResult = validateEventSubmission(req.body);

      if ('error' in validationResult) {
        return res.status(400).json({ error: validationResult.error });
      }

      const result = await createNotionPage(apiKey, validationResult);

      return res.status(201).json({
        success: true,
        pageId: result.id,
        message: 'Event submitted successfully. It will appear on the calendar after review.',
      });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('API error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return res.status(500).json({ error: message });
  }
}
