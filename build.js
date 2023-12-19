import fs from 'fs'
import { marked } from 'marked';
import { gfmHeadingId } from "marked-gfm-heading-id";
import { parse } from 'node-html-parser';

let content = '';
try {
  content = fs.readFileSync('./src/pushdown-automata-variants/content.md', 'utf8');
} catch (err) {
  console.error(err);
}

marked.use(gfmHeadingId({}));

const articleContentHtml = marked.parse(content);
const articleContentDom = parse(articleContentHtml);

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
articleSkeletonDom.querySelector('article').appendChild(articleContentDom);

const articleDom = articleSkeletonDom;

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