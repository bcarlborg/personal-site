# My Personal Website
This is the github repository containing the content and build tools for my personal website -- [www.beau-carlborg.com](www.beau-carlborg.com).

## Structure of this repository
The code that is served at my domain is contained in the `dist/` directory. The directory is automatically picked up and served by cloudflare.

Most of the content on that website is in blog posts. The content for those posts is in the `src/` directory of this
respository written in markdown. To construct the final HTML that is served on the website, I run scripts contained in the `build_scripts/` directory.

More specific information about the repository and the associated scripts can be found in the [DEVELOPER.md](DEVELOPER.md) file.
