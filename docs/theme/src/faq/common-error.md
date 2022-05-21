---
title: Common Errors
icon: warn
category:
  - FAQ
---

## `TypeError: Invalid value used as weak map key`

If you are facing error like this, you are probably using non-standard tags in your project.

There are tags like `<center>` or `<font>`, which is in HTML1.0 spec, but marked as unrecommended since HTML4.0 released in 1999, then removed in HTML5 release in 2008. So Vue is not allowing you to use them by default. You should probably remove them and use standard HTML5 tag.

To remove them, run theme with `--debug` flag, and you will get warning logs telling you tags that probably not be recognized.

To use them anyway, check [here](https://v2.vuepress.vuejs.org/guide/markdown.html#non-standard-html-tags) to get a workaround.

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

Even if you only have one language, you still need to [set language](../config/i18n.md#setting-language).

## `useXXX() is called without provider`

Such errors are usually caused by incorrectly containing multiple versions of `@vue/xxx`, `@vuepress/xxx`, `vue` or `vue-router` in the project.

Make sure you are using the latest `vuepress` and `vuepress-theme-hope` versions:

::: code-tabs#shell

@tab pnpm

```bash
pnpm add vuepress@next vuepress-theme-hope@next
```

@tab yarn

```bash
yarn add vuepress@next vuepress-theme-hope@next
```

@tab npm

```bash
npm i vuepress@next vuepress-theme-hope@next
```

:::

Also, upgrade dependencies to ensure your project only contains a single version of the relevant package:

::: code-tabs#shell

@tab pnpm

```bash
pnpm i && pnpm up
```

@tab yarn

```bash
yarn && yarn upgrade
```

@tab npm

```bash
npm i && npm update
```

:::

## Some page settings are invalid

You can first review the documentation to see if the setting **does not support page config**.

**Support for page config** means that the theme allows the config of the page to override the global config of the same name (same function), but not all functions meet this setting.

::: tip

You should be aware that some features will not be loaded during the prepare stage when the global setting is disabled, so they cannot be enabled locally.

:::
