---
title: 配置项
date: 2022-06-09
icon: style
category:
- 指南
tag:
- 配置项
---

<!-- More -->

## fullText

- 类型：`boolean`
- 默认值：`true`
- 详情\
  是否开启文章正文搜索功能。
- 默认搜索范围
  - 标题
  - 文章正文
  - 标签和分类（如果`frontmatter`内有的话）

如果你选择了`false`，插件依然会从标题、标签和分类中查找

如果想通过`标签`和`分类`搜索的话，需要在每篇文章的`frontmatter`内添加`category`和`tag`

**举个栗子**

```md
---
category:
- 分类1
- 分类2
tag:
- 标签1
- 标签2
---
```

## placeholder

- 类型：`string`
- 默认值：`'搜索'`
- 详情\
  搜索输入框的 `placeholder` 属性。

## frontmatter

- 类型：`Record<string, NextSearchPluginOptions>`
- 详情\
  用于自定义`category`和`tag`在搜索框内的显示文字。
- 举个栗子

```ts
  frontmatter: {
    tag: '标签',
    category: '分类',
  }
```
