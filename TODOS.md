# TODOs

_a very loose list of TODOs that I keep for this project. These TODOs are relevant for code behind the site, not the content of the site itself_

TODOs
- [ ] projects page? what is the relationship to the blog posts pages
- [ ] some sort of contact form?
- [ ] a nicer footer? (including rss link?)
- [ ] musings, thoughts, realizations section
- [ ] move vscode config to git ignore
- [ ] build system for my sanity
  - [x] install marked js
  - [ ] create a source directory and a dist directory. Have marked create the dist directory from the source directory
  - [ ] create the rss page from metadata in the source directory
  - [ ] write documentation about the build system
  - [ ] get article processing from markdown working correctly
    - [x] create a json metadata file that has all the info about the post
    - [x] parse the h2 headings and put those into the content
    - [ ] move all <head> content into the generator
    - [ ] move id names into constants
    - [ ] generalize the code to work on a directory of articles
    - [ ] support images and other assets in the directory
