---
title: Project Home Frontmatter Config
icon: home
order: 4
category:
  - Config
tag:
  - Frontmatter
  - Project Home
---

## home

Must be `true` to use project home layout.

## title

- Type: `string`
- Required: No

Page title, will be used in breadcrumb, seo, etc.

## heroText

- Type: `string`
- Default: Site title

Hero Title, can be set to an empty string to hide the default title.

## tagline

- Type: `string | false`
- Default: `"Welcome to your VuePress site"`

Short description in hero

## heroImage

- Type: `string`
- Required: No

Home hero (logo) image link, relative path is not supported.

## heroImageDark

- Type: `string`
- Default: `heroImage`

Dark mode Home hero (logo) image link, relative path is not supported.

## heroAlt

- Type: `string`
- Required: No

Home icon alt text

## heroImageStyle

- Type: `Record<string, string> | string`
- Required: No

CSS style for home icon

## bgImage

- Type: `string`
- Required: No

Link of background image, relative path is not supported.

## bgImageDark

- Type: `string`
- Default: `bgImage`

Link of dark mode background image, relative path is not supported.

## bgImageStyle

- Type: `Record<string, string> | string`
- Required: No

The CSS style of the background image.

## heroStyle

- Type: `Record<string, string> | string`
- Required: No

Hero wrapper style.

## heroFullScreen

- Type: `boolean`
- Default: `false`

Whether Hero is full screen displayed

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

## highlights

- Type: `(ThemeProjectHomeFeatureOptions |ThemeProjectHomeHighlightOptions)[]`

  ```ts
  interface ThemeProjectHomeHighlightItem {
    /**
     * Item name, supports HTML string
     */
    title: string;

    /**
     * Item description, supports HTML string
     */
    details?: string;

    /**
     * Item icon
     *
     * @description image link or icon fontClass are supported
     */
    icon?: string;

    /**
     * Item link
     */
    link?: string;
  }

  type ThemeProjectHomeFeatureItem = ThemeProjectHomeHighlightItem;

  interface ThemeProjectHomeFeatureOptions {
    /**
     * Feature header
     */
    header?: string;

    /**
     * Feature section description, supports HTML string
     */
    description?: string;

    /**
     * Text color
     */
    color?: string;

    /**
     * Feature section image
     */
    image?: string;

    /**
     * Feature section image used in dark mode
     *
     * @default image
     */
    imageDark?: string;

    /**
     * Feature Background image
     */
    bgImage?: string;

    /**
     * Feature Background image used in dark mode
     *
     * @default bgImage
     */
    bgImageDark?: string;

    /**
     * Features Background image style
     */
    bgImageStyle?: Record<string, string> | string;

    /**
     * Features
     */
    features: ThemeProjectHomeFeatureItem[];
  }

  interface ThemeProjectHomeHighlightSection {
    /**
     * Highlight section header, supports HTML string
     */
    header: string;

    /**
     * Highlight section description, supports HTML string
     */
    description?: string;

    /**
     * Text color
     */
    color?: string;

    /**
     * Highlight section image
     */
    image?: string;

    /**
     * Highlight section image used in dark mode
     *
     * @default image
     */
    imageDark?: string;

    /**
     * Highlight Background image
     */
    bgImage?: string;

    /**
     * Highlight Background image used in dark mode
     *
     * @default bgImage
     */
    bgImageDark?: string;

    /**
     * Highlight Background image style
     */
    bgImageStyle?: Record<string, string> | string;

    /**
     * Highlight section list type
     *
     * @default un-order
     */
    type?: "order" | "un-order" | "no-order";

    /**
     * Highlights
     */
    highlights?: ThemeProjectHomeHighlightItem[];
  }
  ```

- Required: No

Highlights description.

## features

- Type: `ThemeProjectHomeFeatureItem[]`

  ```ts
  interface ThemeProjectHomeFeatureItem {
    /**
     * Item name, supports HTML string
     */
    title: string;

    /**
     * Item description, supports HTML string
     */
    details?: string;

    /**
     * Item icon
     *
     * @description image link or icon fontClass are supported
     */
    icon?: string;

    /**
     * Item link
     */
    link?: string;
  }
  ```

- Required: No

Features description.
