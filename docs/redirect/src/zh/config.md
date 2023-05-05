---
title: 选项
icon: gears
---

## 插件选项

### config

- 类型: `Record<string, string> | ((app: App) => Record<string, string>)`
- 必填: 否

重定向映射。

### hostname

- 类型: `string`
- 必填: 否

重定向到的域名。

## autoLocale

- 类型: `boolean`
- 默认值: `false`
- 详情:
  - [指南 → 重定向语言](./guide.md#重定向语言)

是否启用语言重定向

## switchLocale

- 类型: `"direct" | "modal" | false`
- 默认值: `false`

是否根据用户偏好切换到新的语言环境。

- `"direct"`: 直接重定向到新的语言环境而不询问
- `"modal"`: 显示一个模式让用户选择是否切换到新的语言环境

## localeConfig

- 类型: `Record<string, string | string[]>`
- 必填: 否

多语言语言配置

## localeFallback

- 类型: `boolean`
- 默认值: `true`

是否回退到用户定义的其他语言

## defaultBehavior

- 类型: `"defaultLocale" | "homepage" | "404"`
- 默认值: `"defaultLocale"`

当前链接没有可用的语言版本时的行为

::: note

只有当存在当前语言时，`"homepage"` 和 `"404"` 才可用。

:::

## defaultLocale

- 类型: `string`
- 默认值: 首个语言路径

默认语言路径

## Frontmatter 选项

### redirectFrom

- 类型: `string | string[]`
- 必填: 否

重定向到该页面的地址。

### redirectTo

- 类型: `string`
- 必填: 否

该页面重定向到的地址。
