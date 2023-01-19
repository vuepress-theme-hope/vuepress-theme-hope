---
title: Home Frontmatter Config
icon: home
order: 4
category:
  - Config
tag:
  - Frontmatter
  - Home
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

Home hero (logo) image address, need to fill in the absolute path (pictures need to be placed in the `.vuepress/public` folder)

## heroImageDark

- Type: `string`
- Required: No

Darkmode Home hero (logo) image address, need to fill in the absolute path (pictures need to be placed in the `.vuepress/public` folder), will be the same as `heroImage` by default.

## heroAlt

- Type: `string`
- Required: No

Home icon alt text

## actions

- Type: `ThemeHomeActionOptions[]`

  ```ts
  interface ThemeHomeActionOptions {
    /**
     * Action name
     */
    text: string;

    /**
     * Action link
     */
    link: string;

    /**
     * Type of action
     * @default 'default'
     */
    type?: "primary" | "default";
  }
  ```

- Required: No

Home actions

## features

- Type: `ThemeHomeFeatureOptions[]`

  ```ts
  interface ThemeHomeFeatureOptions {
    /**
     * Feature name
     */
    title: string;

    /**
     * Feature description
     */
    details: string;

    /**
     * Feature icon
     *
     * @description image link or icon fontClass are supported
     */
    icon?: string;

    /**
     * Feature link
     */
    link?: string;
  }
  ```

- Required: No

Features description.
