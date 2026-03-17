---
title: "Theme Demo"
layout: "theme-demo"
build:
  list: never
  publishResources: true
---

## Post Tags

<span class="post-tag post-tag-writing">Writing</span>
<span class="post-tag post-tag-project">Project</span>
<span class="post-tag post-tag-reading">Reading</span>

## Headings

Headings get anchor links on hover. This is an h2.

### This is an h3

Headings at h2 and h3 levels appear in the table of contents.

## Text

Regular paragraph text. The site uses browser default fonts on a mistyrose background. Links look [like this](/theme-demo/) and are styled in dark red with underlines.

Here is some **bold text**, some *italic text*, and some `inline code` which gets a pink background.

## Lists

Unordered list:

- First item
- Second item with a [link](#lists)
- Third item with `inline code`

Ordered list:

1. First item
2. Second item
3. Third item

## Code Blocks

A code block with syntax highlighting (Makefile):

```makefile
CC=gcc
CFLAGS=-Wall

main: main.o helper.o
	$(CC) $(CFLAGS) -o $@ $^

%.o: %.c
	$(CC) $(CFLAGS) -c -o $@ $<

.PHONY: clean
clean:
	rm -f *.o main
```

A plain code block with no language specified:

```
This is a plain code block.
No syntax highlighting here.
It uses the same pink background but no color tokens.
```

## Blockquotes

> This is a blockquote. It could be used for quoting other sources or calling out important information.

## Images

Images render at full width within the article:

![dependency graph example](/blog/my-gnu-make-study-guide/dependency-graph.png)

## Metadata Bar

The metadata bar below post titles shows the post type tag and date, with a subtle border and no background. On reading posts, it also includes source attribution.
