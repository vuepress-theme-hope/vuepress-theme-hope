---
title: 选项
icon: gears
---

## 插件选项

### level

- 类型: `1 | 2 | 3`
- 默认值: `3`

目录项级别的最大深度。

::: note

仅在你使用内置目录组件时可用。

:::

### index

- 类型: `boolean`
- 默认值: `false`

目录是否显示索引

### exclude

- 类型: `(RegExp | string)[]`
- 默认值: `[]`

不会自动生成的页面路径。

### frontmatter

- 类型: `(path: string) => Record<string, any>`
- 必填: 否

控制页面 Frontmatter。

### titleGetter

- 类型: `(page: Page) => string`
- 默认值: `(page: Page) => page.title`

页面标题获取器

### iconGetter

- 类型: `(page: Page) => string`
- 必填: 否

页面图标获取器

### orderGetter

- 类型: `(page: Page) => string`
- 必填: 否

页面顺序获取器

### shouldIndex

- 类型: `(page: Page) => boolean`
- 默认值: `() => true`

页面是否应该被索引

### component

- 类型: `string`
- 必填: 否

使用的目录组件名称。

### iconComponent

- 类型: `string`
- 必填: 否

使用的图标组件名称，图标信息会作为 `icon` 属性传入相关组件进行渲染。

### locales

- 类型: `AutoCatalogLocaleConfig`

  ```ts
  interface AutoCatalogLocaleData {
    /**
     * 目录标题
     */
    title: string;
  }

  interface AutoCatalogLocaleConfig {
    [localePath: string]: AutoCatalogLocaleData;
  }
  ```

- 必填: 否

目录组件国际化配置。

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
- **印尼语** (id-ID)
- **荷兰语** (nl-NL)

:::

## 客户端选项

### defineAutoCatalogIconComponent

```ts
export type AutoCatalogIconComponent = Component<{
  icon: string;
}>;
export declare const defineAutoCatalogIconComponent: (
  options: AutoCatalogIconComponent
) => void;
```

自定义目录图标组件。

## AutoCatalog 组件属性

### base

- 类型: `string`
- 默认值: `当前路由的基础路径`

目录基础路径

### level

- 类型: `1 | 2 | 3`
- 默认值: `3`

Catalog 的最大层级

### index

- 类型: `boolean`
- 默认值: `false`

是否在目录列表中显示索引
