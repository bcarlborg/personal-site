# TODOs

_a very loose list of TODOs that I keep for this project. These TODOs are relevant for code behind the site, not the content of the site itself_

TODOS:

- [ ] Add descriptions and title of posts to unfurls of shared posts
- [ ] configure `./build-scripts/build_entire_site` to clean the `/dist` directory before running
  - currently, if I remove the metadata for a blog post, the content in the `dist/` directory stays around. I could fix this by either adding some sort of `clean/` script, or by having the build script clear the `dist/` directory before executing.
- [ ] figure out a place to put the rss feed link
- [ ] add sub headers below posts and projects section and notes section
- [ ] a place for photos or music or trips etc?


WANTS
- [ ] global styles in better place?
- [ ] templating?
- [ ] date handling better
- [ ] more consistent build system. either all with scripts or all with npm