---
title: Notice
---

The plugin provides a global component `Notice` for you to show some notices to your visitors.

You can configure it via `notice` option in plugin options.

<!-- more -->

## Usage

You can set multiple notices for different paths in the site, to do this, set `rootComponents.notice` in the plugin options with an array of notice options you need.

Each notice options needs to contain a `path` or `match` option, which is used to match the path. The `path` option is a string, which matches all paths starting with this, and the `match` option is a regular expression, which matches all paths that match.

Other notice configuration includes:

- `title`: Notice title, support both text and HTMLString
- `content`: Notice content, support both text and HTMLString
- `actions`: Notice actions

  Should be an array of objects containing:

  - `text`: action text
  - `link`: action link (optional).

    Pathname will be treated as internal route link and handled by router, and absolute links will be treated as external link and being opened in new window.

  - `type`: `"default"` or `"primary"` (optional)

    Default value is `"default"`.

Here is an example:

```ts
import { componentsPlugin } from "vuepress-plugin-components";

export default {
  plugins: [
    componentsPlugin({
      rootComponents: {
        notice: [
          {
            path: "/",
            title: "Notice Title",
            content: "Notice Content",
            actions: [
              {
                text: "Primary Action",
                link: "https://theme-hope.vuejs.press/",
                type: "primary",
              },
              { text: "Default Action" },
            ],
            fullscreen: true,
          },
          {
            path: "/zh/",
            title: "Notice Title",
            content: "Notice Content",
            actions: [
              {
                text: "Primary Action",
                link: "https://theme-hope.vuejs.press/",
                type: "primary",
              },
              { text: "Default Action" },
            ],
            fullscreen: true,
          },
        ],
      },
    }),
  ],
};
```

## Advanced

Also, we provide some advanced option for you to control notice display.

::: info Notice Display Control

By default, the notice will be shown whenever users enter the site, and it will remain closed in this time if users close it.

To prevent notice being shown again in next visit after users close it, you can set `showOnce: true` in notice options.

Also, notice remembering is based on notice title and notice content, you can set `noticeKey` option to use a key you want, so that you can edit notice without bothering users who already confirm them.

:::

::: info Close logic

By default, there will be a close button on the right of notice, and users can close it by clicking it.

However, if you want users to confirm the notice, you can set `confirm: true`, so that users can only close the notice by hitting action buttons.

:::

::: info Fullscreen

If you want to display a fullscreen popup, you can use `fullscreen: true` in notice options. We recommend you to use this together with `confirm: true`.

The notice will display in the center of screen, and the other places will be covered by a blur mask.

:::
