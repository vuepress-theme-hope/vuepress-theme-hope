---
icon: blog
category: function
tags:
  - blog
  - function
---

# Blog related

The theme enables some blogging features by configuring `@vuepress/plugin-blog`.

## Category

Just add `category: <category name>` to the frontmatter of the page, and the article will be automatically rendered in the list of category pages with url `/category/`.

![category](./assets/category.png)

Please note that only one category can be set for an article.

## Tags

Just add `tags: <category name>` to the frontmatter of the page, and the article will be automatically listed in the list on the `/ tag /` tag page.

`tags` accepts`string | string []`, which means that an article can contain multiple tags.

::: warning
Do not add and place the corresponding folder in the root directory, otherwise it may cause rendering errors.
:::

## Article

All articles will be added to the article list by default and rendered under path `/article/` .

If you don't want the list to contain specific articles, just set `article` to`false` in the Frontmatter of the corresponding article.
