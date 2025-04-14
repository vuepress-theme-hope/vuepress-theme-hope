---
title: 水印
icon: xmarks-lines
category:
  - 功能
tag:
  - 功能
  - 水印
watermark: true
---

VuePress Theme Hope 允许你通过 [`@vuepress/plugin-watermark`][watermark] 添加水印。

<!-- more -->

## 介绍

You can customize the watermark behavior with `plugins.watermark` in theme options, or with `watermark` in page frontmatter.

The simplest way is to set it to `true` to get a site name watermark:

- Enable globally:

你可以通过在主题选项中设置 `plugins.watermark` 或在页面 Frontmatter 中设置 `watermark` 来自定义水印行为。

最简单的方法是将其设置为 `true` 以获取站点名称水印：

- 全局启用：

  ```ts twoslash {5} title=".vuepress/theme.ts"
  import { hopeTheme } from "vuepress-theme-hope";

  export default hopeTheme({
    plugins: {
      watermark: true,
    },
  });
  ```

- 在特定页面启用：

  ```md title="example.md"
  ---
  watermark: true
  ---
  ```

你也可以完全自定义水印：

- 全局自定义:

  ```ts twoslash {5-11} title=".vuepress/theme.ts"
  import { hopeTheme } from "vuepress-theme-hope";

  export default hopeTheme({
    plugins: {
      watermark: {
        watermarkOptions: {
          content: "自定义内容",
          movable: true,
          // 其他选项
        },
      },
    },
  });
  ```

- 自定义某个页面:

  ```md title="example.md"
  ---
  watermark:
    width: 200
    height: 200
    content: Your content
    opacity: 0.5
  ---
  ```

有关详细的配置，请参见 [水印插件文档][watermark-config]。

[watermark]: https://ecosystem.vuejs.press/zh/plugins/features/watermark.html
[watermark-config]: https://ecosystem.vuejs.press/zh/plugins/features/watermark.html#options
