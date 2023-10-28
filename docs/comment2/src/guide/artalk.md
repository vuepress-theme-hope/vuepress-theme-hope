---
title: Artalk
icon: a
---

Artalk is a neat self-hosted commenting system that you can easily deploy on your server and put into your front-end page.

Come to your blog, or anywhere, place the Artalk comment box, so that the page has rich social functions.

<!-- more -->

## Install

::: code-tabs#shell

@tab pnpm

```bash
pnpm add -D artalk
```

@tab yarn

```bash
yarn add -D artalk
```

@tab npm

```bash
npm i -D artalk
```

:::

## Deploy Artalk Server

See the [Artalk documentation](https://artalk.js.org/guide/deploy.html).

## Configuration

Please set `provider: "Artalk"` and pass your server link to `server` in the plugin options.

For other configuration items, see [Artalk Configuration](https://artalk.js.org/guide/frontend/config.html).

::: note

The plugin retains the `el` option and inserts Artalk itself on the page. At the same time, the plugin will automatically set the `pageTitle`, `pageKey` and `site` options for you according to the VuePress information.

Before VuePress2 provides client configuration, the two function options `imgUploader` and `avatarURLBuilder` are not supported.

:::

## Darkmode

In order for Artalk to apply the correct theme, you need to pass a boolean value to `<CommentService />` through the `darkmode` attribute, representing whether the dark mode is currently enabled.
