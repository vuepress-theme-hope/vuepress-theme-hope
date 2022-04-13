---
title: Guide
icon: creative
---

This plugin can automatically handle redirects for your site.

## Control Page Redirection

If you need to redirect an existing page to a new page, you can use the `redirect` option in Frontmatter to set the link to redirect to.

You will be redirected to the new link when visiting that page.

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

And when you don't set `hostname` above, the plugin will redirect `/foo.html` to `/bar.html` and `/baz.html` to `https://example.com/qux. html`.

:::

The `config` option also accepts a function whose argument is `App`, the return value of which will be parsed as a redirect map. This means you can fully customize redirects by passing a custom function.

::: tip Example

Suppose we already have some articles under the `post` folder, and in an update, we rename `post` to `posts`, then we can define a redirect map like this:

```js
redirect({
  hostname: "https://example.com",
  config: (app) =>
    Object.fromEntries(
      app.pages
        .filter((page) => page.path.startsWith("/posts/"))
        .map((page) => [page.path.replace(/^\/posts\//, "/post/"), page.path])
    ),
});
```

:::
