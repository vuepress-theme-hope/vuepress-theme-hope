---
title: 页面信息
icon: info
category: feature
tags:
  - feature
  - page info
---

通过内置 [`@mr-hope/vuepress-plugin-comment`](https://vuepress-theme-hope.github.io/comment/zh/)，`vuepress-theme-hope` 实现了文章信息展示。

<!-- more -->

## 启用

页面信息默认全局启用，同时支持页面配置[^applypartically]。你可以在特定页面的 front matter 中设置 `pageInfo: false` 来局部禁用它。

[^applypartically]: **支持页面配置** <Badge text="支持页面配置" />

    **支持页面配置** 指主题允许页面的配置覆盖全局的配置。这意味着你可以在全局启用的情况下，在特定页面将其禁用，或在全局禁用的情况下在特定页面启用。

    ::: details 例子

    以路径导航为例:

    该功能默认全局启用，即 `themeConfig.breadcrumb` 默认为 `true`，同时你可以在特定页面的 front matter 中设置 `breadcrumb: false` 来局部禁用它。

    当然你也可以将 `themeConfig.breadcrumb` 选项设置为 `false` 来全局禁用它，之在特定页面的 front matter 中设置 `breadcrumb: true` 来局部启用它。

    :::

如果你需要保持全局禁用，请设置 `themeConfig.pageInfo` 为 `false`。这样你可以在特定页面的 front matter 中设置 `pageInfo` 来局部启用它。

## 参数 <Badge text="支持页面配置" />

`pageInfo` 默认接受一个字符串数组，可以填入各条目名称，填入的顺序即是各条目显示的顺序。

条目可选的值和对应内容如下:

| 条目             | 对应内容     | 页面 frontmatter 值     | 主题设置的配置项 |
| ---------------- | ------------ | ----------------------- | ---------------- |
| `'author'`       | 作者         | author                  | author           |
| `'time'`         | 写作日期     | time                    | N/A              |
| `'category'`     | 分类         | category                | N/A              |
| `'tag'`          | 标签         | tags                    | N/A              |
| `'reading-time'` | 预计阅读时间 | N/A(自动生成)           | N/A              |
| `'word'`         | 字数         | N/A(自动生成)           | N/A              |
| `'visitor'`      | 访问量       | visitor(仅 Valine 可用) | comment.visitor  |

默认会显示 “作者，访问量，写作日期，分类，标签，预计阅读时间”。

### 作者 <Badge text="支持页面配置" />

例子:

```md
---
author: Mr.Hope
---
```

作者姓名也可以在 `themeConfig.author` 中全局配置，这样每篇文章都会显示默认作者。这时，你仍可以在页面中配置 front matter 中的 `author` 为一个新值来覆盖默认作者，或者设置 `author` 为 `false` 取消作者显示。

### 写作日期

建议 time 以标准格式输入日期，即 `xxxx-xx-xx` 的形式，如 “2020 年 4 月 1 日” 应当输入为 `2020-04-01`

例子:

```md
---
time: 2020-01-01
---
```

### 分类与标签

详见 [博客章节](../blog/category-and-tags.md)

### 阅读时间

默认的统计方式是一分钟 300 字，你可以设置 `themeConfig.wordPerminute` 来覆盖它，该选项不支持在页面单独配置。

### 浏览量 <Badge text="支持页面配置" />

当配置 [评论功能](comment.md) 为 Valine 时，该功能默认启用。

例子:

```md
---
visitor: false
---
```
