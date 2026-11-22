---
title: 分享
icon: share-nodes
category:
  - 功能
tag:
  - 功能
  - 分享
---

VuePress Theme Hope 通过 [`@vuepress/plugin-share`][share] 允许你为页面添加分享按钮。

<!-- more -->

## 介绍 {#introduction}

该插件注册了全局的 `<Share />` 组件，它会为当前页面渲染分享按钮，访客可以将页面分享到社交平台、通过邮件发送或以二维码形式分享。

## 启用功能 {#enable-feature}

该插件默认不启用，你需要在主题选项中设置 `plugins.share` 来启用它:

```ts twoslash {5} title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  plugins: {
    share: {},
  },
});
```

之后你就可以在 Markdown 文件中使用 `<Share />` 组件:

```md
<Share />
```

::: preview 基础分享

<Share />

:::

默认会渲染 X、Facebook、Reddit、Telegram、WhatsApp 与邮件的分享按钮。你可以通过 `services` 选择要显示的按钮，并通过 `xUserName` 在分享链接中提及 X 账号:

```ts twoslash {5-8} title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  plugins: {
    share: {
      services: ["x", "facebook", "qq", "weibo"],
      xUserName: "MrHope",
    },
  },
});
```

## 分享服务 {#services}

所有内置服务都可被组件使用，`services` 选项只决定默认显示哪些按钮:

`buffer`、`douban`、`email`、`evernote`、`facebook`、`flipboard`、`line`、`linkedin`、
`messenger`、`pinterest`、`qq`、`qrcode`、`qzone`、`reddit`、`skype`、`sms`、
`snapchat`、`telegram`、`tumblr`、`vk`、`weibo`、`whatsapp`、`wordpress`、`x`

你也可以在 `plugins.share.services` 中添加自定义服务。自定义服务需要提供 `name`、`link` 与 `shape`，还支持 `label`、`color`、`icon` 与 `action`:

```ts twoslash {6-14} title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  plugins: {
    share: {
      services: [
        "x",
        {
          name: "mastodon",
          link: "https://mastodon.social/share?text=[title]&url=[url]",
          shape: "<svg>...</svg>",
          color: "#6364ff",
        },
      ],
    },
  },
});
```

- `link`: 分享链接，支持[分享数据](#share-data)变量。
- `shape`: 纯色图标，可以是 SVG 字符串、图片链接或字体图标类名。
- `label`: 按钮的无障碍标签和提示，默认为 `name`。
- `color`: 彩色图标的背景色。
- `icon`: 彩色图标，会覆盖由 `color` 与 `shape` 生成的图标。
- `action`: 按钮的行为，可以是 `popup`（默认）、`open`、`navigate` 或 `qrcode`。

自定义服务会通过 `plugins.share.services` 注册到整个站点，因此会像内置服务一样默认显示。

你可以使用组件的 `services` 属性选择要显示的按钮:

::: preview 选择服务

<Share :services="['qq', 'weibo', 'x']" />

:::

## 分享数据 {#share-data}

每个服务的 `link` 可以包含使用方括号包裹的变量，它们会被替换为当前页面的数据:

- `title`: 页面标题
- `description`: 页面描述，也会回退到页面的 meta 标签
- `url`: 页面链接
- `excerpt`: 页面摘要
- `summary`: 页面综述
- `tags`: 页面标签，使用逗号连接
- `cover`: 页面封面
- `image`: 页面中的第一张图片

`description`、`excerpt`、`summary`、`cover` 与 `tags` 会回退到页面 frontmatter 中的同名字段。你可以通过传给组件的获取函数覆盖标题、描述、摘要、综述、封面与标签，而 `url` 与 `image` 始终由页面推导:

```md
<Share
  :title-getter="(page) => page.title.toUpperCase()"
  :tag-getter="() => 'vuepress'"
/>
```

## 自定义配置 {#customize-config}

`vuepress-theme-hope` 会将主题选项中的 `plugins.share` 作为插件选项传给 `@vuepress/plugin-share`。

默认情况下，按钮呈浅色，悬停时显示主题色。你可以设置 `colorful` 显示品牌色，设置 `inline` 移除垂直外边距，这在将按钮放在段落或布局插槽中时很有用:

::: preview 行内分享

<Share inline />

:::

::: preview 彩色分享

<Share colorful />

:::

有关所有选项与组件属性，请参阅 [share 插件文档][share]。

[share]: https://ecosystem.vuejs.press/zh/plugins/features/share.html
