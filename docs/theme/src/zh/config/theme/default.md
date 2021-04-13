---
title: 默认主题配置
icon: config
category: config
tags:
  - config
  - themeConfig
---

以下这些配置沿用了 `@vuepress/theme-default` 的配置项，你无需进行改动:

::: warning

通过注入，vuepress-theme-hope 改变了默认主题一些配置的默认值。

虽然一般情况下，它们影响不大，但是还是需要着重提示这可能造成与默认文档预期不符的结果。

文档下方仔细的列出了所有配置项的改变。

:::

## logo <Badge text="改进" type="warn" />

- 类型: `string`
- 必填: 否

导航栏的 logo 图片，需填入绝对路径并放入 `.vuepress/public` 文件夹。

如果你希望在深色模式下显示另一个 logo，请配置 `themeConfig.darkLogo` 选项。

## sidebarDepth

- 类型: `number`
- 默认值: `2`

侧边栏嵌套的标题深度

## displayAllHeaders

- 类型: `boolean`
- 默认值: `false`

是否显示所有页面的标题链接

## activeHeaderLinks

- 类型: `boolean`
- 默认值: `true`

是否自动更新嵌套的标题链接和 URL 中的 Hash 值

## search

- 类型: `boolean`
- 默认值: `true`

是否启用默认的搜索框

## searchPlaceholder

- 类型: `string`
- 必填: 否

搜索框的占位符文字

## searchMaxSuggestions

- 类型: `number`
- 默认值: `10`

默认搜索框显示的搜索结果数量

## algolia

- 类型: `AlgoliaOption`
- 必填: 否

Algolia 搜索配置，你需要至少提供 `apiKey` 和 `indexName`。具体详见 [Doc Search 文档](https://github.com/algolia/docsearch#docsearch-options)。你也可以为每个语言配置 algolia。

## nextLinks

- 类型: `boolean`
- 默认值: `true`

所有页面的 下一篇 链接

## prevLinks

- 类型: `boolean`
- 默认值: `true`

所有页面的 上一篇 链接

## repo

- 类型: `string`
- 必填: 否

项目仓库地址

## repoLabel

- 类型: `string`
- 必填: 否

仓库标签文字，会自动解析 `repo` 选项，尝试推导出 `'GitHub'` `'GitLab'` `'Bitbucket'`，如果未能识别，显示为 `'Source'`。

## docsRepo

- 类型: `string`
- 必填: 否

文档所属仓库，默认同 `repo`。

## docsDir

- 类型: `string`
- 必填: 否

文档所属文件夹，默认为仓库根目录。

## docsBranch

- 类型: `string`
- 默认值: `'main'`

文档所属分支

## editLinks <Badge text="改变默认值" type="error" />

- 类型: `boolean`
- 默认值: `true`

显示编辑本页链接
