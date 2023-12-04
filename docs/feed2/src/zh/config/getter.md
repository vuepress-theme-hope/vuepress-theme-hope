---
title: Feed 获取器
icon: shapes
---

你可以通过控制插件选项中的 `getter` 来完全控制 Feed 项目的生成。

## getter.title

- 类型: `(page: Page) => string`

项目标题获取器

## getter.link

- 类型: `(page: Page) => string`

项目链接获取器

## getter.description

- 类型: `(page: Page) => string | undefined`

项目描述获取器

::: note

因为 Atom 在摘要中支持 HTML，所以如果可能的话，你可以在这里返回 HTML 内容，但内容必须以标记 `html:` 开头。

:::

## getter.content

- 类型: `(page: Page) => string`

项目内容获取器

## getter.author

- 类型: `(page: Page) => FeedAuthor[]`

项目作者获取器。

::: note 获取器应在作者信息缺失时返回空数组。

:::

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

## getter.category

- 类型: `(page: Page) => FeedCategory[] | undefined`

项目分类获取器。

::: details FeedCategory 格式

```ts
interface FeedCategory {
  /**
   * 分类名称
   */
  name: string;

  /**
   * 标识分类法的字符串
   *
   * @description rss format only
   */
  domain?: string;

  /**
   * URI 标识的分类 scheme
   *
   * @description atom format only
   */
  scheme?: string;
}
```

:::

## getter.enclosure

- 类型: `(page: Page) => FeedEnclosure | undefined`

项目附件获取器。

::: details FeedEnclosure 格式

```ts
interface FeedEnclosure {
  /**
   * Enclosure 地址
   */
  url: string;

  /**
   * 类型
   *
   * @description 应为一个标准的 MIME 类型，rss format only
   */
  type: string;

  /**
   * 按照字节数计算的大小
   *
   * @description rss format only
   */
  length?: number;
}
```

:::

## getter.publishDate

- 类型: `(page: Page) => Date | undefined`

项目发布日期获取器

## getter.lastUpdateDate

- 类型: `(page: Page) => Date`

项目最后更新日期获取器

## getter.image

- 类型: `(page: Page) => string`

项目图片获取器

::: note 确保返回一个完整的 URL。

:::

## getter.contributor

- 类型: `(page: Page) => FeedContributor[]`

项目贡献者获取器

::: note 获取器应在贡献者信息缺失时返回空数组。

:::

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

## getter.copyright

- 类型: `(page: Page) => string | undefined`

项目版权获取器
