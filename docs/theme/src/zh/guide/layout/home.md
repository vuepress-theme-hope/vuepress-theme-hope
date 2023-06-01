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

你可以通过 `bgImage` 和 `bgImageDark` 设置背景图片，但需要注意必须填入完整 URL 或绝对路径。如果你希望信息全屏展示，你可以设置 `heroFullScreen: true`。

如果你需要定制一些样式，你可以通过 `heroImageStyle` 和 `bgImageStyle` 设置 Logo 与背景图片的样式。

## 主页按钮

你可以将一些重要的链接以按钮的形式展示在主页中。

你可以通过 `actions` 设置它们，它是一个数组，每个元素都是一个对象，包含以下键值:

- `text`: 按钮文字
- `link`: 按钮链接
- `type`: 按钮类型 (仅支持 `"primary"` 与 `"default"` (默认))

## 项目功能 (旧版)

你可以通过 `features` 设置并展示项目特性，它是一个数组，每个元素都是一个对象，包含以下键值:

- `title`: 标题
- `details`: 详情
- `icon`(可选): 可填入完整路径或绝对路径的图片链接，或 FontClass
- `link`(可选): 链接地址

## 项目亮点与功能

你可以通过 `highlights` 来设置和显示项目功能和亮点，它是一个数组，每个元素都是一个对象，代表一个功能或亮点章节。

亮点使用 `highlights` 来设置亮点，功能使用 `features` 来设置功能 (你只能设置其一)。两者都是数组，每个元素都是一个对象，代表一个亮点或者功能项：

- `title`: 标题，支持 HTML 字符串
- `details`: 细节，支持 HTML 字符串
- `icon` (可选)：可以填写完整路径或绝对路径图片链接，或 FontClass
- `link` (可选)：链接地址

你也可以设置以下可选属性：

- `header`: 章节标题，支持 HTML 字符串
- `description`: 章节描述，支持 HTML 字符串
- `color`: 文字颜色
- `image`: 章节图像
- `imageDark`：在深色模式中使用的章节图像
- `bgImage`：章节背景图像
- `bgImageDark`：在暗深色模式中使用的章节背景图像
- `type`: `"order"`, `"un-order"` (默认) 或 `"no-order"`

::: info

关于完整的配置项目，请参见 [主页 Frontmatter 配置](../../config/frontmatter/home.md)。

:::

## 配置案例

- [使用功能的项目主页](../../demo/project-home.md)

- [使用亮点的项目主页](../../README.md)

::: details 功能项目主页代码

@[code](../../demo/project-home.md)

:::

::: details 亮点项目主页代码

@[code](../../README.md)

:::
