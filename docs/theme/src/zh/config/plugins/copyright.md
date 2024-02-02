---
title: 版权信息插件配置
icon: copyright
order: 6
category:
  - 配置
tag:
  - 插件配置
  - 主题配置
  - 版权信息
---

## 介绍

主题可通过 `@vuepress/plugin-copyright` 在复制时追加版权信息，默认情况下此功能**不启用**。

你可以在主题选项中设置 `plugins.copyright: true` 来启用此功能。默认行为是全局启用插件并使用主题选项中的作者和协议名称。

## 插件选项

主题将主题选项中的 `plugins.copyright` 作为插件选项传递给 `@vuepress/plugin-copyright`。

你可以通过 `plugins.copyright` 自行设置选项，以下是常见选项:

### triggerLength

- 类型: `number`
- 默认值: `100`

触发附加版权的最小字数

### global

- 类型: `boolean`
- 默认值: `false`

是否全局启用

### disableCopy

- 类型: `boolean`
- 默认值: `false`

禁用复制

### disableSelection

- 类型: `boolean`
- 默认值: `false`

禁用选择

### canonical

- 类型: `string`
- 必填: 否

首选域名与部署目录

当你在多个站点部署内容时很有用。

::: info

通过 [copyright 插件文档][copyright] 以获取全部可用选项。

:::

[copyright]: https://ecosystem.vuejs.press/zh/plugins/copyright.html
