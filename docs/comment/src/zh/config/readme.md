---
title: 配置
icon: config
---

## type

- 类型: `'valine' | 'vssue' | 'disable'`
- 必填: 是

使用 Valine 还是 Vssue。设置为 `'disabled'` 会禁用评论功能，仅提供页面信息功能。

## author

- 类型: `string`
- 必填: 否

文章的默认作者

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

## comment

- 类型: `boolean`
- 默认: `true`

是否默认启用评论功能。

## wordPerminute

- 类型: `number`
- 默认: `300`

每分钟阅读的字数。

## Waline 配置

- [点击查看](waline.md)

## Vssue 配置

- [点击查看](vssue.md)

## Valine 配置

- [点击查看](valine.md)

## 页面配置

- [点击查看](frontmatter.md)
