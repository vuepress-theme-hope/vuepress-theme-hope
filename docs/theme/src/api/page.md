---
icon: api
category: api
tag: 
  - api
  - frontmatter
---

# 页面配置

页面的 frontmatter 新增如下配置选项：

## icon

- 类型: `string`
- 必填: 否

设置当前页面图标的 FontClass (建议填写)

## author

- 类型: `string | boolean`
- 必填: 否

显示当前页面的作者

::: tip
当全局默认作者启用时，可以设置 `false` 取消作者显示
:::

## time

- 类型: `string`
- 必填: 否
- 格式: `YYYY/MM/DD hh:mm` 或 `YYYY/MM/DD`

设置当前页面的写作时间

## visitor

- 类型: `boolean`
- 默认值: 全局中配置的值 (配置全局的 `comment` 为 `'valine'` 后默认为 `true`)

当前页面是否显示浏览量

## pageInfo

- 类型: `boolean`
- 默认值: 全局中配置的值 (全局默认为 `true`)

设置当前页面是否显示页面详情

## breadcrumb

- 类型: `boolean`
- 默认值: 全局中配置的值 (全局默认为 `true`)

当前页面是否开启路径导航

## comment

- 类型: `boolean`
- 默认值: 全局中配置的值 (配置全局的 `comment` 后默认为 `true`)

当前页面是否开启评论功能

## footer

- 类型: `boolean | string | HTMLString`
- 默认值: 全局中配置的值 (取决于全局是否设置了 **页脚的默认值** 与 **默认显示页脚**)

设置当前页面的页脚，更多详情请看 [页面 → 页脚支持](../guide/layout/page.md#页脚支持)

## backtotop

- 类型: `boolean`
- 默认值: 全局中配置的值 (全局默认为 `true`)

设置当前页面是否显示返回顶部按钮
