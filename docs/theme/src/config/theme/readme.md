---
title: Theme Config
icon: config
category: config
tags:
  - themeConfig
  - config
---

::: tip
You can view [Config of this site][docs-config] as an example, and you can directly view [Type Declaration file](https://github.com/Mister-Hope/vuepress-theme-hope/blob/v1/packages/theme/types/hopeConfig.d.ts) in the source code.
:::

The following configuration has been added to the themeConfig field in `.vuepress/config.js`:

## Basic options

::: danger
These options are important and require you to configure them.
:::

### baseLang

- Type: `string`
- Default: `'en-US'`

The language of the home directory.

This option ensures that the subject text in the main catalog page is displayed in the correct language. You can change it to other languages according to your needs.

::: tip
Only **Simplified Chinese** (zh-CN), **English (United States)** (en-US) and **Vietnamese** (vi-VN) are available for i18n.

If you need multi-language support for other languages, you can [submit a PR to this file](https://github.com/Mister-Hope/vuepress-theme-hope/blob/v1/packages/shared-utils/lib/i18n/config.ts)
:::

### author

- Type: `string`
- Required: No

The default author of the article

### hostname

- Type: `string`
- Required: Yes

The domain name where the current site is deployed.

### nav <MyBadge text="improved" type="warn" />

NavBarItem now has

- `icon` field to support icon display.
- `prefix` field to automatically add group prefix

### sidebar <MyBadge text="improved" type="warn" />

SideBarItem now has

- `icon` field to support icon display.
- `prefix` field to automatically add group prefix

### locales

- Type: `Record <string, HopeLangI18nConfigItem>`

The multi-language configuration of the theme mainly needs to configure `nav` and`sidebar` of each language.

## More

- [**Default Config**](default.md)

- [**Theme Feature Config**](feature.md)

- [**Theme Plugin Config**](plugin.md)

- [**Theme Appearance Config**](apperance.md)

[docs-config]: https://github.com/Mister-Hope/vuepress-theme-hope/blob/v1/docs/theme/src/.vuepress/config.js
