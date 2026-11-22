---
title: Share
icon: share-nodes
category:
  - Feature
tag:
  - Feature
  - Share
share: true
---

VuePress Theme Hope allows you to add share buttons to pages with [`@vuepress/plugin-share`][share].

<!-- more -->

## Introduction

The plugin registers a global `<Share />` component, which renders share buttons for the current page, so visitors can share it to social platforms, by email or as a QR code.

## Enable Feature

The plugin is disabled by default, you should set `plugins.share` in theme options to enable it:

```ts twoslash {5} title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  plugins: {
    share: {},
  },
});
```

Then you can use the `<Share />` component in your Markdown files:

```md
<Share />
```

::: preview Basic share

<Share />

:::

By default, buttons for X, Facebook, Reddit, Telegram, WhatsApp and email are rendered. You can set `services` to choose the buttons, and `xUserName` to mention an X account in the share link:

```ts twoslash {5-8} title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  plugins: {
    share: {
      services: ["x", "facebook", "qq", "weibo"],
      xUserName: "MrHope",
    },
  },
});
```

## Page Meta Buttons

The theme renders share buttons in the page meta area at the bottom of each content page once the plugin is enabled, so visitors can share the page without adding `<Share />` manually. They are placed at the bottom right by default.

You can set the `share` theme option to `"left"` to place them at the bottom left, or to `false` to disable them. The `share` frontmatter of a page accepts a boolean to show or hide the buttons for that page:

```ts twoslash {4} title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  share: "left",
});
```

```md
---
share: false
---
```

The buttons are only rendered when `@vuepress/plugin-share` is enabled.

## Services

Every built-in service is available to the component. The `services` option only decides which buttons are displayed by default:

`buffer`, `douban`, `email`, `evernote`, `facebook`, `flipboard`, `line`, `linkedin`,
`messenger`, `pinterest`, `qq`, `qrcode`, `qzone`, `reddit`, `skype`, `sms`,
`snapchat`, `telegram`, `tumblr`, `vk`, `weibo`, `whatsapp`, `wordpress`, `x`

You can also add a custom service in `plugins.share.services`. A custom service requires `name`, `link` and `shape`, and also supports `label`, `color`, `icon` and `action`:

```ts twoslash {6-14} title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  plugins: {
    share: {
      services: [
        "x",
        {
          name: "mastodon",
          link: "https://mastodon.social/share?text=[title]&url=[url]",
          shape: "<svg>...</svg>",
          color: "#6364ff",
        },
      ],
    },
  },
});
```

- `link`: Share link, which supports the [share data](#share-data) variables.
- `shape`: Plain icon, which can be an SVG string, an image link or a font icon class.
- `label`: Accessible label and tooltip of the button, defaults to `name`.
- `color`: Background color of the colorful icon.
- `icon`: Colorful icon, which overrides the icon generated from `color` and `shape`.
- `action`: Behavior of the button, which can be `popup` (default), `open`, `navigate` or `qrcode`.

Custom services are registered for the whole site by `plugins.share.services`, so they are displayed by default just like built-in services.

Use the `services` prop of the component to choose which buttons to display:

::: preview Choose services

<Share :services="['qq', 'weibo', 'x']" />

:::

## Share Data

The `link` of each service can contain variables wrapped in brackets, which are replaced with the data of the current page:

- `title`: Page title
- `description`: Page description, which also falls back to the meta tags
- `url`: Page URL
- `excerpt`: Page excerpt
- `summary`: Page summary
- `tags`: Page tags, joined by commas
- `cover`: Page cover
- `image`: First image on the page

`description`, `excerpt`, `summary`, `cover` and `tags` fall back to the matching frontmatter field. You can override the title, description, excerpt, summary, cover and tags with getters passed to the component, while `url` and `image` are always derived from the page:

```md
<Share
  :title-getter="(page) => page.title.toUpperCase()"
  :tag-getter="() => 'vuepress'"
/>
```

## Customize Config

`vuepress-theme-hope` passes `plugins.share` in theme options as plugin options to `@vuepress/plugin-share`.

By default, buttons are muted and colored with the theme accent on hover. You can set `colorful` to render the brand color of each service, and `inline` to remove the vertical margin, which is useful when the buttons are placed in a paragraph or a layout slot:

::: preview Inline share

<Share inline />

:::

::: preview Colorful share

<Share colorful />

:::

You can check the [share plugin documentation][share] for all options and component props.

[share]: https://ecosystem.vuejs.press/plugins/features/share.html
