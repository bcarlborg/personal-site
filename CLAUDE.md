# AGENTS.md

## What this repo is

A custom static site generator for [beau-carlborg.com](https://www.beau-carlborg.com). Content lives in `src/`, build scripts transform it into plain HTML/CSS in `dist/`, and Cloudflare serves `dist/` on every push to main.

## Repo structure

```
src/
  blog/[DATE--slug]/        # Blog posts (markdown + metadata)
  reading/[DATE--slug]/     # Reading notes (markdown + metadata)
build-scripts/
  build_entire_website      # Bash: runs all three build steps
  build_all_posts           # Bash: iterates src/blog and src/reading, calls build_post.js
  build_post.js             # Node: markdown -> HTML for a single post
  build_index.js            # Node: generates dist/index.html from all metadata
  build_rss.js              # Node: generates dist/rss.xml from blog metadata
  helpers/fileHelpers.js    # SHA256 file hashing for CSS cache-busting
dist/                       # Generated output (committed, deployed by Cloudflare)
  index.html
  blog/*.html
  reading/*.html
  assets/{blog,reading}/[slug]/   # Images copied from src during build
  global-styles.css
  rss.xml
```

## How to write a blog post

1. Create a directory in `src/blog/` named `YYYY-MM-DD--slug` (the name is just for organization).
2. Add two files:

**`content.md`** -- The post body in markdown. Do NOT include an h1 (the title comes from metadata). Images go in the same directory and are referenced with relative paths like `![alt](image.png)`.

**`metadata.json`** -- Example:
```json
{
  "title": "Post Title",
  "post-filename": "post-slug.html",
  "assets-file-directory-name": "post-slug",
  "description": "Beau Carlborg's Website",
  "date-originally-authored": "March 10th, 2026",
  "post-order": 13,
  "date-last-updated": "2026/03/10",
  "author": "Beau Carlborg",
  "type": "writing"
}
```

Key fields:
- `post-filename`: the output HTML filename in `dist/blog/`
- `assets-file-directory-name`: directory name for images in `dist/assets/blog/`
- `post-order`: controls sort order on the homepage (higher = listed first). Check existing posts to pick the next number.
- `type`: `"writing"` or `"project"` (affects homepage grouping)

## How to write a reading page

Same structure but in `src/reading/`. The metadata has additional fields:

```json
{
  "title": "Book or Paper Title",
  "post-filename": "slug.html",
  "assets-file-directory-name": "slug",
  "description": "Beau Carlborg's Website",
  "reading-title": "Book or Paper Title",
  "reading-author": "Author Name",
  "reading-published-date": "1988",
  "reading-url": "https://link-to-source",
  "date-read-by-me": "September 21, 2025",
  "date-last-updated": "2025/09/21",
  "post-order": 3,
  "author": "Beau Carlborg",
  "type": "Reading"
}
```

## Building

```bash
npm install                          # Install deps (marked, node-html-parser, etc.)
./build-scripts/build_entire_website # Full rebuild: posts + index + RSS
npm run serve-local                  # Serve dist/ at http://0.0.0.0:8080
```

You can also run individual steps:
- `./build-scripts/build_all_posts` -- rebuild all posts and reading pages
- `node build-scripts/build_index.js` -- rebuild just the homepage
- `node build-scripts/build_rss.js` -- rebuild just the RSS feed

After making changes to content in `src/`, always run the full build and verify the output before committing. The `dist/` directory is committed to the repo -- Cloudflare deploys from it on push.

## Build system details

- **No templating engine.** HTML skeletons are template literals in the JS build scripts.
- **DOM manipulation via node-html-parser**, not string concatenation.
- **Auto-generated table of contents** from h2/h3 headings (via marked-gfm-heading-id).
- **Image handling**: build_post.js finds images referenced in markdown, copies them to `dist/assets/`, and rewrites paths to absolute URLs.
- **CSS cache-busting**: global-styles.css gets a `?v=[sha256hash]` query param.
- **No client-side JS.** The output is purely static HTML + CSS.

## Content conventions

- Posts use h2 and h3 for sections (never h1 -- that's the title).
- The writing style is technical and explanatory, aimed at people learning CS/engineering topics.
- Images are PNGs placed alongside content.md in the post directory.
