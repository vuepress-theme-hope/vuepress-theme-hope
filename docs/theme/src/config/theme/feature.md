---
title: Theme Feature Config
icon: config
category: config
tags:
  - config
  - themeConfig
---

These are config items of features provided by theme.

## darkmode <Badge text="Enabled by default" />

- Type: `'auto-switch' | 'switch' | 'auto' | 'disable'`
- Default: `'auto-switch'`

Dark mode support options:

- `'auto-switch'`: "off | automatic | on" three-stage switch
- `'switch'`: "Close | Open" toggle switch
- `'auto'`: Automatically decide whether to apply dark mode based on user device’s color-scheme or current time
- `'disable'`: disable dark mode

> If you don’t need this feature, set `darkmode: "disable"` to disable it.

## themeColor <Badge text="Enabled by default" />

Theme color configuration.

> If you don’t need this feature, set `themeColor: false` to disable it.

- Type: `Record<string, string>`
- Defaults:

  ```js
  {
    blue: '#2196f3',
    red: '#f26d6d',
    green: '#3eaf7c',
    orange: '#fb9b5f'
  }
  ```

## Blog configuration <Badge text="Enabled by default" />

Blog configuration.

> You can directly set `blog: false` to disable related functions.

### blog.blogger

- Type: `string`
- Required: No

Blogger name, default is `themeConfig.author`

### blog.avatar

- Type: `string`
- Required: No

Blogger avatar, default is `themeConfig.logo`

### blog.roundAvatar

- Type: `boolean`
- Default: `true`

Whether cliping the avatar with round shape

### blog.sidebarDisplay

- Type: `'mobile' | 'none' | 'always'`
- Default: `'none'`

Whether to show blogger information in the sidebar

- `mobile`: Show in sidebar in mobile view
- `'always'`: Always show in the sidebar
- `'none'`: Never show in the sidebar

### blog.intro

- Type: `string`
- Required: No

Personal introduction address of the blogger.

After filling in, you will be allowed to click on the avatar or name in "Blogger Information" to enter the personal introduction page.

### blog.timeline

- Type: `string`
- Default: `'Yesterday once more'`

Text on the top of timeline page.

### blog.perPage

- Type: `number`
- Default: `10`

Article number per page

## pageInfo

- Type: `string[] | false`
- Default: `['author', 'visitor', 'time', 'category', 'tag', 'reading-time']`

Article information. The order of the items decides the display order. Fill in `false` to disable it.

Available items:

- `'author'`: author
- `'time'`: writing date
- `'category'`: category
- `'tag'`: tags
- `'reading-time'`: expect reading time
- `'word'`: word number for the article
- `'visitor'`: pageviews

## Footer settings

### footer.content

- Type: `string`
- Required: false

The default content for the footer, can accept HTMLString.

### footer.copyright

- Type: `string | boolean`
- Default: `'Copyright © <author>'`

The default copyright info, set it to `false` to disable it by default.

### footer.display

- Type: `boolean`
- Default: `false`

Whether to display footer by default

## Encryption settings

Encryption setting options

### encrypt.status

- Type: `"global" | "local"`
- Default value: `"local"`

Whether to encrypt globally

### encrypt.global

- Type: `string | string []`
- Required: No

Highest authority password, you can set multiple by using array

### encrypt.config

- Type: `Record <string, string | string []>`
- Required: No

The encryption configuration is an object with a key name matching the path and a key-value corresponding to a password that accepts a string or an array of strings.

::: details Example

```js
{
  // This will encrypt the entire guide directory and both passwords will be available
  "/guide/": ["1234", "5678"],
  // this will only encrypt config/page.html
  "/config/page.html": "1234"
}
```

:::
