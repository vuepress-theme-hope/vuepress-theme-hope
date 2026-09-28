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

## 选项 {#options}

:::: fields
@`darkmode` type=`'switch' | 'toggle' | 'auto' | 'enable' | 'disable'` enabled-by-default=Yes root-only=Yes default=`'switch'`

深色模式选项，支持:

- `'switch'`: 在深色模式，浅色模式和自动之间切换
- `'toggle'`: 在深色模式和浅色模式之间切换
- `'auto'`: 自动根据用户设备主题或当前时间决定是否应用深色模式
- `'enable'`: 强制深色模式
- `'disable'`: 禁用深色模式

::: note

如果你不需要这项功能，请设置 `darkmode: "disable"` 将其禁用。

:::

参考：[界面 → 深色模式](../../guide/interface/darkmode.md)。

@`externalLinkIcon` type=boolean enabled-by-default=Yes default=`true`

控制是否在外部链接上显示图标。

@`fullscreen` type=boolean root-only=Yes

是否显示全屏按钮。

参考：[界面 → 全屏按钮](../../guide/interface/others.md#fullscreen-button)。

@`pure` type=boolean root-only=Yes

是否开启纯净模式。

::: tip

启用此功能将禁用一些花哨的样式。

当你想提供“纯文档站点”时很有用。

:::

参考：[界面 → 纯净模式](../../guide/interface/others.md#pure-mode)。

@`focus` type=`number | boolean` root-only=Yes default="pure 的值"

是否启用专注模式，默认在启用纯净模式时启用。数字值是触发专注模式的延迟时间。

参考：[界面 → 专注模式](../../guide/interface/others.md#focus-mode)。

@`print` type=boolean root-only=Yes default=`true`

是否在桌面模式下显示打印按钮。

参考：[界面 → 打印按钮](../../guide/interface/others.md#print-button)。

::::
