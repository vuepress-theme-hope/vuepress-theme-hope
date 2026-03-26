---
title: Article List
icon: clipboard-list
order: 3
category:
  - Blog
tag:
  - Article
  - Blog
  - Encrypt
  - Slide
  - Star
---

The theme automatically aggregates all articles and renders an article list at the `/article/` route.

![Article list](./assets/article-list-light.png#light)
![Article list](./assets/article-list-dark.png#dark)

## Article Configuration

By default, all Markdown files are included in the article list.

- **Exclude Articles:** Set `article: false` in the page Frontmatter, or configure custom exclusion logic via `plugins.blog.filter` in the theme options.
- **Sticky Articles:** Set `sticky: true` in the Frontmatter to pin an article to the top of the list.

::: tip
To explicitly control the sorting order of sticky articles, assign a numeric value to `sticky` (e.g., `sticky: 2`). Higher values are prioritized.
:::

## Excerpts

### Defining Excerpts

Use the `<!-- more -->` comment in your Markdown file to designate an excerpt. Any content preceding this marker is extracted as the article excerpt.

To override the default extraction, define a custom HTML string via the `excerpt` option in the Frontmatter.

### Auto-generation

By default, the theme extracts article excerpts automatically.

To disable auto-generation and exclusively display manually specified excerpts or Frontmatter descriptions, set `plugins.blog.excerptLength: 0` in the theme options.

::: warning Excerpt Limitations

- Development Environment: Auto-extraction is disabled by default in the development server for performance. Enable it via the [`hotReload`](../../config/theme/basic.md#hotreload) option.
- Context Isolation: Excerpts separated by `<!-- more -->` are rendered into HTML strings independently. Content outside the excerpt is excluded from the rendering context. Consequently:
  - The `[[toc]]` marker cannot resolve headings located outside the excerpt.
  - Reference links and footnotes defined outside the excerpt will not render correctly.
- DOM Injection: Excerpts defined via Frontmatter or auto-generation are injected directly via `innerHTML`. Vue components and specific VuePress directives will parse as native HTML tags and fail to render.
  :::

## Star Articles

Setting `star: true` in the Frontmatter marks an article as high-quality content. Starred articles are aggregated at the `/star/` route and prominently displayed in the blog homepage sidebar.

::: tip
Assign a numeric value to `star` (e.g., `star: 5`) to control the sorting order. Higher values appear first.
:::

## Custom Article Types <Badge text="Advanced" type="info" />

Define supplementary article categorization lists via the `plugins.blog.type` array in the theme options.

Each type object accepts the following configurations:

- `key`: A unique string identifier (no special characters). Generates the route path `/<key>/` by default.
- `filter`: A function `(page) => boolean` determining whether a page belongs to this type.
- `sorter`: A function `(pageA, pageB) => number` controlling the sorting order within the list.
- `path`: Overrides the default `/<key>/` route path.
- `frontmatter`: A function `(localePath) => object` defining the Frontmatter for the generated layout page (commonly used to assign a `title`).

::: note
The `layout` property defaults to the theme's built-in `Blog` layout. Modify this value **only** if you are implementing a custom layout component for this specific article type.
:::

To ensure the custom type displays correctly in the UI, apply one of the following methods:

- Map the `key` to a localized string via `blogLocales` in the theme options.
- Assign a `title` within the `frontmatter` configuration function.

::: details Example Configurations

Creating custom lists for `slide` and `original` content types:

```ts twoslash title=".vuepress/theme.ts"
import { dateSorter } from "@vuepress/helper";
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  blogLocales: {
    slide: "Slides",
    original: "Original",
  },

  plugins: {
    blog: {
      type: [
        {
          key: "slide",
          filter: (page) => page.frontmatter.layout === "Slide",
          frontmatter: () => ({ title: "Slides" }),
        },
        {
          key: "original",
          filter: (page) => !!page.frontmatter.original,
          sorter: (pageA, pageB) => dateSorter(pageA.frontmatter.date, pageB.frontmatter.date),
          frontmatter: () => ({ title: "Original" }),
        },
      ],
    },
  },
});
```

:::
