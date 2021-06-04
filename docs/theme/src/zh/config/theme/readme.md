---
title: 主题配置
icon: config
category: config
tags:
  - themeConfig
  - config
---

::: tip

你可以查看 [本文档的配置][docs-config] 作为案例，你也可以直接查看源代码中的 [types 文件](https://github.com/vuepress-theme-hope/vuepress-theme-hope/blob/v1/packages/theme/types/theme/)

另外我们还提供了 `themeConfig` Helper 函数，你可以引入它来提供自动补全和校验:

```js
// .vuepress/themeConfig.js
const { themeConfig } = require("vuepress-theme-hope");

module.exports = themeConfig(/* Your themeConfig here */);
```

:::

`.vuepress/config.js` 中的 themeConfig 字段(主题字段)新增以下配置:

## 基本选项

::: danger

这些选项很重要，需要你正确配置。

:::

### author

- 类型: `string`
- 必填: 否

文章显示的默认作者

### nav <Badge text="改进" type="warn" />

NavBarItem 新增

- `icon` 字段来支持图标显示。
- `prefix` 字段来自动添加分组前缀

具体配置，请见 [布局 → 导航栏](../../guide/layout/navbar.md)

### sidebar <Badge text="改进" type="warn" />

SideBarItem 新增

- `icon` 字段来支持图标显示。
- `prefix` 字段来自动添加分组前缀

具体配置，请见 [布局 → 侧边栏](../../guide/layout/sidebar.md)

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

- [**主题布局配置**](layout.md)

- [**主题外观配置**](apperance.md)

[docs-config]: https://github.com/vuepress-theme-hope/vuepress-theme-hope/blob/v1/docs/theme/src/.vuepress/config.js
