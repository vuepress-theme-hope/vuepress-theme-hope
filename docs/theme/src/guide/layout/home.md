---
title: Home Page
icon: home
order: 6
category:
  - Layout
tag:
  - Home
  - Layout
---

`vuepress-theme-hope` improves the default home page.

To use it, set `home: true` in page frontmatter. Any extra content after the `YAML front matter` will be parsed as normal Markdown and rendered after the features section.

![Screenshot](./assets/home-light.png#light)
![Screenshot](./assets/home-dark.png#dark)

<!-- more -->

## Frontmatter Options

### home

- Type: `boolean`

Enable homepage style when setting to `true`

### title

- Type: `string`
- Required: No

Page title, will be used in breadcrumb, seo, etc.

### heroText

- Type: `string | false`
- Default: `"Hello"`

Hero Title

### tagline

- Type: `string | false`
- Default: `"Welcome to your VuePress site"`

Short description in hero

### heroImage

- Type: `string`
- Required: No

Home hero (logo) image address, need to fill in the absolute path (pictures need to be placed in the `.vuepress/public` folder)

### heroImageDark

- Type: `string`
- Required: No

Darkmode Home hero (logo) image address, need to fill in the absolute path (pictures need to be placed in the `.vuepress/public` folder), will be the same as `heroImage` by default.

### heroAlt

- Type: `string`
- Required: No

Home icon alt text

### actions

- Type: `ActionConfig | ActionConfig[]`
- Required: No

`ActionConfig` structure:

- `text`: Button text
- `link`: Button link
- `type`: Button type (Only support `"primary"` and `"default"` (default))

### features

- Type: `Feature[]`
- Required: No

Structure of `Feature`:

- `title`: `string` title
- `details` (optional): `string` details
- `icon` (optional): `string` icon FontClass
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
actions:
  - text: Get Started 💡
    link: /guide/
    type: primary

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
