---
title: Custom Layout
icon: customize
category: layout
tags:
  - custom
  - layout
---

We understand the needs of custom layout, you can add content to a specific part of the theme layout on all pages or a specific page.

## Layout slot

The theme provides 10 slots:

| Markdown Slot Name | ThemeConfig Key | Note                                 |
| ------------------ | --------------- | ------------------------------------ |
| content-top        | contentTop      | top of content                       |
| content-bottom     | contentBottom   | bottom of content                    |
| page-top           | pageTop         | top of the page                      |
| page-bottom        | pageBottom      | bottom of the page                   |
| navbar-start       | navbarStart     | start of navigation bar              |
| navbar-center      | navbarCenter    | the upper part of the navigation bar |
| navbar-end         | navbarEnd       | the end of the navigation bar        |
| sidebar-top        | sidebarTop      | the top of the sidebar               |
| sidebar-center     | sidebarCenter   | the upper part of the sidebar        |
| sidebar-bottom     | sidebarBottom   | the bottom of the sidebar            |

## Usage

You can enable it globally through themeConfig using component, or you can add content to a specific page through a special syntax in Markdown.

### Via Markdown

VuePress officially provides a special syntax:

```md
::: slot [slot-name]

The slot content will be rendered as Markdown, and you can also use Vue components.

:::
```

:::: details example

```md
::: slot navbar-start

Hope

:::
```

::::

### Via ThemeConfig

You can configure the components rendered by the slot through `themeConfig.custom`. Please note that this option and the content inserted by Markdown do not affect each other, and the component content comes before the Markdown content.

All key names of the `custom` object are the `camelCase` version of the slot name mentioned above, and the value is the corresponding path of the component.

You can fill in an absolute path or a relative path under the `.vuepress` folder.

::: details example

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
