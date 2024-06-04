# TODOs
_a very loose list of TODOs that I keep for this project. These TODOs are relevant for code behind the site, not the content of the site itself_

TODOS:
- [ ] configure `./build-scripts/build_entire_site` to clean the `/dist` directory before running
  - currently, if I remove the metadata for a blog post, the content in the `dist/` directory stays around. I could fix this by either adding some sort of `clean/` script, or by having the build script clear the `dist/` directory before executing.