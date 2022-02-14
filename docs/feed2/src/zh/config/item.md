---
title: 页面设置
icon: config
---

你可以通过配置每个页面的 Frontmatter，来对每个 Feed 项目生成进行单独的控制。

## 添加与移除

默认情况下，所有文章均会被添加至 feed 流。如果你想在 feed 中移除特定页面，你可以在 frontmatter 中设置 `feed: false`。

## 默认读取内容

Feed 项目生成中会读取 `page.except` 和页面的原本内容。

Feed 项目生成中读取的 frontmatter 选项及对应含义如下:

### title

- 类型: `string`

由 VuePress 自动生成，默认为页面的 h1 内容

### description

- 类型: `string`

页面描述

### date

- 类型: `Date`

页面的发布日期

### article

- 类型: `boolean`

该页面是否是文章

> 如果此项设置为 `false`，则该页不会包含在最终的 feed 中。

### copyright

- 类型: `string`

页面版权信息

### image

- 类型: `string`

页面的封面/分享图，需为完整链接或绝对链接。

## FrontMatter 中的 Feed 配置

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
