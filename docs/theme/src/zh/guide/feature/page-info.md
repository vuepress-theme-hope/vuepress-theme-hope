---
title: 页面信息
icon: info
category:
  - 功能
tag:
  - 功能
  - 页面信息
---

`vuepress-theme-hope` 实现了文章信息展示。

<!-- more -->

## 启用

页面信息默认全局启用，同时支持页面配置。你可以在特定页面的 front matter 中设置 `pageInfo: false` 来局部禁用它。

如果你需要保持全局禁用，请在主题选项中设置 `pageInfo: false`。这样你可以在特定页面的 front matter 中设置 `pageInfo` 来局部启用它。

## 参数 <Badge text="支持页面配置" />

`pageInfo` 默认接受一个字符串数组，可以填入各条目名称，填入的顺序即是各条目显示的顺序。

条目可选的值和对应内容如下:

| 条目            | 对应内容     | 页面 frontmatter 值         | 主题设置的配置项           |
| --------------- | ------------ | --------------------------- | -------------------------- |
| `"Author"`      | 作者         | `author`                    | `author`                   |
| `"Date"`        | 写作日期     | `date`                      | N/A                        |
| `"Original"`    | 是否原创     | `isOriginal`                | N/A                        |
| `"Category"`    | 分类         | `category`                  | N/A                        |
| `"Tag"`         | 标签         | `tag`                       | N/A                        |
| `"ReadingTime"` | 预计阅读时间 | N/A(自动生成)               | N/A                        |
| `"Word"`        | 字数         | N/A(自动生成)               | N/A                        |
| `"PageView"`    | 访问量       | `pageview` (仅 Waline 可用) | `plugins.comment.pageview` |

默认会显示 “作者，访问量，写作日期，分类，标签，预计阅读时间”。

### 作者 <Badge text="支持页面配置" />

例子:

```md
---
author: Mr.Hope
---
```

作者姓名也可以在主题选项中通过 `author` 全局配置，这样每篇文章都会显示默认作者。这时，你仍可以在页面中配置 front matter 中的 `author` 为一个新值来覆盖默认作者，或者设置 `author` 为 `false` 取消作者显示。

作者支持 `string[]`、`string`、`AuthorInfo` 和 `AuthorInfo[]`。

其中 AuthorInfo 格式如下:

```ts
interface AuthorInfo {
  name: string;
  url?: string;
}
```

### 写作日期

建议 time 以标准格式输入日期，即 `xxxx-xx-xx` 的形式，如 “2020 年 4 月 1 日” 应当输入为 `2020-04-01`

例子:

```md
---
date: 2020-01-01
---
```

### 分类与标签

详见 [博客章节](../blog/category-and-tags.md)

### 阅读时间

默认的统计方式是一分钟 300 字，你可以设置在主题选项中设置 `plugins.readingTime.wordPerMinute` 来覆盖它，该选项不支持在页面单独配置。

### 浏览量 <Badge text="支持页面配置" />

当配置 Waline 作为 [评论功能](comment.md) 的提供者时，该功能默认启用。

例子:

```md
---
pageview: false
---
```
