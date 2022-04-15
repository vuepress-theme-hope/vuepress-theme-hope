---
title: 插件选项
icon: config
---

## components

- 类型: `AvailableComponent[]`
- 默认: `[]`

需要被注册的组件

```ts
type AvailableComponent = "Badge";
```

## backToTop

- 类型: `boolean`
- 默认: `false`

是否启用返回顶部按钮

## backToTopThreshold

- 类型: `number`
- 默认: `300`

返回顶部按钮触发距离 (单位：像素)

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
