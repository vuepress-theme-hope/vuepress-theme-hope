---
icon: blog
category: blog
tags:
  - blog
  - feature
---

# Blog related

The theme enables some blogging features by configuring `@vuepress/plugin-blog`. Also you can set `themeConfig.blog` to `false` to disable all blog features.

## Category

Add `category: <category name>` to the frontmatter of the page, and the article will be automatically rendered in the list of category pages with URL `/category/`.

![Category](./assets/category.png)

Please note that only one category can be set per article.

## Tags

Add `tags: <tag name>` to the frontmatter of the page, and the article will be automatically listed in the list on the `/tag/` tag page.

`tags` accepts `string | string []`, which means that an article can contain multiple tags.

## Article

All articles will be added to the article list by default and rendered under path `/article/` .

If you don’t want specific articles to be included, set `article` to `false` in the article’s frontmatter.

To stick a specific article, set `sticky` to `true` in the article’s frontmatter.

## Timeline

All articles with a writing date will be sorted by time in the timeline page `/timeline/`.

If you don’t want an article to be included, set `timeline` to `false` in the article’s Frontmatter.

::: warning

Do not add and place the corresponding folders ("tag", "article", "timeline") in the root directory, otherwise the files may be overwritten during compilation and cause errors.

If you do need an "articles" folder, consider using "articles".

:::
