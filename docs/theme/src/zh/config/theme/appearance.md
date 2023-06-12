---
title: 主题外观选项
icon: palette
order: 4
category:
  - 配置
tag:
  - 主题配置
  - 外观
---

以下选项控制主题的外观，一般情况下你无需关注他们，它们仅为有相关配置需求的少数用户提供。

<!-- more -->

::: warning

这些选项**仅支持在主题配置中直接配置**，而不支持在各语言中分别配置。

:::

## iconAssets <Badge text="仅限 Root" type="warning" />

- 类型: `FontIconAssets`

  ```ts
  type Link =
    | `/${string}`
    | `//${string}`
    | `http://${string}`
    | `https://${string}`;

  type BuiltInFontIcon =
    | "iconify"
    | "iconfont"
    | "fontawesome"
    | "fontawesome-with-brands";

  type FontIconAssets = BuiltInFontIcon | Link | (BuiltInFontIcon | Link)[];
  ```

- 必填: 否
- 详情: [界面 → 图标](../../guide/interface/icon.md)

字体图标资源链接，支持 `'iconfont'` 和 `'fontawesome'` 关键字。

## darkmode <Badge text="默认启用" /> <Badge text="仅限 Root" type="warning" />

- 类型: `"switch" | "toggle" | "auto" | "enable" | "disable"`
- 默认值: `"switch"`
- 详情: [界面 → 深色模式](../../guide/interface/darkmode.md)

深色模式支持选项:

- `"switch"`: 在深色模式，浅色模式和自动之间切换
- `"toggle"`: 在深色模式和浅色模式之间切换
- `"auto"`: 自动根据用户设备主题或当前时间决定是否应用深色模式
- `"enable"`: 强制深色模式
- `"disable"`: 禁用深色模式

::: note

如果你不需要这项功能，请设置 `darkmode: "disable"` 将其禁用。

:::

## fullscreen

- 类型: `boolean`
- 默认值: `false`
- 详情: [界面 → 全屏按钮](../../guide/interface/others.md#全屏按钮)

是否显示全屏按钮。

## backToTop <Badge text="仅限 Root" type="warning" />

- 类型: `BackToTopOptions | boolean`

  ```ts
  interface BackToTopOptions {
    /**
     * 滚动距离阈值，用于显示返回顶部按钮 (单位: 像素)
     *
     * @default 100
     */
    threshold?: number;

    /**
     * 是否显示滚动进度
     *
     * @default true
     */
    progress?: boolean;
  }
  ```

- 默认值: `true`

自定义返回顶部按钮，将其设置为 `false` 会禁用该按钮。

## pure <Badge text="仅限 Root" type="warning" />

- 类型: `boolean`
- 默认值: `false`
- 详情: [界面 → 纯净模式](../../guide/interface/pure.md)

是否开启纯净模式。

::: tip

启用此功能将禁用一些花哨的样式。

当你想提供“纯文档站点”时很有用。

:::

## print <Badge text="仅限 Root" type="warning" />

- 类型: `boolean`
- 默认值: `true`

是否在桌面模式下显示打印按钮。

## iconPrefix <Badge text="仅限 Root" type="warning" />

- 类型: `string`
- 默认值: 尝试从 iconAssets 推断
- 详情: [界面 → 图标](../../guide/interface/icon.md)

通常情况下，它可以识别 iconAssets 并自动设置，如果识别失败，你可以手动设置图标的 FontClass 前缀。
