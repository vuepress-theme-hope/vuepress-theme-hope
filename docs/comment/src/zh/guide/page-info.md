---
title: 页面信息
icon: info
---

`<PageInfo />` 组件默认全局启用。你可以在特定页面的 frontmatter 中设置 `pageInfo: false` 来局部禁用它。

如果你需要保持全局禁用，请在插件选项中设置 `pageInfo` 为 `false`。这样你可以在特定页面的 frontmatter 中设置 `pageInfo` 来局部启用它。

## 参数

`pageInfo` 默认接受一个字符串数组，可以填入各条目名称，填入的顺序即是各条目显示的顺序。

条目可选的值和对应内容如下:

| 条目             | 对应内容     | 页面 frontmatter 值        |
| ---------------- | ------------ | -------------------------- |
| `'author'`       | 作者         | `author`                   |
| `'time'`         | 写作日期     | `time`                     |
| `'category'`     | 分类         | `category`                 |
| `'tag'`          | 标签         | `tag`                      |
| `'reading-time'` | 预计阅读时间 | N/A (自动生成)             |
| `'word'`         | 字数         | N/A (自动生成)             |
| `'visitor'`      | 访问量       | `visitor` (仅 Valine 可用) |

默认会显示 “作者，访问量，写作日期，分类，标签，预计阅读时间”。

::: tip 其他说明

- **author**

你可以在插件选项中配置 `author` 来设置默认作者，同样，你仍可以在页面中配置 frontmatter 中的 `author` 为一个新值来覆盖默认作者，或者设置为 `false` 以取消该页面的作者显示。

- **time**

建议 time 以标准格式输入日期，即 `xxxx-xx-xx` 的形式，如 “2020 年 4 月 1 日” 应当输入为 `2020-04-01`

- **reading-time**

默认的统计方式是一分钟 300 字，你可以在插件配置中设置 `wordPerminute` 来覆盖它，该选项不支持在页面单独配置。

:::

## 原创标识

你可以在特定页面的 frontmatter 中设置 `original` 为 `true` 来为你的文章添加原创标签。
