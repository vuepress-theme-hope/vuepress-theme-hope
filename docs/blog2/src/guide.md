---
title: Guide
icon: creative
---

With `vuepress-plugin-blog2`, you can easily bring blog feature into your themes.

## Collecting Articles and generating info

To get started, the plugins will pick pages those neeeded to trict as articles. This is only the first step to drop those pages you don’t want. By default, all the pages generated from Markdown files but not homepage will be included as articles.

You may need to set option `filter` to fully customize pages to collect. The `filter` accepts a function with the shape `(page: Page) => boolean`.

Then, you should set `getInfo` option with a function accepting `Page` as argument and returning a object containing the info you want. Later, you can get these info through composition apis.

## Customizing categories and types

Basiclly, you would want 2 types of collection in your blog:

- Category:

  "Category" is grouping articles with their tags (or categories).

  For example, each article may have their "categories" and "tags".

- Type:

  "Type" is filtering aricles with different conditions.

  For example, you may have diary, notes in your posts. And when a post has a writing date infomation with it, it can be called as a "timeline item".

After understanding description of these 2 types, you can set `category` and `type` options, each of them accepts an array, and each element represents a configuation.

Let’s start with 2 examples here.

Imagine you want to set tags for each articles, and you are setting them in `frontmatter.tag`. You want a tag mapping page in `/tag/` with `TagMap` layout , and group each tag list with tagName in `/tag/tagName` with `TagList` layout, you probably need a configuation like this:

```ts
({
  category: [
    {
      key: "tag",
      getter: ({ frontmatter }) => frontmatter.tag || [],
      path: "/tag/",
      layout: "TagMap",
      itemPath: "/tag/:name/",
      itemLayout: "TagList",
    },
  ],
});
```

Also, you may want to star some of your aricles, and display them to visitors. When you are setting `star: true` in frontmatter to mark them, you probably need a configuation like this to display them in `/star/` path with `StarList` layout:

```ts
({
  type: [
    {
      key: "star",
      filter: ({ frontmatter }) => frontmatter.star,
      path: "/star/",
      layout: "StarList",
    },
  ],
});
```

See, setting these 2 types is easy. For full options, please see [Category Config](./config.md#blog-category-config) and [Type Config](./config.md#blog-type-config).

## Using composition api in client side

When generating each page, the plugin will set `type` (values are `"category"` or `"type"`), `key` and `name` (only aviable with category page) in `frontmatter.blog`.

So you can invoke `useBlogCategory()` and `useBlogType()` directly, and the result will be the category or type bind to current route.

Also, you can pass `key` you want as argument, then you will get infomation bind to that key.

For return types, please see [Composition API Return Types](./config.md#composition-api).
