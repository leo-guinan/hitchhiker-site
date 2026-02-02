import fs from "fs";
import path from "path";

const contentDir = path.join(process.cwd(), "content");

export type CompanionPrompt = {
  category: string;
  prompt: string;
  whyItWorks?: string;
};

export function getPromptsForDeepDive(
  slug: string
): CompanionPrompt[] | null {
  const filePath = path.join(contentDir, "deep-dives", `${slug}-prompts.json`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(raw) as CompanionPrompt[];
  if (!Array.isArray(data)) return null;
  return data.filter(
    (item) =>
      typeof item.category === "string" && typeof item.prompt === "string"
  );
}
