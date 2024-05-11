---
title: 博客首页
icon: home
order: 6
category:
  - 博客
tag:
  - 博客
  - 主页
  - 布局
---

`vuepress-theme-hope` 允许你启用博客风格的首页。

<!-- more -->

## 博客类型主页

你需要在相应的页面的 frontmatter 中，设置 `home: true` 和 `layout: BlogHome` 来使用博客主页。

![首页截图](./assets/blog-light.jpg#light)
![首页截图](./assets/blog-dark.jpg#dark)

你可以使用 `heroText` 设置主标题，并通过 `tagline` 设置副标题。

如果你有一个 Logo，你可以将其放置在 `public` 文件夹中，并通过 `heroImage` 设置它，如果你在夜间模式希望展示另一个 Logo， 可以使用 `heroImageDark`。为了更好的 A11y，我们建议你设置 Logo 的描述到 `heroAlt`。

你可以通过 `bgImage` 和 `bgImageDark` 设置背景图片，但需要注意必须填入完整 URL 或绝对路径。如果你希望信息全屏展示，你可以设置 `heroFullScreen: true`。

如果你需要定制一些样式，你可以通过 `heroImageStyle` 和 `bgImageStyle` 设置 Logo 与背景图片的样式。

通常情况下，你可能希望在主页中展示一些项目、书籍、文章、链接、友链等。你可以通过 `projects` 设置它们，它是一个数组，每个元素都是一个对象，包含以下键值:

- `name`: 项目名称，必填
- `link`: 项目链接，必填，填入外部链接或绝对路径。
- `desc`: 项目描述，选填
- `icon`: 图标，可填入完整路径或绝对路径的图片链接、图标 FontClass 等。

  同时提供了如下内置图标支持: `"link"`、`"project"`、`"book"`、`"article"`、`"friend"`

::: info

关于完整的配置项目，请参见 [博客主页 Frontmatter 配置](../../config/frontmatter/blog-home.md)。

:::

::: info 即时案例

- [当前文档的博客主页](../../demo/blog-home.md)
- [当前文档的自定义博客主页](../../demo/custom-blog-home.md)

:::

## 档案类型主页

在主页的 frontmatter 中设置 `layout: PortfolioHome` 和 `home: true`。

名称默认为主题选项中的 `author` 选项，你可以在 frontmatter 中设置 `name` 进行自定义。欢迎信息也可以通过 frontmatter 中的 `welcome` 选项进行自定义。

为了描述自己，请在 frontmatter 中通过 `titles` 设置适合你的职称。另外你需要使用 `avatar` 设置你的图像 (如果需要，还可以使用 `avatarDark` 用于深色模式)。 你还可以设置 `bgImage` (如果需要，还可以设置 `bgImageDark` 用于深色模式) 来自定义背景图像。你可以使用 `avatarStyle` 和 `bgImageStyle` 选项来完成对形象和背景图片样式调整。

默认情况下，会显示在 `blog.medias` 中设置的媒体链接，同时你也可以在 frontmatter 中设置 `medias` 进行覆盖，你需要为每个媒体设置 `name`、`icon` 和 `url`。

Markdown 中的内容默认会被隐藏，你可以通过 `content` 选项来显示。

::: info 即时案例

- [一个档案主页案例](../../demo/portfolio-home.md)

:::
