---
title: Waline 选项
icon: waline
---

## serverURL

- 类型: `string`
- 必填: 是

Waline 的服务端地址。

## emoji

- 类型: `(string | WalineEmojiInfo)[] | false`
- 默认值: `['//unpkg.com/@waline/emojis@1.0.1/weibo']`

表情设置，详见 [自定义表情](https://waline.js.org/guide/client/emoji.html)

## dark

- 类型: `string | boolean`
- 默认值: `false`

暗黑模式适配。

- 设置布尔值会根据其值来设置暗黑模式。
- 设置 `'auto'` 会根据设备暗黑模式自适应。
- 填入 CSS 选择器会在对应选择器生效时启用夜间模式。

::: tip 针对不同主题的例子

- **Docusaurus**: 它会在 `<html>` 上通过设置 `data-theme="dark"` 开启暗黑模式，那么你需要将 `dark` 选项设置为 `'html[data-theme="dark"]'`。

- **hexo-theme-fluid**: 它会在 `<html>` 上通过设置 `data-user-color-scheme="dark"` 开启暗黑模式。那么你需要将 `dark` 选项设置为 `'html[data-user-color-scheme="dark"]'`。

- **vuepress-theme-hope**: 它会在 `<body>` 上添加`theme-dark` class 来开启暗黑模式。那么你需要将 `dark` 选项设置为 `body.theme-dark`。

:::

自定义样式与深色模式详见 [自定义样式](https://waline.js.org/guide/client/style.html)。

## meta

- 类型: `string[]`
- 默认值: `['nick', 'mail', 'link']`

评论者相关属性。可选值: `'nick'`, `'mail'`, `'link'`

## requiredMeta

- 类型: `string[]`
- 默认值: `[]`

设置**必填项**，默认匿名，可选值:

- `[]`
- `['nick']`
- `['nick', 'mail']`

## login

- 类型: `string`
- 默认值: `'enable'`

登录模式状态，可选值:

- `'enable'`: 启用登录 (默认)
- `'disable'`: 禁用登录，用户只能填写信息评论
- `'force'`: 强制登录，用户必须注册并登录才可发布评论

## wordLimit

- 类型: `number | [number, number]`
- 默认值: `0`

评论字数限制。填入单个数字时为最大字数限制。设置为 `0` 时无限制。

## pageSize

- 类型: `number`
- 默认值: `10`

评论列表分页，每页条数。

## copyright

- 类型: `boolean`
- 默认值: `true`
- 必填: 否

是否显示页脚版权信息。

::: tip

我们希望你保持打开以支持 Waline。

:::
