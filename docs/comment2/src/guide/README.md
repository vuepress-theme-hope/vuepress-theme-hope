---
title: Guide
icon: creative
---

This plugin register `<CommentService />` comonent globally.

We recommended you to insert the comment component (`<CommentService />`) after the `<PageNav />` component.

By default, `<CommentService />` component is enabled globally. You can disable it locally by setting `comment: false` in page frontmatter.

To keep it globally disabled, please set `comment` to `false` in the plugin options. Then you can set `comment: true` in page frontmatter to enable it locally.

Currently you can choose from Giscus and Waline.

::: tip Comment service selection

- Giscus is recommended if your blog or documentation is primarily geared towards programmers.
- If your blog or documentation is for the general public, Waline is recommended.

:::

### Giscus

See [Giscus Config Guide](giscus.md)

### Waline

See [Waline Config Guide](waline.md)
