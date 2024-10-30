import fs from "fs";
import { resolve } from "path";
import { marked } from "marked";
import { parse } from "node-html-parser";
import beautify from "js-beautify";
import commandLineArgs from "command-line-args";

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
  // { name: 'output-asset-directory', alias: 'a', type: (path) => directoryFromPath(path)},
  { name: "help", alias: "h", type: Boolean },
];

const args = commandLineArgs(commandLineOptions);

////////////////////////////////////////////////////////////////
// Maybe print help text and exit
////////////////////////////////////////////////////////////////

const helpMessage = `
This script will build the rss of the website and construct references
to all of the written blog posts.

Usage: 
node build_rss.js
      --blog-posts-source <directory_path>
      --output-html-directory <directory_path>


Options:
--blog-posts-source         path to a directory containing all the directories for each 
-b                          blog post
--output-html-directory     path to a directory where the final html for the site's rss
-o                          will be placed
--help                      print this help message
-h
`;

if (args["help"]) {
  console.log(helpMessage);

  // after printing the help text, we can exit
  process.exit(0);
}

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

const rssPrefix = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Beau's Blog</title>
    <link>https://www.beau-carlborg.com/blog</link>
    <description>The personal website of Beau Carlborg</description>
`;

const rssPostfix = `\t</channel>
</rss>
`;

let rssPosts = "";
orderedBlogPostsMetaData.forEach((blogPostMetaData) => {
  rssPosts += `\t\t<item>
      <title>${blogPostMetaData["title"]}</title>
      <link>https://www.beau-carlborg.com/blog/${blogPostMetaData["post-filename"]}</link>
    </item>
 `;
});

const rssContent = rssPrefix + rssPosts + rssPostfix;

////////////////////////////////////////////////////////////////
// Output our html to the specified location
////////////////////////////////////////////////////////////////

const outputRssPath = resolve(args["output-html-directory"], "rss.xml");

try {
  fs.writeFileSync(outputRssPath, rssContent);
} catch (err) {
  console.error(err);
}
