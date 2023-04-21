---
title: Guide
icon: lightbulb
---

This plugin can automatically append copyright information when visitors copy content from your site, and can also prohibit site copying or selection.

<!-- more -->

## Usage

This plugin is disabled globally by default, you need to manually enable it by setting `copy: true` in page frontmatter. Of course, you can set `global: true` in the plugin options to make it globally enabled, and set `copy: false` in page frontmatter to disable it.

To avoid disturbing visitors, copyright information will be appended only when the length of content copied by the user is not less than `100`. If you want to change this threshold, please set `triggerWords`, and this option supports being overridden via `copy.triggerWord` in page frontmatter.

## Disable Copy and Selection

- If you don't want users to copy your entire site or specific page text, you can set `disableCopy` in plugin options or `copy.disableCopy` in page frontmatter, the latter has higher priority.
- If you don't want users to select your entire site or specific page text, you can set `disableSelection` in plugin options or `copy.disableSelection` in page frontmatter, the latter has higher priority.

## Copyright Information

You can set author and license information via `author` and `license` in plugin options. If your site have different authors and license in different pages, you can pass in a function `(page: Page) => string` that takes the current page object as parameter and returns the corresponding information.

## Customize Copyright Text

You can add copyright information text for a new locale or modify existing ones through `locales` option.

```ts
import { defineUserConfig } from "vuepress";
import { copyrightPlugin } from "vuepress-plugin-copyright2";

export default defineUserConfig({
  locales: {
    "/": {
      // this is a supported language
      lang: "en-US",
    },
    "/xx/": {
      // the plugin does not support this language
      lang: "mm-NN",
    },
  },

  plugins: [
    copyrightPlugin({
      locales: {
        "/": {
          // Override link text
          link: "Original posted at :link",
        },

        "/xx/": {
          // Complete locale config for `mm-NN` language here
        },
      },
    }),
  ],
});
```

For specific options, see [Config → Locale Settings](./config.md#locales).
