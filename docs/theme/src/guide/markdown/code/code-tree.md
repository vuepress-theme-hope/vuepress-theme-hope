---
title: Code Tree
icon: file-code
category:
  - Markdown
tag:
  - Code Tree
  - Markdown
---

Put the code blocks of several files together with a file tree.

<!-- more -->

## Settings

```ts twoslash {5} title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  markdown: {
    codeTree: true,
  },
});
```

You can also pass an object to set the default height of code trees.

```ts twoslash {5-7} title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  markdown: {
    codeTree: {
      height: "400px",
    },
  },
});
```

## Syntax

Wrap several code blocks in a `code-tree` container, and add a `title="filepath"` attribute to a code block to declare the file it belongs to.

- Text after the container marker is the title of the code tree.
- `height` declares the height of the code tree, a bare number is treated as pixels.
- `entry` declares the file opened by default, and `:active` on a code block has a higher priority.
- Code blocks without a `title` attribute are ignored, and files are arranged by their path.
- The first code block is opened by default when neither `entry` nor `:active` is declared.

### Embedding a directory

Use `@[code-tree](dir_path)` to render all code files in a directory. A path starting with `/` is resolved from the source directory, any other path is resolved from the directory of the current page.

## Demo

:::: preview

::: code-tree Project Files height="320px" entry="src/index.ts"

```ts title="src/index.ts"
import { createApp } from "vue";

import App from "./App.vue";

createApp(App).mount("#app");
```

```vue title="src/App.vue"
<script setup>
import { ref } from "vue";

const msg = ref("Hello World!");
</script>

<template>
  <h1>{{ msg }}</h1>
</template>
```

```json title="package.json"
{
  "name": "demo",
  "scripts": {
    "dev": "vite"
  }
}
```

:::

::::

::: warning

The code tree relies on the code block title feature of the highlighter, which is enabled by default in `@vuepress/plugin-shiki` and `@vuepress/plugin-prismjs`. Do not disable `codeBlockTitle`, or replace it with a custom render function, otherwise the code tree renders without any code block.

:::
