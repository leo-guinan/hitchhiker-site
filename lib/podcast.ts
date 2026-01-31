import fs from "fs";
import path from "path";

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
};

const episodesPath = path.join(process.cwd(), "content", "podcast", "episodes.json");

export function getEpisodes(): Episode[] {
  if (!fs.existsSync(episodesPath)) return [];
  const raw = fs.readFileSync(episodesPath, "utf-8");
  const data = JSON.parse(raw) as Episode[];
  return data.sort((a, b) => b.number - a.number);
}

export function getEpisodeByNumber(number: number): Episode | null {
  const episodes = getEpisodes();
  return episodes.find((e) => e.number === number) ?? null;
}
