---
title: 指南
icon: lightbulb
---

使用 `vuepress-plugin-auto-catalog`，你可以轻松地为你的主题自动生成目录页面。

<!-- more -->

## 提取信息

首先，你应该在路由元信息中设置目录信息:

::: code-tabs#language

@tab TS

```ts
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";

export default defineUserConfig({
  extendsPage: (page) => {
    // 在 routeMeta 中设置目录信息
    page.routeMeta = {
      // 目录标题
      title: page.title,
      // ... 其他信息
    };
  },
});
```

@tab JS

```js
// .vuepress/config.js
import { autoCatalogPlugin } from "vuepress-plugin-auto-catalog";

export default {
  extendsPage: (page) => {
    // 在 routeMeta 中设置目录信息
    page.routeMeta = {
      // 目录标题
      title: page.title,
      // ... 其他信息
    };
  },
};
```

:::

你可以之后导入 `defineAutoCatalogGetter` 并在客户端配置文件中使用它来从元信息中提取目录信息。

::: code-tabs#language

@tab TS

```ts
// .vuepress/client.ts
import { defineClientConfig } from "@vuepress/client";
import { defineAutoCatalogGetter } from "vuepress-plugin-auto-catalog/client";

export default defineClientConfig({
  setup: () => {
    defineAutoCatalogGetter((meta) =>
      meta.title ? { title: meta.title } : null,
    );
  },
});
```

@tab JS

```js
// .vuepress/client.js
import { defineAutoCatalogGetter } from "vuepress-plugin-auto-catalog/client";

export default {
  setup: () => {
    defineAutoCatalogGetter((meta) =>
      meta.title ? { title: meta.title } : null,
    );
  },
};
```

:::

目录信息应包含:

- `title`: 目录标题
- `order`: 目录顺序 (可选)
- `content`: 目录内容组件 (可选)

::: info 通过 order 排序

插件将按以下方式通过 `order` 对页面进行排序:

```:no-line-numbers
// 从小到大依次排列正数
order 1 的项目
order 2 的项目
...
order 10 的项目
...
// 无 order 的项目
无 order 的项目
无 order 的项目
...
// 从小到大依次排列负数
order -10 的项目
// ...
order -2 的项目
order -1 的项目
```

:::

## 排除页面

可能有一些情况你有一个 `/foo/bar.md`，但不想在 `/foo/` 生成目录页面，在这种情况下，你可以使用 `exclude` 选项来排除该页面。

::: code-tabs#language

@tab TS

```ts
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { autoCatalogPlugin } from "vuepress-plugin-auto-catalog";

export default defineUserConfig({
  plugins: [
    autoCatalogPlugin({
      // 不为 /foo/ 生成目录页
      exclude: ["/foo/"],
    }),
  ],
});
```

@tab JS

```js
// .vuepress/config.js
import { autoCatalogPlugin } from "vuepress-plugin-auto-catalog";

export default {
  plugins: [
    autoCatalogPlugin({
      // 不为 /foo/ 生成目录页
      exclude: ["/foo/"],
    }),
  ],
};
```

:::

`exclude` 选项是一个数组，接受字符串或正则表达式:

- `"/foo/"` 意味着仅排除 `/foo/` 文件夹的目录页生成。
- `/^\/foo\//` 意味着排除 `/foo/` 文件夹及其子文件夹的目录页生成。

## 控制页面 Frontmatter

默认情况下，插件将从文件夹名称生成目录页面标题。 然而，有时你可能想要进行一些自定义，因此你可以将 `frontmatter` 选项设置为一个函数，该函数接收目录页面路径作为参数，你将返回一个包含你想要的 frontmatter 的对象。

::: code-tabs#language

@tab TS

```ts
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { autoCatalogPlugin } from "vuepress-plugin-auto-catalog";

export default defineUserConfig({
  plugins: [
    autoCatalogPlugin({
      frontmatter: (path) => ({
        // 你想要的 frontmatter
        // 你可以自定义标题、作者、时间等
      }),
    }),
  ],
});
```

@tab JS

```ts
// .vuepress/config.ts
import { autoCatalogPlugin } from "vuepress-plugin-auto-catalog";

export default {
  plugins: [
    autoCatalogPlugin({
      frontmatter: (path) => ({
        // 你想要的 frontmatter
        // 你可以自定义标题、作者、时间等
      }),
    }),
  ],
};
```

:::

## 使用 AutoCatalog 组件

该插件默认全局注册并使用 `<AutoCatalog />` 组件。

默认的 `<AutoCatalog />` 会将 3 层页面呈现为目录项，你可以通过设置 `level` 选项更改层次深度（最大仅支持 3 层）。

如果你想给目录项添加索引号，你应该给 `<AutoCatalog />` 组件添加 `index` 属性。

默认情况下，`<AutoCatalog />` 为当前文件夹生成目录。如果你需要为其他文件夹生成目录，你可以在 `<AutoCatalog />` 组件上设置 `base` 属性。

你可以在主题布局中或直接在 Markdown 文件中使用 `<AutoCatalog />`。

如果你不喜欢内置组件并想使用自己的组件，你可以全局注册你的组件并使用你的组件名称设置 `component` 选项。自动目录页会使用你设置的组件。
