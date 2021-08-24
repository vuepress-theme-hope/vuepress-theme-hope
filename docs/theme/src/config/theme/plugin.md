---
title: Theme Plugin Config
icon: config
category: config
tags:
  - config
  - plugin
  - themeConfig
---

These are plugin config provided by theme.

::: tip

All the config key name is the camelCase version of plugin name.

Example: `@mr-hope/vuepress-copy-code` ’s config keyname will be `copyCode`.

:::

## mdEnhance

Markdown Enhance config, for details see [vuepress-plugin-md-enhance documentation][md-enhance-config]

### mdEnhance.enableAll

- Type: `boolean`
- Default: `false`

Whether to enable all features

::: danger

Please use this option ONLY for playing or testing.

As time grows,`vupress-plugin-md-enhance` is becoming more powerful. It’s adding more syntax to Markdown parser and more code to output.

Enabling features you don’t need will increase dev and build time. (`markdown-it` has to check for extra syntaxs)

Also, presentation feature will add a 700KB size chunk (mostly is `reveal.js`) to your output.

Please use the options below and enable ONLY the feature you want to use.

:::

### mdEnhance.lineNumbers <Badge text="Default value changed" type = "error" />

- Type: `boolean`
- Default: `true`

Whether to show line numbers to the left of each code block

### mdEnhance.imageFix

- Type: `boolean`
- Default: `true`

Whether to fix image links containing special characters

### mdEnhance.align

- Type: `boolean`
- Default: `false`

Whether to enable align support

### mdEnhance.sup

- Type: `boolean`
- Default: `false`

Whether to enable superscript format support

### mdEnhance.sub

- Type: `boolean`
- Default: `false`

Whether to enable subscript format support

### mdEnhance.footnote

- Type: `boolean`
- Default: `false`

Whether to enable footnote format support

### mdEnhance.mark

- Type: `boolean`
- Default: `false`

Whether to enable mark format support

### mdEnhance.tasklist

- Type: `TaskListOptions | boolean`
- Default: `false`

Whether to enable tasklist format support. You can pass an object to config task list.

```ts
interface TaskListOptions {
  /**
   * Whether use `<label>` to wrap text
   *
   * @default true
   */
  label?: boolean;
  /**
   * Whether place `<label>` after `<input>` or wrap `<input>`
   *
   * @default true
   */
  labelAfter?: boolean;
}
```

### mdEnhance.tex

- Type: `KatexOptions | boolean`
- Default: `false`

Whether to enable $\TeX$ syntax support. You can pass an object to config $\KaTeX$.

### mdEnhance.mermaid

- Type: `boolean`
- Default: `false`

