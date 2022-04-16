---
title: Import Markdown
icon: markdown
---

Let the Markdown file in your VuePress site support importing other Markdown files.

<!-- more -->

## Config

:::: code-group

::: code-group-item TS

```ts {8}
// .vuepress/config.ts
import { mdEnhance } from "vuepress-plugin-md-enhance";

export default {
  plugins: [
    mdEnhance({
      // Enable import Markdown
      mdImport: true,
    }),
  ],
};
```

:::

::: code-group-item JS

```js {8}
// .vuepress/config.js
const { mdEnhance } = require("vuepress-plugin-md-enhance");

module.exports = {
  plugins: [
    mdEnhance({
      // Enable import Markdown
      mdImport: true,
    }),
  ],
};
```

:::

::::

## Syntax

```md
<!-- minimal syntax -->

@[md](../foo.md)
```

To partially import the file:

```md
<!-- partial import, from line 1 to line 10 -->

@[md{1-10}](../foo.md)
```

## Demo

@[md](./demo.snippet.md)

@[md{5-9}](./demo.snippet.md)

```md
@[md](./demo.snippet.md)

@[md{5-9}](./demo.snippet.md)
```

## Advanced

You can also pass a function to handle your file path. E.g.: you can use `@src` as an alias for your source directory.

:::: code-group

::: code-group-item TS

```ts {8}
// .vuepress/config.ts
import { path } from "@vuepress/utils";
import { mdEnhance } from "vuepress-plugin-md-enhance";

export default {
  plugins: [
    mdEnhance({
      // Add `@src` alias support
      mdImport: (file) => {
        if (file.startsWith("@src"))
          return file.replace("@src", path.resolve(__dirname, ".."));

        return file;
      },
    }),
  ],
};
```

:::

::: code-group-item JS

```js {8}
// .vuepress/config.js
const { path } = require("@vuepress/utils");
const { mdEnhance } = require("vuepress-plugin-md-enhance");

module.exports = {
  plugins: [
    mdEnhance({
      // Add `@src` alias support
      mdImport: (file) => {
        if (file.startsWith("@src"))
          return file.replace("@src", path.resolve(__dirname, ".."));

        return file;
      },
    }),
  ],
};
```

:::

::::

Also, to place your Markdown files directly besides your actual files, but don’t want them rendered as pages, you can set `pagePatterns` options in VuePress config. See [pagePatterns](https://v2.vuepress.vuejs.org/reference/config.html#pagepatterns) for more details.

:::: code-group

::: code-group-item TS

```ts {8}
// .vuepress/config.ts
import { path } from "@vuepress/utils";
import { mdEnhance } from "vuepress-plugin-md-enhance";

export default {
  pagePatterns: ["**/*.md", "!*.snippet.md", "!.vuepress", "!node_modules"],

  plugins: [
    mdEnhance({
      // Add
      mdImport: (file) => {
        if (file.startsWith("@src"))
          return file.replace("@src", path.resolve(__dirname, ".."));

        return file;
      },
    }),
  ],
};
```

:::

::: code-group-item JS

```js {8}
// .vuepress/config.js
const { path } = require("@vuepress/utils");
const { mdEnhance } = require("vuepress-plugin-md-enhance");

module.exports = {
  pagePatterns: ["**/*.md", "!*.snippet.md", "!.vuepress", "!node_modules"],

  plugins: [
    mdEnhance({
      // Enable import Markdown
      mdImport: (file) => {
        if (file.startsWith("@src"))
          return file.replace("@src", path.resolve(__dirname, ".."));

        return file;
      },
    }),
  ],
};
```

:::

::::
