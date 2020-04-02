---
icon: homefill
tags:
  - home
  - layout
category: layout
---

# Home Page

vuepress-theme-hope improves the default home page.

## Item style

The frontmatter parameters that can be configured are as follows:

### home

- Type: `boolean`

Enable homepage style when set to true

### title

- Type: `string`

Title, default is `'Hello'`

### heroImage

- Type: `string`

Home icon (logo) address, need to fill in the absolute path (pictures need to be placed in the `.vuepress/public` folder)

### heroText

- Type: `string`

Home icon alt text

### tagline

- Type: `string`

Append text, default is 'Welcome to your VuePress site'

### actionText

- Type: `string`

Button text

### actionLink

- Type: `string`

Button link

### features

- Type: `Array`
- Structure:
  - title: `string` title
  - details: `string` details
  - link (optional): `string` link address

Feature description

## Blog style

### hero

- Type: `boolean`
- Default: `true`

Whether to display the icon and description of the homepage

### bgImage

- Type: `string`

Background picture. If not filled, a default landscape picture will be applied automatically.

### bgImageStyle

- Type: `Record <string, string>`

CSS style for the background image.

### heroImageStyle

- Type: `Record <string, string>`

CSS style for home icon
