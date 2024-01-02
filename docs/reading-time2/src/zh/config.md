---
title: 配置
icon: gears
---

## 插件选项

### wordPerMinute

- 类型: `number`
- 默认值: `300`

每分钟阅读字数

### locales

- 类型: `ReadingTimeLocaleConfig`

  ```ts
  interface ReadingTimeLocaleData {
    /**
     * 字数模板，模板中 `$word` 会被自动替换为字数
     */
    word: string;

    /**
     * 小于一分钟文字
     */
    less1Minute: string;

    /**
     * 时间模板
     */
    time: string;
  }

  interface ReadingTimeLocaleConfig {
    [localePath: string]: ReadingTimeLocaleData;
  }
  ```

- 必填: 否

阅读时间插件的国际化配置。

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

## 客户端 API

你可以从 `vuepress-plugin-reading-time2/client` 导入并使用这些 api :

::: note 即使插件被禁用，这些 api 也不会抛出错误。

:::

### useReadingTimeData

```ts
interface ReadingTime {
  /** 分钟为单位的预计阅读时长 */
  minutes: number;
  /** 内容的字数 */
  words: number;
}

const useReadingTimeData: () => ComputedRef<ReadingTime | null>;
```

当插件被禁用时会返回 `null`。

### useReadingTimeLocale

```ts
interface ReadingTimeLocale {
  /** 当前语言的预计阅读时间 */
  time: string;
  /** 当前语言的字数文字 */
  words: string;
}

const useReadingTimeLocale: () => ComputedRef<ReadingTimeLocale>;
```
