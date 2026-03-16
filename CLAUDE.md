# CLAUDE.md

## What this repo is

A personal website at [beau-carlborg.com](https://www.beau-carlborg.com), built with [Hugo](https://gohugo.io/) and deployed via Cloudflare Pages.

## Repo structure

```
content/
  blog/[slug]/index.md       # Blog posts (Hugo page bundles)
  reading/[slug]/index.md    # Reading notes (Hugo page bundles)
layouts/
  _default/baseof.html       # Base template (head, body wrapper)
  _default/list.html          # Section list pages
  _default/rss.xml            # RSS feed template
  index.html                  # Homepage template
  blog/single.html            # Blog post template
  reading/single.html         # Reading page template
  partials/head.html           # Shared <head> partial (CSS, favicons, meta)
assets/css/global-styles.css  # Site-wide styles (processed by Hugo Pipes)
static/assets/                # Favicons
hugo.toml                     # Hugo configuration
```

## How to write a blog post

1. Create a directory in `content/blog/` named after the post slug (e.g. `my-new-post`).
2. Add an `index.md` file with front matter and content:

```markdown
---
title: "Post Title"
slug: "my-new-post"
dateAuthored: "March 10, 2026"
dateLastUpdated: "2026/03/10"
postOrder: 13
postType: "writing"
---

Post body in markdown. Do NOT include an h1 (the title comes from front matter).
Images go in the same directory and are referenced with relative paths like `![alt](image.png)`.
```

Key fields:
- `slug`: determines the URL (`/blog/my-new-post/`)
- `postOrder`: controls sort order on the homepage (higher = listed first). Check existing posts to pick the next number.
- `postType`: `"writing"` or `"project"` (affects homepage label)

## How to write a reading page

Same structure but in `content/reading/`. The front matter has additional fields:

```markdown
---
title: "Book or Paper Title"
slug: "slug"
readingTitle: "Book or Paper Title"
readingAuthor: "Author Name"
readingPublishedDate: "1988"
readingUrl: "https://link-to-source"
dateReadByMe: "September 21, 2025"
dateLastUpdated: "2025/09/21"
postOrder: 3
---
```

## Building

```bash
hugo          # Build the site (output goes to public/)
hugo server   # Live-reloading dev server at http://localhost:1313
```

Cloudflare Pages builds automatically on push to main.

## Content conventions

- Posts use h2 and h3 for sections (never h1 -- that's the title).
- The writing style is technical and explanatory, aimed at people learning CS/engineering topics.
- Images are PNGs placed alongside index.md in the post directory (Hugo page bundles).
- No client-side JS. The output is purely static HTML + CSS.
