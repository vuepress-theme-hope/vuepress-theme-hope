---
title: 路径导航
icon: navigation
order: 3
category:
  - 布局
tag:
  - 布局
  - 路径导航
---

`vuepress-theme-hope` 添加了开箱即用的路径导航支持，你可以通过 `breadcrumb` 字段控制它 <Badge text="支持页面配置" /> [^support-page-config]，默认的值为 `true`。

无需任何额外配置，一个和主题色相符合的路径导航会显示在页面内容最上方，帮助阅读者理解文档结构。

你也可以通过 `breadcrumbIcon` 字段 <Badge text="支持页面配置" /> 控制路径导航的图标显示，默认值为 `true`。

<!-- more -->

::: warning 注意事项

为了保证路径导航更好的提示，建议在每一个路径下创建 README.md 文件，同时为它们设置标题。否则，路径导航将因对应层级文件夹没有主页，无法生成标题与链接而忽略那一层级。

请尤其注意，为主页也设置一个标题!

:::

[^support-page-config]: **支持页面配置** <Badge text="支持页面配置" />

    **支持页面配置** 指主题允许页面的配置覆盖全局的配置。这意味着你可以在全局启用的情况下，在特定页面将其禁用，或在全局禁用的情况下在特定页面启用。

    ::: details 例子

    以路径导航为例:

    该功能默认全局启用，即主题选项中 `breadcrumb` 默认为 `true`，同时你可以在特定页面的 frontmatter 中设置 `breadcrumb: false` 来局部禁用它。

    当然你也可以在主题选项中设置 `breadcrumb: false` 来全局禁用它，之在特定页面的 frontmatter 中设置 `breadcrumb: true` 来局部启用它。

    :::
