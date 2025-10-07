/**
 * MCP Prompts implementation for Gong workflows
 * Provides reusable prompt templates to guide usage of tools and resources
 */

import { Prompt, GetPromptResult } from '@modelcontextprotocol/sdk/types.js';
import { logger } from './logger.js';
import { GongMcpError } from './errors.js';

// Prompt definitions
export const PROMPTS: Prompt[] = [
  {
    name: 'find-dv360-call',
    description: 'Search for DV360-related Gong calls within a date range',
    arguments: [
      {
        name: 'query',
        description: 'Search query (e.g., "DV360", "Display & Video 360")',
        required: false,
      },
      {
        name: 'fromDateTime',
        description: 'Start date in ISO format (e.g., "2025-10-01T00:00:00Z")',
        required: false,
      },
      {
        name: 'toDateTime',
        description: 'End date in ISO format (e.g., "2025-10-06T23:59:59Z")',
        required: false,
      },
    ],
  },
  {
    name: 'summarize-call',
    description: 'Generate a summary (brief or outline) for a specific Gong call',
    arguments: [
      {
        name: 'callId',
        description: 'Gong call ID to summarize',
        required: true,
      },
      {
        name: 'format',
        description: 'Output format: "brief" (recap + key points), "outline" (sections + action items), or "assets" (combined)',
        required: false,
      },
    ],
  },
  {
    name: 'compare-calls',
    description: 'Compare multiple Gong calls to identify patterns, differences, and insights',
    arguments: [
      {
        name: 'callIds',
        description: 'Array of Gong call IDs to compare (comma-separated or array)',
        required: true,
      },
    ],
  },
  {
    name: 'find-company-call',
    description: 'Find a Gong call by company/topic using smart search strategies and variation generation',
    arguments: [
      {
        name: 'company',
        description: 'Company or topic name to search for (e.g., "Disney", "Tripadvisor", "DV360")',
        required: true,
      },
      {
        name: 'timeframe',
        description: 'Natural language timeframe (e.g., "last week", "yesterday", "last 3 days") or ISO date range',
        required: false,
      },
    ],
  },
];

// Get prompt by name with argument substitution
export function getPrompt(name: string, args?: Record<string, string>): GetPromptResult {
  const prompt = PROMPTS.find(p => p.name === name);
  if (!prompt) {
    logger.error('Prompt not found', { name });
    throw new GongMcpError('PROMPT_NOT_FOUND', `Prompt not found: ${name}`);
  }

  let promptText: string;

  switch (name) {
    case 'find-dv360-call':
      promptText = buildFindDv360Prompt(args);
      break;

    case 'summarize-call':
      promptText = buildSummarizeCallPrompt(args);
      break;

    case 'compare-calls':
      promptText = buildCompareCallsPrompt(args);
      break;

    case 'find-company-call':
      promptText = buildFindCompanyCallPrompt(args);
      break;

    default:
      throw new GongMcpError('UNKNOWN_PROMPT', `Unknown prompt: ${name}`);
  }

  logger.info('Prompt retrieved', { name, argsProvided: !!args });

  return {
    description: prompt.description || '',
    messages: [
      {
        role: 'user',
        content: {
          type: 'text',
          text: promptText,
        },
      },
    ],
  };
}

// Prompt builders

function buildFindDv360Prompt(args?: Record<string, string>): string {
  const query = args?.query || 'DV360';
  const fromDateTime = args?.fromDateTime || getDefaultFromDate();
  const toDateTime = args?.toDateTime || new Date().toISOString();

  return `Please search for Gong calls related to "${query}" within the following date range:

**Date Range:**
- From: ${fromDateTime}
- To: ${toDateTime}

**Instructions:**
1. Use the \`search_calls\` or \`list_calls\` tool to find relevant calls
2. Filter results by title or participants containing "${query}"
3. Display a summary table with: Call ID, Title, Date, Participants
4. Offer to provide detailed briefs or outlines for specific calls

**Tip:** You can refine the search by adjusting the query or date range.`;
}

function buildSummarizeCallPrompt(args?: Record<string, string>): string {
  const callId = args?.callId;
  if (!callId) {
    throw new GongMcpError('MISSING_ARGUMENT', 'callId is required for summarize-call prompt');
  }

  const format = args?.format || 'brief';
  const toolName = format === 'assets' ? 'get_call_assets' : format === 'outline' ? 'get_call_outline' : 'get_call_brief';

  return `Please generate a ${format} for the Gong call with ID: ${callId}

**Instructions:**
1. Use the \`${toolName}\` tool to retrieve the call data
2. Present the ${format} in a clear, readable format
3. Highlight key insights, action items, and next steps
4. If the call has no transcript, note the data source (summary-only or derived)

**Alternative:** You can also access this call as a resource:
- Brief: \`gong://call/${callId}/brief.json\`
- Outline: \`gong://call/${callId}/outline.json\`
- Combined: \`gong://call/${callId}/assets.json\``;
}

