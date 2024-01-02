---
title: Guide
icon: lightbulb
---

This plugin can automatically append copyright information when visitors copy content from your site, and can also prohibit site copying or selection.

<!-- more -->

## Usage

This plugin **is disabled globally by default**, you can:

- manually enable it by setting `copy: true` in page frontmatter
- add `global: true` in plugin options to enable it globally, and set `copy: false` in page frontmatter to disable it.

To avoid disturbing visitors, copyright information will be appended only when the copied content length is greater than 100. Set `triggerLength` in plugin options if you want to change this threshold, or via `copy.triggerLength` in page frontmatter.

If you want to prevent users copying long content, you can set `maxLength` in plugin options to customize this limit, or via `copy.maxLength` in page frontmatter.

## Disable Copy and Selection

- If you don't want users to copy your entire site or specific page text, you can set `disableCopy` in plugin options or `copy.disableCopy` in page frontmatter, the latter has higher priority.
- If you don't want users to select your entire site or specific page text, you can set `disableSelection` in plugin options or `copy.disableSelection` in page frontmatter.

The latter has higher priority.

## Copyright Information

You can set default author and license information via `author` and `license` in plugin options.

If your site have different authors and license in different pages, you can set `authorGetter` and `licenseGetter` with function `(page: Page) => string` that takes the current page object as parameter and returns the corresponding information.

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

If you think that appending the copyright information via template is not flexible enough, you can set `copyrightGetter` option to return a completely customized information with Page object or return null to use the default template.
