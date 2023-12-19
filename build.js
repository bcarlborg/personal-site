import fs from 'fs'
import { marked } from 'marked';
import { gfmHeadingId } from "marked-gfm-heading-id";
import { parse } from 'node-html-parser';

//
// add the github flavored markdown heading id extension
// to our marked instance 
//

marked.use(gfmHeadingId({}));

//
// read the article markdown content file
//

let contentMarkdown = '';
try {
  contentMarkdown = fs.readFileSync('./src/pushdown-automata-variants/content.md', 'utf8');
} catch (err) {
  console.error(err);
}

//
// read the article metadata
// 

let articleMetaData = {};
try {
  const articleMetadataString = fs.readFileSync('./src/pushdown-automata-variants/metadata.json');
  articleMetaData = JSON.parse(articleMetadataString);
} catch (err) {
  console.error(err);
}


const articleSkeletonHtml = `
  <html>
    <head></head>
    <body>
      <header>
      </header>
      <main>
        <article>
          <h1 id="article-title"></h1>
          <p>
            <i id="article-metadata"></i>
          </p>
          <div id ="article-contents">
            Article Contents:
            <br />
          </div> 
        </article>
      </main>
    </body>
  </html>
`;
const articleSkeletonDom = parse(articleSkeletonHtml);

//
// parse the article content from markdown, and insert it into our
// skeleton DOM
//

const articleContentHtml = marked.parse(contentMarkdown);
const articleContentDom = parse(articleContentHtml);
articleSkeletonDom.querySelector('article').appendChild(articleContentDom);
const articleDom = articleSkeletonDom;

//
// Add metadata
//

articleDom.querySelector("#article-title").textContent = articleMetaData.title;
articleDom.querySelector("#article-metadata").textContent =
  `Originally Authored: ${articleMetaData["date-originally-authored"]}`
  + ` | Last Updated: ${articleMetaData["date-last-updated"]}`
  + ` | Reading time: ${articleMetaData["reading-time"]}`
  + ` | Author: ${articleMetaData.author}`

//
// Create a table of contents from our subheaders
//
const articleSubHeaders = articleDom.querySelectorAll('h2');
const isArticleWithSubHeaders = articleSubHeaders.length > 0;

if (isArticleWithSubHeaders) {
  articleSubHeaders.forEach((subHeader, index) => {
    const tableOfContentsItem = parse(`
      <a href="${subHeader.getAttribute('id')}"}>
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

console.log(articleDom.toString());