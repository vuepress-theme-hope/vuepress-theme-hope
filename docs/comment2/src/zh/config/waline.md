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
- 默认值: `['//unpkg.com/@waline/emojis@1.1.0/weibo']`

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

自定义样式与暗黑模式详见 [自定义样式](https://waline.js.org/guide/client/style.html)。

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

- `'enable'`: 启用登录
- `'disable'`: 禁用登录，用户只能填写信息评论
- `'force'`: 强制登录，用户必须注册并登录才可发布评论

## wordLimit

- 类型: `number | [number, number]`
- 默认值: `0`

评论字数限制。填入单个数字时为最大字数限制。设置为 `0` 时无限制。

## metaIcon

- 类型: `boolean`
- 默认值: `true`

是否导入 Meta 图标。

## pageSize

- 类型: `number`
- 默认值: `10`

评论列表分页，每页条数。

## search

- 类型: `WalineSearchOptions | false`
- 必填: 否
- 详情:

  ```ts
  interface WalineSearchResult extends Record<string, unknown> {
    /**
     * Image link
     */
    src: string;

    /**
     * Image title, optional
     */
    title?: string;

    /**
     * Image preview link, optional
     *
     * @default src
     */
    preview?: string;
  }

  interface WalineSearchOptions {
    /**
     * 搜索行为
     */
    search: (word: string) => Promise<WalineSearchResult[]>;

    /**
     * 默认的搜索行为
     *
     * @default () => search('')
     */
    default?: () => Promise<WalineSearchResult[]>;

    /**
     * 获取更多行为
     *
     * @default (word) => search(word)
     */
    more?: (
      word: string,
      currentCount: number
    ) => Promise<WalineSearchResult[]>;
  }
  ```

自定义搜索功能，设置 `false` 可禁用搜索。

## copyright

- 类型: `boolean`
- 默认值: `true`

是否显示页脚版权信息。

::: tip

我们希望你保持打开以支持 Waline。

:::

## recaptchaV3Key

- 类型: `string`
- 必填: 否

reCAPTCHA V3 是 Google 提供的验证码服务，配置 reCAPTCHA V3 网站密钥即可开启该功能。服务端需要同步配置 `RECAPTCHA_V3_SECRET` 环境变量。

## reaction

- 类型: `boolean | string[]`
- 默认值: `false`

为文章增加表情互动功能，设置为 `true` 提供默认表情，也可以通过设置表情地址数组来自定义表情图片，最大支持 8 个表情。
