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
    name: "reading-pages-source",
    alias: "r",
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
      <p>Have something you want to tell me? Found a mistake or typo on the site? Just looking to chat?
      Send me an email at <a href="mailto:bcarlborg@gmail.com">bcarlborg@gmail.com</a>. Start the subject line with the 🦎 emoji so I know you came from this site.</p>

      <h2>Posts</h2>
      <p><em>Some writing, some projects. Some tall, some short. Some polished, some not.<br/>But always handwritten. Always organically grown 🍒🍓🍑</em></p>
      <p id="blog-posts-list"></p >

      <h2>What I'm Reading</h2>
      <p><em>List of books, papers, or article that I'm currently reading and thinking about.</em></p>
      <p id="reading-list"></p >
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


  let titlePrefix = blogPostMetaData["type"] === "writing" ? "Writing️" : "Project";
  titlePrefix += ' - ' + blogPostMetaData['date-originally-authored'];

  const relativeBlogPostPath = blogPostPath.split("dist").slice(-1);

  const listItemHtml = `
    <p class="blog-posts-list-item">
      <span class="blog-post-title-url">
        <b>
          <a href="${relativeBlogPostPath}">
            ${blogPostMetaData["title"]}
          </a>
        </b>
      </span>
      <br/>
      <span class="blog-posts-list-item-prefix">
        ${titlePrefix}
      </span>
    </p>
  `;

  indexSkeletonDom
    .querySelector("#blog-posts-list")
    .appendChild(parse(listItemHtml));
});

////////////////////////////////////////////////////////////////
// Get the metadata for each reading page
////////////////////////////////////////////////////////////////

const readingPageDirectoryPaths = fs
  .readdirSync(args["reading-pages-source"], { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory())
  .map((dirent) => resolve(dirent.path, dirent.name));

const readingPagesMetadata = readingPageDirectoryPaths.map(
  (readingPageDirectoryPath) => {
    const metadataFilePath = resolve(readingPageDirectoryPath, "metadata.json");
    return JSON.parse(fs.readFileSync(metadataFilePath, "utf8"));
  }
);

const orderedReadingPagesMetaData = readingPagesMetadata.sort(
  (a, b) => b["post-order"] - a["post-order"]
);

////////////////////////////////////////////////////////////////
// Add a list item to our index DOM for each reading page
////////////////////////////////////////////////////////////////

orderedReadingPagesMetaData.forEach((readingPageMetaData) => {
  const readingPagePath = resolve(
    args["output-html-directory"],
    "reading",
    readingPageMetaData["post-filename"]
  );

  const relativeReadingPagePath = readingPagePath.split("dist").slice(-1);

  let titlePrefix = readingPageMetaData["type"];
  titlePrefix += ' - ' + readingPageMetaData['date-read-by-me'];

  const listItemHtml = `
    <p class="reading-list-item">
      <span class="reading-list-item-title-url">
        <b>
          <a href="${relativeReadingPagePath}">
            ${readingPageMetaData["reading-title"]}
          </a>
        </b>
      </span>
      <br/>
      <span class="reading-list-item-prefix">
        ${titlePrefix}
      </span>
    </p>
  `;

  indexSkeletonDom
    .querySelector("#reading-list")
    .appendChild(parse(listItemHtml));
});



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
