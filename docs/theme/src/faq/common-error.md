---
title: Common Errors
icon: triangle-exclamation
order: 3
category:
  - FAQ
---

## `useXXX() is called without provider`

Such errors are usually caused by incorrectly containing multiple versions of `vue` in project.

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

## `Issues with peer dependencies found`

This means you have wrong deps installed in your project.

Here is a example:

```shell
 WARN  Issues with peer dependencies found
.
├─┬ @vuepress/plugin-docsearch 2.0.0-rc.7
│ └── ✕ unmet peer vuepress@2.0.0-rc.2: found 2.0.0-rc.5
├─┬ @vuepress/plugin-git 2.0.0-rc.7
│ └── ✕ unmet peer vuepress@2.0.0-rc.2: found 2.0.0-rc.5
├─┬ vuepress 2.0.0-rc.5
│ └── ✕ unmet peer @vuepress/bundler-vite@2.0.0-rc.5: found 2.0.0-rc.4
└─┬ vuepress-theme-hope 2.0.0-rc.21
  └── ✕ unmet peer @vuepress/plugin-docsearch@2.0.0-rc.10: found 2.0.0-rc.7
```

The example shows that:

- `vuepress` requires a same version of `@vuepress/bundler-vite` as itself, but you have `rc.4` bundler and `rc.5` vuepress.

- Some of the plugin requires `vuepress@2.0.0-rc.2`, while you have `vuepress@2.0.0-rc.5`.

You can always edit your deps version to let them fit each other. Usually you are trying to upgrade vuepress, vuepress bundler and plugins to latest version, but there could be chances where a plugin is not compatible with the latest version of vuepress. In this case, you should downgrade vuepress to the version that is compatible with the plugin or temporarily removing the plugin till it supports latest vuepress.

## You are not allowed to use plugin XXX yourself in vuepress config file

This means you are calling a theme-bundled plugin yourself in VuePress config file.

- In most cases, when you use some plugins with theme, the theme automatically handles some plugin options for you,
- Some plugins are required by the theme. If you do not enable the features used by theme, the theme will throw errors.

So when you want to customize these plugins, you should set their options in `plugins.<PLUGIN_SHORT_NAME>` under theme options and let the theme call these plugins for you.

For details on all plugins of the theme, please see [Theme Plugins](../config/plugins/intro.md).

## `FATAL ERROR: XXX - JavaScript heap out of memory`

This means that your `max_old_space_size` setting of Node.js is too small to build this application. You can try to increase the `max_old_space_size` by setting the `NODE_OPTIONS` environment variable.

`max_old_space_size` is in unit of MB, by default it is half size of your machine memory.

This value can be greater than the actual memory size of your machine.

- For small projects, usually it won't take more than 2 GB (2048 MB).
- For large projects, usually it won't take more than 4 GB (4096 MB)
- If you are enabling blog feature together with lots of markdown enhance features on large sites, usually it won't take more than 8 GB (8192 MB)

::: details Ways of increasing

With GitHub workflow, set `env` in your workflow file.

```yml
- name: Build project
  env: // [!code ++]
    NODE_OPTIONS: --max_old_space_size=8192 // [!code ++]
  run: pnpm run build
```

