---
title: Guide
icon: lightbulb
---

## Setting Options

You can both set options with plugin options on Node side and set options in client config file on Browser side.

::: tabs

@tab With Plugin Options

```ts
import { commentPlugin } from "vuepress-plugin-comment2";

// .vuepress/config.ts
export default {
  plugins: [
    commentPlugin({
      provider: "Artalk", // Artalk | Giscus | Waline | Twikoo

      // other options here
      // ...
    }),
  ],
};
```

@tab With Client Config File

```ts
// .vuepress/client.ts
import { defineClientConfig } from "@vuepress/client";
import {
  defineArtalkConfig,
  // defineGiscusConfig,
  // defineTwikooConfig,
  // defineWalineConfig,
} from "vuepress-plugin-comment2/client";

defineArtalkConfig({
  // 选项
});

export default defineClientConfig({
  // ...
});
```

:::

But there are some limitations you should remember:

- `provider`, locales and other resource related option must be set in plugin options.

  To ensure tree-shaking works, we must optimize entries at node so that bundler can understand which resource should be included in the final bundle.

  These options will be marked with <Badge text="Plugin Option Only" type="warning"/> in config reference.

- Options which can not be serialized to JSON must be set in client config.

  Options that receive complicated values (e.g.: Function) can not be set in plugin options, as plugins are running under Node.js environment, so we can not pass these values and their contexts to browser.

  These options will be marked with <Badge text="Client Config Only" type="warning"/> in config reference.

## Adding Comment

This plugin globally registers a component `<CommentService />`.

- If you are a user, you should use `alias` and layout slots to insert the component. We recommended you to insert the comment component (`<CommentService />`) after the `<PageNav />` component, and [here is a demo](../demo.md) with default theme.
- If you are a theme developer, you should insert this component in the layout of your theme.

## Comment Status

By default, `<CommentService />` component is enabled globally, and you can use `comment` option in both plugin options and page frontmatter to control it.

- You can disable it locally by setting `comment: false` in page frontmatter.

- To keep it globally disabled, please set `comment` to `false` in the plugin options. Then you can set `comment: true` in page frontmatter to enable it locally.

## Comment ID

You can set `commentID` option in page frontmatter to customize comment ID, which is used to identify comment storage item to use for a page.

By default it will be the `path` of the page, which means if you are deploying the site to multiple places, page with same content across sites will share the same comment data.

## Comment Services

Currently, you can choose from Giscus, Waline, Twikoo and Artalk.

::: tip Recommended comment services

- Facing programmers and developers: Giscus
- Facing general public: Waline

:::

- [Giscus Guide](giscus.md)

- [Waline Guide](waline.md)

- [Twikoo Guide](twikoo.md)

- [Artalk Guide](artalk.md)
