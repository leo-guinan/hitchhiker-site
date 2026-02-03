import { XMLParser } from "fast-xml-parser";

const RSS_URL =
  process.env.NEXT_PUBLIC_PODCAST_RSS_URL ||
  "https://anchor.fm/s/10ea0bc5c/podcast/rss";

export type Episode = {
  number: number;
  title: string;
  duration: string;
  date: string;
  type: "solo" | "guest";
  embedUrl: string;
  description: string;
  showNotes: string;
  transcriptUrl: string;
  url?: string;
};

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
});

function parseDuration(raw: string | number | undefined): string {
  if (raw == null) return "";
  if (typeof raw === "number") {
    const m = Math.floor(raw / 60);
    return m < 60 ? `~${m} min` : `~${Math.floor(m / 60)} hr ${m % 60} min`;
  }
  const s = String(raw).trim();
  if (!s) return "";
  // "00:02:14" or "2:14" or "134" (seconds)
  const parts = s.split(":");
  if (parts.length >= 3) {
    const h = parseInt(parts[0], 10) || 0;
    const m = parseInt(parts[1], 10) || 0;
    if (h > 0) return `~${h} hr ${m} min`;
    return m > 0 ? `~${m} min` : "~1 min";
  }
  if (parts.length === 2) {
    const m = parseInt(parts[0], 10) || 0;
    return m > 0 ? `~${m} min` : "~1 min";
  }
  const sec = parseInt(s, 10);
  if (!isNaN(sec)) {
    const m = Math.floor(sec / 60);
    return m < 60 ? `~${m} min` : `~${Math.floor(m / 60)} hr ${m % 60} min`;
  }
  return s;
}

function formatPubDate(raw: string | undefined): string {
  if (!raw) return "";
  try {
    const d = new Date(raw);
    return d.toISOString().slice(0, 10); // YYYY-MM-DD
  } catch {
    return "";
  }
}

function stripHtml(html: string): string {
  if (!html) return "";
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function getText(obj: unknown, ...keys: string[]): string {
  if (obj == null || typeof obj !== "object") return "";
  const o = obj as Record<string, unknown>;
  for (const k of keys) {
    const v = o[k];
    if (typeof v === "string") return v.trim();
  }
  return "";
}

function getNum(obj: unknown, key: string): number {
  if (obj == null || typeof obj !== "object") return 0;
  const v = (obj as Record<string, unknown>)[key];
  if (typeof v === "number" && !isNaN(v)) return v;
  if (typeof v === "string") {
    const n = parseInt(v, 10);
    return isNaN(n) ? 0 : n;
  }
  return 0;
}

function itemToEpisode(item: unknown, index: number): Episode {
  const o = (item || {}) as Record<string, unknown>;
  const title = getText(o, "title");
  const link = getText(o, "link");
  const desc =
    getText(o, "content:encoded") || getText(o, "description") || "";
  const summary = getText(o, "itunes:summary") || desc;
  const pubDate = getText(o, "pubDate");
  const durationRaw =
    o["itunes:duration"] ?? (o.itunes as Record<string, unknown>)?.duration;
  const episodeNum = getNum(o, "itunes:episode") || index + 1;

  const description = stripHtml(summary || desc).slice(0, 500);
  const isGuest = /guest|interview|conversation/i.test(title);

  return {
    number: episodeNum,
    title: title || `Episode ${episodeNum}`,
    duration: parseDuration(
      durationRaw != null && (typeof durationRaw === "string" || typeof durationRaw === "number")
        ? durationRaw
        : undefined
    ),
    date: formatPubDate(pubDate),
    type: isGuest ? "guest" : "solo",
    embedUrl: "",
    description,
    showNotes: "",
    transcriptUrl: "",
    url: link || undefined,
  };
}

async function fetchEpisodesFromRss(): Promise<Episode[]> {
  const res = await fetch(RSS_URL, {
    next: { revalidate: 3600 }, // Revalidate every hour
  });
  if (!res.ok) {
    console.warn(`Podcast RSS fetch failed: ${res.status} ${res.statusText}`);
    return [];
  }
  const xml = await res.text();
  const parsed = parser.parse(xml);
  const channel = parsed?.rss?.channel;
  if (!channel) return [];

  let items = channel.item;
  if (!items) return [];
  if (!Array.isArray(items)) items = [items];

  const episodes: Episode[] = items.map((item: unknown, i: number) =>
    itemToEpisode(item, i)
  );

  return episodes.sort((a, b) => {
    const da = a.date ? new Date(a.date).getTime() : 0;
    const db = b.date ? new Date(b.date).getTime() : 0;
    return db - da;
  });
}

export async function getEpisodes(): Promise<Episode[]> {
  return fetchEpisodesFromRss();
}

export async function getEpisodeByNumber(
  number: number
): Promise<Episode | null> {
  const episodes = await getEpisodes();
  return episodes.find((e) => e.number === number) ?? null;
}
