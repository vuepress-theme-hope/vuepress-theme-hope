---
title: Blog Home Frontmatter Config
icon: blog
order: 5
category:
  - Config
tag:
  - Frontmatter
  - Blog Home
---

## home

- Type: `boolean`
- Default: `false`

Enable homepage style when setting to `true`

## title

- Type: `string`
- Required: No

Page title, will be used in breadcrumb, seo, etc.

## heroText

- Type: `string | false`
- Default: `"Hello"`

Hero Title

## tagline

- Type: `string | false`
- Default: `"Welcome to your VuePress site"`

Short description in hero

## heroImage

- Type: `string`
- Required: No

Home hero (logo) image address, relative path is not supported.

## heroImageDark

- Type: `string`
- Default: `heroImage`

Darkmode Home hero (logo) image address, relative path is not supported.

## heroImageStyle

- Type: `Record<string, string> | string`
- Required: No

CSS style for home icon

## heroAlt

- Type: `string`
- Required: No

Home icon alt text

## bgImage

- Type: `string | false`
- Default: A built-in picture

Link of background image, relative path is not supported.

## bgImageDark

- Type: `string`
- Default: `bgImage`

Link of darkmode background image, relative path is not supported.

## bgImageStyle

- Type: `Record<string, string> | string`
- Required: No

The CSS style of the background image.

## heroFullScreen

- Type: `boolean`
- Default: `false`

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

Project list
