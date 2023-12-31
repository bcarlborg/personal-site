import fs from 'fs'
import { resolve } from 'path';
import { marked } from 'marked';
import { parse } from 'node-html-parser';
import beautify from 'js-beautify';
import commandLineArgs from 'command-line-args';

////////////////////////////////////////////////////////////////
// Parse Command Line arguments
////////////////////////////////////////////////////////////////

const directoryFromPath = (path) => {
  const stats = fs.statSync(path);
  if (stats.isDirectory()) {
    return resolve(path);
  }
  throw new Error('output-directory is not a directory');
}

// Define the options that can be passed to this script
const commandLineOptions = [
  { name: 'blog-posts-source', alias: 'b', type: (path) => directoryFromPath(path)},
  { name: 'output-html-directory', alias: 'o', type: (path) => directoryFromPath(path)},
  // { name: 'output-asset-directory', alias: 'a', type: (path) => directoryFromPath(path)},
  { name: 'help', alias: 'h', type: Boolean },
];

const args = commandLineArgs(commandLineOptions);

////////////////////////////////////////////////////////////////
// Maybe print help text and exit
////////////////////////////////////////////////////////////////

const helpMessage = `
This script will build the index of the website and construct references
to all of the written blog posts.

Usage: 
node build_index.js
      --blog-posts-source <directory_path>
      --output-html-directory <directory_path>


Options:
--blog-posts-source         path to a directory containing all the directories for each 
-b                          blog bpost
--output-html-directory     path to a directory where the final html for the site's index
-o                          will be placed
--help                      print this help message
-h
`;

if (args['help']) {
  console.log(helpMessage);

  // after printing the help text, we can exit
  process.exit(0);
}

////////////////////////////////////////////////////////////////
// Create the base html for our website
////////////////////////////////////////////////////////////////

const indexSkeletonHtml = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <link rel="stylesheet" type="text/css" href="/global-styles.css" />
    <link
      rel="icon"
      type="image/png"
      sizes="32x32"
      href="/assets/favicon-woo-guy-32-32.png" />
    <link
      rel="icon"
      type="image/png"
      sizes="96x96"
      href="/assets/favicon-woo-guy-96-96.png" />
    <link
      rel="icon"
      type="image/png"
      sizes="180x180"
      href="/assets/favicon-woo-guy-180-180.png" />
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="og:title" content="Beau Carlborg" />
    <meta
      name="og:description"
      content="The personal website of Beau Carlborg" />
    <title>Beau Carlborg</title>
  </head>
  <body>
    <header>
      <h1>Beau Carlborg</h1>
      <p>👋 Hi there, my name is Beau (pronounced like go).</p>
    </header>

    <main>
      <h2>About me</h2>

      <ul>
        <li>🌳 I live in Oakland California.</li>
        <li>🐙 I am a full stack developer at Slack.</li>
        <li>
          🌊 I enjoy learning about all levels of the tech stack, from assembly
          up to web technologies.
        </li>
        <li>️🏔️ I spend my spare time in the outdoors.</li>
      </ul>

      <br />

      <h2>Writing</h2>
      <ul id="blog-posts-list">
      </ul>
    </main>
    <footer></footer>
  </body>
</html>
`;

const indexSkeletonDom = parse(indexSkeletonHtml);

////////////////////////////////////////////////////////////////
// Get the metadata for each blog post
////////////////////////////////////////////////////////////////

const blogPostDirectoryPaths = fs.readdirSync(
  args['blog-posts-source'], { withFileTypes: true }
).filter(
  dirent => dirent.isDirectory()
).map(
  dirent => resolve(dirent.path, dirent.name)
);

const blogPostsMetadata = blogPostDirectoryPaths.map((blogPostDirectoryPath) => {
  const metadataFilePath = resolve(blogPostDirectoryPath, 'metadata.json');
  return JSON.parse(fs.readFileSync(metadataFilePath, 'utf8'));
});

const orderedBlogPostsMetaData = blogPostsMetadata.sort(
  (a, b) => (b['post-order'] - a['post-order'])
);

////////////////////////////////////////////////////////////////
// Add a list item to our index DOM for each blog post
////////////////////////////////////////////////////////////////

orderedBlogPostsMetaData.forEach(blogPostMetaData => {
  const blogPostPath = resolve(
    args['output-html-directory'], 'blog', blogPostMetaData['post-filename']
  );

  const relativeBlogPostPath = blogPostPath.split('dist').slice(-1);

  const listItemHtml = `
    <li>
      ${blogPostMetaData['date-originally-authored']} -
      <a href="${relativeBlogPostPath}">
        ${blogPostMetaData['title']}
      </a>
    </li>
  `

  indexSkeletonDom.querySelector("#blog-posts-list").appendChild(parse(listItemHtml));
});

////////////////////////////////////////////////////////////////
// Output our html to the specified location
////////////////////////////////////////////////////////////////

const prettyHtmlIndexContent = beautify.html(
  indexSkeletonDom.toString(), 
  {
    // head and body should be indented within <html />
    indent_inner_html: true,
    // no tags should have an extra line between the opening
    // tag and their children
    extra_liners: [],
  }
);

const outputIndexPath = resolve(args['output-html-directory'], 'index.html');

try {
  fs.writeFileSync(outputIndexPath, prettyHtmlIndexContent);
} catch (err) {
  console.error(err);
}