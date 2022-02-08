---
title: 插件选项
icon: config
---

## selector

- 类型: `string | string[]`
- 默认值: `'.theme-default-content div[class*="language-"] pre'`

代码块选择器

## duration

- 类型: `number`
- 默认值: `2000`

提示消息显示时间，设置为 `0` 会禁用提示。

## showInMobile

- 类型: `boolean`
- 默认值: `false`

是否展示在移动端

## locales

```ts
interface CopyCodeLocaleData {
  /**
   * 复制按钮文字
   */
  copy: string;

  /**
   * 复制成功提示消息文字
   */
  hint: string;
}
```

国际化配置
