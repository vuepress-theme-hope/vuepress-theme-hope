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

## darkmode <Badge text="默认启用" /> <Badge text="仅限 Root" type="warning" />

- 类型: `"switch" | "toggle" | "auto" | "enable" | "disable"`
- 默认值: `"switch"`
- 详情:
  - [界面 → 深色模式](../../guide/interface/darkmode.md)

深色模式选项，支持:

- `"switch"`: 在深色模式，浅色模式和自动之间切换
- `"toggle"`: 在深色模式和浅色模式之间切换
- `"auto"`: 自动根据用户设备主题或当前时间决定是否应用深色模式
- `"enable"`: 强制深色模式
- `"disable"`: 禁用深色模式

::: note

如果你不需要这项功能，请设置 `darkmode: "disable"` 将其禁用。

:::

## externalLinkIcon <Badge text="默认启用" />

- 类型: `boolean`
- 默认值: `true`

控制是否在外部链接上显示图标。

## fullscreen

- 类型: `boolean`
- 默认值: `false`
- 详情:
  - [界面 → 全屏按钮](../../guide/interface/others.md#全屏按钮)

是否显示全屏按钮。

## pure <Badge text="仅限 Root" type="warning" />

- 类型: `boolean`
- 默认值: `false`
- 详情:
  - [界面 → 纯净模式](../../guide/interface/others.md#纯净模式)

是否开启纯净模式。

::: tip

启用此功能将禁用一些花哨的样式。

当你想提供“纯文档站点”时很有用。

:::

## focus <Badge text="仅限 Root" type="warning" />

- 类型: `number | boolean`
- 默认值: `pure` 的值
- 详情:
  - [界面 → 专注模式](../../guide/interface/others.md#专注模式)

是否启用专注模式，默认在启用纯净模式时启用。数字值是触发专注模式的延迟时间。

## print <Badge text="仅限 Root" type="warning" />

- 类型: `boolean`
- 默认值: `true`
- 详情:
  - [界面 → 打印按钮](../../guide/interface/others.md#打印按钮)

是否在桌面模式下显示打印按钮。
