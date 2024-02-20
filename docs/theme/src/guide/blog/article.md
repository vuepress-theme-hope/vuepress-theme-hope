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

The topic provides you with a list of all articles under the path `/article/` by default.

## Article

All articles will be added to the article list by default and rendered under the path `/article/`.

![Article list](./assets/article-list-light.png#light)
![Article list](./assets/article-list-dark.png#dark)

If you don't want the list to contain some specific articles, just set the `article` to `false` in the frontmatter of the article, or you may customize it through `plugins.blog.filter` in theme options.

To sticky a specific article in the article list, just set `sticky` to `true` in the frontmatter of the article.

::: tip Order

For sticky articles, you can set `sticky` with a number to set their order. Articles with large numbers will be listed first.

:::

## Excerpt

### Adding Excerpt

If you want to add an excerpt for an article, you can mark contents with `<!-- more -->` comment. Any content before this comment will be considered as an excerpt.

Meanwhile, if the excerpt you want to set is not what you want to show at the beginning of the article, you can also set the HTML string through the `excerpt` option in Frontmatter.

### Automatically Generate Excerpt

By default, the theme extract article excerpts for you automatically.

If you want the theme only display excerpt which you specify, set `plugins.blog.excerptLength: 0` in theme options.

::: warning Excerpt Limitation

We recommend you to use `<!-- more -->` to mark excerpt as first choice. If you do need a special excerpt, set it in frontmatter yourself.

In addition, excerpt is directly inserted into the DOM through `innerHTML`, this means that no Vue features are available.

:::

## Star Articles

You can star an article by setting `star` to `true` in frontmatter. After staring, users can view these articles on the `/star/` page.

At the same time, any star articles will be displayed in the article column on the sidebar of the blog homepage.

::: info

Our consideration for providing star options: Theme users may want to show visitors some high-quality articles, but do not want sticky articles to flood the homepage, resulting in visitors not being able to see the recently updated articles.

:::

::: tip Order

Similar to sticky articles, you can also set `star` to number to set their order. Articles with large numbers will be listed first.

:::

## Other types of articles <Badge text="Advanced" type="info" />

The theme provides separate lists for additional article type.

To add additional article type, you should set `plugins.blog.type` in theme options with an array of objects describing type you want.

Each type should have a unique key (without special characters), and a `filter` function to determine whether a page should be the type. The `filter` function should accept page object and return a boolean value.

To sort pages in the type list, you can also set a `sorter` function. The `sorter` function should accept two page objects and return a number.

By default, the type list path will be `/key/` (with `key` replaced by your actual key). You can also set a custom path by setting `path` in options.

`frontmatter` option controls the frontmatter of the layout page, with is a function accepting `localePath` and returning a frontmatter object. This option is useful when setting the title of the layout page.

::: note

`layout` is the layout name, by default it will be `BlogType`, a layout `vuepress-theme-hope` registered. ONLY IF you build a custom layout for the type list, shall you set this option to your layout value.

:::

Also, you need to set `blogLocales[key]` in theme locales with the actual type name, so that the theme can display the type name correctly.

To get start with, we would like to show you some examples.

::: details Examples

1. Adding a type of slide pages.

   All slide pages should have `layout: Slide` in frontmatter. And the sequence doesn't matter.

1. Adding an original type.

You shall set the following options:

```ts
import { compareDate } from "@vuepress/helper";
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  // other config
  // ...

  theme: hopeTheme({
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
            filter: (page) => page.frontmatter.original,
            sorter: (pageA, pageB) =>
              compareDate(pageA.frontmatter.date - pageB.frontmatter.date),
            frontmatter: () => ({ title: "Original" }),
          },
        ],
      },
    },
  }),
});
```

:::
