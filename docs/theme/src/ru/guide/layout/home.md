---
title: Главная страница
icon: home
order: 6
category:
  - Макет
tag:
  - Главная
  - Макет
---

`vuepress-theme-hope` улучшает домашнюю страницу по умолчанию.

Чтобы использовать его, установите `home: true` в frontmatter страницы. Любой дополнительный контент после `YAML front matter` будет проанализирован как обычный Markdown и отображен после раздела функций.

![Скриншот](./assets/home-light.png#light)
![Скриншот](./assets/home-dark.png#dark)

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

## Демо

```md
---
home: true
icon: home
title: Home
heroImage: /logo.svg
heroText: vuepress-theme-hope
tagline: A vuepress theme with tons of features✨
actions:
  - text: Get Started 💡
    link: /guide/
    Тип: primary

  - text: Config 🛠
    link: /config/

features:
  - title: Markdown Enhance
    icon: markdown
    details: Add align, sup/sub script, footnote, tasklist, tex, flowchart, diagram, mark and presentation support in Markdown
    link: /guide/markdown/

  - title: Pageviews and comments
    icon: comment
    details: Start pageview statistics and comment support with Waline
    link: /guide/feature/comment/

  - title: Article information display
    icon: info
    details: Add author, writing date, reading time, word count and other information to your article
    link: /guide/feature/page-info/

  - title: Blog support
    icon: blog
    details: Add date, tags and category to your articles, then article, tag, category and timeline list will be auto generated
    link: /guide/blog/intro/

  - title: Article Encryption
    icon: lock
    details: Encrypt you article based on path and folders, so that only the one you want could see them
    link: /guide/feature/encrypt/

  - title: Custom theme color
    icon: palette
    details: Supports custom theme colors and allows users to switch between preset theme colors
    link: /guide/interface/theme-color/

  - title: Dark Mode
    icon: contrast
    details: Switch between light and dark modes freely
    link: /guide/interface/darkmode/

  - title: SEO enhancement
    icon: config
    details: Optimize pages for search engines
    link: /guide/feature/seo/

  - title: Sitemap
    icon: sitemap
    details: Generate a Sitemap for your site
    link: /guide/feature/sitemap/

  - title: Feed support
    icon: rss
    details: Generate feed to allow users to subscribe it
    link: /guide/feature/feed/

  - title: PWA support
    icon: mobile
    details: Make your site more like an APP
    link: /guide/feature/pwa/

  - title: More new features
    icon: more
    details: Including icon support, path navigation, footer support, fullscreen button, blog homepage, etc.
    link: /guide/feature/

copyright: false
footer: MIT Licensed | Copyright © 2019-present Mr.Hope
---
```
