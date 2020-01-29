---
icon: breadcrumb
tag:
  - component
  - layout
category: layout
---

# 路径导航

本主题添加了开箱即用的路径导航支持。

无需任何额外配置，一个和主题色相符合的路径导航会显示在页面内容最上方，帮助阅读者理解文档结构。

::: warning
为了保证路径导航更好的提示，建议在每一个路径下创建 readme.md 文件。

否则，路径导航将因对应层级文件夹没有主页，无法生成标题与链接，而自动忽略那一层级。
:::

## 启用与禁用 <MyBadge text="支持局部配置" />

该功能默认启用。可以在 `themeConfig` 将 `breadcrumb` 设置为 `false` 来禁用它。

关于 **支持局部配置** 的更多介绍请见脚注[^applypartically]

## 图标支持

默认启用图标支持，将在链接前显示页面的图标。可以在 `themeConfig` 将 `breadcrumbIcon` 设置为 `false` 来禁用它。

[^applypartically]: **支持局部配置**

    **支持局部配置** 指主题允许页面的配置覆盖全局的配置。

    ::: details 例子
    以路径导航为例：
  
    该功能默认全局启用，即 `themeConfig.breadcrumb` 默认为 `true`，同时你可以在特定页面的 frontmatter 中设置 `breadcrumb: false` 来局部禁用它。
  
    当然你也可以将 `themeConfig.breadcrumb` 字符设置为 `false` 来全局禁用它，之在特定页面的 frontmatter 中设置 `breadcrumb: true` 来局部启用它。
    :::
