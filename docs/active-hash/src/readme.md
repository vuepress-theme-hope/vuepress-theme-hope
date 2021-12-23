---
home: true
title: Home
icon: home
heroImage: /logo.svg
heroText: vuepress-plugin-active-hash
tagline: Active hash plugin for vuepress
action:
  - text: Guide 💡
    link: /guide/
    type: primary

  - text: Config 🛠
    link: /config/

footer: MIT Licensed | Copyright © 2019-present Mr.Hope
copyrightText: false
---

## How to use

### Install

<CodeGroup>
<CodeGroupItem title="yarn">

```bash
yarn add -D vuepress-plugin-active-hash
```

</CodeGroupItem>

<CodeGroupItem title="npm">

```bash
npm i -D vuepress-plugin-active-hash
```

</CodeGroupItem>
</CodeGroup>

### Usage

<CodeGroup>
<CodeGroupItem title="js">

```js
// .vuepress/config.js
module.exports = {
  plugins: [
    [
      "active-hash",
      {
        // your options
      },
    ],
  ],
};
```

</CodeGroupItem>

<CodeGroupItem title="ts">

```ts
// .vuepress/config.ts
exports default {
  plugins: [
    [
      "active-hash",
      {
        // your options
      },
    ],
  ],
};
```

</CodeGroupItem>
</CodeGroup>

This plugin is an improved version comparing to the official one:

- We add `containerSelecter` and `offset` options to make sure that the link hash can be exactly aligned with the current header.

  You should set `containerSelecter` as the theme container, and if your theme container has some special layout, you can increase an offset for all headers through the `offset` option.

- If you scroll to the top of the page, the hash will be correctly removed.

Addtionally, we changed `sidebarLinkSelector` to `activeLinkSelecter`, which should be more senmantic.

## Config

### headerSelector

- Type: `string`
- Default: `".header-anchor"`

Selector for header anchors

### activeSelecter

- Type: `string`
- Default: `".sidebar-link"`

Selector for active anchors

### containerSelecter

- Type: `string`
- Default: `".theme-default-content"`

Selector for theme content container.

It’s used to detect the spacing before the first header

### offset

- Type: `string`
- Default: `0`

Additional offset for anchor position, used to make sure the anchor is aligned perfectly.

It’s useful when you have a padding top or other layout styles in your theme.
