---
title: Giscus 选项
icon: github
---

## repo

- 类型: `string`
- 必填: 是

存放评论的仓库

## repoId

- 类型: `string`
- 必填: 是

仓库 ID，请从 [Giscus 页面](https://giscus.app/zh-CN) 生成。

## category

- 类型: `string`
- 必填: 是

讨论分类

## categoryId

- 类型: `string`
- 必填: 是

讨论分类 ID，请从 [Giscus 页面](https://giscus.app/zh-CN) 生成。

## mapping

- 类型: `string`
- 默认值: `"pathname"`

页面 ↔️ discussion 映射关系，详见 [Giscus 页面](https://giscus.app/zh-CN)。

## reactionsEnabled

- 类型: `boolean`
- 默认值: `true`

是否启用主帖子上的反应

## inputPosition

- 类型: `"top" | "bottom"`
- 默认值: `"top"`

输入框的位置
