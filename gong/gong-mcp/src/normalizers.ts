export type SourceType = 'summary-only' | 'transcript+summary' | 'derived';

export interface GongTranscriptSentence {
  start?: number;
  end?: number;
  text?: string;
}

export interface GongTranscriptMonologue {
  speakerId?: string;
  topic?: string;
  sentences?: GongTranscriptSentence[];
}

export interface InteractionsSummarySection {
  title?: string;
  bullets?: string[];
  actionItems?: string[];
  nextSteps?: string[];
  [key: string]: unknown;
}

export interface InteractionsSummaryPayload {
  callId?: string;
  summary?: string;
  sections?: InteractionsSummarySection[];
  keyPoints?: string[];
  nextSteps?: string[];
  [key: string]: unknown;
}

export interface GongTrackerOccurrence {
  startTime?: number;
  endTime?: number;
  speakerId?: string;
  text?: string;
}

export interface GongTrackerEntry {
  name?: string;
  occurrences?: GongTrackerOccurrence[];
  phrases?: { phrase?: string; occurrences?: GongTrackerOccurrence[] }[];
  count?: number;
  type?: string;
}

export interface GongTopicEntry {
  name?: string;
}

export interface GongCallContent {
  brief?: string;
  keyPoints?: { text?: string }[];
  outline?: {
    section?: string;
    startTime?: number;
    duration?: number;
    items?: { text?: string; startTime?: number }[];
  }[];
  trackers?: GongTrackerEntry[];
  topics?: GongTopicEntry[];
  highlights?: {
    title?: string;
    items?: { text?: string; startTimes?: number[] }[];
  }[];
}

type HighlightSection = NonNullable<GongCallContent['highlights']>[number];
type HighlightItem = NonNullable<HighlightSection['items']>[number];
type ContentKeyPoint = NonNullable<GongCallContent['keyPoints']>[number];
type OutlineSectionRaw = NonNullable<GongCallContent['outline']>[number];
type OutlineItemRaw = NonNullable<OutlineSectionRaw['items']>[number];

export interface GongParticipant {
  id?: string;
  name?: string;
  title?: string;
  speakerId?: string;
  userId?: string;
  affiliation?: string;
  emailAddress?: string;
}

export interface GongCallMetaData {
  id?: string;
  title?: string;
  url?: string;
  duration?: number;
  started?: string;
  scheduled?: string;
}

export interface GongCallData {
  metaData?: GongCallMetaData;
  content?: GongCallContent;
  parties?: GongParticipant[];
}

export interface CallContext {
  callId: string;
  callData?: GongCallData;
  monologues: GongTranscriptMonologue[];
  summary?: InteractionsSummaryPayload | null;
  summarySections?: InteractionsSummarySection[];
  trackers?: GongTrackerEntry[];
  topics?: GongTopicEntry[];
}

export interface CallBriefLink {
  kind: 'call' | 'page';
  url: string;
}

export interface CallBriefTrackerMatch {
  start?: number;
  end?: number;
  speakerId?: string;
  text?: string;
}

export interface CallBriefTracker {
  name: string;
  matches: CallBriefTrackerMatch[];
  type?: string;
  count?: number;
}

export interface CallBriefEntity {
  type: string;
  value: string;
}

export interface CallBrief {
  callId: string;
  title?: string;
  recap?: string;
  keyPoints: string[];
  nextSteps: string[];
  entities: CallBriefEntity[];
  trackers: CallBriefTracker[];
  links: CallBriefLink[];
  source: SourceType;
  hasTranscript: boolean;
}

export interface CallOutlineSection {
  heading: string;
  start?: number;
  end?: number;
  bullets: string[];
}

export interface CallOutlineActionItem {
  text: string;
  assignee?: string;
  due?: string;
  start?: number;
}

export interface CallOutlineParticipant {
  id?: string;
  name?: string;
  role?: string;
  speakerId?: string;
  affiliation?: string;
  email?: string;
}

export interface CallOutline {
  callId: string;
  title?: string;
  participants: CallOutlineParticipant[];
  sections: CallOutlineSection[];
  actionItems: CallOutlineActionItem[];
  topics: string[];
  source: SourceType;
  hasTranscript: boolean;
  derived: boolean;
}

