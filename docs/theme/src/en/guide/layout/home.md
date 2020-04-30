---
icon: homefill
tags:
  - home
  - layout
category: layout
---

# Home Page

vuepress-theme-hope improves the default home page.

If you want to use it, set `home: true` in page Front Matter. Any extra content after the `YAML front matter` will be parsed as normal Markdown and rendered after the features section.

![Screenshot](./assets/home.png)

## Item style

The Front Matter parameters that can be configured are as follows:

### home

- Type: `boolean`

Enable homepage style when set to `true`

### title

- Type: `string | false`
- Default: `'Hello'`

Title, won't display if it is set to `false`

### heroImage

- Type: `string`

Home icon (logo) address, need to fill in the absolute path (pictures need to be placed in the `.vuepress/public` folder)

### heroText

- Type: `string`

Home icon alt text

### tagline

- Type: `string`
- Default: `'Welcome to your VuePress site'`

Append text

### actionText

- Type: `string`

Button text

### actionLink

- Type: `string`

Button link

### features

- Type: `Feature[]`

Structure of `Feature`:

- title: `string` title
- details: `string` details
- link (optional): `string` link address

Feature description

## Demo

```yaml
---
home: true
heroImage: /hero.png
heroText: Hero Title
tagline: Hero subtitle
actionText: Get Started →
actionLink: /guide/
features:
  - title: Simplicity First
    details: Minimal setup with markdown-centered project structure helps you focus on writing.
  - title: Vue-Powered
    details: Enjoy the dev experience of Vue + webpack, use Vue components in markdown, and develop custom themes with Vue.
  - title: Performant
    details: VuePress generates pre-rendered static HTML for each page, and runs as an SPA once a page is loaded.
footer: MIT Licensed | Copyright © 2018-present Evan You
---

```
