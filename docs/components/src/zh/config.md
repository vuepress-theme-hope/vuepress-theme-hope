---
title: 插件选项
icon: config
---

## components

- 类型: `AvailableComponent[]`
- 默认: `[]`

需要被注册的组件

```ts
type AvailableComponent = "Badge" | "CodePen" | "FontIcon" | "PDF";
```

## backToTop

- 类型: `boolean | number`
- 默认: `false`

是否启用返回顶部按钮，当设置为数字时，会被作为返回顶部按钮触发距离 (单位：像素)，默认为 300。

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
