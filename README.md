# My Personal Website

This is the repository for my personal website at [beau-carlborg.com](https://www.beau-carlborg.com).

The site is built with [Hugo](https://gohugo.io/) and deployed via Cloudflare Pages.

## Building

```bash
hugo          # Build the site (output goes to public/)
hugo server   # Live-reloading dev server at http://localhost:1313
```

## Deployment

Cloudflare Pages is configured to build with Hugo on every push to main. The build command is `hugo` and the publish directory is `public/`.
