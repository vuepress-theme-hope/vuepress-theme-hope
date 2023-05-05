---
title: V2 Migration
icon: code-compare
---

This guide helps you migrate from V1 to V2.

<!-- more -->

## Reasons to update to V2

V2 brings great performance improvements and many new features, see [V2 Highlights](./highlight.md) for details.

## Upgrade to the latest version of V1

Upgrading to the latest version V1 is the first step in the migration. During the upgrade to the latest version V1, you can check the [V1 Changelog](https://vuepress-theme-hope.github.io/v1/changelog.html) to adapt the changes made in V1.

## Start migrating from V1

Now, in most cases you should be able to update `vuepress` and `vuepress-theme-hope` to latest v2 version, and run your v1 project directly.

The migration helper automatically converts your v1 config to v2 config, and gives you hints about deprecated options it converted and not-supported options it dropped. Also, frontmatter of all pages will be converted from v1 syntax to v2.

All you need to do is:

1. Install `vuepress@next` and `vuepress-theme-hope`;

1. Try to start the project, and read the logs;

1. Change your page frontmatter one by one according to logs;

1. Change your config file according to logs.

   If you start importing `hopeTheme` and call it during migration, you should call it with `hopeTheme(themeOptions, true)` as the second argument means running in V1 legacy mode.

1. Covert your `index.styl` to `index.scss`, and your `palette.styl` to `palette.scss` and `config.scss` under `.vuepress/styles` as v2 style system is built with SCSS.

1. Covert your components under `.vuepress/components` to Vue3 syntax, and register them using `@vuepress/plugin-register-components@next` plugin.

1. After you successfully clear all hints, remove the second argument `true` in `hopeTheme`.

## V2 Migration Guide

The following pages list the changes between V1 and V2, respectively.

- [Config Migration Guide](config.md)
- [Page Migration Guide](page.md)
- [Style Migration Guide](style.md)
