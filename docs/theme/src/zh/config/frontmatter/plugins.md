---
title: 插件 Frontmatter 配置
icon: puzzle-piece
order: 3
category:
  - 配置
tag:
  - Frontmatter
  - 布局
---

你可以在页面的 frontmatter 配置以下选项控制插件行为。

## `@vuepress/plugin-copyright` 选项

### copy.triggerLength

- 类型: `number`
- 默认值: `100`

触发附加版权的最小字数

### copy.disableCopy

- 类型: `boolean`
- 默认值: `false`

禁用复制

### copy.disableSelection

- 类型: `boolean`
- 默认值: `false`

禁用选择

## `@vuepress/plugin-feed` 选项

### feed.title

- 类型: `string`

Feed 项目的标题

### feed.description

- 类型: `string`

Feed 项目的描述

### feed.content

- 类型: `string`

Feed 项目的内容

### feed.author

- 类型: `FeedAuthor[] | FeedAuthor`

Feed 项目的作者

::: details FeedAuthor 格式

```ts
interface FeedAuthor {
  /**
   * 作者名字
   */
  name?: string;

  /**
   * 作者邮件
   */
  email?: string;

  /**
   * 作者网站
   *
   * @description json format only
   */
  url?: string;

  /**
   * 作者头像
   *
   * @description json format only
   */
  avatar?: string;
}
```

:::

### feed.contributor

- 类型: `FeedContributor[] | FeedContributor`

Feed 项目的贡献者

::: details FeedContributor 格式

```ts
interface FeedContributor {
  /**
   * 作者名字
   */
  name?: string;

  /**
   * 作者邮件
   */
  email?: string;

  /**
   * 作者网站
   *
   * @description json format only
   */
  url?: string;

  /**
   * 作者头像
   *
   * @description json format only
   */
  avatar?: string;
}
```

:::

### feed.guid

- 类型: `string`

Feed 项目的标识符，用于标识 Feed 项目。

::: note

你应该确保此项全局唯一。

:::

## `@vuepress/plugin-sitemap` 选项

### sitemap.changefreq

- 类型: `"always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never"`
- 默认值: `"daily"`

页面默认更新频率。它会覆盖插件选项中的 changefreq 选项。

### sitemap.exclude

- 类型: `boolean`
- 默认值: `false`

是否不输出此页面到 Sitemap

### sitemap.priority

- 类型: `number`
- 默认值: `0.5`

页面优先级，范围 `0` 至 `1`。