On windows, you can follow [this guide](https://www.technewstoday.com/how-to-set-windows-environment-variables/).

:::

## xxx isn't assign with a lang, and will return 'en-US' instead

If you see `xxx isn't assign with a lang, and will return 'en-US' instead.` while the dev process is starting up, please check whether you set lang for every language.

Even if you only have one language, you still need to [set language](../config/i18n.md#setting-language).

## xxx is missing sidebar config

Using object format sidebar config means you want to set different sidebar based on routes.

- If you want to avoid this warning, you need to add sidebar config for rootLocale path, since all pages will fall back to that.
- If you want to disable sidebar in current route, set `sidebar: false` in frontmatter.
- If you want to disable sidebar in current folder, add `[currentFolderRoute]: false` in sidebar config.
- If you want to tell theme that you only want sidebar in routes you set, add `[rootLocalePath]: false` in sidebar config to tell theme sidebar config is disabled by default.

## `xxx is not installed`

In order to speed up the installation of themes and plugins, we set dependencies with large size as optional, which means that when features you use require these dependencies, you need to manually install the corresponding dependencies.

Just install them in your project directly through your current package manager:

::: code-tabs#shell

@tabpnpm

```bash
pnpm add -D xxx
```

@tab yarn

```bash
yarn add -D xxx
```

@tab:active npm

```bash
npm i -Dxxx
```

:::

## `[Vue warn]: Failed to resolve component: XXX`

If you are facing error like this, you are probably using non-standard tags in your project.

There are tags like `<center>` or `<font>`, which is in HTML1.0 spec, but marked as unrecommended since HTML4.0 released in 1999, then removed in HTML5 release in 2008. So Vue is not allowing you to use them by default. You should probably remove them and use standard HTML5 tag.

To remove them, run theme with `--debug` flag, and you will get warning logs telling you tags that probably not be recognized.

To use them anyway, check [here](https://vuejs.press/guide/markdown.html#non-standard-html-tags) to get a workaround.

## Hydration completed but contains mismatches

This error indicates that you have an SSR mismatch, and it should not be a problem with theme.

Please check if you are using CloudFlare related services first, if so, make sure you turn off static resource compression. Visit [dash.cloudflare.com](https://dash.cloudflare.com), go to Websites → `YOUR_DOMAIN` → Speed → Optimization, turn `JavaScript` and `HTML` off in `Auto Minify` options.

::: warning

Auto Minify in CloudFlare incorrectly handle HTML spaces and line breaks, which can cause Vue triggering SSR mismatches during initialization.

:::

To debug this, set `__VUE_PROD_HYDRATION_MISMATCH_DETAILS__` to `true` so that you can see the details of the mismatch in browser console.

If a component is likely to have different render results between SSR[^ssr] and CSR[^csr]. You can wrap your components with the `<ClientOnly />` component provided by `vuepress/client`.

[^ssr]: **SSR**: **S**erver **S**ide **R**endering

[^csr]: **CSR**: **C**lient **S**ide **R**endering

## HotReload not working in DevServer

Some configuration has high performance impact on dev server, so their hot reload are disabled by default. You can enable it manually via `hotReload: true` in theme options.

These include categories and tags for blog, structured sidebar and git-based information.

## Some page settings are invalid

You can first review the documentation to see if the setting **does not support page config**.

**Support for page config** means that the theme allows the config of the page to override the global config of the same name (same function), but not all functions meet this setting.

::: tip

You should be aware that some features will not be loaded during the prepare stage when the global setting is disabled, so they cannot be enabled locally.

:::

## Issues with styles

To support RTL layout and reduce style size, the theme uses newer CSS, such as `padding-inline` `margin-block` `inset-inline-start` and so on.

The lowest version that supports them is:

- Chrome >= 87
- Edge >= 87
- Firefox >= 66
- Safari >= 14.1

If you need to support older browsers, you can use `postcss-preset-env` to be compatible with the environment you set:

::: code-tabs#bundler

@tab Vite

```ts title=".vuepress/config.ts"
import { addViteConfig } from "@vuepress/helper";
import postcssPresetEnv from "postcss-preset-env";
import { defineUserConfig } from "vuepress";

export default defineUserConfig({
  extendsBundlerOptions: (config, app) => {
    addViteConfig(config, app, {
      css: {
        postcss: {
          plugins: [postcssPresetEnv()],
        },
      },
    });
  },
});
```

@tab Webpack

```ts title=".vuepress/config.ts"
import { configWebpack } from "@vuepress/helper";
import postcssPresetEnv from "postcss-preset-env";
import { defineUserConfig } from "vuepress";

export default defineUserConfig({
  extendsBundlerOptions: (config, app) => {
    configWebpack(config, app, (config) => {
      (((config.postcss ??= {}).postcssOptions ??= {}).plugins ??= []).push(
        postcssPresetEnv(),
      );
    });
  },
});
```

:::
