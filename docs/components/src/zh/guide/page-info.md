---
title: 页面信息
icon: info
---

## Props

```ts
interface PageInfoProps {
  /**
   * 默认作者
   */
  defaultAuthor?: string;

  /**
   * 文章信息配置
   *
   * @default ['author', 'visitor', 'time', 'category', 'tag', 'reading-time']
   */
  items?: PageInfo[] | false;

  /**
   * 点击分类标签时跳转的路径。
   *
   * 其中 `$category` 会被自动替换为当前分类名称
   */
  categoryPath?: string;

  /**
   * 点击标签跳转的路径。
   *
   * 其中 `$tag` 会被自动替换为当前分类名称
   */
  tagPath?: string;

  /**
   * 是否在标题旁显示图标
   *
   * @default false
   */

  titleIcon?: boolean;

  /**
   * 标题图标 class 前缀
   */
  titleIconPrefix?: string;
}
```

### items

`pageInfo` 接受一个字符串数组，填入所展示的页面信息名称，填入的顺序即是各信息显示的顺序。

页面信息可选值和对应信息如下:

| 可选值           | 对应信息     | 页面 frontmatter 属性      |
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

  你可以通过插件选项中的 `author` 来设置默认作者，同样，你仍可以在页面 frontmatter 设置 `author` 来覆盖默认作者，或者设置为 `false` 以取消该页面的作者显示。

- **time**

  建议以标准格式输入日期，即 `xxxx-xx-xx` 的形式。(例: “2020 年 4 月 1 日” 应输入为 `2020-04-01`)

- **reading-time**

  默认的阅读速度是每分钟 300 字，你可以在插件选项中设置 `wordPerminute` 来覆盖它。

:::

## 启用与禁用

`<PageInfo />` 组件默认全局启用。你可以在页面的 frontmatter 中设置 `pageInfo: false` 来局部禁用它。

如果你需要保持全局禁用，请在插件选项中设置 `pageInfo` 为 `false`。这样你可以在页面 frontmatter 中设置 `pageInfo` 来局部启用它。

## 原创标识

你可以在页面 frontmatter 中设置 `original` 为 `true` 来为你的文章添加原创标签。
