---
title: 主题功能配置
icon: config
category: config
tags:
  - config
  - themeConfig
---

这些是主题功能的配置项。

## 主题色与深色模式 <Badge text="默认启用" />

主题色和深色模式设置选项配置。

### darkmode

- 类型: `'auto-switch' | 'switch' | 'auto' | 'disable'`
- 默认值: `'auto-switch'`

深色模式支持选项:

- `'auto-switch'`: "关闭 | 自动 | 打开" 的三段式开关
- `'switch'`: "关闭 | 打开" 的切换式开关
- `'auto'`: 自动根据用户设备主题或当前时间决定是否应用深色模式
- `'disable'`: 禁用深色模式

> 如果你不需要这项功能，请设置 `darkmode: "disable"` 将其禁用。

### themeColor

主题色选项配置。

> 如果你不需要这项功能，请设置 `themeColor: false` 将其禁用。

- 类型: `Record<string, string>`
- 默认值:

  ```js
  {
    blue: '#2196f3',
    red: '#f26d6d',
    green: '#3eaf7c',
    orange: '#fb9b5f'
  }
  ```

## 博客配置 <Badge text="默认启用" />

博客配置。

> 如果你不需要博客相关功能，为了加快构建速度，请设置 `blog: false`。

### blog.name

- 类型: `string`
- 必填: 否

博主姓名，默认为 `themeConfig.author`

### blog.avatar

- 类型: `string`
- 必填: 否

博主头像，默认为 `themeConfig.logo`

### blog.intro

- 类型: `string`
- 必填: 否

博主的个人介绍地址。

填写后将允许点击“博主信息”中的头像或姓名进入个人介绍页。

### blog.links

- 类型: `Record<MediaType, string>`
- 必填: 否

媒体链接配置

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
- `'Gmail'`: 谷歌邮箱(当然你也可以填入你自己的其他邮箱)
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
- 默认值: `true`

是否剪裁头像为圆形形状

### blog.sidebarDisplay

- 类型: `'mobile' | 'none' | 'always'`
- 默认值: `'none'`

是否在侧边栏展示博主信息

- `mobile`: 在移动视图中显示在侧边栏中
- `'always'`: 总是展示在侧边栏中
- `'none'`: 永远不在侧边栏展示

### blog.timeline

- 类型: `string`
- 默认值: `'昨日不在'`

时间轴的顶部文字。

### blog.perPage

- 类型: `number`
- 默认: `10`

每页的文章数量

## 加密设置

加密设置选项。

### encrypt.status

- 类型: `"global" | "local"`
- 默认值: `"local"`

是否全局加密

### encrypt.global

- 类型: `string | string[]`
- 必填: 否

最高权限密码，可以以数组的形式设置多个

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

## 自定义布局

以下选项控制主题的自定义布局。你需要填入 Vue 组件的路径。

你可以填入一个绝对路径，也可以填入一个相对于 `.vuepress` 文件夹的相对路径。

### custom.pageTop

- 类型: `string`
- 必填: 否

页面顶部插槽

### custom.contentTop

- 类型: `string`
- 必填: 否

文章内容顶部插槽

### custom.contentBottom

- 类型: `string`
- 必填: 否

文章内容底部插槽

### custom.pageBottom

- 类型: `string`
- 必填: 否

页面底部插槽

### custom.navbarStart

- 类型: `string`
- 必填: 否

导航栏起始插槽

### custom.navbarCenter

- 类型: `string`
- 必填: 否

导航栏中部插槽

### custom.navbarEnd

- 类型: `string`
- 必填: 否

导航栏结束插槽

### custom.sidebarTop

- 类型: `string`
- 必填: 否

侧边栏顶部插槽

### custom.sidebarCenter

- 类型: `string`
- 必填: 否

侧边栏中部插槽

### custom.sidebarBottom

- 类型: `string`
- 必填: 否

侧边栏底部插槽

## wordPerminute

- 类型: `number`
- 默认值: `300`

每分钟的阅读字数
