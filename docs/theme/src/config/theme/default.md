---
title: Default Theme Config
icon: config
category: config
tags:
  - config
  - themeConfig
---

The following configurations follow the configuration items in `@vuepress/theme-default`:

::: warning

By injecting, vuepress-theme-hope changes the default values of some configurations of the default theme.

Although they have little effect, they may led to a result that does not match the default document expectations.

All the configuration items changes are listed below the documentation.

:::

## logo <Badge text="improved" type="warn" />

- Type: `string`
- Required: No

The logo image of the navigation bar. Needs to be filled with an absolute path. To display another logo in dark mode, please configure the `themeConfig.darkLogo` option.

## displayAllHeaders

- Type: `boolean`
- Default: `false`

Whether to display header links in sidebar for all pages

## activeHeaderLinks

- Type: `boolean`
- Default value: `true`

Whether to automatically update hash values ​​in URLs and sidebar active headings.

## search

- Type: `boolean`
- Default: `true`

Whether to enable the default search box

## searchPlaceholder

- Type: `string`
- Required: No

Placeholder for the search box

## searchMaxSuggestions

- Type: `number`
- Default: `10`

The number of search results displayed in the default search box

## algolia

- Type: `AlgoliaOption`
- Required: No

Algolia search configuration, you need to provide at least `apiKey` and`indexName`. For details, see [Doc Search documentation](https://github.com/algolia/docsearch#docsearch-options). You can also configure algolia for each language.

## nextLinks

- Type: `boolean`
- Default: `true`

Whether to display next link of all pages

## prevLinks

- Type: `boolean`
- Default: `true`

Whether to display previous link on all pages

## repo

- Type: `string`
- Required: No

Project repository address

## repoLabel

- Type: `string`
- Required: No

Repository label text, will automatically try to parse the `repo` option, try to derive `'GitHub'` `'GitLab'` `'Bitbucket'`, if the repo link is not recognized, it will be displayed as `'Source'`

## docsRepo

- Type: `string`
- Required: No

The address of the docs repository. Will be the same as `repo` by default.

## docsDir

- Type: `string`
- Required: No

The folder which the document belongs to, the default is the root directory of the repository.

## docsBranch

- Type: `string`
- Default: `'main'`

Document branch

## editLinks <Badge text="Change default value" type="error" />

- Type: `boolean`
- Default: `true`

Show edit page link

## contributor <Badge text="New" />

- Type: `boolean`
- Default: `true`

Show contributors of this page

## updateTime <Badge text="New" />

- Type: `boolean`
- Default: `true`

Show last update time of this page
