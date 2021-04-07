---
title: Theme eject
icon: launch
---

If none of the built-in options of the theme can meet your customization requirements, or you want to do some development and customization on `vuepress-theme-hope`, the theme provides you with very convenient eject commands.

You can easily use the `vuepress eject-hope [docs-dir]` command to eject the entire theme file to the corresponding directory.

After executing the command to eject the theme to the `.vuepress/theme` folder, you can modify the local theme to complete your changes to the theme.

::: warning

You must specifc `theme` option to `path.resolve(__dirname, './theme')` to use local theme. Otherwise the default fallback will still be `vuepress-theme-hope`.

:::
