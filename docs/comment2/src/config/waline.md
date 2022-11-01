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
- Default: `['//unpkg.com/@waline/emojis@1.1.0/weibo']`

Emoji settings, for details see [Custom Emoji](https://waline.js.org/en/guide/client/emoji.html)

## dark

- Type: `string | boolean`
- Default: `false`

Darkmode support

- Setting a boolean will set the dark mode according to its value.
- Set it to `'auto'` will display darkmode due to device settings.
- Filling in a CSS selector will enable darkmode only when the selector match waline ancestor nodes.

::: tip Examples

- **vuepress-theme-hope** will enable darkmode by setting `theme-dark` class on the `<body>` tag itself. So the theme automatically set `'body.theme-dark'` as `dark` option for you.

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

- `'enable'`: enable login
- `'disable'`: Login is disabled, users should fill in information to comment
- `'force'`: Forced login, users must login to comment

## wordLimit

- Type: `number | [number, number]`
- Default: `0`

Comment word s limit. When a single number is filled in, it 's the maximum number of comment words. No limit when set to `0`.

## metaIcon

- Type: `boolean`
- Default: `true`

Whether import meta icon.

## pageSize

- Type: `number`
- Default: `10`

number of comments per page.

## search

- Type: `WalineSearchOptions | false`
- Required: No
- Details:

  ```ts
  interface WalineSearchResult extends Record<string, unknown> {
    /**
     * Image link
     */
    src: string;

    /**
     * Image title, optional
     */
    title?: string;

    /**
     * Image preview link, optional
     *
     * @default src
     */
    preview?: string;
  }

  interface WalineSearchOptions {
    /**
     * Search action
     */
    search: (word: string) => Promise<WalineSearchResult[]>;

    /**
     * Default search action
     *
     * @default () => search('')
     */
    default?: () => Promise<WalineSearchResult[]>;

    /**
     * Fetch more action
     *
     * @default (word) => search(word)
     */
    more?: (
      word: string,
      currentCount: number
    ) => Promise<WalineSearchResult[]>;
  }
  ```

Customize search features, you can disable search function by setting it to `false`.

## copyright

- Type: `boolean`
- Default: `true`

Whether show copyright and version in footer.

::: tip

We hope you can keep it on to support Waline.

:::

## recaptchaV3Key

- Type: `string`
- Required: No

reCAPTCHA V3 is a captcha service provided by Google. You can add reCAPTCHA V3 site key with `recaptchaV3Key` to enable it. Notice you should also set environment variable `RECAPTCHA_V3_SECRET` for server.

## reaction

- Type: `boolean | string[]`
- Default: `false`

Add emoji interaction function to the article, set it to `true` to provide the default emoji, you can also customize the emoji image by setting the emoji url array, and supports a maximum of 8 emojis.
