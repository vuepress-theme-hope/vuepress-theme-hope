---
title: Copyright
icon: copyright
category: feature
tags:
  - copyright
  - feature
copyright:
  minLength: 40
---

Sometimes, you may not want some of your articles to be copied by others, or you want others to automatically generate a piece of copyright information to the clipboard when copying.

`vuepress-theme-hope` introduced [vuepress-plugin-copyright](https://www.npmjs.com/package/vuepress-plugin-copyright) to provide related features.

<!-- more -->

## Enable plugin

Since part of users use this theme for building documents, and document sites usually do not require additional copyright information, this plugin is not enabled by default.

To enable this plugin, you need to set `copyright` in `themeConfig` to `true`, or set `copyright.status` to enable it. The optional values of `copyright.status` are `global` and `local`. The default value is `global`, representing globally enabled (also the state of `themeConfig.copyright: true`).

## Usage

By default, when users copy a message of more than 100 words from your site, a copyright information will append the end of the message.

The author name of the copyright statement will be automatically generated from the author information or site name configured in the theme.

### Trigger length <Badge text="Support page configuration" />

You can use `copyright.minLength` to set the minimum number of characters that triggers to disable copying or append copyright information, the default is `100`.

This property can be set in both themeConfig and frontmatter. The former will be automatically applied globally, while the latter only applies to specific pages with higher priority than the former.

### Disable Copying

Set `copyright.noCopy` to `true` in frontmatter.

::: tip

This behavior is controlled by `minLength`, which means when the content does not reach the value of `minLength`, the user can still perform the copy operation.

:::

### Disable Selection

Set `copyright.noSelect` to `true` in frontmatter.

## Demo

Please copy this text and paste it to any location to see the effect. Please copy this text and paste it to any location to see the effect. Please copy this text and paste it to any location to see the effect. Please copy this text and paste it to any location to see the effect. Please copy this text and paste it to any location to see the effect. Please copy this text and paste it to any location to see the effect. Please copy this text and paste it to any location to see the effect. Please copy this text and paste it to any location to see the effect. Please copy this text and paste it to any location to see the effect. Please copy this text and paste it to any location to see the effect.

## Documentation

For more information about this plugin, please see [vuepress-plugin-copyright docs](https://vuepress.github.io/zh/plugins/copyright/#配置项)

::: warning

This is a VuePress Community plugin, not a built-in plugin.

If you met problems, please go to [its repo](https://github.com/vuepress/vuepress-plugin-copyright) for help.

:::
