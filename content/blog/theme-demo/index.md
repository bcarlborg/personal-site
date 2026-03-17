---
title: "Theme Demo"
slug: "theme-demo"
date: 2000-01-01
postType: "writing"
dateDisplay: "January 1, 2000"
build:
  list: never
  publishResources: true
---

This page demonstrates all the visual components used on this site. It is not linked from the homepage.

## Headings

Headings get anchor links on hover. This is an h2.

### This is an h3

Headings at h2 and h3 levels appear in the table of contents.

## Text

Regular paragraph text. The site uses browser default fonts on a mistyrose background. Links look [like this](/blog/theme-demo/) and are styled in dark red with underlines.

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

Images render at full width within the article. Here's how they look (using an existing image from another post):

![dependency graph example](/blog/my-gnu-make-study-guide/dependency-graph.png)

## Metadata Styles

The metadata bar below the title shows the post type tag and date. On reading posts, it also shows source attribution. The metadata has a subtle border with no background.

## Table of Contents

The table of contents (visible above if this page has enough headings) uses a collapsible `<details>` element. Click "Table of contents" to expand it.

## Post Tags

Tags are colored badges used in the homepage list and in post metadata:

- Writing: purple (`#d2c4ff`)
- Project: green (`#c4e0d2`)
- Reading: blue (`#c4d4e8`)

## Filter Buttons

The homepage has filter buttons (All, Reading, Writing, Projects) that toggle post visibility. They use a dimmed version of the link color with a subtle hover state.