const ACTION_REGEX = /\b(next\s*steps?|follow(?:\s*-|\s+)up|action(?:\s+item)?s?|todo|to-do|we\s+will|let'?s|schedule|send|deliver|share|review|assign|owner)\b/i;
const MAX_BULLET_LENGTH = 200;
const BUCKET_SECONDS = 300;

function coerceString(value: unknown): string | undefined {
  if (typeof value === 'string') {
    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : undefined;
  }
  return undefined;
}

function coerceNumber(value: unknown): number | undefined {
  const num = typeof value === 'number' ? value : Number(value);
  return Number.isFinite(num) ? num : undefined;
}

function ensureArray<T>(value: T | T[] | null | undefined): T[] {
  if (Array.isArray(value)) {
    return value;
  }
  if (value === undefined || value === null) {
    return [];
  }
  return [value];
}

function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  }
  return `${text.slice(0, maxLength - 1)}…`;
}

function uniqueStrings(values: string[]): string[] {
  const seen = new Set<string>();
  const result: string[] = [];
  for (const value of values) {
    const normalized = value.trim();
    if (!normalized) continue;
    if (seen.has(normalized.toLowerCase())) continue;
    seen.add(normalized.toLowerCase());
    result.push(normalized);
  }
  return result;
}

function flattenSentences(monologues: GongTranscriptMonologue[]): GongTranscriptSentence[] {
  const sentences: GongTranscriptSentence[] = [];
  for (const mono of monologues) {
    const monoSentences = ensureArray<GongTranscriptSentence>(mono?.sentences);
    for (const sentence of monoSentences) {
      const text = coerceString(sentence?.text);
      if (!text) continue;
      sentences.push({
        start: coerceNumber(sentence?.start),
        end: coerceNumber(sentence?.end),
        text,
      });
    }
  }
  sentences.sort((a, b) => (coerceNumber(a.start) ?? 0) - (coerceNumber(b.start) ?? 0));
  return sentences;
}

function buildRecapFromSummary(summary?: InteractionsSummaryPayload | null): string | undefined {
  return coerceString(summary?.summary);
}

function buildRecapFromContent(content?: GongCallContent): string | undefined {
  const brief = coerceString(content?.brief);
  if (brief) return brief;
  const highlights = ensureArray<HighlightSection>(content?.highlights ?? []);
  for (const section of highlights) {
    const items = ensureArray<HighlightItem>(section?.items ?? []);
    const text = coerceString(items[0]?.text);
    if (text) return text;
  }
  const keyPoints = ensureArray<ContentKeyPoint>(content?.keyPoints ?? []);
  for (const point of keyPoints) {
    const text = coerceString(point?.text);
    if (text) return text;
  }
  return undefined;
}

function buildRecapFromTranscript(sentences: GongTranscriptSentence[]): string | undefined {
  if (sentences.length === 0) return undefined;
  const selected = sentences.slice(0, 3).map(s => s.text?.trim()).filter(Boolean) as string[];
  if (selected.length === 0) return undefined;
  return selected.join(' ');
}

function extractKeyPoints(summary?: InteractionsSummaryPayload | null, content?: GongCallContent, sentences?: GongTranscriptSentence[]): string[] {
  const collected: string[] = [];
  if (summary) {
    const direct = ensureArray(summary.keyPoints).map(coerceString).filter(Boolean) as string[];
    collected.push(...direct);
    const sections = ensureArray(summary.sections);
    for (const section of sections) {
      const bullets = ensureArray(section?.bullets).map(coerceString).filter(Boolean) as string[];
      collected.push(...bullets);
      const actionItems = ensureArray(section?.actionItems).map(coerceString).filter(Boolean) as string[];
      collected.push(...actionItems);
    }
  }
  const keyPoints = ensureArray<ContentKeyPoint>(content?.keyPoints ?? []);
  for (const point of keyPoints) {
    const text = coerceString(point?.text);
    if (text) collected.push(text);
  }
  const highlights = ensureArray<HighlightSection>(content?.highlights ?? []);
  for (const section of highlights) {
    const items = ensureArray<HighlightItem>(section?.items ?? []);
    for (const item of items) {
      const text = coerceString(item?.text);
      if (text) collected.push(text);
    }
  }
  if (collected.length === 0 && sentences && sentences.length) {
    const fallback = sentences.slice(0, 5).map(s => s.text ?? '').filter(Boolean);
    collected.push(...fallback);
  }
  return uniqueStrings(collected).slice(0, 10);
}

