---
title: Home Page
icon: home
order: 7
category:
  - Layout
tag:
  - Home
  - Layout
---

`vuepress-theme-hope` improves the default home page.

To use it, set `home: true` in page frontmatter. Any extra content after the `YAML front matter` will be parsed as normal Markdown and rendered after the features section.

![Screenshot](./assets/home-light.jpg#light)
![Screenshot](./assets/home-dark.jpg#dark)

<!-- more -->

## Site Information

You can use `heroText` to set the main title and `tagline` to set the subtitle.

If you have a logo, you can place it in the `public` folder and set it via `heroImage`, if you want to display another logo in night mode, you can use `heroImageDark`. For better A11y, we recommend that you set the description of Logo to `heroAlt`.

You can set the background image through `bgImage` and `bgImageDark`, but you need to pay attention that you must fill in the full URL or absolute path. If you want the information to be displayed in full screen, you can set `heroFullScreen: true`.

If you need to customize some styles, you can set the style of the logo and background image through `heroImageStyle` and `bgImageStyle`.

## Home button

You can display some important links in the form of buttons on the home page.

You can set them via `actions` which is an array where each element is an object with the following keys:

- `text`: button text
- `link`: button link
- `type`: button type (only `"primary"` and `"default"` (default) are supported)

## Project features (legacy)

You can set and display item features through `features`, which is an array, each element is an object, containing the following keys:

- `title`: title
- `details`: details
- `icon` (optional): can be filled with full path or absolute path image link, or FontClass
- `link` (optional): link address

## Project Highlights and features

You can set and display project features and highlights through `highlights`, which is an array, each element is an object, representing a highlight or feature section.

Highlight section use `highlights` to set highlights and feature section use `features` to set features (you should only set one of them). Both of them are arrays, each element is an object, representing a highlight or feature item:

- `title`: title, HTML string is supported
- `details`: details, HTML string is supported
- `icon` (optional): can be filled with full path or absolute path image link, or FontClass
- `link` (optional): link address

You can also set the following optional keys:

- `header`: section title, supports HTML string
- `description`: section description, supports HTML string
- `color`: Text color
- `image`: Section image
- `imageDark`: Section image used in darkmode
- `bgImage`: Section background image
- `bgImageDark`: Section background image used in darkmode
- `bgImageStyle`: Section background image styles

Highlights also support the following properties:

- `type`: `"order"`, `"un-order"`(default) or `"no-order"`

::: info

For complete configuration items, see [Home Frontmatter Configuration](../../config/frontmatter/home.md).

:::

## Demo

- [Project HomePage with features](../../demo/project-home.md)

- [Project HomePage with highlights](../../README.md)

::: details Feature Homepage Code

@[code](../../demo/project-home.md)

:::

::: detailsHighlight Homepage Code

@[code](../../README.md)

:::
