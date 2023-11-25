---
title: 版权信息插件配置
icon: copyright
order: 4
category:
  - 配置
tag:
  - 插件配置
  - 主题配置
  - 版权信息
---

## 介绍

`vuepress-plugin-copyright2` 插件默认禁用，能在用户复制站点内容时添加版权信息。此插件还可以禁用站点复制或选择。

`vuepress-theme-hope` 将主题选项中的 `plugins.copyright` 作为插件选项传递给 `vuepress-plugin-copyright2` 插件。

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

### triggerLength

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
