---
title: 主题插件配置
icon: config
category: config
tags:
  - config
  - plugin
  - themeConfig
---

这些是主题提供的插件配置选项。

::: tip

所有的配置键名均为插件名称的驼峰式 (camelcase) 版本。

例如: `@mr-hope/vuepress-copy-code` 的配置键名为 `copyCode`。

:::

## mdEnhance

Markdown 功能增强，详情请见 [vuepress-plugin-md-enhance 文档][md-enhance-config]

### mdEnhance.enableAll

- 类型: `boolean`
- 默认值: `false`

是否启用全部功能

::: danger

请仅将此选项用于体验或测试。随着时间的增长，`vupress-plugin-md-enhance` 变得越来越强大。它为 Markdown 解析器添加了更多语法，并输出了更多代码。

启用不需要的功能将增加开发和构建时间。 (`markdown-it` 必须检查额外的语法)

同样，幻灯片演示功能将在输出中添加 700KB 大小的代码 (主要是 `reveal.js`)。

因此，请使用下面的选项，仅启用你要使用的功能。

:::

### mdEnhance.lineNumbers <Badge text="改变默认值" type="error" />

- 类型: `boolean`
- 默认值: `true`

是否在每个代码块的左侧显示行号

### mdEnhance.imageFix

- 类型: `boolean`
- 默认值: `true`

是否修复包含特殊字符的图片的引用

### mdEnhance.align

- 类型: `boolean`
- 默认值: `false`

是否启用自定义对齐支持

### mdEnhance.sup

- 类型: `boolean`
- 默认值: `false`

是否启用上角标格式支持

### mdEnhance.sub

- 类型: `boolean`
- 默认值: `false`

是否启用下角标格式支持

### mdEnhance.footnote

- 类型: `boolean`
- 默认值: `false`

是否启用脚注格式支持

### mdEnhance.mark

- 类型: `boolean`
- 默认值: `false`

是否启用标记格式支持

### mdEnhance.tasklist

- 类型: `TaskListOptions | boolean`
- 默认值: `false`

是否启用任务列表格式支持。你可以传入一个对象作为任务列表的配置选项。

```ts
interface TaskListOptions {
  /**
   * 是否使用 `<label>` 来包裹文字
   *
   * @default true
   */
  label?: boolean;
  /**
   * 是否将 `<label>` 放置在 `<input>` 后还是包裹住 `<input>`
   *
   * @default true
   */
  labelAfter?: boolean;
}
```

### mdEnhance.tex

- 类型: `KatexOptions | boolean`
- 默认值: `false`

是否启用 $\TeX$ 语法支持。你可以传入一个对象作为 $\KaTeX$ 的配置选项。

## mdEnhance.mermaid

- 类型: `boolean`
- 默认值: `false`

