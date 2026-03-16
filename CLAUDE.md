# CLAUDE.md

## What this repo is

A personal website at [beau-carlborg.com](https://www.beau-carlborg.com), built with [Hugo](https://gohugo.io/) and deployed via Cloudflare Pages.

## Repo structure

```
content/
  blog/[slug]/index.md        # All posts: writing, projects, and reading notes (Hugo page bundles)
layouts/
  _default/baseof.html        # Base template (head, body wrapper)
  _default/list.html           # Section list page
  _default/rss.xml             # RSS feed template
  index.html                   # Homepage template
  blog/single.html             # Single post template (handles all post types)
  partials/head.html            # Shared <head> partial (CSS, favicons, meta)
assets/css/global-styles.css   # Site-wide styles (processed by Hugo Pipes)
static/assets/                 # Favicons
hugo.toml                      # Hugo configuration
```

## How to write a blog post

1. Create a directory in `content/blog/` named after the post slug (e.g. `my-new-post`).
2. Add an `index.md` file with front matter and content:

```markdown
---
title: "Post Title"
slug: "my-new-post"
date: 2026-03-10
postType: "writing"
dateDisplay: "March 10, 2026"
---

Post body in markdown. Do NOT include an h1 (the title comes from front matter).
Images go in the same directory and are referenced with relative paths like `![alt](image.png)`.
```

Key fields:
- `slug`: determines the URL (`/blog/my-new-post/`)
- `date`: ISO date (YYYY-MM-DD), used for sorting. Newest posts appear first on the homepage.
- `postType`: `"writing"`, `"project"`, or `"reading"` (affects homepage grouping and layout)
- `dateDisplay`: human-readable date string shown on the page

## How to write a reading page

Same structure, same directory (`content/blog/`). Set `postType: "reading"` and add reading-specific fields:

```markdown
---
title: "Book or Paper Title"
slug: "slug"
date: 2025-09-21
postType: "reading"
dateDisplay: "September 21, 2025"
readingTitle: "Book or Paper Title"
readingAuthor: "Author Name"
readingPublishedDate: "1988"
readingUrl: "https://link-to-source"
---
```

Reading pages are displayed in a separate "What I'm Reading" section on the homepage, with a different single-page layout showing author/source metadata.

## Building

```bash
hugo          # Build the site (output goes to public/)
hugo server   # Live-reloading dev server at http://localhost:1313
```

The `public/` directory is committed to the repo. Cloudflare serves it on push to main.

## Content conventions

- Posts use h2 and h3 for sections (never h1 -- that's the title).
- The writing style is technical and explanatory, aimed at people learning CS/engineering topics.
- Images are PNGs placed alongside index.md in the post directory (Hugo page bundles).
- No client-side JS. The output is purely static HTML + CSS.
