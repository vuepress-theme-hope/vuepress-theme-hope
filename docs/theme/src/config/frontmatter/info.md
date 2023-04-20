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
  - [Guide → Icon Support](../../guide/interface/icon.md)

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

Show the author of the current page. If you don't fill it, you will fall back to the default author.

::: tip

When setting default author in theme options, you can set `false` to prevent showing the default author.

:::

## isOriginal

- Type: `boolean`
- Default: `false`

Whether the current article is original.

## date

- Type: `DateString`
- Required: No
- Format: `YYYY-MM-DD` or `YYYY-MM-DD hh:mm:ss`

Set the writing time of the current page.

## category

- Type: `string | string[]`
- Required: No

Set the category of the current page.

## tag

- Type: `string | string []`
- Required: No

Set the label of the current page.

## sticky

- Type: `boolean | number`
- Default: `false`

Sets whether the current article is pinned in the list. When fill in with number, greater ones come before smaller ones.

## star

- Type: `boolean | number`
- Default: `false`

Sets whether the current article is pinned in the article list in blog theme. When fill in with number, greater ones come before smaller ones.

## article

- Type: `boolean`
- Default: `true`

Whether to add the article to the article list.

## timeline

- Type: `boolean`
- Default: `true`

Whether to add the article to the timeline list.

## image

- Type: `string`
- Required: No

Current page's image, needs an absolute path.
