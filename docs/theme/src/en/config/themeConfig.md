---
title: Theme Config
icon: configuration
category: config
tags:
  - config
  - themeConfig
---

In addition to viewing this guide, you can also directly view the [types file](https://github.com/Mister-Hope/vuepress-theme-hope/blob/master/packages/theme/types/hopeConfig.d.ts) in the source code or [configuration file](https://github.com/Mister-Hope/vuepress-theme-hope/blob/master/docs/theme/src/.vuepress/config.js) of this document.

::: warning
By injecting, vuepress-theme-hope changes the default values of some configurations of the default theme.

Although in general, they have little effect, but they may led to a result that does not match the default document expectations.

The changes to all configuration items are carefully listed below the documentation.
:::

The following configuration has been added to the themeConfig field in `.vuepress/config.js`:

## Basic options

These options require you to configure them correctly.

### baseLang

- Type: `string`
- Default: `'zh-CN'`

The language of the home directory.

This option ensures that the subject text in the main catalog page is displayed in the correct language. You can change it to other languages according to your needs.

::: tip
Currently only **Simplified Chinese** (zh-CN) and **English (United States)** (en-US) are available for i18n.

If you need multi-language support for other languages, you can [submit a PR to this file](https://github.com/Mister-Hope/vuepress-theme-hope/blob/master/packages/shared-utils/src/i18n/config.ts)
:::

### author

- Type: `string`
- Required: No

The default author of the article

### nav <MyBadge text="improved" type="warn" />

NavBarItem now has

- `icon` field to support icon display.
- `prefix` field to automatically add group prefix

### sidebar <MyBadge text="improved" type="warn" />

SideBarItem now has

- `icon` field to support icon display.
- `prefix` field to automatically add group prefix

### locales

-Type: `Record <string, HopeLangI18nConfigItem>`

The multi-language configuration of the theme mainly needs to configure `nav` and`sidebar` of each language.

## Default theme config

The following configurations follow the configuration items in `@vuepress/theme-default`:

### logo <MyBadge text="improved" type="warn" />

- Type: `string`
- Required: No

The logo image of the navigation bar. Needs to be filled with an absolute path. If you want to display another logo in dark mode, please configure the `themeConfig.darkLogo` option.

### sidebarDepth

- Type: `number`
- Default: `2`

Nested headings depth in sidebar

### displayAllHeaders

- Type: `boolean`
- Default: `false`

Whether to display header links in sidebar for all pages

### activeHeaderLinks

-Type: `boolean`
-Default value: `true`

Whether to automatically update hash values ​​in URLs and sidebar active headings.

### search

- Type: `boolean`
- Default: `true`

Whether to enable the default search box

### searchPlaceholder

- Type: `string`
- Required: No

Placeholder for the search box

### searchMaxSuggestions

- Type: `number`
- Default: `10`

The number of search results displayed in the default search box

### algolia

-Type: `AlgoliaOption`
-Required: No

Algolia search configuration, you need to provide at least `apiKey` and`indexName`. For details, see [Doc Search documentation](https://github.com/algolia/docsearch#docsearch-options). You can also configure algolia for each language.

### nextLinks

- Type: `boolean`
- Default: `true`

Whether to display next link of all pages

### prevLinks

- Type: `boolean`
- Default: `true`

Whether to display previous link on all pages

### repo

- Type: `string`
- Required: No

Project repo address

### repoLabel

- Type: `string`
- Required: No

Repo label text, will automatically try to parse the `repo` option, try to derive `'GitHub'` `'GitLab'` `'Bitbucket'`, if it is not recognized, it will be displayed as `'Source'`

### docsRepo

- Type: `string`
- Required: No

The address of the docs repo. Will be the same as `repo` by default.

### docsDir

- Type: `string`
- Required: No

The folder which the document belongs to, the default is the root directory of the repo.

### docsBranch

- Type: `string`
- Default: `'master'`

Document branch

### editLinks <MyBadge text = "Change default value" type = "error" />

- Type: `boolean`
- Default: `true`

Show edit page link

## darkmode <MyBadge text="Enabled by default" />

- Type: `'auto-switch' | 'switch' | 'auto' | 'disable'`
- Default: `'auto-switch'`

Dark mode support options:

- `'auto-switch'`: "off | automatic | on" three-stage switch
- `'switch'`: "Close | Open" toggle switch
- `'auto'`: Automatically decide whether to apply dark mode based on user device's color-scheme or current time
- `'disable'`: disable dark mode

> If you don't need this feature, set `darkmode: "disable"` to disable it.

## themeColor <MyBadge text="Enabled by default" />

Theme color configuration.

> If you don't need this feature, set `themeColor: false` to disable it.

- Type: `Record<string, string>`
- Defaults:

  ```js
  {
    blue: '#2196f3',
    red: '#f26d6d',
    green: '#3eaf7c',
    orange: '#fb9b5f'
  }
  ```

## Blog configuration <MyBadge text="Enabled by default" />

Blog configuration.

> You can directly set `blog: false` to disable related functions.

### blog.blogger

- Type: `string`
- Required: No

Blogger name, default is `themeConfig.author`

### blog.avatar

- Type: `string`
- Required: No

Blogger avatar, default is `themeConfig.logo`

### blog.sidebarDisplay

- Type: `'mobile' | 'none' | 'always'`
- Default: `'none'`

Whether to show blogger information in the sidebar

- `mobile`: Show in sidebar in mobile view
- `'always'`: Always show in the sidebar
- `'none'`: Never show in the sidebar

### blog.intro

- Type: `string`
- Required: No

Personal introduction address of the blogger.

After filling in, you will be allowed to click on the avatar or name in "Blogger Information" to enter the personal introduction page.

### blog.timeline

- Type: `string`
- Default: `'Yesterday once more'`

Text on the top of timeline page.

## pwa <MyBadge text="Enabled by default" />

PWA setting options

> If you don't need this feature, please set to `false`.

### pwa.popupComponent

- Type: `string`
- Required: No

A custom component to replace the default popup component.

### pwa.gerateSWConfig

workbox-build's [generateSW config](https://developers.google.com/web/tools/workbox/modules/workbox-build#full_generatesw_config)

## Seo <MyBadge text="Enabled by default" />

> If you don't need this feature, please set to `false`.

### seo.twitterID

- Type: `string`
- Required: No

Fill in your twitter username

### seo.restrictions

- Type: `string`
- Required: No

The age rating of the content, the format is `[int]+`, such as `'13+'`

### seo.seo

- Type: `(info: PageSeoInfo) => Record<string, string>`

You can use this option to inject new or overwrite the default generated SEO. For details, see [Plugin options](plugin/seo.md#seo).

### seo.customMeta

- Type: `(meta: Meta, info: PageSeoInfo) => void`

You can use this option to inject content directly into Meta. For details, see [Plugin options](plugin/seo.md#customMeta).

## Sitemap <MyBadge text="Enabled by default" />

> If you don't need this feature, please set to `false`.

### sitemap.hostname

- Type: `string`
- Required: Yes

The domain name where the current website is deployed, please at least set it, or fill in `themeConfig.hostname`, otherwise the plugin will not work.

### sitemap.urls

- Type: `string[]`
- Required: No

URLs to be included

### sitemap.exclude

- Type: `string[]`
- Required: No

Pages not included

### sitemap.outFile

- Type: `string`
- Default value: `"sitemap.xml"`

The output file name

### sitemap.changefreq

- Type: `"always" | "hourly" | "daily" | "weekly" |"monthly" | "yearly" | "never"`
- Default value: `"daily"`

Page default update frequency

### sitemap.dateFormatter

- Type: `($page: PageComputed) => string`
- Required: No

Time formatter. The timestamp will be automatically generated by default. If you encounter time zone problems, please set this option.

## pageInfo

- Type: `string[] | false`
- Default: `['Author', 'Visitor', 'Time', 'Category', 'Tag', 'ReadTime']`

Article information can be filled in an array, and the order of the array is the order in which the items are displayed. Fill in `false` to disable it.

The items that can be filled are as follows:

- `'Author'`: Author
- `'Time'`: Writing Date
- `'Category'`: Category
- `'Tag'`: Tags
- `'ReadTime'`: Expect reading time
- `'Word'`: Word number for the article
- `'Visitor'`: Visitor Number

## Markdown enhancement

### markdown.enableAll

- Type: `boolean`
- Default: `false`

Whether to enable all features

### markdown.lineNumbers <MyBadge text="Default value changed" type = "error" />

- Type: `boolean`
- Default: `true`

Whether to show line numbers to the left of each code block

### markdown.align

- Type: `boolean`
- Default: `false`

Whether to enable align support

### markdown.sup

- Type: `boolean`
- Default: `false`

Whether to enable superscript format support

### markdown.sub

- Type: `boolean`
- Default: `false`

Whether to enable subscript format support

### markdown.footnote

- Type: `boolean`
- Default: `false`

Whether to enable footnote format support

### markdown.mark

- Type: `boolean`
- Default: `false`

Whether to enable mark format support

### markdown.tex

- Type: `boolean`
- Default: `false`

Whether to enable TeX syntax support

### markdown.flowchart

- Type: `boolean`
- Default: `false`

Whether to enable flowchart syntax support

## Comment settings

For specific configuration, see [@mr-hope/vuepress-plugin-comment documentation](https://vuepress-comment.mrhope.site/en/config/)

You can set it to `false` directly to disable the comment function

## Footer settings

### footer.content

- Type: `string`
- Required: false

The default content for the footer, can accept HTMLString.

### footer.copyright

- Type: `string | boolean`
- Default: `'Copyright © <author>'`

The default copyright info, set it to `false` to disable it by default.

### footer.display

- Type: `boolean`
- Default: `false`

Whether to display footer by default

## Copyright Settings

### copyright.status

- Type: `"global" | "local"`
- Required: Yes

Whether to enable this feature globally.

### copyright.minLength

- Type: `number`
- Default value: `100`

The minimum number of characters that trigger copyright information or prohibit copying.

### copyright.noCopy

- Type: `boolean`
- Default value: `false`

Whether to prohibit copying

### copyright.noSelect

- Type: `boolean`
- Default value: `false`

Whether to prohibit selected text

## Encryption settings

Encryption setting options

### encrypt.status

-Type: `"global" | "local"`
-Default value: `"local"`

Whether to encrypt globally

### encrypt.global

- Type: `string | string []`
- Required: No

Highest authority password, you can set multiple by using array

### encrypt.config

- Type: `Record <string, string | string []>`
- Required: No

The encryption configuration is an object with a key name matching the path and a key value corresponding to a password that accepts a string or an array of strings.

::: details Example

```js
{
  // This will encrypt the entire guide directory and both passwords will be available
  "/guide/": ["1234", "5678"],
  // this will only encrypt config/page.html
  "/config/page.html": "1234"
}
```

:::

## addthis

- Type: `string`
- Required: 否

pubid for AddThis

## Other configuration options

The following are other configuration options provided by the theme. In general, you do not need to change them, but the theme also provides you with more configuration items about the theme.

### iconPrefix

- Type: `string`
- Default: `'icon-'`

Set iconfont icon prefix

### sidebarIcon

- Type: `boolean`
- Default: `true`

Whether to show icons in the sidebar

### breadcrumb

- Type: `boolean`
- Default: `true`

Whether to enable route navigation globally

### breadcrumbIcon

- Type: `boolean`
- Default: `true`

Whether to show icons in route navigation

### wordPerminute

- Type: `number`
- Default value: `300`

Words reading per minute

### smoothScroll <MyBadge text="Default value changed" type="error" />

- Type: `boolean`
- Default: `true`

Whether to enable smooth scrolling

### photoSwipe

- Type: `boolean`
- Default: `true`

Whether to enable picture preview feature

### backToTop

- Type: `boolean | Number`
- Default: `true`

Back to top button configuration. The default trigger distance is 300px, which can be changed when you fill in the number. Filling in `false` disables the back to top button.

### repoDisplay

- Type: `boolean`
- Default: `true`

Whether to display the warehouse link in the navigation bar

### fullscreen

- Type: `boolean`
- Default: `true`

Whether to show the "full screen" button
