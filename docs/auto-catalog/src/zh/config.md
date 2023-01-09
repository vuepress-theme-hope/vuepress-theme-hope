---
title: 选项
icon: config
---

## component

- 类型: `string`
- 默认值: `"AutoCatalog"`

目录组件名称。

## level

- 类型: `1 | 2 | 3`
- 默认值: `3`

目录项级别的最大深度。

::: note

仅在你使用内置目录组件时可用。

:::

## exclude

- 类型: `(RegExp | string)[]`
- 默认值: `[]`

不会自动生成的页面路径。

## frontmatter

- 类型: `(path: string) => Record<string, any>`
- 必填: 否

控制页面 Frontmatter。

### locales

- 类型: `CatalogLocaleConfig`

  ```ts
  interface CatalogLocaleData {
    /**
     * 目录标题
     */
    title: string;
  }

  interface CatalogLocaleConfig {
    [localePath: string]: CatalogLocaleData;
  }
  ```

- 必填: 否

目录组件国际化配置。

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
- **芬兰语** (fi-FI)

:::
