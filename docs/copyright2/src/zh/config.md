---
title: 选项
icon: gears
---

## 插件选项

### author

- 类型: `string | ((page: Page) => string)`
- 必填: 否

作者信息

### license

- 类型: `string | ((page: Page) => string)`
- 必填: 否

协议信息

### triggerLength

- 类型: `number`
- 默认值: `100`

触发附加版权的最小内容长度

### maxLength

- 类型: `number`
- 默认值: `0`

允许复制的最大内容长度。

`0` 意味着无限制。

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

### canonical

- 类型: `string`
- 必填: 否

首选域名与部署目录

当你在多个站点部署内容时很有用。

::: note 例子

如果你在 `https://myblog.com` 和 `https://blog.com/username/` 下部署相同的内容，你可能希望选择一个站点作为首选链接。

- 如果你倾向于使用第一个，你应该将 `canonical` 设置为 `https://myblog.com`
- 如果你倾向于使用第二个，你应该将 `canonical` 设置为 `https://blog.com/username/`

这样，在另一个站点复制内容触发的版权信息，也会指向你的首选站点。

:::

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

## Frontmatter Options

### copy.triggerLength

- 类型: `number`
- 默认值: `100`

触发附加版权的最小内容长度

### copy.maxLength

- 类型: `number`
- 默认值: `0`

允许复制的最大内容长度。

`0` 意味着无限制。

### copy.disableCopy

- 类型: `boolean`
- 默认值: `false`

禁用复制

### copy.disableSelection

- 类型: `boolean`
- 默认值: `false`

禁用选择
