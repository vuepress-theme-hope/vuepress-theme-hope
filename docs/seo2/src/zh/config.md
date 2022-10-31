---
title: 选项
icon: config
---

## 插件选项

### hostname

- 类型: `string`
- 必填: 是

部署域名

### author

- 类型: `Author`
- 必填: 否

默认作者

```ts
type AuthorInfo = {
  name: string;
  url?: string;
};

type Author = string | string[] | AuthorInfo | AuthorInfo[];
```

### autoDescription

- 类型: `boolean`
- 默认值: `true`

是否自动生成描述

### canonical

- 类型: `string | ((page: Page) => string | null)`
- 必填: 否

首选连接

### fallBackImage

- 类型: `string`
- 必填: 否

当找不到图片时的回退图片链接

### restrictions

- 类型: `string`
- 必填: 否

内容的年龄分级，格式为 `[int]+`，如 `"13+"`

### twitterID

- 类型: `string`
- 必填: 否

你的 twitter 用户名

### isArticle

- 类型: `(page: Page) => boolean`
- 必填: 否

你可以使用此选项判断一个页面是否是文章。

### ogp

- 类型:

  ```ts
  function ogp<ExtendObject = Record<string, unknown>>(
    ogp: SeoContent,
    page: ExtendPage<ExtendObject>,
    app: App
  ) => SeoContent;
  ```

- 必填: 否

自定义 OGP 生成器

你可以使用此选项来注入新的或覆盖掉默认生成的 OGP 标签。

### jsonLd

- 类型:

  ```ts
  function jsonLd: <ExtendObject = Record<string, unknown>>(
    jsonLD: ArticleJSONLD | null,
    page: ExtendPage<ExtendObject>,
    app: App
  ) => ArticleJSONLD | null;
  ```

- 必填: 否

自定义 JSON-LD 生成器

你可以使用此选项来注入新的或覆盖掉默认生成的 JSON-LD 标签。

### customHead

- 类型:

  ```ts
  function customHead<ExtendObject = Record<string, unknown>>(
    head: HeadConfig[],
    page: ExtendPage<ExtendObject>,
    app: App
  ) => void
  ```

- 必填: 否

你可以使用此选项来直接注入任意格式的标签到 `<head>`。
