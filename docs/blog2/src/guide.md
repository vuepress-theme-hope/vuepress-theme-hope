---
title: Guide
icon: creative
---

With `vuepress-plugin-blog2`, you can easily bring blog feature into your themes.

## Collecting Articles and generating info

To get started, the plugins will pick those pages which neeeds to be tricted as articles. This is only the first step to drop those pages you don’t want.

::: note

By default, all the pages generated from Markdown files but not homepage will be included as articles.

:::

You may need to set option `filter` to fully customize pages to collect. The `filter` accepts a function with the shape `(page: Page) => boolean`.

Then, you should set `getInfo` option with a function accepting `Page` as argument and returning a object containing the info you want. So later, you can get these info through Composition API.

::: details Demo

```ts
// theme
export default {
  name: "vuepress-theme-xxx",
  plugins: [
    [
      "blog2",
      {
        filter: ({ filePathRelative, frontmatter }) => {
          // drop those pages which is NOT generated from file
          if (!filePathRelative) return false;

          // drop those pages in `archives` folder
          if (filePathRelative.startsWith("archives/")) return false;

          // drop those pages which do not use default layout
          if (frontmatter.home || frontmatter.layout) return false;

          return true;
        },

        getInfo: ({ excerpt, frontmatter, git = {} }) => {
          // getting page info
          const info: Record<string, any> = {
            author: frontmatter.author || "",
            categories: frontmatter.categories || [],
            date: frontmatter.date || git.createdTime || null,
            tags: frontmatter.tags || [],
            excerpt: page.excerpt,
          };

          return info;
        },
      },
    ],
    // other plugins ...
  ],
};
```

:::

## Customizing Categories and Types

Basiclly, you would want 2 types of collection in your blog:

- Category:

  "Category" is grouping articles with their tags (or categories).

  For example, each article may have their "categories" and "tags".

- Type:

  "Type" is filtering aricles with different conditions.

  For example, you may have diary, notes in your posts. And when a post has a writing date information with it, it can be called as a "timeline item".

After understanding description of these 2 types, you can set `category` and `type` options, each of them accepts an array, and each element represents a configuation.

Let’s start with 2 examples here.

Imagine you want to set tags for each articles, and you are setting them in `frontmatter.tag`. You want a tag mapping page in `/tag/` with `TagMap` layout , and group each tag list with tagName in `/tag/tagName` with `TagList` layout, you probably need a configuation like this:

```ts
// theme
export default {
  name: "vuepress-theme-xxx",
  plugins: [
    [
      "blog2",
      {
        // other options ...
        category: [
          {
            key: "tag",
            getter: ({ frontmatter }) => frontmatter.tag || [],
            path: "/tag/",
            layout: "TagMap",
            frontmatter: () => ({ title: "Tag page" }),
            itemPath: "/tag/:name/",
            itemLayout: "TagList",
            itemFrontmatter: (name) => ({ title: `Tag ${name}` }),
          },
        ],
      },
    ],
    // other plugins ...
  ],
};
```

Also, you may want to star some of your aricles, and display them to visitors. When you are setting `star: true` in frontmatter to mark them, you probably need a configuation like this to display them in `/star/` path with `StarList` layout:

```ts
// theme
export default {
  name: "vuepress-theme-xxx",
  plugins: [
    [
      "blog2",
      {
        // other options ...
        type: [
          {
            key: "star",
            filter: ({ frontmatter }) => frontmatter.star,
            path: "/star/",
            layout: "StarList",
            frontmatter: () => ({ title: "Star page" }),
          },
        ],
      },
    ],
    // other plugins ...
  ],
};
```

See, setting these 2 types is easy. For full options, please see [Category Config](./config.md#blog-category-config) and [Type Config](./config.md#blog-type-config).

## Using Composition API in Client-side

When generating each page, the plugin will set following information under `frontmatter.blog`:

```ts
interface BlogFrontmatterOptions {
  /** Current type of the page */
  type: "category" | "tag";
  /** Unique key under current category or tag */
  key: string;
  /**
   * Current category name
   *
   * @description Only available in category item page
   */

  name?: string;
}
```

So you can invoke `useBlogCategory()` and `useBlogType()` directly, and the result will be the category or type bind to current route.

Also, you can pass `key` you want as argument, then you will get information bind to that key.

For return types, please see [Composition API Return Types](./config.md#composition-api).

## I18n support

This plugin adds native i18n support, so your settings will be automatically apply to each language.

For example, if user has following lcoales config, and you are setting the "star" example above:

```ts
// .vuepress/config.ts
export default {
  locales: {
    "/": {
      lang: "en-US",
    },
    "/zh/": {
      lang: "zh-CN",
    },
  },
};
```

Then `/zh/star/` and `/star/` will both be available, and only articles under the correct locale will appear.
