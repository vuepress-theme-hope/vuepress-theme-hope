---
title: Home Page
icon: home
category: layout
tags:
  - home
  - layout
---

`vuepress-theme-hope` improves the default home page.

To use it, set `home: true` in page frontmatter. Any extra content after the `YAML front matter` will be parsed as normal Markdown and rendered after the features section.

![Screenshot](./assets/home.png)

<!-- more -->

## Item style

The frontmatter parameters that can be configured are as follows:

### home

- Type: `boolean`

Enable homepage style when set to `true`

### title

- Type: `string | false`
- Default: `'Hello'`

Title, won’t display when set to `false`

### heroImage

- Type: `string`

Home hero (logo) image address, need to fill in the absolute path (pictures need to be placed in the `.vuepress/public` folder)

### darkHeroImage

- Type: `string`

Darkmode Home hero (logo) image address, need to fill in the absolute path (pictures need to be placed in the `.vuepress/public` folder), will be the same as `heroImage` by default.

### heroText

- Type: `string`

Home icon alt text

### tagline

- Type: `string`
- Default: `'Welcome to your VuePress site'`

Append text

### action

- Type: `ActionConfig | ActionConfig[]`

`ActionConfig` structure:

- `text`: Button text
- `link`: Button link
- `type`: Button type (Only support `'primary'` and `'default'` (default))

### features

- Type: `Feature[]`

Structure of `Feature`:

- `title`: `string` title
- `details`: `string` details
- `link` (optional): `string` link address

Feature description

## Demo

```md
---
home: true
icon: home
title: Home
heroImage: /logo.svg
heroText: vuepress-theme-hope
tagline: A vuepress theme with tons of features✨
action:
  - text: Get Started 💡
    link: /guide/
    type: primary

  - text: Config 🛠
    link: /config/

features:
  - title: Markdown Enhance 🧰
    details: Add align, sup/sub script, footnote, tex, flowchart, mark and presentation support in Markdown
    link: /guide/markdown/

  - title: Pageviews and comments 💬
    details: Start pageview statistics and comment support with Valine and Vssue
    link: /guide/feature/comment/

  - title: Article information display ℹ
    details: Add author, writing date, reading time, word count and other information to your article
    link: /guide/feature/page-info/

  - title: Blog support 📝
    details: Add date, tags and category to your articles, then article, tag, category and timeline list will be auto generated
    link: /guide/blog/intro/

  - title: Article Encryption 🔐
    details: Encrypt you article based on path and folders, so that only the one you want could see them
    link: /guide/feature/encrypt/

  - title: Custom theme color 🎨
    details: Supports custom theme colors and allows users to switch between preset theme colors
    link: /guide/interface/theme-color/

  - title: Dark Mode 🌙
    details: Switch between light and dark modes freely
    link: /guide/interface/darkmode/

  - title: SEO enhancement and Sitemap 🗺
    details: The theme can automatically generate a Sitemap for your website, and optimize the resulting web page for search engines.
    link: /guide/feature/seo-sitemap/

  - title: Feed support 📡
    details: You can generate feed, and let users to subcribe it
    link: /guide/feature/feed/

  - title: PWA support 📲
    details: The built-in PWA plugin will make your website more like an APP.
    link: /guide/feature/pwa/

  - title: TS support 🔧
    details: Turn on TypeScript support for your VuePress
    link: /guide/feature/typescript/

  - title: More new features ✨
    details: Including icon support, path navigation, footer support, fullscreen button, blog homepage, etc.
    link: /guide/feature/

footer: MIT Licensed | Copyright © 2019-present Mr.Hope
copyrightText: false
---
```
