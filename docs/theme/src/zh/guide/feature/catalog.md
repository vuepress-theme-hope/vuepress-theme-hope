---
title: 目录页面
icon: network-wired
category:
  - 功能
tag:
  - 目录
  - 功能
---

VuePress Theme Hope 通过 [`@vuepress/plugin-catalog`][catalog] 提供目录组件和目录页自动生成。

<!-- more -->

## 自动目录页生成

该功能是默认启用的，如果文件夹下没有 `README.md`，主题会为自动为它生成一个目录页。如需禁用，请将 `plugins.catalog` 设置为 `false`。

```ts twoslash {7,10} title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  plugins: {
    catalog: false,
  },
});
```

你可以在主题选项中通过 `plugins.catalog` 来控制它，比如:

- 通过 `plugins.catalog.exclude` 从目录生成中排除一些文件夹
- 通过 `plugins.catalog.frontmatter` 来控制 frontmatter 的生成。

```ts twoslash {7,10} title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  plugins: {
    catalog: {
      frontmatter: (path) => {
        if (path.startsWith("/zh/")) return { title: "目录" };

        return { title: "Catalog" };
      },
      exclude: ["/api/", "/zh/api/"],
    },
  },
});
```

有关详细配置，请参阅 [目录插件文档][catalog-config]。

## 目录组件

你可以直接在 Markdown 中使用 `<Catalog>` 组件来显示目录。

::: md-demo 主页目录案例

<!-- 用于限制高度 -->
<div class="catalog-display-container">
  <Catalog base='/zh/' />
</div>

:::

[catalog]: https://ecosystem.vuejs.press/zh/plugins/features/catalog.html
[catalog-config]: https://ecosystem.vuejs.press/zh/plugins/features/catalog.html#options
