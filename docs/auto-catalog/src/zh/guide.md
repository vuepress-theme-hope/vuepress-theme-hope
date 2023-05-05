---
title: Guide
icon: lightbulb
---

使用 `vuepress-plugin-auto-catalog`，你可以轻松地为你的主题自动生成目录页面。

<!-- more -->

## 控制目录

你可以在插件选项中设置 `shouldIndex`、`titleGetter` 和 `orderGetter` 来控制目录。

- `shouldIndex` 选项是一个函数，它接收 `Page` 对象作为参数并返回一个布尔值，如果该函数返回 `false`，该页面将被忽略，否则，该页面将被索引。
- `titleGetter` 选项是一个函数，它接收 `Page` 对象作为参数并返回一个字符串值，该字符串值将用作页面标题，默认情况下插件将使用 `page.title`。
- `orderGetter` 选项是一个函数，它接收 `Page` 对象作为参数，并在可能的情况下返回一个数字值，数字越大，页面在目录中的位置就月靠前。

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

该插件默认注册并使用 `<AutoCatalog />` 组件，如果你不喜欢内置组件并想使用自己的组件，你可以全局注册你的组件并使用你的组件名称设置 `component` 选项。

## 使用 AutoCatalog 组件

默认的 `<AutoCatalog />` 会将 3 层页面呈现为目录项，你可以通过设置 `level` 选项更改层次深度（仅支持 `1` `2` 和 `3`）。

如果你想给目录项添加索引号，你应该给 `<AutoCatalog />` 组件添加 `index` 属性。

By default, `<AutoCatalog />` generates catalog for current folder. If you want to generate catalog for other folder, you can set `base` props to `<AutoCatalog />` component.

默认情况下，`<AutoCatalog />` 为当前文件夹生成目录。如果你需要为其他文件夹生成目录，你可以在 `<AutoCatalog />` 组件上设置 `base` 属性。

你可以在主题布局中或直接在 Markdown 文件中使用 `<AutoCatalog />`。
