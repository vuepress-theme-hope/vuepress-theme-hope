---
icon: api
category: api
tags: 
  - api
  - themeConfig
---

# Theme Config

In addition to viewing this guide, you can also directly view the [types file](https://github.com/Mister-Hope/vuepress-theme-hope/blob/master/packages/theme/types/hopeConfig.d.ts) in the source code  or [configuration file](https://github.com/Mister-Hope/vuepress-theme-hope/blob/master/docs/theme/src/.vuepress/config.js) of this document.

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

## Footer settings

Footer setting options

### footer.text

- Type: `string`
- Default: `'Copyright © 2020-present <author>'`

The default text for the footer.

### footer.displayDefault

- Type: `boolean`
- Default: `false`

Whether to show the default footer

## darkmode

- Type: `'auto' | 'switch' | 'disable'`
- Default: `'auto'`

Whether to enable darkmode support

## themeColor

Theme color configuration.

If you don't need this feature, set `themeColor: false` to disable it.

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

## Markdown enhancement

Use `themeConfig.markdown` for Markdown enhanced configuration.

If you don't need any Markdown enhancements, set it to `false` to disable it.

### markdown.enableAll

- Type: `boolean`
- Default: `false`

Enable all features.

### markdown.lineNumbers <MyBadge text="Default value changed" type = "error" />

- Type: `boolean`
- Default: `true`

Whether to show line numbers to the left of each code block

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

### markdown.tex

- Type: `boolean`
- Default: `false`

Whether to enable TeX syntax support

### markdown.flowchart

- Type: `boolean`
- Default: `false`

Whether to enable flowchart syntax support

## Comment settings

For specific configuration, see [@mr-hope/vuepress-plugin-comment documentation](http://comment.mrhope.site/en/api/)

You can set it to `false` directly to disable the comment function

## pwa

PWA setting options

## Encryption settings

Encryption setting options

### encrypt.global

- Type: `string | string []`
- Required: No

Highest authority password, you can set multiple by using array

### encrypt.globalEncrypt

- Type: `boolean`
- Default: `false`

Whether global encryption

### encrypt.config

- Type: `Record <string, string | string []>`
-Required: No

The encryption configuration is an object with a key name matching the path and a key value corresponding to a password that accepts a string or an array of strings.

::: details Example

```js
{
  // This will encrypt the entire guide directory and both passwords will be available
  "/guide/": ["1234", "5678"],
  // this will only encrypt api / page.html
  "/api/page.html": "1234"
}
```

:::

## Blog configuration

Blog configuration. You can directly set `blog: false` to disable related functions.

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
-Required: No

Personal introduction address of the blogger.

After filling in, you will be allowed to click on the avatar or name in "Blogger Information" to enter the personal introduction page.

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

### smoothScroll <MyBadge text="Default value changed" type="error" />

- Type: `boolean`
- Default: `true`

Whether to enable smooth scrolling

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
