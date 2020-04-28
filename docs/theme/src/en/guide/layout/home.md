---
icon: homefill
tags:
  - home
  - layout
category: layout
---

# Home Page

vuepress-theme-hope improves the default home page.

![Screenshot](./assets/home.png)

## Item style

The frontmatter parameters that can be configured are as follows:

### home

- Type: `boolean`

Enable homepage style when set to true

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
