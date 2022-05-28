---
title: 主题功能选项
icon: config
order: 2
category:
  - 配置
tag:
  - 主题配置
  - 功能
---

以下选项控制主题功能。

<!-- more -->

## 博客选项

主题通过使用 [`vuepress-plugin-blog2`][blog2] 提供博客功能，且该功能默认**禁用**。

要启用博客插件并使用默认选项，你可以在主题选项中设置 `plugins.blog: true`。

::: warning

除非你启用博客插件，否则以下选项将不起作用。

有关详细信息，请参阅 [博客功能介绍](../../guide/blog/intro.md)。

:::

### blog.name

- 类型: `string`
- 默认值: `author`

博主姓名。

### blog.avatar

- 类型: `string`
- 默认值: `logo`

博主头像。

### blog.description

- 类型: `string`
- 必填: 否

口号、座右铭或介绍语。

### blog.intro

- 类型: `string`
- 必填: 否

博主的个人介绍地址。

::: note

填写后将可以点击“博主信息”中的头像或姓名进入个人介绍页。

:::

### blog.medias

- 类型: `Record<MediaType, string>`
- 必填: 否

博主的媒体链接配置。

- 如果社交媒体已在下方列表中，你可以直接设置 `社交媒体名称: 社交媒体地址`。
- 否则，你应该传入一个元组 `社交媒体名称: [社交媒体地址, 社交媒体 SVG 图标字符串或路径]`

  元组的第二个元素应该是一个合法的 SVG 字符串或是一个完整的 SVG 文件路径。

::: info 可用的社交媒体

以下社交媒体具有内置图标:

- `"Baidu"`: 百度
- `"Bitbucket"`: Bitbucket
- `"Dingding"`: 钉钉
- `"Discord"`: Discord
- `"Dribbble"`: Dribbble
- `"Email"`: 邮件
- `"Evernote"`: 印象笔记
- `"Facebook"`: 脸书
- `"Flipboard"`: 红板报
- `"Gitee"`: 码云
- `"GitHub"`: GitHub
- `"Gitlab"`: Gitlab
- `"Gmail"`: 谷歌邮箱
- `"Instagram"`: Instagram
- `"Line"`: Line
- `"Linkedin"`: 领英
- `"Pinterest"`: 拼趣
- `"Pocket"`: Pocket
- `"QQ"`: QQ
- `"Qzone"`: QQ 空间
- `"Reddit"`: 红迪
- `"Rss"`: RSS 地址
- `"Steam"`: 蒸汽
- `"Twitter"`: 推特
- `"Wechat"`: 微信
- `"Weibo"`: 微博
- `"Whatsapp"`:瓦次艾普
- `"Youtube"`: 油管
- `"Zhihu"`: 知乎

(请不要好奇为什么这里一定要加上特别奇怪的中文翻译)

:::

### blog.roundAvatar

- 类型: `boolean`
- 默认值: `false`

是否剪裁头像为圆形形状

### blog.sidebarDisplay

- 类型: `"mobile" | "none" | "always"`
- 默认值: `"mobile"`

是否在侧边栏展示博主信息。

- `"mobile"`: 在移动视图中显示在侧边栏中
- `"always"`: 总是展示在侧边栏中
- `"none"`: 永远不在侧边栏展示

### blog.timeline

- 类型: `string`
- 默认值: `"昨日不在"`

时间轴的顶部文字。

### blog.articlePerPage

- 类型: `number`
- 默认: `10`

每页的文章数量。

### blog.articleInfo

- 类型: `ArticleInfo[]`
- 默认: `["Author", "Original", "Date", "PageView", "Category", "Tag", "ReadingTime"]`

文章列表中展示的文章信息

`ArticleInfo` 的可选值如下:

- `"Author"`
- `"Category"`
- `"Date"`
- `"Original"`
- `"Tag"`
- `"ReadingTime"`
- `"Word"`

## 加密配置 <Badge text="仅限 Root" type="warning" />

有关详细信息，请参阅 [加密功能介绍](../../guide/feature/encrypt.md)。

::: note

你只能在主题选项下直接设置此选项，在各语言中分别配置**没有任何效果**。

:::

### encrypt.global

- 类型: `boolean`
- 默认值: `false`

是否全局加密。

### encrypt.admin

- 类型: `string | string[]`
- 必填: 否

最高权限密码，可以以数组的形式设置多个。

### encrypt.config

- 类型: `Record<string, string | string[]>`
- 必填: 否

加密配置，为一个对象，键名为匹配的路径，键值为对应的密码，接受字符串或字符串数组。

::: details 例子

```js
{
  // 这会加密整个 guide 目录，并且两个密码都是可用的
  "/guide/": ["1234", "5678"],
  // 这只会加密 config/page.html
  "/config/page.html": "1234"
}
```

:::

[blog2]: https://vuepress-theme-hope.github.io/v2/blog/zh/
