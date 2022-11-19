---
title: 选项
icon: config
---

## 插件选项

### hostname

- 类型: `string`
- 必填: 否

部署的域名

### author

- 类型: `string | ((page: Page) => string)`
- 必填: 否

作者信息

### license

- 类型: `string | ((page: Page) => string)`
- 必填: 否

协议信息

### triggerWords

- 类型: `number`
- 默认值: `100`

触发附加版权的最小字数

### global

- 类型: `boolean`
- 默认值: `false`

是否全局启用

### disableCopy

- 类型: `boolean`
- 默认值: `false`

禁用复制

### disableSelection

- 类型: `boolean`
- 默认值: `false`

禁用选择

### locales

- 类型: `CopyrightLocaleConfig`

  ```ts
  interface CopyrightLocaleData {
    /**
     * 作者文字
     *
     * @description `:author` 将会被作者替换
     */
    author: string;

    /**
     * 协议文字
     *
     * @description `:license` 会被当前协议替换
     */
    license: string;

    /**
     * 链接文字
     *
     * @description `:url` 会替换为当前页面链接
     */
    link: string;
  }

  interface CopyrightLocaleConfig {
    [localePath: string]: CopyrightLocaleData;
  }
  ```

- 必填: 否

版权插件的国际化配置。

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

:::s

## Frontmatter Options

### copy.triggerWords

- 类型: `number`
- 默认值: `100`

触发附加版权的最小字数

### copy.disableCopy

- 类型: `boolean`
- 默认值: `false`

禁用复制

### copy.disableSelection

- 类型: `boolean`
- 默认值: `false`

禁用选择