function extractNextSteps(summary?: InteractionsSummaryPayload | null, content?: GongCallContent, sentences?: GongTranscriptSentence[]): string[] {
  const collected: string[] = [];
  if (summary) {
    const direct = ensureArray(summary.nextSteps).map(coerceString).filter(Boolean) as string[];
    collected.push(...direct);
    const sections = ensureArray(summary.sections);
    for (const section of sections) {
      const title = coerceString(section?.title) ?? '';
      if (/next|action/i.test(title)) {
        const bullets = ensureArray(section?.bullets).map(coerceString).filter(Boolean) as string[];
        collected.push(...bullets);
        const actions = ensureArray(section?.actionItems).map(coerceString).filter(Boolean) as string[];
        collected.push(...actions);
      }
    }
  }
  const highlights = ensureArray<HighlightSection>(content?.highlights ?? []);
  for (const section of highlights) {
    const title = coerceString(section?.title) ?? '';
    if (/next|action/i.test(title)) {
      const items = ensureArray<HighlightItem>(section?.items ?? []);
      for (const item of items) {
        const text = coerceString(item?.text);
        if (text) collected.push(text);
      }
    }
  }
  if (collected.length === 0 && sentences) {
    for (const sentence of sentences) {
      const text = coerceString(sentence.text);
      if (!text) continue;
      if (ACTION_REGEX.test(text)) {
        collected.push(text);
      }
    }
  }
  return uniqueStrings(collected).slice(0, 10);
}

function normalizeTrackerEntry(entry?: GongTrackerEntry): CallBriefTracker | undefined {
  const name = coerceString(entry?.name);
  if (!name) return undefined;
  const matches: CallBriefTrackerMatch[] = [];
  const occurrences = ensureArray(entry?.occurrences);
  for (const occurrence of occurrences) {
    matches.push({
      start: coerceNumber(occurrence?.startTime),
      end: coerceNumber(occurrence?.endTime),
      speakerId: coerceString(occurrence?.speakerId),
      text: coerceString(occurrence?.text),
    });
  }
  const phrases = ensureArray(entry?.phrases);
  for (const phrase of phrases) {
    const label = coerceString(phrase?.phrase);
    const phraseOccurrences = ensureArray(phrase?.occurrences);
    for (const occurrence of phraseOccurrences) {
      matches.push({
        start: coerceNumber(occurrence?.startTime),
        end: coerceNumber(occurrence?.endTime),
        speakerId: coerceString(occurrence?.speakerId),
        text: label ?? undefined,
      });
    }
  }
  return {
    name,
    matches,
    type: coerceString(entry?.type),
    count: typeof entry?.count === 'number' ? entry.count : undefined,
  };
}

function buildEntities(topics?: GongTopicEntry[]): CallBriefEntity[] {
  const result: CallBriefEntity[] = [];
  const topicList = ensureArray(topics);
  for (const topic of topicList) {
    const name = coerceString(topic?.name);
    if (!name) continue;
    result.push({ type: 'topic', value: name });
  }
  return result;
}

function buildLinks(meta?: GongCallMetaData): CallBriefLink[] {
  const links: CallBriefLink[] = [];
  const callUrl = coerceString(meta?.url);
  if (callUrl) {
    links.push({ kind: 'call', url: callUrl });
  }
  return links;
}

function bucketLabel(bucketIndex: number): string {
  const startMin = bucketIndex * (BUCKET_SECONDS / 60);
  const endMin = startMin + BUCKET_SECONDS / 60;
  if (startMin === 0) {
    return `Intro (${startMin.toFixed(0)}-${endMin.toFixed(0)}m)`;
  }
  return `Minutes ${startMin.toFixed(0)}-${endMin.toFixed(0)}`;
}

