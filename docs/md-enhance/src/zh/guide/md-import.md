---
title: Import Markdown
icon: markdown
---

让您的 VuePress 站点中的 Markdown 文件支持导入其他 Markdown 文件。

<!-- 更多 -->

## 配置

:::: code-group

::: code-group-item TS

```ts {8}
// .vuepress/config.ts
import { mdEnhance } from "vuepress-plugin-md-enhance";

export default {
  plugins: [
    mdEnhance({
      // 启用 Markdown 导入
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
      // 启用 Markdown 导入
      mdImport: true,
    }),
  ],
};
```

:::

::::

## 语法

```md
<!-- 最简单的语法 -->

@[md](../foo.md)
```

如果要部分导入文件:

```md
<!-- 部分导入，从第 1 行到第 10 行 -->

@[md{1-10}](../foo.md)
```

## 演示

@[md](./demo.snippet.md)

@[md{5-9}](./demo.snippet.md)

```md
@[md](./demo.snippet.md)

@[md{5-9}](./demo.snippet.md)
```

## 高级用法

您还可以传递一个函数来处理您的文件路径。例如：您可以使用 `@src` 作为源文件夹的别名。

:::: code-group

::: code-group-item TS

```ts {8}
// .vuepress/config.ts
import { path } from "@vuepress/utils";
import { mdEnhance } from "vuepress-plugin-md-enhance";

export default {
  plugins: [
    mdEnhance({
      // 添加 `@src` 别名支持
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
      // 添加 `@src` 别名支持
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

此外，如果您想将 Markdown 文件直接放在实际文件旁边，但不希望它们呈现为页面，您可以在 VuePress 配置中设置 `pagePatterns` 选项。有关详细信息，请参阅 [pagePatterns](https://v2.vuepress.vuejs.org/zh/reference/config.html#pagepatterns)。

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
