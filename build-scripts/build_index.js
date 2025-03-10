import fs from "fs";
import { resolve } from "path";
import { marked } from "marked";
import { parse } from "node-html-parser";
import beautify from "js-beautify";
import commandLineArgs from "command-line-args";
import { hashFile } from "./helpers/fileHelpers.js";

////////////////////////////////////////////////////////////////
// Parse Command Line arguments
////////////////////////////////////////////////////////////////

const directoryFromPath = (path) => {
  const stats = fs.statSync(path);
  if (stats.isDirectory()) {
    return resolve(path);
  }
  throw new Error("output-directory is not a directory");
};

// Define the options that can be passed to this script
const commandLineOptions = [
  {
    name: "blog-posts-source",
    alias: "b",
    type: (path) => directoryFromPath(path),
  },
  {
    name: "output-html-directory",
    alias: "o",
    type: (path) => directoryFromPath(path),
  },
  {
    name: "stylesheet-path",
    alias: "s",
    type: (path) => path,
  },
  // { name: 'output-asset-directory', alias: 'a', type: (path) => directoryFromPath(path)},
  { name: "help", alias: "h", type: Boolean },
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
-b                          blog post
--output-html-directory     path to a directory where the final html for the site's index
-o                          will be placed
--stylesheet-path           path to the stylesheet for the page
-s                          placed
--help                      print this help message
-h
`;

if (args["help"]) {
  console.log(helpMessage);

  // after printing the help text, we can exit
  process.exit(0);
}

////////////////////////////////////////////////////////////////
// Create the base html for our website
////////////////////////////////////////////////////////////////

const cssPath = resolve(args["stylesheet-path"]);
const stylesHash = hashFile(cssPath);

const indexSkeletonHtml = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <link rel="stylesheet" type="text/css" href="/global-styles.css?v=${stylesHash}" />
    <link
      rel="icon"
      type="image/png"
      sizes="32x32"
      href="/assets/favicon-32-32.png?v=2" />
    <link
      rel="icon"
      type="image/png"
      sizes="96x96"
      href="/assets/favicon-96-96.png?v=2" />
    <link
      rel="icon"
      type="image/png"
      sizes="180x180"
      href="/assets/favicon-180-180.png?v=2" />
    <link rel="apple-touch-icon" href="/assets/favicon-180-180.png?v=2">
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
      <div id="index-title-container">
        <h1 id="index-title-text">Beau Carlborg</h1>
        <img id="index-title-image" src="assets/favicon-96-96.png?v=2"/>
      </div>
      <p>👋 Hi there, my name is Beau (pronounced like go).</p>
    </header>

    <main>
      <h2>About me</h2>
      <ul>
        <li>🌳 I live in Oakland, California.</li>
        <li>🕴 Currently, I am a full-stack developer at Notion.</li>
        <li>
          🌎 I enjoy learning about all levels of the tech-stack, from assembly
          up to web technologies.
        </li>
        <li>️🏔️ I like to spend my spare time in the outdoors.</li>
      </ul>

      <h2>Contact Me</h2>
      <p>Send me an email (<a href="mailto:bcarlborg@gmail.com?subject=Hi%20Beau">bcarlborg@gmail.com</a>).</p>

      <h2>️Writing & Projects</h2>
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

const blogPostDirectoryPaths = fs
  .readdirSync(args["blog-posts-source"], { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory())
  .map((dirent) => resolve(dirent.path, dirent.name));

const blogPostsMetadata = blogPostDirectoryPaths.map(
  (blogPostDirectoryPath) => {
    const metadataFilePath = resolve(blogPostDirectoryPath, "metadata.json");
    return JSON.parse(fs.readFileSync(metadataFilePath, "utf8"));
  }
);

const orderedBlogPostsMetaData = blogPostsMetadata.sort(
  (a, b) => b["post-order"] - a["post-order"]
);

////////////////////////////////////////////////////////////////
// Add a list item to our index DOM for each blog post
////////////////////////////////////////////////////////////////

orderedBlogPostsMetaData.forEach((blogPostMetaData) => {
  const blogPostPath = resolve(
    args["output-html-directory"],
    "blog",
    blogPostMetaData["post-filename"]
  );

  const titlePrefix = blogPostMetaData["type"] === "writing" ? "✏️ " : "👾 ";

  const relativeBlogPostPath = blogPostPath.split("dist").slice(-1);

  const listItemHtml = `
    <li>
      ${titlePrefix}
      <a href="${relativeBlogPostPath}">
        ${blogPostMetaData["title"]}
      </a>
    </li>
  `;

  indexSkeletonDom
    .querySelector("#blog-posts-list")
    .appendChild(parse(listItemHtml));
});

const rssFeedListItemHtml =
  '<li>🤖 <a href="rss.xml">RSS Feed</a> -- <em>Add this url to a feed reader to get updates when I write new posts.</em></li>';

indexSkeletonDom
  .querySelector("#blog-posts-list")
  .appendChild(parse(rssFeedListItemHtml));

////////////////////////////////////////////////////////////////
// Output our html to the specified location
////////////////////////////////////////////////////////////////

const prettyHtmlIndexContent = beautify.html(indexSkeletonDom.toString(), {
  // head and body should be indented within <html />
  indent_inner_html: true,
  // no tags should have an extra line between the opening
  // tag and their children
  extra_liners: [],
});

const outputIndexPath = resolve(args["output-html-directory"], "index.html");

try {
  fs.writeFileSync(outputIndexPath, prettyHtmlIndexContent);
} catch (err) {
  console.error(err);
}