function buildTranscriptSections(sentences: GongTranscriptSentence[]): CallOutlineSection[] {
  if (sentences.length === 0) return [];
  const buckets = new Map<number, GongTranscriptSentence[]>();
  for (const sentence of sentences) {
    const start = coerceNumber(sentence.start) ?? 0;
    const bucket = Math.floor(start / BUCKET_SECONDS);
    const arr = buckets.get(bucket) ?? [];
    arr.push(sentence);
    buckets.set(bucket, arr);
  }
  const sections: CallOutlineSection[] = [];
  const sortedBuckets = Array.from(buckets.entries()).sort((a, b) => a[0] - b[0]);
  for (const [bucket, chunk] of sortedBuckets) {
    const heading = bucketLabel(bucket);
    const bullets: string[] = [];
    for (const sentence of chunk.slice(0, 3)) {
      const text = sentence.text ?? '';
      if (!text) continue;
      bullets.push(truncate(text, MAX_BULLET_LENGTH));
    }
    if (bullets.length === 0) continue;
    const start = chunk[0]?.start;
    const end = chunk[chunk.length - 1]?.end;
    sections.push({ heading, bullets, start, end });
  }
  return sections;
}

function buildMetadataSection(meta?: GongCallMetaData, trackers?: GongTrackerEntry[]): CallOutlineSection {
  const bullets: string[] = [];
  const title = coerceString(meta?.title);
  if (title) bullets.push(`Title: ${title}`);
  const started = coerceString(meta?.started);
  if (started) bullets.push(`Started: ${started}`);
  const duration = coerceNumber(meta?.duration);
  if (duration) {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    bullets.push(`Duration: ${minutes}m ${seconds}s`);
  }
  const trackerList = Array.isArray(trackers) ? trackers : [];
  if (trackerList.length) {
    const names = trackerList
      .map(entry => coerceString(entry?.name))
      .filter(Boolean)
      .slice(0, 5) as string[];
    if (names.length) {
      bullets.push(`Tracker hits: ${names.join(', ')}`);
    }
  }
  if (bullets.length === 0) {
    bullets.push('No transcript or summary data available.');
  }
  return { heading: 'Call Overview', bullets };
}

function extractHighlightsActionItems(content?: GongCallContent): CallOutlineActionItem[] {
  const result: CallOutlineActionItem[] = [];
  const highlights = ensureArray<HighlightSection>(content?.highlights ?? []);
  for (const section of highlights) {
    const title = coerceString(section?.title) ?? '';
    if (!/action|next/i.test(title)) continue;
    const items = ensureArray<HighlightItem>(section?.items ?? []);
    for (const item of items) {
      const text = coerceString(item?.text);
      if (!text) continue;
      const start = coerceNumber(ensureArray(item?.startTimes)[0]);
      result.push({ text, start });
    }
  }
  return result;
}

function extractSummarySections(summary?: InteractionsSummaryPayload | null): CallOutlineSection[] {
  const sections: CallOutlineSection[] = [];
  const summarySections = ensureArray(summary?.sections);
  for (const section of summarySections) {
    const heading = coerceString(section?.title) ?? 'Section';
    const bullets = uniqueStrings(
      ensureArray(section?.bullets)
        .map(coerceString)
        .filter(Boolean) as string[]
    );
    if (bullets.length === 0) continue;
    sections.push({ heading, bullets });
  }
  return sections;
}

function extractOutlineFromContent(content?: GongCallContent): CallOutlineSection[] {
  const sections: CallOutlineSection[] = [];
  const outline = ensureArray<OutlineSectionRaw>(content?.outline ?? []);
  for (const section of outline) {
    const heading = coerceString(section?.section) ?? 'Section';
    const items = ensureArray<OutlineItemRaw>(section?.items ?? []);
    const bullets: string[] = [];
    for (const item of items) {
      const text = coerceString(item?.text);
      if (!text) continue;
      bullets.push(truncate(text, MAX_BULLET_LENGTH));
    }
    if (bullets.length === 0) continue;
    const start = coerceNumber(section?.startTime);
    const duration = coerceNumber(section?.duration);
    const end = start !== undefined && duration !== undefined ? start + duration : undefined;
    sections.push({
      heading,
      bullets,
      start,
      end,
    });
  }
  return sections;
}

