---
title: Share
description: Share component, share page content to social media.
---

Share component, share page content to social media.

<!-- more -->

## Demo

<!-- #region demo -->

::: md-demo Basic share

<Share />

:::

::: md-demo Customize services

<Share services="qq,weibo" />
<Share :services="['qq','weibo']" />

:::

::: md-demo Colorful icon

<Share colorful />

:::

<!-- #endregion demo -->

## Setting Component

To provide tree-shaking support, you should set `componentOptions.share.services` in plugin options with services you want to use at client side. This will prevent unused config injected to client, and will reduce the size of the client bundle.

The following built-in keywords are supported:

- buffer
- douban
- email
- evernote
- facebook
- flipboard
- line
- linkedin
- messenger
- pinterest
- qq
- qzone
- qrcode
- reddit
- skype
- sms
- snapchat
- telegram
- tumblr
- twitter
- vk
- weibo
- whatsapp
- wordpress

Besides the built-in keyword, you can add your own service config to `componentOptions.share.services`. Each of the config should be an object with the following properties:

- `name`: Service name
- `link`: Share link, where `title`, `description`, `url`, `excerpt`, `summary`, `tags`, `cover` and `image` wrapped by `[]` will be replaced with the value of the page.
- `action`: action of share button, can be `open` (open the link in a new tab), `navigate` (navigate to the link), `popup` (open a popup window) or `qrcode` (show a QR code with link), default is `popup`
- `color`: theme color of icon
- `shape`: plain icon shape, image url, svg code or font icon class are all supported
- `icon`: colorful icon (will generate from `color` and `shape` if not provided), svg code or font icon class are all supported

::: tip

If you are using twitter, you can set `componentOptions.share.twitterUserName` with your twitter username.

:::

## Props

### services

- Type: `string | ShareService[]`

  ```ts
  type BuiltInShareService =
    | "buffer"
    | "douban"
    | "email"
    | "evernote"
    | "facebook"
    | "flipboard"
    | "line"
    | "linkedin"
    | "messenger"
    | "pinterest"
    | "qq"
    | "qrcode"
    | "qzone"
    | "reddit"
    | "skype"
    | "sms"
    | "snapchat"
    | "telegram"
    | "tumblr"
    | "twitter"
    | "vk"
    | "weibo"
    | "whatsapp"
    | "wordpress";

  interface ShareServiceConfig {
    /**
     * Share link
     *
     * @description You can use `[` and `]` to wrap the variable name, and the variable will be replaced with the value of the page.:
     *
     * - `title` will be replaced with the title of the page
     * - `description` will be replaced with the description of the page
     * - `url` will be replaced with the url of the page
     * - `excerpt` will be replaced with the excerpt of the page
     * - `summary` will be replaced with the summary of the page
     * - `tags` will be replaced with the tags of the page
     * - `cover` will be replaced with the cover/banner of the page
     * - `image` will be replaced with the first image of the page
     */
    link: string;

    /**
     * Action of share button
     *
     * @description
     * - `open` will open the link in a new tab
     * - `navigate` will navigate to the link
     * - `popup` will open a popup window
     * - `qrcode` will show a QR code with link
     *
     * @default "popup"
     */
    action?: ShareAction;

    /**
     * Theme color of icon
     *
     * @default 'currentColor'
     */
    color?: string;

    /**
     * Plain icon shape
     */
    shape: string;

    /**
     * Colorful icon
     */
    icon?: string;
  }

  interface ShareServiceOptions extends ShareServiceConfig {
    /**
     * Service name
     */
    name: string;
  }

  type ShareService = BuiltInShareService | ShareServiceOptions;
  ```

- Default: All available services

Share services.

### titleGetter

- Type: `(page: PageData) => string`
- Default: `(page) => page.title`

Title getter.

### descriptionGetter

- Type: `(page: PageData) => string`
- Default: `(page) => page.frontmatter.description`

Description getter.

### summaryGetter

- Type: `(page: PageData) => string`
- Default: `(page) => page.summary`

Summary getter.

### coverGetter

- Type: `(page: PageData) => string`
- Default: `(page) => page.cover`

Cover getter.

### tagGetter

- Type: `(page: PageData) => string`
- Default: `({ frontmatter }) => frontmatter["tag"] || frontmatter["tags"]`

Tag getter.

### inline

- Type: `boolean`
- Default: `false`

Whether to display inline.

### colorful

- Type: `boolean`
- Default: `false`

Whether to use colorful icon.
