---
title: 插件选项
icon: gears
---

## components

- 类型: `AvailableComponent[]`

  ```ts
  type AvailableComponent =
    "Badge" | "CodePen" | "Share" | "StackBlitz" | "SiteInfo" | "VPBanner" | "VPCard";
  ```

- 默认值: `[]`

需要被注册的组件。

可接受的组件名称为:

- `"Badge"`
- `"CodePen"`
- `"Share"`
- `"StackBlitz"`
- `"SiteInfo"`
- `"VPBanner"`
- `"VPCard"`

::: tip

媒体组件已迁移至 [`@vuepress/plugin-media`](https://ecosystem.vuejs.press/zh/plugins/features/media.html)。

:::

## componentsOptions

组件的全局配置

### componentsOptions.share.services

- 类型: `(string | ShareService)[]`
- 详情:
  - [指南 → Share → 设置组件](./guide/utilities/share.md#设置组件)

分享服务

### componentsOptions.share.twitterUserName

- 类型: `string`
- 必填: 否

Twitter 用户名。

## locales

组件多语言配置

### locales.siteInfo

- 类型: `SiteInfoLocaleConfig`

  ```ts
  interface SiteInfoLocaleData {
    /**
     * Source text
     *
     * 源代码文字
     */
    source: string;
  }

  interface SiteInfoLocaleConfig {
    [localePath: string]: SiteInfoLocaleData;
  }
  ```

- 必填: 否

站点信息组件国际化配置。
