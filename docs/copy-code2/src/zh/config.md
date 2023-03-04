---
title: 插件选项
icon: gears
---

## selector

- 类型: `string | string[]`
- 默认值: `'.theme-default-content div[class*="language-"] pre'`
- 详情:
  - [指南 → 代码块选择](./guide.md#代码块选择)

代码块选择器

## showInMobile

- 类型: `boolean`
- 默认值: `false`
- 详情:
  - [指南 → 按钮展示](./guide.md#按钮展示)

是否展示在移动端

## duration

- 类型: `number`
- 默认值: `2000`
- 详情:
  - [指南 → 复制提示](./guide.md#复制提示)

提示消息显示时间，设置为 `0` 会禁用提示。

## pure

- 类型: `false`
- 默认值: `false`
- 详情:
  - [指南 → 纯净模式](./guide.md#纯净模式)

是否生成样式纯净的小而简单的复制按钮。

## delay

- 类型: `number`
- 默认值: `800`

注册复制按钮的延时，单位 ms。

如果你使用的主题有切换动画，建议配置此选项为 `切换动画时长 + 200`

## locales

- 类型: `CopyCodeLocaleConfig`

  ```ts
  interface CopyCodeLocaleData {
    /**
     * 复制文字
     */
    copy: string;

    /**
     * 已复制文字
     */
    copied: string;

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

::: details 内置支持语言

- **简体中文** (zh-CN)
- **繁体中文** (zh-TW)
- **英文(美国)** (en-US)
- **德语** (de-DE)
- **德语(澳大利亚)** (de-AT)
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
- **芬兰语** (fi-FI)
- **印尼语** (id-ID)
- **荷兰语** (nl-NL)

:::
