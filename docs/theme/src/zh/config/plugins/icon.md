---
title: 图标设置
icon: icons
order: 2
category:
  - 配置
tag:
  - 插件配置
  - 主题配置
  - 图标
---

## 介绍 {#intro}

主题通过 `@vuepress/plugin-icon` 提供图标功能。使用说明请参阅 [图标介绍](../../guide/interface/icon.md)。

此插件可以通过将 `plugins.icon` 设置为 `false` 禁用。

## 选项 {#options}

::: fields
@`plugins.icon.assets` type=`IconAsset`

要使用的图标资源。

支持以下关键字，你可以使用其他 CDN 链接甚至你自己的：

- `iconify`：Iconify
- `fontawesome`：仅限 Font Awesome 免费图标
- `fontawesome-with-brands`：Font Awesome 免费图标和品牌图标

其类型为：

```ts
export type BuiltInIcon = "fontawesome-with-brands" | "fontawesome" | "iconify";

export type IconLink =
  `//${string}` | `/${string}` | `http://${string}` | `https://${string}`;

export type IconAsset = (BuiltInIcon | IconLink)[] | BuiltInIcon | IconLink;
```

@`plugins.icon.type` type=`IconType` default="从 assets 中推断"

图标的类型，插件将尝试从资源中推断类型，并回退到 `unknown`。

特别地，插件可以识别：

- iconfont css 链接
- fontawesome kits
- fontawesome 和 iconify 的 CDN 链接

其类型为：

```ts
export type IconType = "fontawesome" | "iconfont" | "iconify" | "unknown";
```

@`plugins.icon.prefix` type=string default="从 assets 和 type 推断"

图标组件的前缀。默认情况下，插件将使用：

- `iconfont icon-` 用于 iconfont 类型
- `fas fa-` 用于 fontawesome 类型
- 空字符串用于所有其他类型

@`plugins.icon.markdown` type=boolean default=`true`

是否在 Markdown 中启用图标语法 (`::icon::`)。

:::
