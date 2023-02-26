---
title: 首页
icon: home
order: 7
category:
  - 布局
tag:
  - 布局
  - 主页
---

`vuepress-theme-hope` 保留了默认主题的首页配置，在此基础上改进样式与配置。

如果想要使用它，请在 frontmatter 中设置 `home: true`。任何 frontmatter 之后的内容将会以普通的 Markdown 被渲染，并插入到主页渲染内容的底部。

![首页截图](./assets/home-light.jpg#light)
![首页截图](./assets/home-dark.jpg#dark)

<!-- more -->

## 站点信息

你可以使用 `heroText` 设置主标题，并通过 `tagline` 设置副标题。

如果你有一个 Logo，你可以将其放置在 `public` 文件夹中，并通过 `heroImage` 设置它，如果你在夜间模式希望展示另一个 Logo， 可以使用 `heroImageDark`。为了更好的 A11y，我们建议你设置 Logo 的描述到 `heroAlt`。

## 主页按钮

你可以将一些重要的链接以按钮的形式展示在主页中。

你可以通过 `actions` 设置它们，它是一个数组，每个元素都是一个对象，包含以下键值:

- `text`: 按钮文字
- `link`: 按钮链接
- `type`: 按钮类型 (仅支持 `"primary"` 与 `"default"` (默认))

## 项目特性

你可以通过 `features` 设置并展示项目特性，它是一个数组，每个元素都是一个对象，包含以下键值:

- `title`: 标题
- `details`: 详情
- `icon`(可选): 可填入完整路径或绝对路径的图片链接，或 FontClass
- `link`(可选): 链接地址

::: info

关于完整的配置项目，请参见 [主页 Frontmatter 配置](../../config/frontmatter/home.md)。

:::

## 配置案例

@[code{1-116}](../../README.md)
