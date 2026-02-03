/**
 * Site config: social links, podcast subscribe URLs, and base URL.
 * Values come from env; links with no URL can be hidden in UI.
 */

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://hitchhikersguidetothefuture.com";

export const social = {
  substack: process.env.NEXT_PUBLIC_SUBSTACK_URL || "",
  twitter: process.env.NEXT_PUBLIC_TWITTER_URL || "",
  linkedIn: process.env.NEXT_PUBLIC_LINKEDIN_URL || "",
  github: process.env.NEXT_PUBLIC_GITHUB_URL || "",
  speaking: process.env.NEXT_PUBLIC_SPEAKING_URL || "",
} as const;

export const podcast = {
  applePodcasts: process.env.NEXT_PUBLIC_APPLE_PODCASTS_URL || "",
  spotify: process.env.NEXT_PUBLIC_SPOTIFY_URL || "",
  rss: process.env.NEXT_PUBLIC_PODCAST_RSS_URL || "",
} as const;

export const calCom = {
  url: process.env.NEXT_PUBLIC_CAL_COM_URL || "https://cal.com/ideanexus/hitchhiker-intro",
} as const;
