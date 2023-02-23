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

## Home button

You can display some important links in the form of buttons on the home page.

You can set them via `actions` which is an array where each element is an object with the following keys:

- `text`: button text
- `link`: button link
- `type`: button type (only `"primary"` and `"default"` (default) are supported)

## Project features

You can set and display item features through `features`, which is an array, each element is an object, containing the following keys:

- `title`: title
- `details`: details
- `icon` (optional): can be filled with full path or absolute path image link, or FontClass
- `link` (optional): link address

::: info

For complete configuration items, see [Home Frontmatter Configuration](../../config/frontmatter/home.md).

:::

## Demo

@[code{1-116}](../../README.md)
