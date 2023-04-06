---
title: Share
description: 分享组件，将页面内容分享到社交媒体。
---

分享组件，将页面内容分享到社交媒体。

<!-- more -->

## Demo

基础分享:

<Share />

```md
<Share />
```

自定义分享服务:

<Share services="qq,weibo" />
<Share :services="['qq','weibo']" />

```md
<Share />
<Share services="qq,weibo" />
<Share :services="['qq','weibo']" />
```

彩色图标:

<Share colorful />

```md
<Share colorful />
```

## 设置组件

要提供 tree-shaking 支持，你应该在插件选项中设置 `componentOptions.share.services` 以及你想要在客户端使用的服务。 这将防止未使用的配置注入到客户端，并将减少客户端包的大小。

支持以下内置关键字:

- buffer
- douban
- email
- evernote
- facebook
- flipboard
- line
- qq
- qrcode
- reddit
- skype
- telegram
- twitter
- whatsapp
- weibo

除了内置关键字外，你还可以将自己的服务配置添加到 `componentOptions.share.services` 中。 每个配置都应该是一个具有以下属性的对象:

- `name`: 服务名称
- `link`: 分享链接，其中 `[]` 包裹的 `title`、`description`、`url`、`excerpt`、`summary`、`tags`、`cover` 和 `image` 将被替换为页面对应的值。
- `action`: 分享按钮的动作，可以是`open` (在新标签中打开链接) ，`navigate` (导航到链接) ，`popup` (打开弹出窗口) 或`qrcode` (显示 带链接的二维码) ，默认为 `popup`
- `color`: 图标的主题色
- `shape`: 支持普通图标形状、图像 url、svg 代码或字体图标类
- `icon`: 彩色图标 (如果未提供，将通过 `color` 和 `shape` 生成)，svg 代码或字体图标类均受支持

::: tip

如果你使用的是 Twitter，则可以使用你的 Twitter 用户名设置 `componentOptions.share.twitterUserName`。

:::

## 属性

### services

- 类型: `string | ShareService[]`

  ```ts
  type BuiltInShareService =
    | "buffer"
    | "douban"
    | "email"
    | "evernote"
    | "facebook"
    | "flipboard"
    | "line"
    | "qq"
    | "qrcode"
    | "reddit"
    | "skype"
    | "telegram"
    | "twitter"
    | "whatsapp"
    | "weibo";

  interface ShareServiceConfig {
    /**
     * 分享链接
     *
     * @description 你可以使用 `[` 和 `]` 包裹变量名，变量将会被替换为页面的值：
     *
     * - `title` 将会被替换为页面的标题
     * - `description` 将会被替换为页面的描述
     * - `url` 将会被替换为页面的链接
     * - `summary` 将会被替换为页面的综述
     * - `tags` 将会被替换为页面的标签
     * - `cover` 将会被替换为页面的封面
     * - `image` 将会被替换为页面的第一张图片
     */
    link: string;

    /**
     * 分享按钮的行为
     *
     * @description
     * - `open` 将会在新标签页打开链接
     * - `navigate` 将会跳转到链接
     * - `popup` 将会打开一个弹窗
     * - `qrcode` 将会显示一个二维码
     *
     * @default "popup"
     */
    action?: ShareAction;

    /**
     * 图标的主题色
     *
     * @default 'currentColor'
     */
    color?: string;

    /**
     * 纯色图标的形状
     */
    shape: string;

    /**
     * 彩色图标
     */
    icon?: string;
  }

  interface ShareServiceOptions extends ShareServiceConfig {
    /**
     * 服务名称
     */
    name: string;
  }

  type ShareService = BuiltInShareService | ShareServiceOptions;
  ```

- 默认值: 所有可用的服务

分享服务

### titleGetter

- 类型: `(page: PageData) => string`
- 默认值: `(page) => page.title`

标题获取器。

### descriptionGetter

- 类型: `(page: PageData) => string`
- 默认值: `(page) => page.frontmatter.description`

描述获取器

### summaryGetter

- 类型: `(page: PageData) => string`
- 默认值: `(page) => page.summary`

摘要获取器

### coverGetter

- 类型: `(page: PageData) => string`
- 默认值: `(page) => page.cover`

封面获取器

### tagGetter

- 类型: `(page: PageData) => string`
- 默认值: `({ frontmatter }) => frontmatter["tag"] || frontmatter["tags"]`

标签获取器

### inline

- 类型: `boolean`
- 默认值: `false`

是否内联显示

### colorful

- 类型: `boolean`
- 默认值: `false`

是否使用彩色图标
