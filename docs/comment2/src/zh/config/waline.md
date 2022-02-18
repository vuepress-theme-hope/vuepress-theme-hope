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

表情设置，详见 [自定义表情](https://waline.js.org/guide/client/emoji.html)

## dark

- 类型: `string`
- 必填: 否

深色模式适配。

- 设置 `'auto'` 会根据设备深色模式自适应。
- 填入 CSS 选择器会在对应选择器生效时启用夜间模式。

::: tip 针对不同主题的例子

- **Docusaurus**: 它会在 `<html>` 上通过设置 `data-theme="dark"` 开启深色模式，那么你需要将 `dark` 选项设置为 `'html[data-theme="dark"]'`。

- **hexo-theme-fluid**: 它会在 `<html>` 上通过设置 `data-user-color-scheme="dark"` 开启深色模式。那么你需要将 `dark` 选项设置为 `'html[data-user-color-scheme="dark"]'`。

:::

自定义样式与深色模式详见 [自定义样式](https://waline.js.org/guide/client/style.html)。

## meta

- 类型: `string[]`
- 默认值: `['nick', 'mail', 'link']`
- 必填: 否

评论者相关属性。可选值: `'nick'`, `'mail'`, `'link'`

## requiredMeta

- 类型: `string[]`
- 默认值: `[]`
- 必填: 否

设置**必填项**，默认匿名，可选值:

- `[]`
- `['nick']`
- `['nick', 'mail']`

## login

- 类型: `string`
- 默认值: `'enable'`
- 必填: 否

登录模式状态，可选值:

- `'enable'`: 启用登录 (默认)
- `'disable'`: 禁用登录，用户只能填写信息评论
- `'force'`: 强制登录，用户必须注册并登录才可发布评论

## avatar

- 类型: `string`
- 默认值: `mp`
- 必填: 否

[Gravatar](http://cn.gravatar.com/) 头像展示方式。

可选值:

- `''`
- `'mp'`
- `'identicon'`
- `'monsterid'`
- `'wavatar'`
- `'retro'`
- `'robohash'`
- `'hide'`

更多信息，请查看 [头像配置](https://waline.js.org/guide/client/avatar.html)。

## wordLimit

- 类型: `number | [number, number]`
- 默认值: `0`
- 必要性: `false`

评论字数限制。填入单个数字时为最大字数限制。设置为 `0` 时无限制。

## pageSize

- 类型: `number`
- 默认值: `10`
- 必填: 否

评论列表分页，每页条数。

## avatarCDN

- 类型: `string`
- 默认值: `https://sdn.geekzu.org/avatar/`
- 必填: 否

设置 Gravatar 头像 CDN 地址。

## avatarForce

- 类型: `boolean`
- 默认值: `false`
- 必填: 否

每次访问是否**强制**拉取最新的*评论列表头像*

> 不推荐设置为 `true`，目前的*评论列表头像*会自动带上 `Waline` 的版本号

## uploadImage

- 类型: `Function`
- 必填: 否

自定义图片上传方法，方便更好的存储图片。方法执行时会将图片对象传入。

## highlight

- 类型: `boolean`
- 默认值: `true`
- 必填: 否

**代码高亮**，默认开启，若不需要，请手动关闭

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
