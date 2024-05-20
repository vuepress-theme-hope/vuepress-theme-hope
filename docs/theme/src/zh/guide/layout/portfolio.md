---
title: 档案主页
icon: user-tag
order: 8
category:
  - 布局
tag:
  - 布局
  - 档案主页
---

`vuepress-theme-hope` 提供了一个档案主页用于个人介绍。

如果想使用它，你需要在页面 frontmatter 中设置 `home: true` 和 `portfolio: true`。

## 个人信息

名称默认为主题选项中的 `author` 选项，你可以在 frontmatter 中设置 `name` 进行自定义。欢迎信息可以通过 frontmatter 中的 `welcome` 选项进行自定义。

为了描述自己，请在 frontmatter 中通过 `titles` 设置适合你的职称。另外你需要使用 `avatar` 设置你的图像 (如果需要，还可以使用 `avatarDark` 用于深色模式)。 你还可以设置 `bgImage` (如果需要，还可以设置 `bgImageDark` 用于深色模式) 来自定义背景图像。你可以使用 `avatarStyle` 和 `bgImageStyle` 选项来完成对形象和背景图片样式调整。

同时你可以在 frontmatter 中设置 `medias` 设置一些媒体，你需要为每个媒体设置 `name`、`icon` 和 `url`。当博客功能启用时，会默认渲染在 `blog.medias` 中设置的媒体链接，

默认情况下，我们会对档案页面的内容应用特殊样式，你可以在 frontmatter 中设置 `content: doc` 来恢复原始样式，或者设置 `content: none` 来隐藏 Markdown 内容。

::: info 即时案例

- [一个档案主页案例](../../demo/portfolio-home.md)

:::
