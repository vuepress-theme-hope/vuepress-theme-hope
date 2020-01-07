---
icon: breadcrumb
---

# 路径导航

本主题添加了开箱即用的全新的路径导航支持。

无需任何额外配置，一个和主题色相符合的路径导航会显示在页面内容最上方，帮助阅读者理解文档结构。

::: warning
为了保证路径导航正常运行，每一个路径下均应包含 readme.md 文件
:::

## 启用与禁用 <MyBadge text="页面覆盖全局支持" />

该功能默认启用。配置项为 `breadcrumb`。关于页面覆盖全局支持的更多介绍请见脚注[^applypartically]

## 图标支持

默认启用图标支持，将在链接前显示页面的图标。可以在 `themeConfig.breadcrumbIcon` 中禁用它。

[^applypartically]: **页面覆盖全局支持**

    **页面覆盖全局支持** 指页面的配置可以覆盖全局的配置。
    
    即在全局禁用后能在特定页面内启用，全局启用时也可在特定页面内禁用。

    ::: tip 例子
    以路径导航为例：
  
    该功能默认全局启用，即 `themeConfig.breadcrumb` 默认为 `true`，同时你可以在特定页面的 frontmatter 中设置 `breadcrumb: false` 来局部禁用它。
  
    当然你也可以将 `themeConfig.breadcrumb` 字符设置为 `false` 来全局禁用它，之在特定页面的 frontmatter 中设置 `breadcrumb: true` 来局部启用它。
    :::
