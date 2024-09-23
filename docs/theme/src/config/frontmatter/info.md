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

## title

- Type: `string`
- Required: No

Current page's title. Markdown's first h1 by default.

## shortTitle

- Type: `string`
- Required: No

Current page's short title. Will be used as in navbar, sidebar and breadcrumb.

## description

- Type: `string`
- Required: No

Current page's description.

## icon

- Type: `string`
- Required: No
- Details:
  - [Interface → Icon Support](../../guide/interface/icon.md)

FontClass / Image link of the current page icon (recommended).

## author

- Type: `Author | boolean`

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

- Required: No
- Details:
  - [Feature → Page Info](../../guide/feature/page-info.md#author)

Show the author of the current page. If you don't fill it, you will fall back to the default author.

::: tip

When setting default author in theme options, you can set `false` to prevent showing the default author.

:::

## isOriginal

- Type: `boolean`
- Default: `false`
- Details:
  - [Feature → Page Info](../../guide/feature/page-info.md#parameters)

Whether the current article is original.

## date

- Type: `DateString`
- Required: No
- Details:
  - [Feature → Page Info](../../guide/feature/page-info.md#writing-date)

Set the writing time of the current page, with `YYYY-MM-DD` or `YYYY-MM-DD hh:mm:ss` format

## category

- Type: `string | string[]`
- Required: No
- Details:
  - [Feature → Page Info](../../guide/feature/page-info.md#category-and-tags)

Set the category of the current page.

## tag

- Type: `string | string []`
- Required: No
- Details:
  - [Feature → Page Info](../../guide/feature/page-info.md#category-and-tags)

Set the label of the current page.

## license

- Type: `string`
- Default: value in theme options
- Details:
  - [Layout → Footer](../../guide/layout/footer.md#copyright-information).

License name of the page.

## copyright

- Type: `string | false`
- Default: value in theme options
- Details:
  - [Layout → Footer](../../guide/layout/footer.md#copyright-information).

The copyright information of the page, will be displayed in footer

## pageview

- Type: `boolean`
- Default: value in theme options
- Details:
  - [Feature → Comment](../../guide/feature/comment.md#waline)

Whether display page views.

::: tip

The pageview feature requires you to have a valid Waline Comment Service config.

:::

## article

- Type: `boolean`
- Default: `true`
- Details:
  - [Blog → Article](../../guide/blog/article.md#article).

Whether to add the article to the article list.

## timeline

- Type: `boolean`
- Default: `true`
- Details:
  - [Blog → Timeline](../../guide/blog/timeline.md#excluding-articles).

Whether to add the article to the timeline list.

## sticky

- Type: `boolean | number`
- Default: `false`
- Details:
  - [Blog → Article](../../guide/blog/article.md#article).

Sets whether the current article is pinned in the list. When fill in with number, greater ones come before smaller ones.

## star

- Type: `boolean | number`
- Default: `false`
- Details:
  - [Blog → Article](../../guide/blog/article.md#star-articles).

Sets whether the current article is pinned in the article list in blog theme. When fill in with number, greater ones come before smaller ones.

## cover

- Type: `string`
- Required: No
- Details:
  - [FAQ → Links in Config](../../faq/common-question.md#links-in-config)

Cover image of the page.

## banner

- Type: `string`
- Required: No
- Details:
  - [FAQ → Links in Config](../../faq/common-question.md#links-in-config)

Banner image of the page.
