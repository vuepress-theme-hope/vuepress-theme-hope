---
title: Info Frontmatter Config
icon: circle-info
order: 1
category:
  - Config
tag:
  - Frontmatter
  - Info
---

You can set information for page with the following frontmatter options.

## Options

:::: fields
@`title` type=string

Current page's title. Markdown's first h1 by default.

@`shortTitle` type=string

Current page's short title. It will be used as the preferred title in navbar, sidebar and breadcrumb.

@`description` type=string

Current page's description.

@`icon` type=string

FontClass / Image link of the current page icon (recommended).

See also: [Interface → Icon Support](../../guide/interface/icon.md).

@`author` type=`Author | boolean`

Show the author of the current page. If you don't fill it, you will fall back to the default author.

::: tip

When setting default author in theme options, you can set `false` to prevent showing the default author.

:::

See also: [Feature → Page Info](../../guide/feature/page-info.md#author).

Its type is:

```ts
type AuthorName = string;

interface AuthorInfo {
  /**
   * Author name
   */
  name: string;

  /**
   * Author website
   */
  url?: string;

  /**
   * Author email
   */
  email?: string;
}

type Author = AuthorName | AuthorName[] | AuthorInfo | AuthorInfo[];
```

@`isOriginal` type=boolean

Whether the current article is original.

See also: [Feature → Page Info](../../guide/feature/page-info.md#parameters).

@`date` type=`DateString`

Set the writing time of the current page, with `YYYY-MM-DD` or `YYYY-MM-DD hh:mm:ss` format.

See also: [Feature → Page Info](../../guide/feature/page-info.md#writing-date).

@`category` type=`string | string[]`

Set the category of the current page.

See also: [Feature → Page Info](../../guide/feature/page-info.md#category-and-tags).

@`tag` type=`string | string[]`

Set the label of the current page.

See also: [Feature → Page Info](../../guide/feature/page-info.md#category-and-tags).

@`license` type=string default="value in theme options"

License name of the page.

See also: [Layout → Footer](../../guide/layout/footer.md#copyright-information).

@`copyright` type=`string | false` default="value in theme options"

The copyright information of the page, will be displayed in footer.

See also: [Layout → Footer](../../guide/layout/footer.md#copyright-information).

@`pageview` type=boolean default="value in theme options"

Whether display page views.

::: tip

The pageview feature requires you to have a valid Waline Comment Service config.

:::

See also: [Feature → Comment](../../guide/feature/comment.md#waline).

@`article` type=boolean default=`true`

Whether to add the article to the article list.

See also: [Blog → Article](../../guide/blog/article.md#article-configuration).

@`timeline` type=boolean default=`true`

Whether to add the article to the timeline list.

See also: [Blog → Timeline](../../guide/blog/timeline.md#excluding-articles).

@`sticky` type=`boolean | number`

Sets whether the current article is pinned in the list. When fill in with number, greater ones come before smaller ones.

See also: [Blog → Article](../../guide/blog/article.md#article-configuration).

@`star` type=`boolean | number`

Sets whether the current article is pinned in the article list in blog theme. When fill in with number, greater ones come before smaller ones.

See also: [Blog → Article](../../guide/blog/article.md#star-articles).

@`cover` type=string

Cover image of the page.

See also: [FAQ → Links in Config](../../faq/common-question.md#links-in-config).

@`banner` type=string

Banner image of the page.

See also: [FAQ → Links in Config](../../faq/common-question.md#links-in-config).

::::