function buildCompareCallsPrompt(args?: Record<string, string>): string {
  const callIdsArg = args?.callIds;
  if (!callIdsArg) {
    throw new GongMcpError('MISSING_ARGUMENT', 'callIds is required for compare-calls prompt');
  }

  // Parse callIds (could be comma-separated string or array)
  const callIds = callIdsArg.includes(',') ? callIdsArg.split(',').map(id => id.trim()) : [callIdsArg];

  return `Please compare the following Gong calls and identify patterns, differences, and key insights:

**Call IDs:**
${callIds.map((id, i) => `${i + 1}. ${id}`).join('\n')}

**Instructions:**
1. Use \`get_call_brief\` or \`get_call_assets\` to retrieve data for each call
2. Create a comparison table highlighting:
   - Common topics and themes
   - Key differences in discussion points
   - Action items and next steps
   - Participants and their roles
3. Identify trends or patterns across the calls
4. Suggest follow-up actions based on the comparison

**Tip:** You can also use resources like \`gong://call/{callId}/assets.json\` for richer context.`;
}

function buildFindCompanyCallPrompt(args?: Record<string, string>): string {
  const company = args?.company;
  if (!company) {
    throw new GongMcpError('MISSING_ARGUMENT', 'company is required for find-company-call prompt');
  }

  const timeframe = args?.timeframe || 'last week';

  return `Find a Gong call related to "${company}" from ${timeframe}.

**Smart Search Strategy:**

To maximize the chance of finding the right call, generate and try multiple search variations:

1. **Exact company name:** "${company}"
2. **Common abbreviations:**
   - If multi-word, try first letters (e.g., "Display & Video 360" → "DV360")
   - Try common acronyms or shortened versions
3. **Email domain:** "@${company.toLowerCase().replace(/\s+/g, '')}.com"
4. **Brand variants:**
   - For companies with multiple brands, try related names
   - Examples: "Disney" → "Disney+", "Hulu"; "Google" → "GV360", "DV360"

**Execution Steps:**

1. For EACH variation, call the \`find_call\` tool:
   \`\`\`
   find_call({
     query: "<variation>",
     fromDateTime: "<ISO start date>",  // Parse from timeframe
     toDateTime: "<ISO end date>"       // Parse from timeframe or now
   })
   \`\`\`

2. **Combine results:**
   - Deduplicate by \`callId\`
   - Rank by \`score\` (highest first)
   - Show top 5 matches

3. **Present results:**
   - If one clear winner (high score): Show that call with brief
   - If multiple similar scores: Ask user to choose:
     \`\`\`
     I found 3 ${company} calls from ${timeframe}:
     1. [Title] (Date, score: X, reasons: [title-exact, recency-3days])
     2. [Title] (Date, score: Y, reasons: [title-contains])
     3. [Title] (Date, score: Z, reasons: [participant-domain])

     Which one would you like to see?
     \`\`\`
   - If no matches: Suggest widening timeframe or trying different keywords

**Example for "${company}":**

Try these variations:
- Exact: "${company}"
- Abbreviated: ${generateAbbreviation(company)}
- Domain: "@${company.toLowerCase().replace(/\s+/g, '')}.com"
- Variants: ${generateBrandVariants(company)}

**Tip:** The \`find_call\` tool returns matches with \`score\` and \`matchReasons\` to help you pick the best result.`;
}

// Helper: generate simple abbreviation
function generateAbbreviation(text: string): string {
  const words = text.split(/\s+/);
  if (words.length > 1) {
    return words.map(w => w[0]?.toUpperCase() || '').join('');
  }
  return text;
}

// Helper: generate brand variants
function generateBrandVariants(company: string): string {
  const lower = company.toLowerCase();

  // Common company → brand mappings
  if (lower.includes('disney')) {
    return '"Disney+", "Hulu", "ESPN"';
  }
  if (lower.includes('google')) {
    return '"DV360", "GV360", "Display & Video 360"';
  }
  if (lower.includes('tripadvisor') || lower.includes('trip advisor')) {
    return '"Trip Advisor", "Tripadvisor"';
  }

  return `"${company}" (no common variants detected)`;
}

// Helper: default "from" date (7 days ago)
function getDefaultFromDate(): string {
  const date = new Date();
  date.setDate(date.getDate() - 7);
  return date.toISOString();
}
