---
title: FAQ
icon: question
category:
  - FAQ
---

## Telegram Group

- [vuepressthemehope](https://t.me/vuepressthemehope)

## Getting Help

If you ran into some issues, please make sure you are in the lastest version and tried removing `node_modules` folder then a clean install.

If the issue persists, please [open a discussion](https://github.com/vuepress-theme-hope/vuepress-theme-hope/discussions/new) on GitHub, and paste the full log running `vuepress dev [docs-dir] --debug`, if your problem is related to display, please also provide related screenshots.

If the issue exists or there is somthing you don’t know how to solve, welcome to [open a dicussion](https://github.com/vuepress-theme-hope/vuepress-theme-hope/discussions/new). Questions are always welcome, no matter **they are simple or not**. You only need to make sure three points:

1. You have tried searching related docs through search box.

1. You are providing a detailed description in the discussion.

   - If you don’t know how to config something, please describe what you want, and what you search or what section are you expecting to see the guidelines (so that we can improve our docs)

   - If you are running into issues, provide related error log (by running `vuepress dev <docs dir> --debug`) and screenshots.

1. You are not asking question unrelated to VuePress or asking for a "tecnical support". Also, for customization, we only support "how can you customize something (in which way)". "How to customize something" (what you should write in your own codes) is NOT SUPPORTED. Unless you are donating this project, please do not inisit asking help for that part.

   If you have learning questions about Vue, TypeScript, Sass or you don't know how to write something you want, you probably need to ask them in places like vue forum, stackoverflow.

   I (Mr.Hope) am a postgraduate student majored in theoretical physics, and really busy. I am not expecting to "be a doc provider" or "teach you how to write code".

If you are sure there is an issue somewhere, please [open an issue](https://github.com/vuepress-theme-hope/vuepress-theme-hope/issues/new/choose) on GitHub and point out the issue in full specific details.

## `TypeError: Invalid value used as weak map key`

If you are facing error like this, you are probably using non-standard tags in your project.

There are tags like `<center>` or `<font>`, which is in HTML1.0 spec, but marked as unrecommanded since HTML4.0 released in 1999, then removed in HTML5 release in 2008. So Vue is not allowing you to use them by default. You should probably remove them and use standard HTML5 tag.

If you want to remove them, run theme with `--debug` flag, and you will get warning logs telling you tags that probably not be recognized.

If you want to use them anyway, check [here](https://v2.vuepress.vuejs.org/guide/markdown.html#non-standard-html-tags) to get a workaround.

## Slow in a cold boot with Vite

This is the expect behaviour. We are adding more features, which means we have 2× to 8× lines of code comparing with `@vuepress/theme-default` according to the functions you are using. So transpiling and sending the theme and plugins code to broswer is expected to increase from `0.8s - 2s` in `@vuepress/theme-default` to `3s - 8s` (range due to machine performance).

::: tip

You can not depend on fast speed and strong functions at the same time, bro.

:::

Also, the style system is greatly slowing down the speed.

- `@vuepress/theme-default` is placing all the styles together at `styles` folder and importing them entirly, so that `sass` will only need to compile once and vite only need to send 1 extra web request. That's why it's fast.

  But this will let style unbinded with components, and they will be injected anyway. So that when you overide a component or a layout, you have to overide old styles to build styles you want.

- `vuepress-theme-hope` is binding styles with components, but that means `sass` has to compile styles for each component, and vite need to send an extra request for each components. Due to `vuepress-theme-hope` has 2× to 6× components (depending on whether you enable blog featues or not) comparing with `@vupress/theme-default`, it will take extra time of `2.4s - 4s` for that.

  But, you can easily overide a component together with it's styles in this way.

So, due to the above reasons, `vuepress-theme-hope` will have an average of 4× code and 10× requests comparing with `@vuepress/theme-default`, so the time increasing from `2s` to `10s` is reasonable and expected.

::: tip

Don't worry, due to network cache, a hot reload when editing markdown files is still fast.

:::

## `Hydration completed but contains mismatches.`

This error indicates that you have an SSR mismatch, and it should not be a problem with theme.

Please check if you are using CloudFlare related services first, if so, make sure you turn off static resource compression. Visit [dash.cloudflare.com](https://dash.cloudflare.com), go to Websites → `YOUR_DOMAIN` → Speed → Optimization, turn `JavaScript` and `HTML` off in `Auto Minify` options.

::: warning

Auto Minify in CloudFlare incorrectly handle HTML spaces and line breaks, which can cause Vue triggering SSR mismatches during initialization.

:::

Also you can check these:

- If you only encounter this problem on certain pages, please check whether the page has additional components you added.

  If so, these components are likely to have different rendering results between SSR and the client. You can try to make their behavior consistent, or wrap your components with the `<ClientOnly />` component provided by `@vuepress/client`.

- If you have this problem in all pages, please also follow the previous step to check the components you added in the layout or global components.

## `xxx isn’t assign with a lang, and will return 'en-US' instead.`

If you see `xxx isn’t assign with a lang, and will return 'en-US' instead.` while the dev process is starting up, please check whether you set lang for every language.

Even if you only have one language, you still need to [set your root language](config/i18n.md#setting-root-lang).

## Importing Iconfont icons does not work

If you are using IconFont icons and can see the icons normally on the devServer, but not in the deploy env, you may need to check how the icons are imported.

In VuePress2, importing web CSS via `@import` in `index.scss` has no effect. You may need to manually import it in the `head` option of your VuePress configuration.

<!-- ```js 5-13}
import { defineHopeConfig } from "vuepress-theme-hope";

export default defineHopeConfig({
  head: [
    [
      "link",
      {
        rel: "preload",
        as: "style",
        onload: 'this.onload=null;this.rel="stylesheet"',
        href: "//at.alicdn.com/t/font_2410206_mfj6e1vbwo.css",
      },
    ],
  ],

  // ...
});
``` -->

```js {5-11}
import { defineHopeConfig } from "vuepress-theme-hope";

export default defineHopeConfig({
  head: [
    [
      "link",
      {
        rel: "stylesheet",
        href: "//at.alicdn.com/t/font_2410206_mfj6e1vbwo.css",
      },
    ],
  ],

  // ...
});
```

::: info Reason

1. CSS imported via `@import` in Sass will be compiled into standard CSS `@import` syntax.
1. The CSS `@import` syntax only works at the top of css file.
1. In order to give user styles a higher priority, we will import user styles after theme and plugin styles.
1. During the build process of VuePress2, all styles are compressed into a single CSS file.

The above results in the user's CSS `@import` imports in Sass appearing in the middle of the final CSS file and thus invalid.

The default theme also has the same problem, and this cannot be fixed on the theme side.

:::

## Some page settings are invalid

You can first review the documentation to see if the setting **does not support page config**.

**Support for page config** means that the theme allows the config of the page to override the global config of the same name (same function), but not all functions meet this setting.

::: tip

You should be aware that some features will not be loaded during the prepare stage when the global setting is disabled, so they cannot be enabled locally.

:::
