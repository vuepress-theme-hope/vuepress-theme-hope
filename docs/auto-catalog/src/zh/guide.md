---
title: Guide
icon: lightbulb
---

使用 `vuepress-plugin-auto-catalog`，你可以轻松地为你的主题自动生成目录页面。

## 排除页面

可能有一些情况你有一个 `/foo/bar.md`，但不想在 `/foo/` 生成目录页面，在这种情况下，你可以使用 `exclude` 选项来排除该页面。

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

默认情况下，插件将从文件夹名称生成目录页面标题。 然而，有时你可能想要进行一些自定义，因此你可以将 `frontmatter` 选项设置为一个函数，该函数接收目录页面路径作为参数，你将返回一个包含你想要的 frontmatter 的对象。

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

## 自定义组件

该插件默认注册并使用 `<AutoCatalog />` 组件，如果您不喜欢内置组件并想使用自己的组件，您可以全局注册您的组件并使用您的组件名称设置 `component` 选项。

## 使用 AutoCatalog 组件

默认的 `<AutoCatalog />` 会将 3 层页面呈现为目录项，您可以通过设置 `level` 选项更改层次深度（仅支持 `1` `2` 和 `3`）。

您可以在主题布局中或直接在 Markdown 文件中使用 `<AutoCatalog />`。
