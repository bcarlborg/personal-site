import fs from 'fs'
import { resolve } from 'path';
import { marked } from 'marked';
import { gfmHeadingId } from "marked-gfm-heading-id";
import markedCodePreview from 'marked-code-preview'
import { parse } from 'node-html-parser';
import beautify from 'js-beautify';
import commandLineArgs from 'command-line-args';

//
// add the github flavored markdown heading id extension
// to our marked instance 
//
marked.use(gfmHeadingId({}));

//
// add code previews to our markdown renderer
//
marked.use(markedCodePreview);

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
  { name: 'input-directory', alias: 'i', type: (path) => directoryFromPath(path)},
  { name: 'output-html-directory', alias: 'o', type: (path) => directoryFromPath(path)},
  { name: 'output-asset-directory', alias: 'a', type: (path) => directoryFromPath(path)},
  { name: 'help', alias: 'h', type: Boolean },
];
const args = commandLineArgs(commandLineOptions);

////////////////////////////////////////////////////////////////
// Maybe print help text and exit
////////////////////////////////////////////////////////////////
const helpMessage = `
This script will construct an html blog post in the specified directory
using a blog post written in markdown and additional metadata about the
post written in JSON

Usage: 
node build_post.js
      --input-directory <directory_path>
      --output-html-directory <directory_path>
      --output-asset-directory <directory_path>


Options:
--input-directory           path to a directory containing at least the following two files
-i
--output-html-directory     path to a directory where the final html for the post will be
-o                          placed
--output-asset-directory    path to a directory where the final assets for the post will be
-a                          placed
--help                      print this help message
-h
`;

if (args['help']) {
  console.log(helpMessage);

  // after printing the help text, we can exit
  process.exit(0);
}


////////////////////////////////////////////////////////////////
// Extract file paths for content from argument directory paths
////////////////////////////////////////////////////////////////

//
// get the post content markdown and post metadata object from the input directory
//

const inputDirectoryPath = args['input-directory'];

const metaDataFilePath = resolve(inputDirectoryPath, 'metadata.json');
const contentMarkdownFilePath = resolve(inputDirectoryPath, 'content.md');

if (!fs.statSync(metaDataFilePath).isFile()) {
  throw new Error('path to metadata in src dir is not a file');
}

if (!fs.statSync(contentMarkdownFilePath).isFile()) {
  throw new Error('path to content in src dir is not a file');
}

const articleMetadata = JSON.parse(fs.readFileSync(metaDataFilePath, 'utf8'));
const contentMarkdown = fs.readFileSync(contentMarkdownFilePath, 'utf8');

//
// Construct the path for our outputed html file from the input-directory argument
//
const outputHtmlFilePath = resolve(args['output-html-directory'], articleMetadata['post-filename']);

//
// get our asset directory path
//

const postOutputAssetDirectoryPath = resolve(args['output-asset-directory'], articleMetadata['assets-file-directory-name']);

////////////////////////////////////////////////////////////////
// Create a DOM for out output html file
////////////////////////////////////////////////////////////////

//
// This skeleton html is what we will build our blog post from
// we will insert the blog content as children nodes in this skeleton
// and we will add othe meta information
//

const articleSkeletonHtml = `
<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" type="text/css" href="/global-styles.css" />
    <link
      rel="icon"
      type="image/png"
      sizes="32x32"
      href="/assets/favicon-woo-guy-32-32.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="96x96"
      href="/assets/favicon-woo-guy-96-96.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="180x180"
      href="/assets/favicon-woo-guy-180-180.png"
    />
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
  <body>
    <header>
      <a href="/index.html">⏎ back home</a>
    </header>
    <main>
      <article>
        <h1 id="article-title"></h1>
        <div id ="article-contents">
          <i id="article-metadata"></i>
          <br />
          <br />
          <strong>Article Contents:</strong>
          <br />
        </div> 
      </article>
    </main>
  </body>
</html>
`;

