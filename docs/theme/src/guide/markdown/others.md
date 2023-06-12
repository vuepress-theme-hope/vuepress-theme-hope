---
title: Others
icon: ellipsis
order: -2
category:
  - Markdown
tag:
  - Markdown
---

## Link check

The theme will check your Markdown links in dev mode by default.

You can customize this feature through `checkLinks` in plugin options. `checkLinks` receives an object.

- You can customize link check status with `checkLinks.status` where you can choose from `'always'`, `'never'`, `'dev'` and `'build'`.
- To ignore some links, you can set `checkLinks.ignore` with an array of string and RegExp, or a function that receives link and isDev as parameters and returns a boolean value indicating whether to ignore the link.

E.g.:

```js
export default {
  plugins: [
    mdEnhancePlugins({
      checkLinks: {
        // only check links in dev mode
        status: "dev",
        ignore: [
          // ignore links starting with `/api/`
          /^\/api\//,
          // ignore `/playground.html`
          "/playground.html",
        ],
      },
    }),
  ],
};
```

## GFM

If your docs both serve on documentation site and directly on GitHub, we provide `plugins.mdEnhance.gfm` in theme options to align your Markdown behavior with GitHub.

::: note

Custom container is enabled by default in `@vuepress/theme-default` and `vuepress-theme-hope`, but not available in GitHub Markdown preview.

:::

## v-pre

Since VuePress2 has removed V1's v-pre container in core, the plugin provides `vPre` option to support it. That is, you can use any Mustache syntax in the container below.

```md
::: v-pre

{{ abc }}

:::
```
