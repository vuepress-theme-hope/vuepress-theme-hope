---
title: Waline 选项
icon: waline
---

## serverURL

- 类型: `string`
- 必填: 是

Waline 的服务端地址。

## emoji

- 类型: `(string | EmojiInfo)[]`
- 默认值: `['https://cdn.jsdelivr.net/gh/walinejs/emojis/weibo']`

表情设置，详见 [自定义表情](../guide/client/emoji.md)

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

## imageUploader

- 类型: `Function | false`
- 必填: 否

自定义图片上传方法，方便更好的存储图片。方法执行时会将图片对象传入。

你可以设置为 `false` 以禁用图片上传功能，默认行为是将图片 Base 64 编码嵌入。

## highlighter

- 类型: `Highlighter | false`
- 必填: 否

**代码高亮**，默认使用 `hanabi`，你可以传入一个自己的代码高亮器。

```ts
(code: string, lang: string) => string

// 或

(
  code: string,
  lang: string,
  callback?: (error: unknown | undefined, code?: string) => void
) => void;
```

你可以设置为 `false` 以禁用代码高亮功能。

## texRenderer

- 类型: `(blockMode: boolean, tex: string) => string | false`
- 必填: 否

自定义数学公式的渲染方法，方便更好的预览数学公式。更多请参考 [KaTeX API](https://katex.org/docs/api.html#server-side-rendering-or-rendering-to-a-string) 或 [MathJax API](http://docs.mathjax.org/en/latest/web/typeset.html#converting-a-math-string-to-other-formats)。

你可以设置为 `false` 以禁止预览数学公式。

## walineLocales

- Type: `WalineLocaleConfig`

  ```ts
  interface WalineLocaleData {
    nick: string;
    nickError: string;
    mail: string;
    mailError: string;
    link: string;
    optional: string;
    placeholder: string;
    sofa: string;
    submit: string;
    reply: string;
    cancelReply: string;
    comment: string;
    refresh: string;
    more: string;
    preview: string;
    emoji: string;
    uploadImage: string;
    seconds: string;
    minutes: string;
    hours: string;
    days: string;
    now: string;
    uploading: string;
    login: string;
    logout: string;
    admin: string;
    sticky: string;
    word: string;
    wordHint: string;
    anonymous: string;
  }

  interface WalineLocaleConfig {
    [localePath: string]: WalineLocaleData;
  }
  ```

- 必填: 否

Waline 国际化配置。详见 [Waline 自定义语言](https://waline.js.org/guide/client/i18n.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E8%AF%AD%E8%A8%80)

## copyright

- 类型: `boolean`
- 默认值: `true`
- 必填: 否

是否显示页脚版权信息。