是否启用 [Mermaid](https://mermaid-js.github.io/mermaid/#/) 支持。

### mdEnhance.flowchart

- 类型: `boolean`
- 默认值: `false`

是否启用 流程图 语法支持

### mdEnhance.demo

- 类型: `CodeDemoGlobalOptions | boolean`
- 默认值: `false`

是否启用代码案例支持。

#### mdEnhance.demo.jsLib

- 类型: `string[]`
- 必填: 否

CodePen, JsFiddle 需要引入的外部 JS 库。

#### mdEnhance.demo.cssLib

- 类型: `string[]`
- 必填: 否

CodePen, JsFiddle 需要引入的外部 CSS 库。

::: warning

上述两个选项仅仅是给第三方代码演示使用的，你需要自行在 `head` 中导入这些库。

:::

#### mdEnhance.demo.jsfiddle

- 类型: `boolean`
- 默认值: `true`

是否显示 JSFiddle 按钮，

#### mdEnhance.demo.codepen

- 类型: `boolean`
- 默认值: `true`

是否显示 CodePen 按钮，

#### mdEnhance.demo.codepenEditors

- Type: `string`
- Default value: `"101"`

CodePen 编辑器状态

#### mdEnhance.demo.editors

- 类型: `string`
- 默认值: `"101"`

CodePen 编辑器显示情况，第一位代表 HTML ，第二位代表 JS，第三位代表演示页面。

#### 其他

以下是第三方代码演示使用的库地址，除非你的环境无法访问 jsdelivr 或访问缓慢，否则无需覆盖默认设置。

##### mdEnhance.demo.babel

默认值: `"https://cdn.jsdelivr.net/npm/@babel/standalone/babel.min.js"`

##### mdEnhance.demo.vue

默认值: `"https://cdn.jsdelivr.net/npm/vue/dist/vue.min.js"`

##### mdEnhance.demo.react

默认值: `"https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js"`

##### mdEnhance.demo.reactDOM

默认值: `"https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.production.min.js"`

### mdEnhance.presentation

- 类型: `PresentationOptions | boolean`
- 默认值: `false`

是否启用 幻灯片 语法支持。

你可以传入一个对象，这个对象将用于 reveal.js 配置。

#### mdEnhance.presentation.plugins

- 类型: `string[]`
- 必填: No

你想启用的 Reveal.js 插件

可接受的插件有:

- `"highlight"`
- `"math"`
- `"search"`
- `"notes"`
- `"zoom"`

<!-- - `"anything"`
- `"audio"`
- `"chalkboard"` -->

#### mdEnhance.presentation.revealConfig

- 类型: `Partial<RevealOptions>`
- 必填: No

你想要传递给 Reveal.js 的配置选项

## comment

评论系统

配置因为复杂度在这里被省略，具体配置请见　[@mr-hope/vuepress-plugin-comment 文档][comment-config]

> 如果你不需要评论功能，忽略此选项即可

## copyright

处理你的 VuePress 站点中的复制操作

详细信息，请参见 [vuepress-plugin-copyright 文档](https://vuepress.github.io/zh/plugins/copyright/)

> 这是一个 vuepress 社区插件，而不是内置插件。因此，如果你遇到问题，请前往 [它的仓库](https://github.com/vuepress/vuepress-plugin-copyright) 寻求帮助。

::: warning

此插件不是默认启用的！

你可以设置 `themeConfig.copyright: true` 或设置 `themeConfig.copyright.status` 来启用它。

:::

### copyright.status

- 类型: `"global" | "local"`
- 默认值: `"global"`

是否全局启用该功能。

### copyright.minLength

- 类型: `number`
- 默认值: `100`

触发版权信息或禁止复制动作的最少字符数。

### copyright.noCopy

- 类型: `boolean`
- 默认值: `false`

是否禁止复制

### copyright.noSelect

- 类型: `boolean`
- 默认值: `false`

是否禁止选中文字

## git

### git.contributor

- 类型: `boolean`
- 默认值: `true`

是否生成贡献者信息。

### git.timezone

- 类型: `string`
- 必填: 否

当前时区，使用 CI 部署时很有用

> 详细的时区列表，详见 [时区列表](https://www.zeitverschiebung.net/cn/all-time-zones.html)

### git.transformer

- 类型: `(timestamp: number, lang: string) => string`
- 默认值: `` `${dayjs(timestamp).format('LL')} ${dayjs(timestamp).format('HH:mm')}` ``

`@mr-hope/plugin-git` 的时间转换函数。

默认情况下，会使用 dayjs 自动根据当前页面语言进行本地化。

如: `2020年5月8日 16:05` `May 8, 2020 16:05`

## pwa <Badge text="默认启用" />

渐进式网络应用程序支持

> 如果你不需要这个功能，请设置为 `false`。
>
> 有关更多详细信息，请参见 [pwa 插件文档][pwa-config]

### pwa.manifest

- 类型: `ManifestOption`
- 必填: 否

你可以填充一个将被解析为 manifest.webmanifest 的对象。

::: tip

如果你未设置某些选项，则这些选项会回退到插件预设值。

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

- 类型: `boolean`
- 默认值: `true`

是否显示安装按钮

### pwa.favicon

- 类型: `string`
- 必填: 否

填入 favicon 地址，(绝对路径)

::: tip

我们建议你为自己的站点生成 favicon。

:::

### pwa.themeColor

- 类型: `string`
- 默认值: `"#46bd87"`

主题色

### pwa.maxSize

- 类型: `number`
- 默认值: `2048`

允许缓存的最大大小 (以 KB 为单位)

### pwa.cacheHTML

- 类型: `boolean`
- 默认值: `true`

是否缓存主页和 404 错误页之外的 HTML 文件

::: tip

当你站点包含 HTML 文件后体积过大时很有用。

:::

### pwa.cachePic

- 类型: `boolean`
- 默认值: `false`

是否缓存图片

> 任何以 `.png`, `.jpg`, `.jpeg` , `.gif`, `.bmp`, `.webp` 结尾的文件都会视为图片。

### pwa.maxPicSize

- 类型: `number`
- 默认值: `1024`

图片允许缓存的最大大小 (以 KB 为单位)

### pwa.apple

针对苹果的特殊设置

> 如果你不想进行精细的设置，可以忽略它；如果你不想兼容 apple，请设置为 `false`。

#### pwa.apple.icon

- 类型: `string`
- 必填: 否

填入苹果使用的图标地址，推荐 152×152 大小

#### pwa.apple.statusBarColor

- 类型: `"black" | "white"`
- 默认: `"black"`

苹果的状态栏颜色

#### pwa.apple.maskIcon

- 类型: `string`
- 必填: 否

Safari 图标

### pwa.msTile

针对微软磁贴的特殊设置

> 如果你不想进行精细的设置，可以忽略它；如果你不想兼容 windows，请设置为 `false`。

#### pwa.msTile.image

- 类型: `string`
- 必填: 否

磁贴图标

#### pwa.msTile.color

- 类型: `string`
- 默认值: `themeColor`

磁贴颜色，缺省会自动回退到主题色。

### pwa.popupComponent

- 类型: `string`
- 默认值: `'SWUpdatePopup'`

可填入自定义的弹窗组件路径。

### pwa.generateSwConfig

传递给 `workbox-build` 的选项，具体详情，请见 [Workbox 文档](https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-build#.generateSW)

::: tip

我们将为你预缓存所有与网站相关的文件 `**/*.{js,css,svg}` 和字体文件 `**/*.{woff,woff2,eot,ttf,otf}`。

如果将 `cachePic` 设置为 `true`，我们还将为你预缓存 `**/*.{png,jpg,jpeg,gif,bmp,webp}` 文件。

所有大于 `maxSize` 的文件与所有大于 `maxPicSize` 的图片将被忽略。

:::

## feed <Badge text="默认启用" />

Feed 生成，默认情况下无需任何配置。

> 插件配置请参见 [Feed 插件配置][feed-config]
>
> 如果你不需要这个功能，请设置为 `false`。

## seo <Badge text="默认启用" />

搜索引擎增强，默认情况下无需任何配置。

> 插件配置请参见 [SEO 插件配置][seo-config]
>
> 如果你不需要这个功能，请设置为 `false`。

## sitemap <Badge text="默认启用" />

Sitemap 生成配置，默认情况下无需任何配置。

> 插件配置请参见 [Sitemap 插件配置][sitemap-config]
>
> 如果你不需要这个功能，请设置为 `false`。

## addThis

- 类型: `string`
- 必填: 否

AddThis 的 pubid

> 详情请见 [AddThis 插件][add-this]

## copyCode

复制代码插件的选项，设置为 `false` 以禁用此插件。

> 默认情况下，不需要任何配置
>
> 有关详细信息，请参见[复制代码插件配置][copy-code]

## photoSwipe

照片预览插件的选项，设置为 `false` 以禁用此插件。

> 默认情况下，不需要任何配置
>
> 有关详细信息，请参见 [PhotoSwipe 插件配置][photo-swipe-config]

## activeHash

自动激活链接中的 hash，设置为 `false` 以禁用此功能。

> 默认情况下，不需要任何配置
>
> 有关详细信息，请参见 [Active Hash 插件配置][active-hash-config]

## chunkRename

重命名块选项，设置为 `false` 以禁用此功能。

### chunkRename.pageChunkName

- 类型: `((page: Page) => string) | false`
- 默认值:

  ```ts
  ({ title = "", key }): string => {
    const chunkTitle = (title || "").replace(/[.&*?#\\/:"<>| ]/gu, "");

    return chunkTitle ? `page-${chunkTitle}` : `page-${key.slice(1)}`;
  };
  ```

- 必填: 否

页面块重命名选项。 默认情况下，所有页面块都将以页面标题命名。

### chunkRename.layoutChunkName

- 类型: `((layout: ResolvedComponent) => string) | false`
- 默认值:

  ```ts
  (layout): string => `layout-${layout.componentName}`;
  ```

- 必填: 否

布局块重命名选项。 默认情况下，所有布局块都将通过其组件名称来命名。

## cleanUrl

清除 URL 后缀选项，设置 `false` 以禁用此功能。

### cleanUrl.normalSuffix

- 类型: `string`
- 默认值: `""`
- 必填: 否

普通页面后缀。此默认行为将为 `/a/b.md` 生成 `/a/b`。

### cleanUrl.indexSuffix

- 类型: `string`
- 默认值: `"/"`
- 必填: 否

`index.md`，`readme.md` 和 `README.md` 的页面后缀。此默认行为将为 `a/readme.md` 生成 `/a/`。

### cleanUrl.notFoundPath

- 类型: `string`
- 默认值: `"/404.html"`
- 必填: 否

未找到页面的链接。

## smoothScroll

延迟一段时间之后平滑滚动到 hash，默认为 `500`。

> 设置为 `false` 以禁用此功能。

[active-hash-config]: https://vuepress-theme-hope.github.io/active-hash/zh/#配置
[add-this]: https://vuepress-theme-hope.github.io/add-this/zh/
[comment-config]: https://vuepress-theme-hope.github.io/comment/zh/config/
[copy-code]: https://vuepress-theme-hope.github.io/copy-code/zh/
[md-enhance-config]: https://vuepress-theme-hope.github.io/md-enhance/zh/config/
[photo-swipe-config]: https://vuepress-theme-hope.github.io/photo-swipe/zh/config/
[pwa-config]: https://vuepress-theme-hope.github.io/pwa/zh/config/
[feed-config]: https://vuepress-theme-hope.github.io/feed/zh/config/
[seo-config]: https://vuepress-theme-hope.github.io/seo/zh/#插件选项
[sitemap-config]: https://vuepress-theme-hope.github.io/sitemap/zh/#插件选项
