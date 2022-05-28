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

## delay

- 类型: `number`
- 默认值: `500`

注册复制按钮的延时，单位 ms。

如果你使用的主题有切换动画，建议配置此选项为 `切换动画时长 + 200`

## pure

- 类型: `false`
- 默认值: `false`

是否生成样式纯净的小而简单的复制按钮。

## locales

- 类型: `CopyCodeLocaleConfig`

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

  interface CopyCodeLocaleConfig {
    [localePath: string]: CopyCodeLocaleData;
  }
  ```

- 必填: 否

复制按钮插件的国际化配置。
