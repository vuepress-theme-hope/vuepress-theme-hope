---
title: Footnote
icon: quote-left
category:
  - Markdown
tag:
  - Footnote
  - Markdown
---

Let the Markdown file in your VuePress site support footnotes.

<!-- more -->

## Settings

```ts twoslash {5} title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  markdown: {
    footnote: true,
  },
});
```

## Syntax

- Use `[^Anchor text]` in Markdown to define a footnote

- Use `[^Anchor text]: ...` to describe footnote content

- If there are multiple paragraphs in footnote, the paragraph show be double indented

## Demo

::: md-demo

Footnote 1 link[^first].

Footnote 2 link[^second].

Inline footnote^[Text of inline footnote] definition.

Duplicated footnote reference[^second].

[^first]: Footnote **can have markup**

    and multiple paragraphs.

[^second]: Footnote text.

:::
