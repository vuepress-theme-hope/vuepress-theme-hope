---
title: 主题布局配置
icon: config
category: config
tags:
  - themeConfig
  - config
---

## navbar

- Type: `boolean`
- Default: `false`

是否禁用导航栏

## navAutoHide

- 类型: `"always" | "mobile" | "none"`
- 默认值: `"mobile"`

是否在向下滚动时自动隐藏导航栏

## anchorDisplay

- 类型: `boolean`
- 默认值: `true`

是否在桌面模式显示锚点标题

## breadcrumb

- 类型: `boolean`
- 默认值: `true`

是否全局启用路径导航

## pageInfo

- 类型: `string[] | false`
- 默认值: `['author', 'visitor', 'time', 'category', 'tag', 'reading-time']`

文章信息，可以填入数组，数组的顺序是各条目显示的顺序。填入 `false` 使其被禁用。

可以填入的条目如下:

- `'author'`: 作者
- `'time'`: 写作日期
- `'category'`: 分类
- `'tag'`: 标签
- `'reading-time'`: 预计阅读时间
- `'word'`: 字数
- `'visitor'`: 访问量

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
