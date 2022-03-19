---
title: 主题基本配置
icon: config
category:
  - 配置
tag:
  - 主题配置
  - 基础
---

## 基本选项

::: danger

这些选项很重要，需要你正确配置。

:::

### hostname <Badge text="仅限 Root" type="warning" />

- 类型: `string`
- 必填: 是

当前网站部署到的域名。

### author

- 类型: `Author`
- 必填: 否

```ts
type AuthorInfo = { name: string; url?: string };

type Author = string | string[] | AuthorInfo | AuthorInfo[];
```

文章显示的默认作者

### navbar

导航栏配置

具体配置，请见 [布局 → 导航栏](../../guide/layout/navbar.md)

### sidebar

侧边栏

具体配置，请见 [布局 → 侧边栏](../../guide/layout/sidebar.md)

### locales

- 类型: `Record<string, HopeThemeLocaleOptions>`

主题的多语言配置，你可以在这里分别为每个语言设置单独的选项。
