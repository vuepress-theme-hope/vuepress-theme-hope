---
title: Common Errors
icon: triangle-exclamation
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

  If so, these components are likely to have different rendering results between SSR[^ssr] and CSR[^csr]. You can try to make their behavior consistent, or wrap your components with the `<ClientOnly />` component provided by `@vuepress/client`.

[^ssr]: **SSR**: **S**erver **S**ide **R**endering
[^csr]: **CSR**: **C**lient **S**ide **R**endering

- If you have this problem in all pages, please also follow the previous step to check the components you added in the layout or global components.

## `xxx isn’t assign with a lang, and will return 'en-US' instead.`

If you see `xxx isn’t assign with a lang, and will return 'en-US' instead.` while the dev process is starting up, please check whether you set lang for every language.

Even if you only have one language, you still need to [set language](../config/i18n.md#setting-language).

## `xxx is missing sidebar config.`

Using object format sidebar config means you want to set different sidebar based on routes.

- If you want to avoid this warning, you need to add sidebar config for rootLocale path, since all pages will fallback to that.
- If you want to disable sidebar in current route, set `sidebar: false` in frontmatter.
- If you want to disable sidebar in current folder, add `[currentFolderRoute]: false` in sidebar config.
- If you want to tell theme that you only want sidebar in routes you set, add `[rootLocalePath]: false` in sidebar config to tell theme sidebar config is disabled by default.

## `useXXX() is called without provider`

Such errors are usually caused by incorrectly containing multiple versions of `@vue/xxx`, `@vuepress/xxx`, `vue` or `vue-router` in the project.

Make sure you are using the latest `vuepress` and `vuepress-theme-hope` versions and all related packages. You can use `vp-update` helper for that

::: code-tabs#shell

@tab pnpm

```bash
pnpm dlx vp-update
```

@tab yarn

```bash
yarn dlx vp-update
```

@tab npm

```bash
npx vp-update
```

:::

::: warning

Any official packages starting with `@vuepress/` should be upgrade to the same version as VuePress.

I.E.: if you are using `@vuepress/plugin-search` and `@vuepress/utils` , you should ensure they have the same version number as `vuepress`.

Besides, any plugin inside `vuepress-theme-hope` should be the same version as vuepress-theme-hope.

Further more, if you're using another third-party plugin, make sure it's compatible with the version of VuePress you're upgrading to.

:::

## HotReload not working in DevServer

Some configuration has high performance impact on dev server, so their hot reload are disabled by default. You can enable it manually via `hotReload: true` in theme options.

These include categories and tags for blog, structured sidebar and git-based information.

## Some page settings are invalid

You can first review the documentation to see if the setting **does not support page config**.

**Support for page config** means that the theme allows the config of the page to override the global config of the same name (same function), but not all functions meet this setting.

::: tip

You should be aware that some features will not be loaded during the prepare stage when the global setting is disabled, so they cannot be enabled locally.

:::
