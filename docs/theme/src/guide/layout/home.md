---
title: Home Page
icon: home
order: 3
category:
  - Layout
tag:
  - Home
  - Layout
---

`vuepress-theme-hope` provides a powerful home page.

To use it, set `home: true` in page frontmatter. Any extra content after frontmatter will be parsed as normal Markdown and rendered after the features section.

<!-- more -->

## Site Information

You can use `heroText` to set the main title and `tagline` to set the subtitle.

::: details Example

```md title="README.md"
---
home: true
heroText: My Project
tagline: A powerful project
---
```

:::

If you have a logo, you can place it in the `public` folder and set it via `heroImage`, if you want to display another logo in night mode, you can use `heroImageDark`. For better A11y, we recommend that you set the description of Logo to `heroAlt`.

::: details Example

```md title="README.md"
---
home: true
heroImage: /logo.png
heroImageDark: /logo-dark.png
heroAlt: My Project
---
```

:::

::: important

Medias in frontmatter should only use absolute path or full URL. These medias can not be tracked by bundlers, so relative path will not work.

:::

You can set the background image through `bgImage` and `bgImageDark`.

::: details Example

```md title="README.md"
---
home: true
bgImage: /bg.png
# defaults to bgImage
bgImageDark: /bg-dark.png
---
```

:::

If you want the information to be displayed in full screen, you can set `heroFullScreen: true`.

If you need to customize some styles, you can set the style of hero, hero image and background image through `heroStyle`, `heroImageStyle` and `bgImageStyle`. Both CSS string and object are supported.

::: details Example

```md title="README.md"
---
home: true
# set hero to fullscreen
heroFullScreen: true
# CSS string
heroStyle: "background-color: #000"
# CSS object
heroImageStyle:
  width: 100px
  height: 100px
---
```

:::

## Home button

You can display some important links in the form of buttons on the home page.

You can set them via `actions` which is an array where each element is an object with the following keys:

- `text`: button text
- `link`: button link
- `type`: button type (only `"primary"` and `"default"` are supported)
- `icon` (optional): support [all formats of Icon](../interface/icon.md)

::: details Example

```md title="README.md"
---
home: true
actions:
  - text: Get Started
    link: /get-started/
    icon: signs-post
    type: primary

  - text: Guide
    icon: lightbulb
    link: /guide/
---
```

:::

## Project features (legacy)

You can set and display item features through `features`, which is an array, each element is an object, containing the following keys:

- `title`: title
- `details`: details
- `icon` (optional): can be filled with full path or absolute path image link, or FontClass
- `link` (optional): link address

::: details Example

```md title="README.md"
---
home: true
features:
  - title: Pageviews and Comments
    icon: comment-dots
    details: Start pageview statistics and comment support with Waline
    link: /guide/feature/comment.html

  - title: Search
    icon: search
    details: Support docsearch and client search
    link: /guide/feature/search.html
---
```

:::

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
- `imageDark`: Section image used in dark mode
- `bgImage`: Section background image
- `bgImageDark`: Section background image used in dark mode
- `bgImageStyle`: Section background image styles

Highlights also support the following properties:

- `type`: `"order"`, `"un-order"`(default) or `"no-order"`

::: details Example

```md title="README.md"
---
home: true
highlights:
  - header: Easy to install
    image: /assets/image/box.svg
    bgImage: https://theme-hope-assets.vuejs.press/bg/3-light.svg
    bgImageDark: https://theme-hope-assets.vuejs.press/bg/3-dark.svg
    highlights:
      - title: Run <code>pnpm create vuepress-theme-hope hope-project</code> to create a new project with this theme.
      - title: Run <code>pnpm create vuepress-theme-hope add .</code> in your project root to create a new project with this theme.

  - header: Add things you want in Markdown
    description: We extended the standard commonMark specification and added tons of new features for you.
    image: /assets/image/markdown.svg
    bgImage: https://theme-hope-assets.vuejs.press/bg/2-light.svg
    bgImageDark: https://theme-hope-assets.vuejs.press/bg/2-dark.svg
    bgImageStyle:
      background-repeat: repeat
      background-size: initial
    features:
      - title: Links Check
        icon: clipboard-check
        details: Check Markdown links
        link: ./guide/markdown/others.html#link-check

      - title: Hint box
        icon: box-archive
        details: Decorate Markdown content with styles
        link: ./guide/markdown/stylize/hint.html
---
```

:::

## Demo

::: info

For complete configuration items, see [Home Frontmatter Configuration](../../config/frontmatter/project-home.md).

:::

- [Project HomePage with features](../../demo/project-home.md)

- [Project HomePage with highlights](../../README.md)

::: details Feature Homepage Code

@[code](../../demo/project-home.md)

:::

::: details Highlight Homepage Code

@[code](../../README.md)

:::
