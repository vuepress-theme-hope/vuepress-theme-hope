---
title: Guide
icon: creative
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

And when you don’t set `hostname` above, the plugin will redirect `/foo.html` to `/bar.html` and `/baz.html` to `https://example.com/qux.html`.

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

By default the plugin will output to `.vuepress/redirect` directory under source directory. And you should upload it to your original site to provide redirection.
