#!/usr/bin/env node
/**
 * Generates PDF files from deep dive MDX content.
 * Run: npm run build:pdfs
 * Requires: npm install md-to-pdf
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";
import matter from "gray-matter";

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const contentDir = path.join(__dirname, "..", "content", "deep-dives");
const outputDir = path.join(__dirname, "..", "public", "deep-dives");

async function main() {
  let mdToPdf;
  try {
    const mod = require("md-to-pdf");
    mdToPdf = mod.mdToPdf ?? mod.default ?? mod;
  } catch (err) {
    console.error(
      "md-to-pdf is required. Run: npm install --save-dev md-to-pdf"
    );
    process.exit(1);
  }

  if (!fs.existsSync(contentDir)) {
    console.log("No deep-dives content found. Skipping.");
    return;
  }

  fs.mkdirSync(outputDir, { recursive: true });

  const files = fs.readdirSync(contentDir).filter((f) => f.endsWith(".mdx"));
  if (files.length === 0) {
    console.log("No deep dive files found. Skipping.");
    return;
  }

  for (const file of files) {
    const slug = file.replace(/\.mdx$/, "");
    const inputPath = path.join(contentDir, file);
    const outputPath = path.join(outputDir, `${slug}.pdf`);

    const raw = fs.readFileSync(inputPath, "utf-8");
    const { data, content } = matter(raw);
    const fullContent = `# ${data.title}\n\n${content}`;

    try {
      await mdToPdf(
        { content: fullContent },
        {
          dest: outputPath,
          pdf_options: {
            format: "A4",
            margin: { top: "20mm", right: "20mm", bottom: "20mm", left: "20mm" },
          },
        }
      );
      console.log(`Generated: ${outputPath}`);
    } catch (err) {
      console.error(`Failed to generate ${slug}.pdf:`, err.message);
    }
  }
}

main();
