---
title: 主题外观配置
icon: config
category:
  - 配置
tag:
  - 主题配置
  - 外观
---

以下配置项控制主题的外观，它们**仅在主题配置下直接配置时有效，而不支持在各语言中分别配置**。

一般情况下你无需关注他们，它们仅为有相关配置需求的少数用户提供。

## pure <Badge text="仅限 Root" type="warning" />

- Type: `boolean`
- Default: `false`

是否开启纯净模式。

::: tip

启用此功能将禁用一些花哨的样式。

当你想提供“纯文档站点”时很有用。

:::

## iconPrefix <Badge text="仅限 Root" type="warning" />

- 类型: `string`
- 默认值: `"icon-"`
- 详情: [界面 → 图标](../../guide/interface/icon.md)

设置图标的 FontClass 前缀。

你可能需要设置此选项：

- 使用 [iconfont](../../guide/interface/icon.md#iconfont): `iconfont icon-`
- 使用 [fontawesome](../../guide/interface/icon.md#fontawesome): `fa fa-`

## darkmode <Badge text="默认启用" /> <Badge text="仅限 Root" type="warning" />

- 类型: `"auto-switch" | "switch" | "auto" | "force-dark" | "disable"`
- 默认值: `"auto-switch"`
- 详情: [界面 → 深色模式](../../guide/interface/darkmode.md)

深色模式支持选项:

- `"auto-switch"`: "关闭 | 自动 | 打开" 的三段式开关
- `"switch"`: "关闭 | 打开" 的切换式开关
- `"auto"`: 自动根据用户设备主题或当前时间决定是否应用深色模式
- `"force-dark"`: 强制深色模式
- `"disable"`: 禁用深色模式

::: note

如果你不需要这项功能，请设置 `darkmode: "disable"` 将其禁用。

:::

## themeColor <Badge text="默认启用" /> <Badge text="仅限 Root" type="warning" />

- 类型: `Record<string, string>`
- 默认值: `{ blue: '#2196f3', red: '#f26d6d', green: '#3eaf7c', orange: '#fb9b5f' }`
- 详情: [界面 → 主题色](../../guide/interface/theme-color.md)

主题色选项配置。

::: note

如果你不需要这项功能，请设置 `themeColor: false` 将其禁用。

:::

## fullscreen

- 类型: `boolean`
- 默认值: `true`
- 详情: [界面 → FullScreen](../../guide/interface/others.md#全屏按钮)

Whether show the "full screen" button.

## backToTop <Badge text="仅限 Root" type="warning" />

- Type: `boolean | number`
- Default: `true`

是否显示返回顶部按钮。

如果设置为数字，则该数字为触发临界值 (默认临界值为 300px)。

## mobileBreakPoint <Badge text="仅限 Root" type="warning" />

- Type: `number`
- Default: `719`

切换桌面布局和移动布局的窗口宽度，单位像素。

::: warning

你需要将此选项和 `.vuepress/config.scss` 中的 `$mobile` 保持一致。

:::
