---
title: 主题配置
icon: config
category: config
tags:
  - themeConfig
  - config
---

::: tip
你可以查看 [本文档的配置][docs-config] 作为案例，你也可以直接查看源代码中的 [types 文件](https://github.com/Mister-Hope/vuepress-theme-hope/blob/v1/packages/theme/types/hopeConfig.d.ts)
:::

`.vuepress/config.js` 中的 themeConfig 字段(主题字段)新增以下配置:

## 基本选项

::: danger
这些选项很重要，需要你正确配置。
:::

### baseLang

- 类型: `string`
- 默认值: `'en-US'`

主目录所对应的语言。

这个选项会保证主目录页面中主题文字使用正确的语言显示。你可以根据自己的需要将其改为其他语言。

::: tip
目前多语言仅适配了 **简体中文** (zh-CN)、**英文(美国)** (en-US) 与 越南语 (vi-VN)。

如果你需要其它语言的多语言支持，你可以 [向此文件提交一个 PR](https://github.com/Mister-Hope/vuepress-theme-hope/blob/v1/packages/shared-utils/lib/i18n/config.ts)
:::

### author

- 类型: `string`
- 必填: 否

文章显示的默认作者

### nav <MyBadge text="改进" type="warn" />

NavBarItem 新增

- `icon` 字段来支持图标显示。
- `prefix` 字段来自动添加分组前缀

具体配置，请见 [布局 → 导航栏](../guide/layout/navbar.md)

### sidebar <MyBadge text="改进" type="warn" />

SideBarItem 新增

- `icon` 字段来支持图标显示。
- `prefix` 字段来自动添加分组前缀

具体配置，请见 [布局 → 侧边栏](../guide/layout/sidebar.md)

### locales

- 类型: `Record<string, HopeLangI18nConfigItem>`

主题的多语言配置，主要需要配置各语言的 `nav` 与 `sidebar`。

### hostname

- 类型: `string`
- 必填: 是

当前网站部署到的域名。

## 更多配置

- [**默认主题配置**](default.md)

- [**主题功能配置**](feature.md)

- [**主题插件配置**](plugin.md)

- [**主题外观配置**](apperance.md)

[docs-config]: https://github.com/Mister-Hope/vuepress-theme-hope/blob/v1/docs/theme/src/.vuepress/config.js
