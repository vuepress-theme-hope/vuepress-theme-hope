---
title: Guide
icon: lightbulb
---

## Adding Comment

This plugin globally registers a component `<CommentService />`.

- If you are a user, you should use `alias` and layout slots to insert the component. We recommended you to insert the comment component (`<CommentService />`) after the `<PageNav />` component, and [here is a demo](../demo.md) with default theme.
- If you are a theme developer, you should insert this component in the layout of your theme.

## Comment Status

By default, `<CommentService />` component is enabled globally, and you can use `comment` option in both plugin options and page frontmatter to control it.

- You can disable it locally by setting `comment: false` in page frontmatter.

- To keep it globally disabled, please set `comment` to `false` in the plugin options. Then you can set `comment: true` in page frontmatter to enable it locally.

## Comment Services

Currently you can choose from Giscus, Waline, Twikoo and Artalk.

::: tip Choosing from comment services

People who your blog or documentation are targeting:

- Programmers and developers: Giscus
- General public: Waline

:::

- [Giscus Guide](giscus.md)

- [Waline Guide](waline.md)

- [Twikoo Guide](twikoo.md)

- [Artalk Guide](artalk.md)
