---
title: Guide
icon: creative
---

使用 `vuepress-plugin-auto-catalog`，您可以轻松地为您的主题自动生成目录页面。

## 排除页面

可能有一些情况你有一个 `/foo/bar.md`，但不想在 `/foo/` 生成目录页面，在这种情况下，您可以使用 `exclude` 选项来排除该页面。

```ts
// .vuepress/config.ts
import { autoCatalogPlugin } from "vuepress-plugin-auto-catalog";

export default {
  plugins: [
    autoCatalogPlugin({
      exclude: ["/foo/"],
    }),
  ],
};
```

`exclude` 选项接受字符串数组或 RegExp。

## 控制页面 Frontmatter

默认情况下，插件将从文件夹名称生成目录页面标题。 然而，有时您可能想要进行一些自定义，因此您可以将 `frontmatter` 选项设置为一个函数，该函数接收目录页面路径作为参数，您将返回一个包含您想要的 frontmatter 的对象。

```ts
// .vuepress/config.ts
import { autoCatalogPlugin } from "vuepress-plugin-auto-catalog";

export default {
  plugins: [
    autoCatalogPlugin({
      frontmatter: (path) => {
        return {
          // frontmatter you want
        };
      },
    }),
  ],
};
```
