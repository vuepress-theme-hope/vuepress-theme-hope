---
title: Include Files
icon: fab fa-markdown
category:
  - Markdown
tag:
  - Code Demo
  - Include Files
---

Let the Markdown file in your VuePress site support including other files.

<!-- more -->

## Settings

::: code-tabs#language

@tab TS

```ts {8-10}
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        include: true,
      },
    },
  }),
});
```

@tab JS

```js {7-9}
// .vuepress/config.js
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        include: true,
      },
    },
  }),
};
```

:::

<!-- @include: @md-enhance/guide/content/include.md#after -->

::: code-tabs#language

@tab TS

```ts {13-20}
// .vuepress/config.ts
import { getDirname, path } from "@vuepress/utils";
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

const __dirname = getDirname(import.meta.url);

export default defineUserConfig({
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        // Add `@src` alias support
        include: {
          resolvePath: (file) => {
            if (file.startsWith("@src"))
              return file.replace("@src", path.resolve(__dirname, ".."));

            return file;
          },
        },
      },
    },
  }),
});
```

@tab JS

```js {12-19}
// .vuepress/config.js
import { getDirname, path } from "@vuepress/utils";
import { hopeTheme } from "vuepress-theme-hope";

const __dirname = getDirname(import.meta.url);

export default {
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        // Add `@src` alias support
        include: {
          resolvePath: (file) => {
            if (file.startsWith("@src"))
              return file.replace("@src", path.resolve(__dirname, ".."));

            return file;
          },
        },
      },
    },
  }),
};
```

:::

Also, to place your Markdown files directly besides your actual files, but don't want them rendered as pages, you can set `pagePatterns` options in VuePress config. See [pagePatterns](https://vuejs.press/reference/config.html#pagepatterns) for more details.

::: code-tabs#language

@tab TS

```ts {6-7}
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  // now any file with `.snippet.md` extension will not be rendered as a page
  pagePatterns: ["**/*.md", "!**/*.snippet.md", "!.vuepress", "!node_modules"],

  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        include: true,
      },
    },
  }),
});
```

@tab JS

```js {5-6}
// .vuepress/config.js
import { hopeTheme } from "vuepress-theme-hope";

export default {
  // now any file with `.snippet.md` extension will not be rendered as a page
  pagePatterns: ["**/*.md", "!**/*.snippet.md", "!.vuepress", "!node_modules"],

  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        include: true,
      },
    },
  }),
};
```

:::
