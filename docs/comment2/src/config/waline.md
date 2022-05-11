---
title: Waline Config
icon: waline
---

## serverURL

- Type: `string`
- Required: Yes

Waline server address url

## emoji

- Type: `(string | WalineEmojiInfo)[] | false`
- Default: `['//unpkg.com/@waline/emojis@1.0.1/weibo']`

Emoji settings, for details see [Custom Emoji](https://waline.js.org/en/guide/client/emoji.html)

## dark

- Type: `string | boolean`
- Default: `false`

Darkmode support

- Setting a boolean will set the dark mode according to its value.
- Set it to `'auto'` will display darkmode due to device settings.
- Filling in a CSS selector will enable darkmode only when the selector match waline ancestor nodes.

::: tip Examples

- **Docusaurus**: It will enable darkmode by setting `data-theme="dark"` on the `<html>` tag itself. So you need to set `'html[data-theme="dark"]'` as `dark` option.

- **hexo-theme-fluid**: It will enable darkmode by setting `data-user-color-scheme="dark"` on the `<html>` tag itself. So you need to set `'html[data-user-color-scheme="dark"]'` as `dark` option.

- **vuepress-theme-hope**: It will enable darkmode by setting `theme-dark` class on the `<body>` tag itself. So you need to set `'body.theme-dark'` as `dark` option.

:::

For details of custom style and darkmode, please see [Custom Style](https://waline.js.org/en/guide/client/style.html).

## meta

- Type: `string[]`
- Default: `['nick','mail','link']`

Reviewer attributes. Optional values: `'nick'`, `'mail'`, `'link'`

## requiredMeta

- Type: `string[]`
- Default: `[]`

Set required fields, default anonymous, optional values:

- `[]`
- `['nick']`
- `['nick','mail']`

## login

- Type: `string`
- Default value: `'enable'`

Login mode status, optional values:

- `'enable'`: enable login (default)
- `'disable'`: Login is disabled, users should fill in infomation to comment
- `'force'`: Forced login, users must login to comment

## wordLimit

- Type: `number | [number, number]`
- Default: `0`

Comment word s limit. When a single number is filled in, it 's the maximum number of comment words. No limit when set to `0`.

## pageSize

- Type: `number`
- Default: `10`

number of comments per page.

## copyright

- Type: `boolean`
- Default: `true`

Whether show copyright and version in footer.

::: tip

We hope you can keep it on to support Waline.

:::
