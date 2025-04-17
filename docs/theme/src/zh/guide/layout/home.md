---
title: 主页
icon: home
order: 3
category:
  - 布局
tag:
  - 布局
  - 主页
---

`vuepress-theme-hope` 提供了一个强大主页，在此基础上改进样式与配置。

如果想要使用它，请在 frontmatter 中设置 `home: true`。任何 frontmatter 之后的内容将会以普通的 Markdown 被渲染，并插入到主页渲染内容的底部。

<!-- more -->

## 站点信息

你可以使用 `heroText` 设置主标题，并通过 `tagline` 设置副标题。

::: details 例子

```md title="README.md"
---
home: true
heroText: 我的项目
tagline: 一个强大的项目
---
```

:::

如果你有一个 Logo，你可以将其放置在 `public` 文件夹中，并通过 `heroImage` 设置它，如果你在夜间模式希望展示另一个 Logo， 可以使用 `heroImageDark`。为了更好的 A11y，我们建议你设置 Logo 的描述到 `heroAlt`。

::: details 例子

```md title="README.md"
---
home: true
heroImage: /logo.png
heroImageDark: /logo-dark.png
heroAlt: 我的项目
---
```

:::

::: important

Frontmatter 中的媒体只能使用绝对路径或完整 URL。这些媒体无法被打包器跟踪，因此相对路径将无法工作。

:::

你可以通过 `bgImage` 和 `bgImageDark` (可选) 设置背景图片:

::: details 例子

```md title="README.md"
---
home: true
bgImage: /bg.png
# 默认使用 bgImage
bgImageDark: /bg-dark.png
---
```

:::

如果你希望信息全屏展示，你可以设置 `heroFullScreen: true`，同时你可以通过 设置 Hero 的样式。

如果你需要定制一些样式，你可以通过 `heroStyle` `heroImageStyle` 和 `bgImageStyle` 设置 Hero、Logo 与背景图片的样式。CSS 字符串与对象都支持。

::: details 例子

```md title="README.md"
---
home: true
# 设置 hero 全屏
heroFullScreen: true
# CSS 字符串
heroStyle: "background-color: #000"
# CSS 对象
heroImageStyle:
  width: 100px
  height: 100px
---
```

:::

## 主页按钮

你可以将一些重要的链接以按钮的形式展示在主页中。

你可以通过 `actions` 设置它们，它是一个数组，每个元素都是一个对象，包含以下键值:

- `text`: 按钮文字
- `link`: 按钮链接
- `type`: 按钮类型 (仅支持 `"primary"` 与 `"default"`)
- `icon` (可选): 支持 [所有格式的 Icon](../interface/icon.md)

::: details 例子

```md title="README.md"
---
home: true
actions:
  - text: 快速上手
    link: /zh/get-started/
    icon: signs-post
    type: primary

  - text: 指南
    icon: lightbulb
    link: /zh/guide/
---
```

:::

## 项目功能 (旧版)

你可以通过 `features` 设置并展示项目特性，它是一个数组，每个元素都是一个对象，包含以下键值:

- `title`: 标题
- `details`: 详情
- `icon`(可选): 可填入完整路径或绝对路径的图片链接，或 FontClass
- `link`(可选): 链接地址

::: details 例子

```md title="README.md"
---
home: true
features:
  - title: 浏览量与评论
    icon: comment-dots
    details: 配合 Waline 来开启阅读量统计与评论支持
    link: /zh/guide/feature/comment.html

  - title: 搜索支持
    icon: search
    details: 支持 docsearch 和基于客户端的搜索
    link: /zh/guide/feature/search.html
---
```

:::

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

亮点也支持以下属性：

- `type`: `"order"`, `"un-order"` (默认) 或 `"no-order"`

::: details 例子

```md title="README.md"
---
home: true
highlights:
  - header: 易于安装
    image: /assets/image/box.svg
    bgImage: https://theme-hope-assets.vuejs.press/bg/3-light.svg
    bgImageDark: https://theme-hope-assets.vuejs.press/bg/3-dark.svg
    highlights:
      - title: 运行 <code>pnpm create vuepress-theme-hope hope-project</code> 以创建一个新的主题项目。
      - title: 在已有项目根目录下运行 <code>pnpm create vuepress-theme-hope add .</code> 以在项目中添加主题。

  - header: 在 Markdown 中添加你想要的内容
    description: 我们扩展了标准的 CommonMark 规范，为你添加了成吨功能。
    image: /assets/image/markdown.svg
    bgImage: https://theme-hope-assets.vuejs.press/bg/2-light.svg
    bgImageDark: https://theme-hope-assets.vuejs.press/bg/2-dark.svg
    bgImageStyle:
      background-repeat: repeat
      background-size: initial
    features:
      - title: 链接检查
        icon: clipboard-check
        details: 检查 Markdown 链接
        link: ./guide/markdown/others.html#link-check

      - title: 提示容器
        icon: box-archive
        details: 用样式装饰 Markdown 内容
        link: ./guide/markdown/stylize/hint.html
---
```

:::

## 配置案例

::: info

关于完整的配置项目，请参见 [主页 Frontmatter 配置](../../config/frontmatter/project-home.md)。

:::

- [使用功能的项目主页](../../demo/project-home.md)

- [使用亮点的项目主页](../../README.md)

::: details 功能项目主页代码

@[code](../../demo/project-home.md)

:::

::: details 亮点项目主页代码

@[code](../../README.md)

:::
