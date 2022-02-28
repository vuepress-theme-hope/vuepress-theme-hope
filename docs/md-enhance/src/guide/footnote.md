---
title: Footnote
icon: footnote
category:
  - markdown
tag:
  - feature
  - markdown
---

Let the Markdown file in your VuePress site support footnotes.

<!-- more -->

## Configuration

:::: code-group

::: code-group-item TS

```ts {8}
// .vuepress/config.ts
import { mdEhance } from "vuepress-plugin-md-enhance";

export default {
  plugins: [
    mdEhance({
      // Enable Footnote
      footnote: true,
    }),
  ],
};
```

:::

::: code-group-item JS

```js {8}
// .vuepress/config.js
const { mdEhance } = require("vuepress-plugin-md-enhance");

module.exports = {
  plugins: [
    mdEhance({
      // Enable Footnote
      footnote: true,
    }),
  ],
};
```

:::

::::

## Syntax

- Use `[^Anchor text]` in Markdown to define a footnote

- Use `[^Anchor text]: ...` to describe footnote content

- If there are muti paragraph in footnote, the paragraph show be double indented

## Demo

Footnote 1 link[^first].

Footnote 2 link[^second].

Inline footnote^[Text of inline footnote] definition.

Duplicated footnote reference[^second].

[^first]: Footnote **can have markup**

    and multiple paragraphs.

[^second]: Footnote text.

```md
Footnote 1 link[^first].

Footnote 2 link[^second].

Inline footnote^[Text of inline footnote] definition.

Duplicated footnote reference[^second].

[^first]: Footnote **can have markup**

    and multiple paragraphs.

[^second]: Footnote text.
```
