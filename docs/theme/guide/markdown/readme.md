---
icon: markdown
---

# Markdown 中的新语法

vuepress-theme-hope 通过内置 [md-enhance](https://vuepress-md-enhance.mrhope.site/)，在 Markdown 中启用了更多的语法。

`.vuepress/config.js` 中的 `themeconfig.markdown` 会直接传递给插件作为插件选项。所以你也可以直接阅读 [md-enhance 文档](https://vuepress-md-enhance.mrhope.site/) 查看用法。

::: tip
请不用担心你的网站大小，如果你不启用相关功能，最终代码不会包含这些功能相关的代码。
:::

## 一键启用

你可以设置 `themeconfig.markdown.enableAll` 启用 [md-enhance](https://vuepress-md-enhance.mrhope.site/) 插件的所有功能。

```js
module.exports = {
  themeConfig: {
    markdown: {
      enableAll: true
    }
  }
};
```

## 上下角标

[点击查看](sup-sub.md)

## 脚注

[点击查看](footnote.md)

## 流程图

[点击查看](flowchart.md)

## Tex 语法

[点击查看](tex.md)
