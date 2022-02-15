---
title: Common problems
icon: question
category:
  - FAQ
---

## Getting Help

If you ran into some issues, please make sure you are in the lastest version and tried removing `node_modules` folder then a clean install.

If the issue persists, please [open a discussion](https://github.com/vuepress-theme-hope/vuepress-theme-hope/discussions/new) on GitHub, and paste the full log running `vuepress dev [docs-dir] --debug`, if your problem is related to display, please also provide related screenshots.

If the issue exists or there is somthing you don’t know how to solve, welcome to [open a dicussion](https://github.com/vuepress-theme-hope/vuepress-theme-hope/discussions/new). Questions are always welcome, no matter **they are simple or not**. You only need to make sure two points:

1. You have tried searching related docs through search box.

1. You are providing a detailed description in the discussion.

   - If you don’t know how to config something, please describe what you want, and what you search or what section are you expecting to see the guidelines (so that we can improve our docs)

   - If you are running into issues, provide related error log (by running `vuepress dev <docs dir> --debug`) and screenshots.

If you are sure there is an issue somewhere, please [open an issue](https://github.com/vuepress-theme-hope/vuepress-theme-hope/issues/new/choose) on GitHub and point out the issue in full specific details.

## `xxx isn’t assign with a lang, and will return 'en-US' instead.`

If you see `xxx isn’t assign with a lang, and will return 'en-US' instead.` while the dev process is starting up, please check whether you set lang for every language.

If you only have one language, please set root lang like this way:

:::: code-group

::: code-group-item TS

```ts
// .vuepress/config.ts
import { defineHopeConfig } from "vuepress-theme-hope";

export default defineHopeConfig({
  locales: {
    "/": {
      // set language you want
      lang: "zh-CN",
    },
  },
});
```

:::

::: code-group-item JS

```js
// .vuepress/config.js
const { defineHopeConfig } = require("vuepress-theme-hope");

module.exports = defineHopeConfig({
  locales: {
    "/": {
      // set language you want
      lang: "zh-CN",
    },
  },
});
```

:::

::::

## Some page settings are invalid

You can first review the documentation to see if the setting **does not support partial configuration**.

**Support for partial configuration** means that the theme allows the configuration of the page to override the global configuration of the same name (same function), but not all functions meet this setting. For the sake of project compilation speed, some projects will not be loaded during the compilation phase after the global configuration is disabled, and they cannot be enabled locally.

## Code block does not look right in light mode

I guess this is your fault. Please delete the `$codeBgColor` in `.vuepress/styles/palette.styl`. The default value of `vuepress-theme-hope` is light blue, while `@vuepress/theme-default` is dark blue.
