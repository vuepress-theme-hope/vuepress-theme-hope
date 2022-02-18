---
title: Waline Config
icon: waline
---

## serverURL

- Type: `string`
- Required: Yes

Waline server address url

## emoji

- Type: `(string | EmojiInfo)[]`
- Default: `['https://cdn.jsdelivr.net/gh/walinejs/emojis/weibo']`

Emoji settings, for details see [Custom Emoji](https://waline.js.org/en/guide/client/emoji.html)

## dark

- Type: `string`
- Required: No

Darkmode support

- Set it to `'auto'` will display darkmode due to device settings.
- Filling in a CSS selector will enable darkmode only when the selector match waline ancestor nodes.

::: tip Examples

- **Docusaurus**: It will enable darkmode by setting `data-theme="dark"` on the `<html>` tag itself. So you need to set `'html[data-theme="dark"]'` as `dark` option.

- **hexo-theme-fluid**: It will enable darkmode by setting `data-user-color-scheme="dark"` on the `<html>` tag itself. So you need to set `'html[data-user-color-scheme="dark"]'` as `dark` option.

:::

For details of custom style and darkmode, please see [Custom Style](https://waline.js.org/en/guide/client/style.html).

## meta

- Type: `string[]`
- Default: `['nick','mail','link']`
- Required: No

Reviewer attributes. Optional values: `'nick'`, `'mail'`, `'link'`

## requiredMeta

- Type: `string[]`
- Default: `[]`
- Required: No

Set required fields, default anonymous, optional values:

- `[]`
- `['nick']`
- `['nick','mail']`

## login

- Type: `string`
- Default value: `'enable'`
- Required: No

Login mode status, optional values:

- `'enable'`: enable login (default)
- `'disable'`: Login is disabled, users should fill in information to comment
- `'force'`: Forced login, users must login to comment

## avatar

- Type: `string`
- Default: `'mp'`
- Required: No

[Gravatar](http://gravatar.com/) type.

Optional value:

- `''` (Empty string)
- `'mp'`
- `'identicon'`
- `'monsterid'`
- `'wavatar'`
- `'retro'`
- `'robohash'`
- `'hide'`

See the [Avatar setting](https://waline.js.org/en/guide/client/avatar.html) for more details.

## wordLimit

- Type: `number | [number, number]`
- Default: `0`

Comment word s limit. When a single number is filled in, it ’s the maximum number of comment words. No limit when set to `0`.

## pageSize

- Type: `number`
- Default: `10`

number of comments per page.

## avatarCDN

- Type: `string`
- Default: `https://sdn.geekzu.org/avatar/`

Gravatar CDN baseURL.

## avatarForce

- Type: `boolean`
- Default: `false`

Whether **force** pulling the latest avatar each time.

## uploadImage

- Type: `Function`
- Required: No

Custom image upload callback to manage picture by yourself. We will pass a picture file object when execute it.

## highlight

- Type: `boolean`
- Default: `true`

**Code highlighting**, it’s enabled by default, please close it selectively.

## walineLocales

- Type: `WalineLocaleConfig`

  ```ts
  interface WalineLocaleData {
    nick: string;
    nickError: string;
    mail: string;
    mailError: string;
    link: string;
    optional: string;
    placeholder: string;
    sofa: string;
    submit: string;
    reply: string;
    cancelReply: string;
    comment: string;
    refresh: string;
    more: string;
    preview: string;
    emoji: string;
    uploadImage: string;
    seconds: string;
    minutes: string;
    hours: string;
    days: string;
    now: string;
    uploading: string;
    login: string;
    logout: string;
    admin: string;
    sticky: string;
    word: string;
    wordHint: string;
    anonymous: string;
  }

  interface WalineLocaleConfig {
    [localePath: string]: WalineLocaleData;
  }
  ```

- Required: No

Waline locales config. For details, see [Waline i18n customize](https://waline.js.org/en/guide/client/i18n.html#customize)

## copyright

- Type: `boolean`
- Default: `true`

Whether show copyright and version in footer.

::: tip

We hope you can keep it on to support Waline.

:::
