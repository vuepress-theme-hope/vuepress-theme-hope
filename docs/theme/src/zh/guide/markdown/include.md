---
title: 导入文件
icon: fab fa-markdown
  - Markdown
tag:
  - Markdown
  - 导入文件
---

让你的 VuePress 站点中的 Markdown 文件支持导入其他文件。

<!-- more -->

## 配置

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

<!-- @include: @md-enhance/zh/guide/content/include.md#after -->

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
        // 添加 `@src` 别名支持
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
        // 添加 `@src` 别名支持
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

此外，如果你想将 Markdown 文件直接放在实际文件旁边，但不希望它们呈现为页面，你可以在 VuePress 配置中设置 `pagePatterns` 选项。有关详细信息，请参阅 [pagePatterns](https://vuejs.press/zh/reference/config.html#pagepatterns)。

::: code-tabs#language

@tab TS

```ts {6-7}
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  // 现在任何带有 `.snippet.md` 扩展名的文件都不会呈现为页面
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
  // 现在任何带有 `.snippet.md` 扩展名的文件都不会呈现为页面
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