const articleSkeletonDom = parse(articleSkeletonHtml);

//
// Add our article content into the skeleton DOM
//

// parse the article html from markdown
const articleContentHtml = marked.parse(contentMarkdown);

// build a dom from our articles parsed html
const articleContentDom = parse(articleContentHtml);


// insert article content dom into our skeleton dom
articleSkeletonDom.querySelector('article').appendChild(articleContentDom);
const articleDom = articleSkeletonDom;

//
// add information to the <head> element in our skeleton dom based on
// the post metadata
//

articleDom.querySelector('head').appendChild(parse(`<meta name="og:title" content="${articleMetadata.title}"/>`));
articleDom.querySelector('head').appendChild(parse(`<meta name="og:description" content="${articleMetadata.description}"/>`));
articleDom.querySelector('head').appendChild(parse(`<title>${articleMetadata.title}</title>`));

//
// Add metadata information article content
//

articleDom.querySelector("#article-title").textContent = articleMetadata.title;
articleDom.querySelector("#article-metadata").textContent =
  `Originally Authored: ${articleMetadata["date-originally-authored"]}`
  + ` | Last Updated: ${articleMetadata["date-last-updated"]}`
  + ` | Reading time: ${articleMetadata["reading-time"]}`
  + ` | Author: ${articleMetadata.author}`

//
// Create a table of contents from our subheaders
//
const articleSubHeaders = articleDom.querySelectorAll('h2');
const isArticleWithSubHeaders = articleSubHeaders.length > 0;

if (isArticleWithSubHeaders) {
  articleSubHeaders.forEach((subHeader, index) => {
    const tableOfContentsItem = parse(`
      <a href="#${subHeader.getAttribute('id')}"}>
        ${subHeader.textContent}
      </a>
    `);
    articleDom.querySelector('#article-contents').appendChild(tableOfContentsItem);

    const isLastItem = index === articleSubHeaders.length - 1;
    if (!isLastItem) {
      articleDom.querySelector('#article-contents').appendChild(parse('<br />'));
    }
  });
}

////////////////////////////////////////////////////////////////
// Identify any images in our html and copy them to our assets
// file
////////////////////////////////////////////////////////////////

const imageNodes = articleDom.querySelectorAll('img');

if (imageNodes.length > 0 && !fs.existsSync(postOutputAssetDirectoryPath)) {
  fs.mkdirSync(postOutputAssetDirectoryPath);
}

imageNodes.forEach((imageNode) => {
  const inputImageSrcPath = imageNode.getAttribute('src');

  //
  // check that imageNode refers to an actual file in the input directory
  //

  const inputDirectoryImagePath = resolve(inputDirectoryPath, inputImageSrcPath);

  const inputImageStats = fs.statSync(inputDirectoryImagePath);
  if (!inputImageStats.isFile()) {
    throw new Error(`Image in html not found in directory ${inputImageSrcPath}`);
    process.exit(1);
  };

  //
  // copy the input file to the output asset directory
  //

  const outputAssetsDirectoryImagePath = resolve(postOutputAssetDirectoryPath, inputImageSrcPath);

  fs.copyFile(inputDirectoryImagePath, outputAssetsDirectoryImagePath, (err) => {
    if (err) throw err;
    process.exit(1);
  });

  // update the node in our dom

  const outputImageNodeSrcPath = outputAssetsDirectoryImagePath.split('dist').slice(-1);
  
  imageNode.setAttribute('src', outputImageNodeSrcPath);
});

////////////////////////////////////////////////////////////////
// Output our html to the specified location
////////////////////////////////////////////////////////////////

const prettyHtmlPostContent = beautify.html(
  articleDom.toString(), 
  {
    // head and body should be indented within <html />
    indent_inner_html: true,
    // no tags should have an extra line between the opening
    // tag and their children
    extra_liners: [],
  }
);

try {
  fs.writeFileSync(outputHtmlFilePath, prettyHtmlPostContent);
} catch (err) {
  console.error(err);
}
