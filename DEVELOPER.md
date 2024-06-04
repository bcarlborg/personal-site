# Notes to the developer
Presumably, I (beau) am going to be the only person acting as a developer in this repository... so I guess these are really just notes to myself about how I set things up.

## Project dependencies
This project has a few dependencies for building the sites html from the markdown content in `src/`.
- `node`: all build scripts... but most likely any other js runtime would work
- `npm`: this project uses npm for package managment
- `python3`: python3 is used to serve the website locally during development

## Serving the site locally
There is a simple npm script defined in `package.json` that will the http server module from python3 to deploy the site locally.
Simply run `npm run serve-local` to serve the site at [http://0.0.0.0:8080/](http://0.0.0.0:8080/).
```

## Writing a blog post
To write a blog post, follow these steps:
- you will need to create a new directory in `/src/blog` for the post you want to create. The name of this directory is irrelevant, but ideally it should be named related to the post
- Within that directory, you will need two files at a minimum
  - `contend.md` -- a markdown file containing the content of your post.
    - note: within your post, do not add an `h1` tag to give your post a title. The title will
    be added to the final post html based on the fields in `metadata.json`.
    - if there are any images that you wish to add to your post, those those be added into the same directory
    as `content.md`.
  - `metadata.json` -- a json file containing information about the post. See the example below.


```JSON
{
  "title": "Pushdown Automata Variants",
  "post-filename": "pushdown-automata-variants.html",
  "assets-file-directory-name": "pushdown-automata-variants",
  "description": "The personal website of Beau Carlborg",
  "date-originally-authored": "July 2023",
  "date-last-updated": "July 2023",
  "reading-time": "~20 min",
  "author": "Beau Carlborg",
  "type": "writing"
}
```

## Building the blog posts
Once you have written your blog post in the `/src` directory, you can build the final post html using `/build_scripts/build_all_posts`. This is a script that will build every post in `/src/bog` and output the fina html and assets into `/src`.

## Building the home page
The home page can be reconstructed to include links to all posts in `/src/blog` at any time by running `/buid_scripts/build_index`

## Building the entire site
To rebuild the entire site (blog posts and the home page), run `/buid_scripts/build_entire_site`.

## Deploying the site
Cloudflare is configured to publish the dist directory every time new content is pushed to that directory in this repository.
So... to udpate the site, simply push new or updated content to the `/dist` directory on the main branch of this repo.
