---
icon: infofill
---

# 介绍

::: danger 非稳定状态
本主题仍在制作中，API 可能会有重大的变动。

如果您在使用过程中遇到了bug，可以 [提一个issue](https://github.com/Mister-Hope/vuepress-theme-hope/issues)。
:::

## 主题特点

主题继承了 Vupress 的默认主题，并很大程度上保持了 Vuepress 默认主题的风格。同时主题做了如下优化：

- 导航栏、侧边栏的外观美化与功能增强，同时了图标支持
- 主题色、夜间模式与全屏按钮
- 为所有页面添加阅读量展示、评论功能与图标、页脚支持
- 添加了新的路径导航功能

::: tip
您应当已经熟悉 Vuepress 的默认主题，因为所有跟默认主题相关的内容都不会被介绍。

如果您希望阅读 Vuepress 默认主题配置，请访问 [Vuepress 默认主题配置](https://v1.vuepress.vuejs.org/zh/theme/default-theme-config.html)
:::

## 新增功能

- **图标支持**

  整个主题在多处都添加了 FontClass 格式图标的支持。

  请在 `.vuepress/styles` 的 `index.styl` 中导入对应的图标css文件。例如：

  ```css
  @import '//at.alicdn.com/t/font_1426813_4mkpyb46f89.css'
  ```

  图标的前置名默认为 `icon-`，可以在主题配置[^themeConfig]中的 `iconPrefix` 字段进行更改。

- [**导航栏**](navbar.md)

  - [图标显示](navbar.md#图标支持)
  - [主题色切换](themecolor.md#自定义主题色)
  - [夜间模式](themecolor.md#夜间模式)
  - [全屏按钮](fullscreen.md)
  - [外观美化](navbar.md#样式更改)

- [**页面**](page.md)

  - [阅读量与作者信息展示](page.md#文章信息展示)
  - [页面图标](page.md#图标支持)
  - [底部评论](comment.md)
  - [自定义页脚](page.md#页脚支持)
  - [主页](home.md)

- [**侧边栏**](sidebar.md)

  - [图标显示](sidebar.md#图标支持)
  - [分组增强](sidebar.md#分组增强)

- [**路径导航**](breadcrumb.md)

  添加了全新的路径导航，同时路径导航支持显示图标。

- [**新增组件**](component.md)

  - [徽章 `<MyBadge />`](component.md#徽章): 在官方基础上增加了颜色支持

[^themeConfig]: 主题配置字段即 `.vuepress/config.js` 默认导出的 `themeConfig` 对象
