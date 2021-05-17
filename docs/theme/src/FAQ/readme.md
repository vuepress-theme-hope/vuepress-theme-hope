---
title: Common problems
icon: question
category: FAQ
---

## Getting Help

If you ran into some issues, please make sure you are in the lastest version and tried removing `node_modules` folder then a clean install.

If the issue exists or there is somthing you don’t know how to solve, welcome to [open a dicussion](https://github.com/vuepress-theme-hope/vuepress-theme-hope/discussions/new). Questions are always welcome, no matter **they are simple or not**. You only need to make sure two points:

1. You have tried searching related docs through search box.

1. You are providing a detailed description in the discussion.

   - If you don’t know how to config something, please describe what you want, and what you search or what section are you expecting to see the guidelines (so that we can improve our docs)

   - If you are running into issues, provide related error log (by running `vuepress dev <docs dir> --debug`) and screenshots.

## `warning Overiding existing page xxx`

If you see `warning Overiding existing page xxx` while the dev process is starting up, please check your file structure.

You probably created two file with same path.

For example: `a/b.md` and `a/b/readme.md` will both be `/a/b/`

This will cause one page content be lost and it will also cause others issue.

## `xxx isn’t assign with a lang, and will return 'en-US' instead.`

If you see `xxx isn’t assign with a lang, and will return 'en-US' instead.` while the dev process is starting up, please check whether you set lang for every language.

If you only have one language, please set root lang like this way:

```js
// .vuepress/config.js
const { config } = require("vuepress-theme-hope");

module.exports = config({
  locales: {
    "/": {
      // set language you want
      lang: "en-US",
    },
  },
});
```

## Some page settings are invalid

You can first review the documentation to see if the setting **does not support partial configuration**.

**Support for partial configuration** means that the theme allows the configuration of the page to override the global configuration of the same name (same function), but not all functions meet this setting. For the sake of project compilation speed, some projects will not be loaded during the compilation phase after the global configuration is disabled, and they cannot be enabled locally.

## Code block does not look right in light mode

I guess this is your fault. Please delete the `$codeBgColor` in `.vuepress/styles/palette.styl`. The default value of `vuepress-theme-hope` is light blue, while `@vuepress/theme-default` is dark blue.

## 404 when visiting some links

If you use non-URL-standard characters in category or tags, such as:

```md
---
category: 软件
tags:
  - 谷歌浏览器
---
```

Then when you visit `/category/软件` and `/tag/谷歌浏览器/`, you will be navigated to the 404 page.

This is a potentially breaking change introduced by `vue-router` in `3.4.6`. Starting from `3.4.6`, `vue-router` requires all non-standard URL paths to be handled by `encodeURI` and then added as a path to `router`.

The theme uses `@vuepress/plugin-blog` for blog support. This problem should be corrected in this plugin. Mr. Hope has already reported [This Issue](https://github.com/vuepress/vuepress-plugin-blog/issues/95), and submitted a [PR](https://github.com/vuepress/vuepress-plugin-blog/pull/97) for a temporary fix, but no one reviewed that PR.

::: tip Temporary solution

If you are using yarn, you can add the `resolutions` field:

```json
{
  ...
  "resolutions": {
    "vue-router": "3.4.5"
  },
  ...
}
```

Go to your package.json to temporarily solve this problem.

:::

## TypeScript problems

- [TypeScript problems](typescript.md)
