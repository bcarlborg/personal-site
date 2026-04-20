# My Personal Website

This is the repository for my personal website at [beau-carlborg.com](https://www.beau-carlborg.com).

The site is built with [Hugo](https://gohugo.io/) and deployed via Cloudflare Pages.

## Building

```bash
hugo             # Build the site (output goes to public/)
hugo -D          # also builds drafts
hugo server      # Live-reloading local server (will rebuild site in memory and serve from there)
hugo server -D   # also builds drafts
```

## Deployment

Run `hugo` locally to re-generate site then push.
