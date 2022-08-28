---
title: Include Files
icon: markdown
---

Let the Markdown file in your VuePress site support including other files.

<!-- more -->

## Config

::: code-tabs#language

@tab TS

```ts {8}
// .vuepress/config.ts
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";

export default {
  plugins: [
    mdEnhancePlugin({
      // Enable include files
      include: true,
    }),
  ],
};
```

@tab JS

```js {8}
// .vuepress/config.js
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";

export default {
  plugins: [
    mdEnhancePlugin({
      // Enable include files
      include: true,
    }),
  ],
};
```

:::

## Syntax

Use `@include(filename)` to include a file.

To partially import the file, you can specify the range of lines to be included:

- `@include(filename{start-end})`
- `@include(filename{start-})`
- `@include(filename{-end})`

## Demo

`@include(./demo.snippet.md)`:

@include(./demo.snippet.md)

`@include(./demo.snippet.md{5-9})`:

@include(./demo.snippet.md{5-9})

## Advanced

You can also set an object to customize include filepath and include behavior.

```ts
interface IncludeOptions {
  /**
   * handle include filePath
   *
   * @default (path) => path
   */
  getPath?: (path: string) => string;

  /**
   * Whether deep include files in included markdown files
   *
   * @default false
   */
  deep?: boolean;
}
```

E.g.: you can use `@src` as an alias for your source directory.

::: code-tabs#language

@tab TS

```ts {8}
// .vuepress/config.ts
import { path } from "@vuepress/utils";
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";

export default {
  plugins: [
    mdEnhancePlugin({
      // Add `@src` alias support
      include: {
        getPath: (file) => {
          if (file.startsWith("@src"))
            return file.replace("@src", path.resolve(__dirname, ".."));

          return file;
        },
      },
    }),
  ],
};
```

@tab JS

```js {8}
// .vuepress/config.js
import { path } from "@vuepress/utils";
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";

export default {
  plugins: [
    mdEnhancePlugin({
      // Add `@src` alias support
      include: {
        getPath: (file) => {
          if (file.startsWith("@src"))
            return file.replace("@src", path.resolve(__dirname, ".."));

          return file;
        },
      },
    }),
  ],
};
```

:::

Also, to place your Markdown files directly besides your actual files, but don’t want them rendered as pages, you can set `pagePatterns` options in VuePress config. See [pagePatterns](https://v2.vuepress.vuejs.org/reference/config.html#pagepatterns) for more details.

::: code-tabs#language

@tab TS

```ts {8}
// .vuepress/config.ts
import { path } from "@vuepress/utils";
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";

export default {
  pagePatterns: ["**/*.md", "!*.snippet.md", "!.vuepress", "!node_modules"],

  plugins: [
    mdEnhancePlugin({
      include: true,
    }),
  ],
};
```

@tab JS

```js {8}
// .vuepress/config.js
import { path } from "@vuepress/utils";
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";

export default {
  pagePatterns: ["**/*.md", "!*.snippet.md", "!.vuepress", "!node_modules"],

  plugins: [
    mdEnhancePlugin({
      include: true,
    }),
  ],
};
```

:::
