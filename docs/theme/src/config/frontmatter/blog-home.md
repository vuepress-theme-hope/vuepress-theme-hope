---
title: Blog Home Frontmatter Config
icon: blog
order: 6
category:
  - Config
tag:
  - Frontmatter
  - Blog Home
---

## home

- Type: `true`
- Details:
  - [Blog → Blog HomePage](../../guide/blog/home.md#blog-style-homepage)

Must be `true` to use blog home layout.

## layout

- Type: `"Blog"`
- Details:
  - [Blog → Blog HomePage](../../guide/blog/home.md#blog-style-homepage)

Must be `Blog` to use blog home layout.

## title

- Type: `string`
- Required: No
- Details:
  - [Blog → Blog HomePage](../../guide/blog/home.md#blog-style-homepage)

Page title, will be used in breadcrumb, seo, etc.

## heroText

- Type: `string`
- Default: Site title
- Details:
  - [Blog → Blog HomePage](../../guide/blog/home.md#blog-style-homepage)

Hero Title, can be set to an empty string to hide the default title.

## tagline

- Type: `string`
- Required: No
- Details:
  - [Blog → Blog HomePage](../../guide/blog/home.md#blog-style-homepage)

Short description in hero

## heroImage

- Type: `string`
- Required: No
- Details:
  - [Blog → Blog HomePage](../../guide/blog/home.md#blog-style-homepage)
  - [FAQ → Links in Config](../../faq/common-question.md#links-in-config)

Image link used as home hero (logo).

## heroImageDark

- Type: `string`
- Default: `heroImage`
- Details:
  - [Blog → Blog HomePage](../../guide/blog/home.md#blog-style-homepage)
  - [FAQ → Links in Config](../../faq/common-question.md#links-in-config)

Dark mode Home hero (logo) image link.

## heroImageStyle

- Type: `Record<string, string> | string`
- Required: No
- Details:
  - [Blog → Blog HomePage](../../guide/blog/home.md#blog-style-homepage)

CSS style for home hero (logo) image

## heroAlt

- Type: `string`
- Required: No
- Details:
  - [Blog → Blog HomePage](../../guide/blog/home.md#blog-style-homepage)

Home icon alt text

## bgImage

- Type: `string | false`
- Default: A built-in picture
- Details:
  - [Blog → Blog HomePage](../../guide/blog/home.md#blog-style-homepage)
  - [FAQ → Links in Config](../../faq/common-question.md#links-in-config)

Link of background image, relative path is not supported.

## bgImageDark

- Type: `string`
- Default: `bgImage`
- Details:
  - [Blog → Blog HomePage](../../guide/blog/home.md#blog-style-homepage)
  - [FAQ → Links in Config](../../faq/common-question.md#links-in-config)

Link of dark mode background image, relative path is not supported.

## bgImageStyle

- Type: `Record<string, string> | string`
- Required: No
- Details:
  - [Blog → Blog HomePage](../../guide/blog/home.md#blog-style-homepage)

The CSS style of the background image.

## heroFullScreen

- Type: `boolean`
- Default: `false`
- Details:
  - [Blog → Blog HomePage](../../guide/blog/home.md#blog-style-homepage)

Whether Hero is full screen displayed

## projects

- Type: `ThemeBlogHomeProjectOptions[]`

  ```ts
  interface ThemeBlogHomeProjectOptions {
    /**
     * Project name
     */
    name: string;

    /**
     * Project description
     */
    desc?: string;

    /**
     * Project link
     */
    link: string;

    /**
     * Project icon
     *
     * @description image link or icon fontClass are supported, as well as `"link"`、`"project"`、`"book"`、`"article"`、`"friend"`
     */
    icon?: string;
  }
  ```

- Required: No
- Details:
  - [Blog → Blog HomePage](../../guide/blog/home.md#blog-style-homepage)

Project list displayed in blog homepage.
