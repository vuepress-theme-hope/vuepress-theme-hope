---
title: 主题功能配置
icon: config
category:
  - config
tag:
  - config
  - themeConfig
---

这些是主题功能的配置项。

## 博客配置

::: warning

此功能通过 [`vuepress-plugin-blog2`][blog2] 提供，默认禁用。

要启用博客插件并使用默认选项，您可以将 `themeConfig.plugins.blog` 设置为 `true`。

除非您启用博客插件，否则以下选项将不起作用。

有关详细信息，请参阅 [博客功能介绍](../../guide/blog/intro.md)。

:::

### blog.name

- 类型: `string`
- 必填: 否

博主姓名，默认为 `themeConfig.author` 的名称

### blog.avatar

- 类型: `string`
- 必填: 否

博主头像，默认为 `themeConfig.logo`

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

::: tip 可用的社交媒体:

`MediaType` 的可选值如下:

- `'Baidu'`: 百度
- `'Bitbucket'`: Bitbucket
- `'Dingding'`: 钉钉
- `'Discord'`: Discord
- `'Dribbble'`: Dribble
- `'Email'`: Email
- `'Evernote'`: 印象笔记
- `'Facebook'`: 脸书
- `'Flipboard'`: 红板报
- `'Gitee'`: Gitee
- `'Github'`: GitHub
- `'Gitlab'`: Gitlab
- `'Gmail'`: 谷歌邮箱
- `'Instagram'`: Instagram
- `'Line'`: Line
- `'Linkedin'`: 领英
- `'Pinterest'`: 拼趣
- `'Pocket'`: Pocket
- `'QQ'`: QQ
- `'Qzone'`: QQ 空间
- `'Reddit'`: Reddit
- `'Rss'`: RSS 地址
- `'Steam'`: Steam
- `'Twitter'`: Twitter
- `'Wechat'`: 微信
- `'Weibo'`: 微博
- `'Whatsapp'`: Whatsapp
- `'Youtube'`: YouTube
- `'Zhihu'`: 知乎

:::

### blog.roundAvatar

- 类型: `boolean`
- 默认值: `false`

是否剪裁头像为圆形形状

### blog.sidebarDisplay

- 类型: `'mobile' | 'none' | 'always'`
- 默认值: `'mobile'`

是否在侧边栏展示博主信息。

- `mobile`: 在移动视图中显示在侧边栏中
- `'always'`: 总是展示在侧边栏中
- `'none'`: 永远不在侧边栏展示

### blog.timeline

- 类型: `string`
- 默认值: `'昨日不在'`

时间轴的顶部文字。

### blog.articlePerPage

- 类型: `number`
- 默认: `10`

每页的文章数量。

### blog.articleInfo

- 类型: `ArticleInfo[]`
- 默认: `['Author', 'Original', 'Date', 'Category', 'Tag', 'ReadingTime']`

文章列表中展示的文章信息

`ArticleInfo` 的可选值如下:

- `"Author"`
- `"Category"`
- `"Date"`
- `"Original"`
- `"Tag"`
- `"ReadingTime"`
- `"Word"`

<!--

TODO: Provide this

### blog.autoExcerpt

- 类型: `boolean`
- 默认: `true`

是否自动生成摘要 -->

## 加密配置 <Badge text="仅限 Root" type="warning" />

::: note

您只能在 `themeConfig` 下直接设置此选项。

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
