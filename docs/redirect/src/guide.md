---
title: Guide
icon: lightbulb
---

This plugin can automatically handle redirects for your site.

## Control Page Redirection

If you change the address of an existing page, you can use the `redirectFrom` option in Frontmatter to redirect to the address of this page, which ensures that users are redirected to the new address when they visit the old link.

If you need to redirect an existing page to a new page, you can use the `redirectTo` option in Frontmatter to set the address to redirect to. This way the page will redirect to the new address when accessed.

## Redirect to Pages

You can set a redirect map by setting `config` in plugin options. You can pass in an object where each key-value pair is a map of redirects.

For each redirect map, the key is the source link of the redirect, and the value is the destination link of the redirect. The key must be an absolute path, and the value can be an absolute path or a full path.

When you pass `hostname` in the plugin options, all redirects in absolute path form will be converted to a full path by prepending `hostname` and `base`.

::: tip Example

When you invoke the plugin with the following options and `base` is `/`:

```js
redirect({
  hostname: "https://example.com",
  config: {
    "/foo.html": "/bar.html",
    "/baz.html": "https://example.com/qux.html",
  },
});
```

The plugin will redirect `/foo.html` to `https://example.com/bar.html` and `/baz.html` to `https://example.com/qux.html`.

And when you don't set `hostname` above, the plugin will redirect `/foo.html` to `/bar.html` and `/baz.html` to `https://example.com/qux.html`.

:::

The `config` option also accepts a function whose argument is `App`, the return value of which will be parsed as a redirect map. This means you can fully customize redirects by passing a custom function.

::: tip Example

Suppose we already have some articles under the `post` directory, and in an update, we rename `post` to `posts`, then we can define a redirect map like this:

```js
redirect({
  hostname: "https://example.com",
  config: (app) =>
    Object.fromEntries(
      app.pages
        .filter(({ path }) => path.startsWith("/posts/"))
        .map(({ path }) => [path.replace(/^\/posts\//, "/post/"), path])
    ),
});
```

:::

## Redirecting Locales

The plugin can automatically handle multilingual redirection for site.

### Auto Locales

The plugin can automatically redirect non-multilingual links to the multilingual pages the user needs based on the user's language preference.

To achieve this, you need to leave the default language directory (`/`) blank and set `autoLocale: true` in plugin options. The plugin will automatically redirect to the correct page according to the user's language.

I.E.: you need to set the following directory structure:

```
.
├── en
│   ├── ...
│   ├── page.md
│   └── README.md
├── zh
│   ├── ...
│   ├── page.md
│   └── README.md
└── other_languages
    ├── ...
    ├── page.md
    └── README.md
```

And set `locales` in theme options with:

```js
export default {
  locales: {
    "/en/": {
      lang: "en-US",
      // ...
    },
    "/zh/": {
      lang: "zh-CN",
      // ...
    },
    // other languages
  },
  // ...
};
```

So when a user accesses `/` or `/page.html`, they are automatically redirected to `/en/` `/en/page.html` and `/en/` `/en/page.html` based on current browser language.

::: info Customizing fallback behavior

Sometimes, users may add more than one language to the system settings. By default, when a site supports a preferred language, but the page not exists for the preferred language, the plugin attempts to match the alternate language set by the user.

If you don't need to fall back to the user's alternate language, but directly match the user's preferred language, set `localeFallback: false` in the plugin options.

:::

::: info Customizing missing behavior

Sometimes, when a user visits a page, the document does not yet contain the language version the user needs (a common case is that the current page has not been localized in the relevant language), so the plugin needs to perform a default action, which you can customize by `defaultBehavior` in the plugin options:

- `"defaultLocale"`: Redirect to default language or first available language page (default behavior)
- `"homepage"`: redirect to the home page in the current language (only available if the document contains the user's language)
- `"404"`: Redirect to page 404 in current language (only available if the document contains the user's language)

:::

::: info Customizing default locale path

You can customize the default locale path by setting `defaultLocale` in the plugin options. By default, the plugin uses the first locale key in `locales` as the default language.

:::

### Automatically switch languages

The plugin supports automatically switching the link to the multilingual page that the user needs according to the user's language preference when opening a multilingual document. In order to achieve this, you need to set `switchLocale` in the plugin options, which can be the following two values:

- `direct`: switch directly to the user language preference page without asking
- `modal`: When the user's language preference is different from the current page language, show a modal asking whether to switch language

### Customizing Locale Settings

By default, the plugin generates a locale setting by reading `locale path` and `lang` from the site's `locales` option. Sometimes, you may want multiple languages to hit the same path, in which case you should set `localeConfig` in plugin options.

For example, you might want all English users to match to `/en/` and Chinese Traditional users to `/zh/`, then you can set:

```js
redirect({
  localeConfig: {
    "/en/": ["en-US", "en-UK", "en"],
    "/zh/": ["zh-CN", "zh-TW", "zh"],
  },
});
```

## Redirecting Sites

Sometimes you may change `base` or use new domain for your site, so you may want the original site automatically redirects to the new one.

To solve this, the plugin provide `vp-redirect` cli.

```shell
Usage:
  $ vp-redirect generate [sourceDir]

Options:
  --hostname <hostname>  Hostname to redirect to (E.g.: https://new.example.com/) (default: /)
  -c, --config <config>  Set path to config file
  -o, --output <output>  Set the output directory (default: .vuepress/redirect)
  --cache <cache>        Set the directory of the cache files
  -t, --temp <temp>      Set the directory of the temporary files
  --clean-cache          Clean the cache files before generation
  --clean-temp           Clean the temporary files before generation
  -h, --help             Display this message
```

You need to pass in VuePress project source dir and also set the `hostname` option. The redirect helper cli will initialize your VuePress project to get pages, then generate and output the redirect html files to the output directory.

By default, the plugin will output to `.vuepress/redirect` directory under source directory. And you should upload it to your original site to provide redirection.
