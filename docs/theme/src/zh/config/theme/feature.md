---
title: 主题功能配置
icon: config
category: config
tags:
  - config
  - themeConfig
---

这些是主题功能的配置项。

## 主题色与深色模式 <MyBadge text="默认启用" />

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

## 博客配置 <MyBadge text="默认启用" />

博客配置。

> 如果您不需要博客相关功能，为了加快构建速度，请设置 `blog: false`。

### blog.blogger

- 类型: `string`
- 必填: 否

博主姓名，默认为 `themeConfig.author`

### blog.avatar

- 类型: `string`
- 必填: 否

博主头像，默认为 `themeConfig.logo`

### blog.sidebarDisplay

- 类型: `'mobile' | 'none' | 'always'`
- 默认值: `'none'`

是否在侧边栏展示博主信息

- `mobile`: 在移动视图中显示在侧边栏中
- `'always'`: 总是展示在侧边栏中
- `'none'`: 永远不在侧边栏展示

### blog.intro

- 类型: `string`
- 必填: 否

博主的个人介绍地址。

填写后将允许点击“博主信息”中的头像或姓名进入个人介绍页。

### blog.timeline

- 类型: `string`
- 默认值: `'昨日不在'`

时间轴的顶部文字。

### blog.perPage

- 类型: `number`
- 默认: `10`

每页的文章数量

## pageInfo

- 类型: `string[] | false`
- 默认值: `['Author', 'Visitor', 'Time', 'Category', 'Tag', 'ReadTime']`

文章信息，可以填入数组，数组的顺序是各条目显示的顺序。填入 `false` 使其被禁用。

可以填入的条目如下:

- `'Author'`: 作者
- `'Time'`: 写作日期
- `'Category'`: 分类
- `'Tag'`: 标签
- `'ReadTime'`: 预计阅读时间
- `'Word'`: 字数
- `'Visitor'`: 访问量

## 页脚设置

### footer.content

- 类型: `string`
- 必填: 否

页脚的默认内容，可输入 HTMLString。

### footer.copyright

- 类型: `string | boolean`
- 默认值: `'Copyright © <作者>'`

默认的版权信息，设置为 `false` 来默认禁用它。

### footer.display

- 类型: `boolean`
- 默认值: `false`

是否默认显示页脚

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
