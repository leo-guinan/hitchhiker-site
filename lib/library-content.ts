import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const contentDir = path.join(process.cwd(), "content", "library");

export type LibraryModule = {
  slug: string;
  title: string;
  excerpt: string;
  frameworks: { slug: string; title: string }[];
};

const MODULES: LibraryModule[] = [
  {
    slug: "epistemic-foundations",
    title: "Epistemic Foundations",
    excerpt: "How to think clearly when reality is contested.",
    frameworks: [
      { slug: "network-relativity", title: "Network Relativity" },
      { slug: "relativistic-replication", title: "Relativistic Replication" },
      { slug: "epistemic-preflight", title: "Epistemic Preflight" },
      { slug: "reality-contact", title: "Reality Contact" },
      { slug: "change-before-time", title: "Change-Before-Time" },
      { slug: "abc-systems", title: "ABC Systems" },
      { slug: "artifact-per-stage-auditing", title: "Artifact-per-Stage Auditing" },
    ],
  },
  {
    slug: "political-institutional",
    title: "Political & Institutional Dynamics",
    excerpt: "Why systems drift from reality and how to predict it.",
    frameworks: [
      { slug: "false-dichotomy-detection", title: "False Dichotomy Detection" },
      { slug: "mobility-symmetry", title: "Mobility Symmetry" },
      { slug: "world-model-update-rate", title: "World-Model Update Rate" },
      { slug: "validation-distance-problem", title: "Validation Distance Problem" },
      { slug: "algorithmic-capture", title: "Algorithmic Capture" },
    ],
  },
  {
    slug: "six-games",
    title: "The Six Games System",
    excerpt: "Know which game you're playing and which you should be.",
    frameworks: [
      { slug: "the-six-games", title: "The Six Games (G1–G6)" },
      { slug: "game-scorecard", title: "Game Scorecard" },
      { slug: "primary-game-identification", title: "Primary Game Identification" },
      { slug: "compression-ladders", title: "Compression Ladders" },
      { slug: "observable-games-vs-capture", title: "Observable Games vs Algorithmic Capture" },
    ],
  },
  {
    slug: "coordination-infrastructure",
    title: "Coordination Infrastructure",
    excerpt: "TrustOps, LoveOps, and systems that don't collapse.",
    frameworks: [
      { slug: "trustops", title: "TrustOps" },
      { slug: "loveops", title: "LoveOps" },
      { slug: "human-insurance", title: "Human Insurance" },
      { slug: "roles-seasons-clean-exits", title: "Roles, Seasons, Clean Exits" },
      { slug: "federated-waystations", title: "Federated Waystations" },
    ],
  },
  {
    slug: "memetic-economics",
    title: "Memetic Economics",
    excerpt: "Why ideas win, how legitimacy compounds, what recognition costs.",
    frameworks: [
      { slug: "memetic-economics", title: "Memetic Economics" },
      { slug: "product-is-marketing", title: "The Product Is The Marketing" },
      { slug: "framework-development-partnerships", title: "Framework Development Partnerships" },
      { slug: "legitimacy-markets", title: "Legitimacy Markets" },
      { slug: "recognition-based-pricing", title: "Recognition-Based Pricing" },
    ],
  },
];

export function getLibraryModules(): LibraryModule[] {
  return MODULES;
}

export function getLibraryModuleBySlug(slug: string): LibraryModule | null {
  return MODULES.find((m) => m.slug === slug) ?? null;
}

export type LibraryFrameworkFrontmatter = {
  title: string;
  excerpt?: string;
};

export function getLibraryFrameworkBySlug(
  moduleSlug: string,
  frameworkSlug: string
): {
  slug: string;
  moduleSlug: string;
  frontmatter: LibraryFrameworkFrontmatter;
  content: string;
  readingTime: string;
} | null {
  const fullPath = path.join(contentDir, moduleSlug, `${frameworkSlug}.mdx`);
  if (!fs.existsSync(fullPath)) return null;
  const raw = fs.readFileSync(fullPath, "utf-8");
  const { data, content } = matter(raw);
  const stats = readingTime(content);
  return {
    slug: frameworkSlug,
    moduleSlug,
    frontmatter: data as LibraryFrameworkFrontmatter,
    content,
    readingTime: stats.text,
  };
}
