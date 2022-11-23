---
title: 插件选项
icon: config
---

## components

- 类型: `AvailableComponent[]`

  ```ts
  type AvailableComponent =
    | "Badge"
    | "BiliBili"
    | "CodePen"
    | "FontIcon"
    | "PDF"
    | "StackBlitz"
    | "VideoPlayer"
    | "YouTube";
  ```

- 默认值: `[]`

需要被注册的组件。

可接受的组件名称为:

- `"Badge"`
- `"BiliBili"`
- `"CodePen"`
- `"FontIcon"`
- `"PDF"`
- `"StackBlitz"`
- `"VideoPlayer"`
- `"YouTube"`

## addThis

- 类型: `string | false`
- 默认值: `false`
- 详情:
  - [指南 → AddThis](./guide/addthis.md#使用)

AddThis 的公开 ID。

## backToTop

- 类型: `boolean | number`
- 默认值: `false`

是否启用返回顶部按钮，当设置为数字时，会被作为返回顶部按钮触发距离 (单位: 像素)，默认为 300。

## backToTopLocales

- 类型: `BackToTopLocaleConfig`

  ```ts
  interface BackToTopLocaleData {
    /**
     * 返回顶部文字
     */
    backToTop: string;
  }

  interface BackToTopLocaleConfig {
    [localePath: string]: BackToTopLocaleData;
  }
  ```

- 必填: 否

返回顶部按钮国际化配置。

::: details 内置支持语言

- **简体中文** (zh-CN)
- **繁体中文** (zh-TW)
- **英文(美国)** (en-US)
- **德语** (de-AT)
- **俄语** (ru-RU)
- **乌克兰语** (uk-UA)
- **越南语** (vi-VN)
- **葡萄牙语(巴西)** (pt-BR)
- **波兰语** (pl-PL)
- **法语** (fr-FR)
- **西班牙语** (es-ES)
- **斯洛伐克** (sk-SK)
- **日语** (ja-JP)
- **土耳其语** (tr-TR)
- **韩语** (ko-KR)

:::

## iconAssets

- 类型: `` "iconfont" | "fontawesome" | `//${string}` | `http://${string}` | `https://${string}`  ``
- 必填: 否

字体图标资源链接，支持 `'iconfont'` 和 `'fontawesome'` 关键字。

## iconPrefix

- 类型: `string`
- 默认值: 尝试从 iconAssets 推断

字体图标的 Class 前缀
