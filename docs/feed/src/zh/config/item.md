---
title: 项目设置
icon: config
---

你可以通过配置每个页面的 frontmatter，来对每个 Feed 项目生成进行单独的控制。

默认情况下，所有文章均会被添加至 feed 流。如果你想在 feed 中移除特定页面，你可以在 frontmatter 中设置 `feed.enable` 为 `false`

## FrontMatter 选项

影响 Feed 项目生成的 frontmatter 选项如下:

### title

- 类型: `string`

由 VuePress 自动生成，默认为页面的 h1 内容

### description

- 类型: `string`

页面描述

## article

- 类型: `boolean`

该页面是否是文章

> 如果此项设置为 `false`，则该页不会包含在最终的 feed 中。

### copyrightText

- 类型: `string`

页面版权信息

### time

- 类型: `Date`

页面的发布日期

### image

- 类型: `string` (图片的完整或绝对链接)

页面的封面/分享图

## FrontMatter 中的 Feed 配置

### feed.enable

- 类型: `boolean`
- 默认值: `true`

该页面是否为 Feed 项目

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

::: details `FeedAuthor` 格式

```ts
interface FeedAuthor {
  /** 作者姓名 */
  name: string;
  /** 作者电子邮箱 */
  email?: string;
  /** 作者网站 */
  url?: string;
  /**
   * 作者头像地址
   *
   * 正方形，最好不小于 128×128，透明背景
   */
  avator?: string;
}
```

:::

### feed.contributor

- 类型: `FeedContributor[] | FeedContributor`

Feed 项目的贡献者

::: details `FeedContributor` 格式

```ts
interface FeedContributor {
  /** 贡献者姓名 */
  name: string;
  /** 贡献者电子邮箱 */
  email?: string;
  /** 贡献者网站 */
  url?: string;
  /**
   * 贡献者头像地址
   *
   * 正方形，最好不小于 128×128，透明背景
   */
  avator?: string;
}
```

:::

### feed.guid

- 类型: `string`

Feed 项目的标识符，用于标识 Feed 项目。

## 默认生成逻辑

- **title**

  - 类型: `string`
  - 含义: Feed 项目的标题
  - 值:
    - `frontmatter.feed.title`
    - 如果上述未提供，回退到 `frontmatter.title`

- **link**

  - 类型: `string`
  - 含义: Feed 项目的链接
  - 值:
    - 页面的永久链接
    - 若上述不存在，回退到页面链接

- **description**

  - 类型: `string`
  - 含义: Feed 项目的描述
  - 值:
    - `frontmatter.feed.description`
    - 如果上述未提供，回退到 `frontmatter.description`
    - 如果上述未提供，回退到 `$page.excerpt`

- **author**

  - 类型: `FeedAuthor[] | FeedAuthor`
  - 含义: Feed 项目的作者
  - 值:

    - `frontmatter.feed.author`

    - 如果上述未提供，回退到 `frontmatter.author`

      (`string` 类型，仅生成 `name`)

    - 如果上述未提供，回退到 `themeConfig.author`

      (`string` 类型，仅生成 `name`)

- **contributor**

  - 类型: `FeedContributor[] | FeedContributor`
  - 含义: Feed 项目的贡献者
  - 值:

    - `frontmatter.feed.contributor`

    - 如果上述未提供，回退到 `frontmatter.author`

      (`string` 类型，仅生成 `name`)

    - 如果上述未提供，回退到 `themeConfig.author`

      (`string` 类型，仅生成 `name`)

- **category**

  - 类型: `FeedCategory[] | FeedCategory`
  - 含义: Feed 项目的分类
  - 值:

    - `frontmatter.feed.category`

    - 如果上述未提供，回退到 `frontmatter.category`

      (`string` 类型，仅生成 `name`)

- **pubDate**

  - 类型: `Date`
  - 含义: Feed 项目的发布日期
  - 值: `frontmatter.time`

- **lastUpdated**

  - 类型: `Date`
  - 含义: Feed 项目的更新日期
  - 值: 通过 Git 生成

- **content**

  - 类型: `string`
  - 含义: Feed 项目的内容
  - 值: 经过处理的页面的 HTML 内容

- **image**

  - 类型: `string`
  - 含义: Feed 项目的封面
  - 值:
    - `frontmatter.image`
    - 如果上述未提供，回退到页面内容中第一个非相对链接的图片地址

- **enclosure**

  - 类型: `string`
  - 含义: Feed 项目的媒体
  - 值: 通过上方的 image 选项生成

- **copyright**

  - 类型: `string`
  - 含义: Feed 项目的版权信息
  - 值:
    - `frontmatter.copyrightText`
    - 如果上述未提供，尝试生成 `Copyright by author` 版权信息
