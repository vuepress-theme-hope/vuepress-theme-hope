---
title: 插件选项
icon: config
---

## components

- 类型: `AvailableComponent[]`

  ```ts
  type AvailableComponent =
    | "Badge"
    | "CodePen"
    | "FontIcon"
    | "PDF"
    | "StackBlitz"
    | "YouTube";
  ```

- 默认: `[]`

需要被注册的组件。

可接受的组件名称为:

- `"Badge"`
- `"CodePen"`
- `"FontIcon"`
- `"PDF"`
- `"StackBlitz"`
- `"YouTube"`

## addThis

- 类型: `string | false`
- 默认: `false`

AddThis 的公开 ID。

## backToTop

- 类型: `boolean | number`
- 默认: `false`

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

## iconAssets

- 类型: `string`
- 必填: 否

字体图标资源链接，支持 `'iconfont'` 和 `'font-awesome'` 关键字。

## iconPrefix

- 类型: `string`
- 默认值: 尝试从 iconAssets 推断

字体图标的 Class 前缀
