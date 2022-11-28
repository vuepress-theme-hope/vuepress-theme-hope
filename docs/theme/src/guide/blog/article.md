---
title: Article List
icon: article
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

If you don’t want the list to contain some specific articles, just set the `article` to `false` in the frontmatter of the article, or you may customize it through `plugins.blog.filter` in theme options.

To sticky a specific article in the article list, just set `sticky` to `true` in the frontmatter of the article.

::: tip Order

For sticky articles, you can set `sticky` with a number to set their order. Articles with large numbers will be listed first.

:::

## Excerpt

### Adding Excerpt

If you want to add an excerpt for an article, you can mark contents with `<!-- more -->` comment. Any content before this comment will be considered as an excerpt.

Meanwhile, if the excerpt you want to set is not what you want to show at the beginning of the article, you can also set the HTML string through the `excerpt` option in Frontmatter.

### Automatically Generate Excerpt

By default, the theme will only display excerpt you specify or the description set in frontmatter for articles in article list.

If you want the theme extracting excerpts automatically, set `plugins.blog.autoExcerpt: true` in theme options.

::: warning Excerpt Limitation

Auto excerpt generation is not available in devServer by default due to performance considerations, use [hotReload](../../config/theme/basic.md#hotreload) to enable it.

We recommend you to use `<!-- more -->` to mark excerpt as first choice. If you do need a special summary, set it in frontmatter yourself.

For the comment-marked excerpt, we will separate excerpt from markdown content then render it to HTMLString, so any content outside excerpt **is not considered during rendering**, such restrictions like:

- `[[toc]]` tag cannot get the title of the rest of the article
- Links and footnotes can not render correctly if their citations are outside excerpt

In addition, since both cases excerpt is directly inserted into the DOM through `innerHTML`, this means that any components will be parsed as native tags and cannot not be rendered as Vue Component.

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

## Encryption and Slides

The theme provides separate lists for the two special pages: encrypted article page and slide page. You can view them on the `/encrypt/` and `/slide/` pages.

At the same time, to help visitors distinguish between these two categories of pages, their categories will be clearly marked with icons in the article list.

![Category Tips](./assets/icon-type.png)