function buildParticipants(parties?: GongParticipant[]): CallOutlineParticipant[] {
  const result: CallOutlineParticipant[] = [];
  const participants = ensureArray(parties);
  for (const participant of participants) {
    const name = coerceString(participant?.name);
    const role = coerceString(participant?.title);
    const entry: CallOutlineParticipant = {
      id: coerceString(participant?.id),
      name: name ?? undefined,
      role: role ?? undefined,
      speakerId: coerceString(participant?.speakerId),
      affiliation: coerceString(participant?.affiliation),
      email: coerceString(participant?.emailAddress),
    };
    if (entry.name || entry.role || entry.id) {
      result.push(entry);
    }
  }
  return result;
}

function collectTopics(content?: GongCallContent, explicit?: GongTopicEntry[]): string[] {
  const combined: string[] = [];
  const topicsFromContent = ensureArray(content?.topics);
  for (const topic of topicsFromContent) {
    const name = coerceString(topic?.name);
    if (name) combined.push(name);
  }
  const explicitTopics = ensureArray(explicit);
  for (const topic of explicitTopics) {
    const name = coerceString(topic?.name);
    if (name) combined.push(name);
  }
  return uniqueStrings(combined);
}

function determineSource(hasSummary: boolean, hasTranscript: boolean): SourceType {
  if (hasSummary && hasTranscript) return 'transcript+summary';
  if (hasSummary) return 'summary-only';
  return 'derived';
}

export function buildBrief(context: CallContext): CallBrief {
  const meta = context.callData?.metaData;
  const content = context.callData?.content;
  const sentences = flattenSentences(context.monologues);
  const recap = buildRecapFromSummary(context.summary)
    ?? buildRecapFromContent(content)
    ?? buildRecapFromTranscript(sentences);

  const keyPoints = extractKeyPoints(context.summary, content, sentences);
  const nextSteps = extractNextSteps(context.summary, content, sentences);

  const trackerSource = context.trackers ?? content?.trackers ?? [];
  const trackers = (trackerSource as GongTrackerEntry[])
    .map(entry => normalizeTrackerEntry(entry))
    .filter(Boolean) as CallBriefTracker[];

  const entities = buildEntities(context.topics?.length ? context.topics : content?.topics);
  const links = buildLinks(meta);

  const hasSummary = Boolean(context.summary || buildRecapFromContent(content));
  const hasTranscript = sentences.length > 0;
  const source = determineSource(hasSummary, hasTranscript);

  return {
    callId: context.callId,
    title: coerceString(meta?.title),
    recap: recap ?? undefined,
    keyPoints,
    nextSteps,
    entities,
    trackers,
    links,
    source,
    hasTranscript,
  };
}

export function buildOutline(context: CallContext): CallOutline {
  const meta = context.callData?.metaData;
  const content = context.callData?.content;

  const summarySections = extractSummarySections(context.summary);
  const outlineSections = extractOutlineFromContent(content);
  const combinedSections: CallOutlineSection[] = [];

  if (outlineSections.length) {
    combinedSections.push(...outlineSections);
  } else if (summarySections.length) {
    combinedSections.push(...summarySections);
  }

  const sentences = flattenSentences(context.monologues);
  if (combinedSections.length === 0) {
    const transcriptSections = buildTranscriptSections(sentences);
    combinedSections.push(...transcriptSections);
  }

  const trackerSource = context.trackers ?? content?.trackers;
  const trackers = Array.isArray(trackerSource) ? trackerSource : undefined;
  if (combinedSections.length === 0) {
    combinedSections.push(buildMetadataSection(meta, trackers));
  }

  const actionItems = extractHighlightsActionItems(content);
  const participants = buildParticipants(context.callData?.parties);
  const topics = collectTopics(content, context.topics);

  const hasSummary = Boolean(outlineSections.length || summarySections.length);
  const hasTranscript = sentences.length > 0;
  const source = determineSource(hasSummary, hasTranscript);
  const derived = !outlineSections.length;

  return {
    callId: context.callId,
    title: coerceString(meta?.title),
    participants,
    sections: combinedSections,
    actionItems,
    topics,
    source,
    hasTranscript,
    derived,
  };
}