Whether to enable [Mermaid](https://mermaid-js.github.io/mermaid/#/) support.

### mdEnhance.flowchart

- Type: `boolean`
- Default: `false`

Whether to enable flowchart syntax support

### mdEnhance.demo

- Type: `CodeDemoGlobalOptions | boolean`
- Default: `false`

Whether to enable code demo support.

#### mdEnhance.demo.jsLib

- Type: `string[]`
- Required: No

CodePen, JsFiddle requires an external JS library for dating.

#### mdEnhance.demo.cssLib

- Type: `string[]`
- Required: No

CodePen, JsFiddle need an external CSS library for dating.

::: warning

The above two options are only used by third-party code demo service, you need to import these libraries in `head`.

:::

#### mdEnhance.demo.jsfiddle

- Type: `boolean`
- Default value: `true`

Whether to display the JSFiddle button,

#### mdEnhance.demo.codepen

- Type: `boolean`
- Default value: `true`

Whether to display the CodePen button,

#### mdEnhance.demo.codepenLayout

- Type: `"top" | "left" | "correct"`
- Default value: `"left"`

CodePen editor layout

#### mdEnhance.demo.codepenEditors

- Type: `string`
- Default value: `"101"`

CodePen editor status

#### mdEnhance.demo.editors

- Type: `string`
- Default value: `"101"`

#### mdEnhance.others

The following are the library links used by the third-party code demo service. Unless your environment cannot visit jsdelivr or the speed is slow, you probably don’t need to override the default values.

##### mdEnhance.demo.babel

Default value: `"https://cdn.jsdelivr.net/npm/@babel/standalone/babel.min.js"`

##### mdEnhance.demo.vue

Default value: `"https://cdn.jsdelivr.net/npm/vue/dist/vue.min.js"`

##### mdEnhance.demo.react

Default value: `"https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js"`

##### mdEnhance.demo.reactDOM

Default value: `"https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.production.min.js"`

### mdEnhance.presentation

- Type: `PresentationOptions | boolean`
- Default: `false`

Whether to enable presentation syntax support.

You can set it with an object, the object will be used to config reveal.js.

#### mdEnhance.presentation.plugins

- Type: `string[]`
- Required: No

Plugins you want to use on reveal.js.

Acceptable values are:

- `"highlight"`
- `"math"`
- `"search"`
- `"notes"`
- `"zoom"`

<!-- - `"anything"`
- `"audio"`
- `"chalkboard"` -->

#### mdEnhance.presentation.revealConfig

- Type: `Partial<RevealOptions>`
- Required: No

Config which you want to pass to reveal.js.

## Comment settings

Comment options are omitted here because of the complexity.

For details, see [@mr-hope/vuepress-plugin-comment documentation][comment-config]

> You can omit this option if you don’t want the comment feature

## Copyright Settings

For details see [vuepress-plugin-copyright documentation][copyright-config]

> It’s a vuepress community plugin, not a built-in plugin.
>
> If you met bugs, please ahead to [it’s repo](https://github.com/vuepress/vuepress-plugin-copyright) for help.

::: warning

This plugin is not enabled by default!

You can set `themeConfig.copyright: true` or set `themeConfig.copyright.status` to enable it.

:::

### copyright.status

- Type: `"global" | "local"`
- Default: `"global"`

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

## git

### git.contributor

- Type: `boolean`
- Default: `true`

Whether generate contributor info

### git.timezone

- Type: `string`
- Required: No

Current timezone, useful when you are deploying through CI

> For timezone list, please see [Timezone list](https://www.zeitverschiebung.net/en/all-time-zones.html)

### git.transformer

- Type: `(timestamp: number, lang: string) => string`
- Default value: `` `${dayjs(timestamp).format('LL')} ${dayjs(timestamp).format('HH:mm')}` ``

Time conversion function for `@mr-hope/plugin-git`.

Will use dayjs to automatically localize according to the current page language by default.

Such as: `2020年5月8日 16:05` `May 8, 2020 16:05`

## pwa <Badge text="Enabled by default" />

Progressive Web App support

> If you don’t need this feature, please set to `false`.
>
> For more detail, see [pwa plugin documatation][pwa-config]

### pwa.manifest

- Type: `ManifestOption`
- Required: No

You can fill with an object which will be parsed to manifest.webmanifest.

::: tip

Some options have their fallback if you donot set them.

- name: `siteConfig.title` || `themeConfig.title` || `'Site'`
- short_name: `siteConfig.title` || `themeConfig.title` || `'Site'`
- description: `siteConfig.description` || `themeConfig.description` || `'A site built with vuepress-theme-hope'`
- lang: `siteConfig.locales['/'].lang` || `themeConfig.locales['/'].lang` || `"en-US"`
- start_url: `context.base`
- scope: `context.base`

- display: `"standalone"`
- theme_color: `"#46bd87"`
- background_color: `'#ffffff'`
- orientation: `'portrait-primary'`
- prefer_related_applications: `false`

:::

### pwa.showInstall

- Type: `boolean`
- Default: `true`

Whether display install button

### pwa.favicon

- Type: `string`
- Required: No

Path of favico.ico with absolute path.(We recommand you to set it for your site)

### pwa.themeColor

- 类型: `string`
- 默认值: `"#46bd87"`

Theme Color

### pwa.maxSize

- Type: `number`
- Default: `2048`

Max size which allows to cache, with KB unit

### pwa.cacheHTML

- Type: `boolean`
- Default: `true`

Whether cache HTML files besides home page and 404 page.

::: tip

This option is useful if your site is too large when containing HTML files.

:::

### pwa.cachePic

- Type: `boolean`
- Default: `false`

Whether cache pictures

> Any file ends with `.png`, `.jpg`, `.jpeg` , `.gif`, `.bmp`, `.webp` will be seen as picture files.

### pwa.maxPicSize

- Type: `number`
- Default: `1024`

Max picture size which allows to cache, with KB unit

### pwa.apple

Special settings for Apple

> If you don’t want to make detailed settings, you can safely ignore it; if you don’t want your site compatable with apple, please set it to `false`.

#### pwa.apple.icon

- Type: `string`
- Required: No

Fill in the icon address used by Apple, the recommended size is 152×152

#### pwa.apple.statusBarColor

- Type: `"black" | "white"`
- Default: `"black"`

Apple’s status bar color

#### pwa.apple.maskIcon

- Type: `string`
- Required: No

Safari mask icon

### pwa.msTile

Special settings for Microsoft tiles

> If you don’t want to make detailed settings, you can safely ignore it; if you don’t want your site compatable with windows, please set it to `false`.

#### pwa.msTile.image

- Type: `string`
- Required: No

Tile icon

### pwa.msTile.color

- Type: `string`
- Default value: `themeColor`

The tile color will automatically fall back to themeColor if you don’t set it.

### pwa.popupComponent

- Type: `string`
- Default: `'SWUpdatePopup'`

You can fill in the custom pop-up component path.

### pwa.generateSwConfig

Options passed to `workbox-build`, for details, see [Workbox documentation](https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-build#.generateSW)

::: tip

We will precache all site related files `**/*.{js,css,svg}` and font files `**/*.{woff,woff2,eot,ttf,otf}` for you.

If you set `cachePic` to `true`, we will also precache `**/*.{png,jpg,jpeg,gif,bmp,webp}` files for you.

All the files larger than `maxSize` or any pictures larger than `maxPicSize` will be dropped.

:::

## feed <Badge text="Enabled by default" />

Feed generation settings, no configuration is needed by default.

> For details, see [Feed plugin config][feed-config]
>
> If you don’t need this feature, please set to `false`.

## seo <Badge text="Enabled by default" />

SEO Enhance settings, no configuration is needed by default.

> For details, see [SEO plugin config][seo-config]
>
> If you don’t need this feature, please set to `false`.

## sitemap <Badge text="Enabled by default" />

Sitemap Generator settings, no configuration is needed by default.

> For details, see [Sitemap plugin config][sitemap-config]
>
> If you don’t need this feature, please set to `false`.

## addThis

- Type: `string`
- Required: No

Pubid for AddThis

> For details see [AddThis Plugin][add-this]

## copyCode

Options for copy code plugin, set to `false` to disable this plugin.

> By default no more configuration is needed, and for details see [Copy Code Plugin Config][copy-code]

## photoSwipe

Options for photo preview plugin, set to `false` to disable this plugin.

> By default no more configuration is needed, and for details see [PhotoSwipe Plugin Config][photo-swipe-config]

## activeHash

Options for activing hash in links automatically, set to `false` to disable this feature.

> By default no more configuration is needed, and for details see [Active Hash Plugin Config][active-hash-config]

## chunkRename

Options for renaming chunks, set to `false` to disable this feature.

### chunkRename.pageChunkName

- Type: `((page: Page) => string) | false`
- Default:

  ```ts
  ({ title = "", key }): string => {
    const chunkTitle = (title || "").replace(/[.&*?#\\/:"<>| ]/gu, "");

    return chunkTitle ? `page-${chunkTitle}` : `page-${key.slice(1)}`;
  };
  ```

- Required: No

Page Chunk Rename Option. By default, all page chunks will be named with page title.

### chunkRename.layoutChunkName

- Type: `((layout: ResolvedComponent) => string) | false`
- Default:

  ```ts
  (layout): string => `layout-${layout.componentName}`;
  ```

- Required: No

Layout Chunk Rename Option. By default, all the layout chunks will be named by their component name.

## cleanUrl

Options for cleaning URL suffix, set to `false` to disable this feature.

### cleanUrl.normalSuffix

- Type: `string`
- Default: `""`
- Required: No

Nornal Page suffix. This default behavior will generate `a/b.md` with `/a/b`.

### cleanUrl.indexSuffix

- Type: `string`
- Default: `"/"`
- Required: No

Page suffix for `index.md`, `readme.md` and `README.md`. This default behavior will generate `a/readme.md` with `/a/`.

### cleanUrl.notFoundPath

- Type: `string`
- Default: `"/404.html"`
- Required: No

Link for not found pages.

## smoothScroll

Delay to smooth scroll to hash, default is `500`.

> Set to `false` to disable this feature.

[active-hash-config]: https://vuepress-theme-hope.github.io/active-hash/#config
[add-this]: https://vuepress-theme-hope.github.io/add-this/
[comment-config]: https://vuepress-theme-hope.github.io/comment/config/
[copyright-config]: https://vuepress.github.io/en/plugins/copyright/
[md-enhance-config]: https://vuepress-theme-hope.github.io/md-enhance/config/
[copy-code]: https://vuepress-theme-hope.github.io/copy-code
[photo-swipe-config]: https://vuepress-theme-hope.github.io/photo-swipe/config/
[pwa-config]: https://vuepress-theme-hope.github.io/pwa/config/
[feed-config]: https://vuepress-theme-hope.github.io/feed/config/
[seo-config]: https://vuepress-theme-hope.github.io/seo/#plugin-options
[sitemap-config]: https://vuepress-theme-hope.github.io/sitemap/#plugin-options
