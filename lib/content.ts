import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const contentDir = path.join(process.cwd(), "content");

export type GuideFrontmatter = {
  title: string;
  excerpt: string;
  date: string;
  hook?: string;
  topic?: string;
};

export type EssayFrontmatter = {
  title: string;
  excerpt: string;
  date: string;
};

export type DeepDiveFrontmatter = {
  title: string;
  excerpt: string;
  date: string;
};

export function getGuideSlugs(): string[] {
  const dir = path.join(contentDir, "guides");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getGuideBySlug(slug: string): {
  slug: string;
  frontmatter: GuideFrontmatter;
  content: string;
  readingTime: string;
} | null {
  const fullPath = path.join(contentDir, "guides", `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) return null;
  const raw = fs.readFileSync(fullPath, "utf-8");
  const { data, content } = matter(raw);
  const stats = readingTime(content);
  return {
    slug,
    frontmatter: data as GuideFrontmatter,
    content,
    readingTime: stats.text,
  };
}

export function getAllGuides(): Array<{
  slug: string;
  frontmatter: GuideFrontmatter;
  readingTime: string;
}> {
  const slugs = getGuideSlugs();
  const list = slugs
    .map((slug) => {
      const guide = getGuideBySlug(slug);
      if (!guide) return null;
      return {
        slug: guide.slug,
        frontmatter: guide.frontmatter,
        readingTime: guide.readingTime,
      };
    })
    .filter(Boolean) as Array<{
    slug: string;
    frontmatter: GuideFrontmatter;
    readingTime: string;
  }>;
  list.sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime()
  );
  return list;
}

export function getEssaySlugs(): string[] {
  const dir = path.join(contentDir, "essays");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getEssayBySlug(slug: string): {
  slug: string;
  frontmatter: EssayFrontmatter;
  content: string;
  readingTime: string;
} | null {
  const fullPath = path.join(contentDir, "essays", `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) return null;
  const raw = fs.readFileSync(fullPath, "utf-8");
  const { data, content } = matter(raw);
  const stats = readingTime(content);
  return {
    slug,
    frontmatter: data as EssayFrontmatter,
    content,
    readingTime: stats.text,
  };
}

export function getAllEssays(): Array<{
  slug: string;
  frontmatter: EssayFrontmatter;
  readingTime: string;
}> {
  const slugs = getEssaySlugs();
  const list = slugs
    .map((slug) => {
      const essay = getEssayBySlug(slug);
      if (!essay) return null;
      return {
        slug: essay.slug,
        frontmatter: essay.frontmatter,
        readingTime: essay.readingTime,
      };
    })
    .filter(Boolean) as Array<{
    slug: string;
    frontmatter: EssayFrontmatter;
    readingTime: string;
  }>;
  list.sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime()
  );
  return list;
}

export function getDeepDiveSlugs(): string[] {
  const dir = path.join(contentDir, "deep-dives");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getDeepDiveBySlug(slug: string): {
  slug: string;
  frontmatter: DeepDiveFrontmatter;
  content: string;
  readingTime: string;
} | null {
  const fullPath = path.join(contentDir, "deep-dives", `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) return null;
  const raw = fs.readFileSync(fullPath, "utf-8");
  const { data, content } = matter(raw);
  const stats = readingTime(content);
  return {
    slug,
    frontmatter: data as DeepDiveFrontmatter,
    content,
    readingTime: stats.text,
  };
}

export function getAllDeepDives(): Array<{
  slug: string;
  frontmatter: DeepDiveFrontmatter;
  readingTime: string;
}> {
  const slugs = getDeepDiveSlugs();
  const list = slugs
    .map((slug) => {
      const deepDive = getDeepDiveBySlug(slug);
      if (!deepDive) return null;
      return {
        slug: deepDive.slug,
        frontmatter: deepDive.frontmatter,
        readingTime: deepDive.readingTime,
      };
    })
    .filter(Boolean) as Array<{
    slug: string;
    frontmatter: DeepDiveFrontmatter;
    readingTime: string;
  }>;
  list.sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime()
  );
  return list;
}
