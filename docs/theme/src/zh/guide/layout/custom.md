---
title: 自定义布局
icon: customize
category: layout
tags:
  - custom
  - layout
---

主题考虑到了用户的自定义布局的需求，你可以整体或在特定页面上向主题布局的特定部分添加内容。

## 布局插槽

主题提供了 10 个插槽:

| Markdown 插槽名称 | 主题属性名    | 备注       |
| ----------------- | ------------- | ---------- |
| content-top       | contentTop    | 内容顶部   |
| content-bottom    | contentBottom | 内容底部   |
| page-top          | pageTop       | 页面顶部   |
| page-bottom       | pageBottom    | 页面底部   |
| navbar-start      | navbarStart   | 导航栏起始 |
| navbar-center     | navbarCenter  | 导航栏中部 |
| navbar-end        | navbarEnd     | 导航栏结束 |
| sidebar-top       | sidebarTop    | 侧边栏顶部 |
| sidebar-center    | sidebarCenter | 侧边栏中部 |
| sidebar-bottom    | sidebarBottom | 侧边栏底部 |

## 使用方式

你可以通过主题配置来使用组件全局启用，也可以在 Markdown 中通过特殊语法在特定页面添加内容。

### 通过 Markdown

VuePress 官方提供了一个特殊的语法:

```md
::: slot [slot-name]

插槽内容，会被作为 markdown 渲染，你也可以使用 Vue 组件。

:::
```

:::: details 例子

```md
::: slot navbar-start

Hope

:::
```

::::

### 通过主题配置

你可以通过 `themeConfig.custom` 配置插槽渲染的组件。请注意该选项和 Markdown 插入的内容互不影响，组件内容在前 Markdown 内容在后。

`custom` 对象的所有键名是上文所提到插槽名称的 `camelCase` 版本，值为组件的对应路径。

你可以填入一个绝对路径，也可以填入一个相对于 `.vuepress` 文件夹的相对路径。

::: details 例子

<CodeGroup>
<CodeGroupItem title="js">

```js
// .vuepress/config.js
const { config } = require("vuepress-theme-hope");

module.exports = config({
  themeConfig: {
    custom: {
      navbarStart: "./components/MyLogo.vue",
      sidebarStart: path.resolve(__dirname, "../common/Ads.vue"),
    },
  },
});
```

</CodeGroupItem>

<CodeGroupItem title="ts">

```ts
// .vuepress/config.ts
import theme from "vuepress-theme-hope";

export default theme.config({
  themeConfig: {
    custom: {
      navbarStart: "./components/MyLogo.vue",
      sidebarStart: path.resolve(__dirname, "../common/Ads.vue"),
    },
  },
});
```

</CodeGroupItem>
</CodeGroup>

:::
