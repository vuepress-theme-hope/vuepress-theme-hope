---
icon: configuration
category: config
tags:
  - config
  - themeConfig
---

# 主题配置

除了查看本指南，你也可以直接查看源代码中的 [types 文件](https://github.com/Mister-Hope/vuepress-theme-hope/blob/master/packages/theme/types/hopeConfig.d.ts) 或本文档的 [配置文件](https://github.com/Mister-Hope/vuepress-theme-hope/blob/master/docs/theme/src/.vuepress/config.js)。

::: warning
通过注入，vuepress-theme-hope 改变了默认主题一些配置的默认值。

虽然一般情况下，它们影响不大，但是还是需要着重提示这可能造成与默认文档预期不符的结果。

文档下方仔细的列出了所有配置项的改变。
:::

`.vuepress/config.js` 中的 themeConfig 字段(主题字段)新增以下配置：

## 基本选项

这些选项需要你正确配置。

### baseLang

- 类型: `string`
- 默认值: `'zh-CN'`

主目录所对应的语言。

这个选项会保证主目录页面中主题文字使用正确的语言显示。你可以根据自己的需要将其改为其他语言。

::: tip
目前多语言仅适配了 **简体中文** (zh-CN) 与 **英文(美国)** (en-US)。

如果你需要其它语言的多语言支持，你可以 [向此文件提交一个 PR](https://github.com/Mister-Hope/vuepress-theme-hope/blob/master/packages/shared-utils/src/i18n/config.ts)
:::

### author

- 类型: `string`
- 必填: 否

文章显示的默认作者

### nav <MyBadge text="改进" type="warn" />

NavBarItem 新增

- `icon` 字段来支持图标显示。
- `prefix` 字段来自动添加分组前缀

具体配置，请见 [布局 → 导航栏](../guide/layout/navbar.md)

### sidebar <MyBadge text="改进" type="warn" />

SideBarItem 新增

- `icon` 字段来支持图标显示。
- `prefix` 字段来自动添加分组前缀

具体配置，请见 [布局 → 侧边栏](../guide/layout/sidebar.md)

### locales

- 类型: `Record<string, HopeLangI18nConfigItem>`

主题的多语言配置，主要需要配置各语言的 `nav` 与 `sidebar`。

## 默认主题配置

以下这些配置沿用了 `@vuepress/theme-default` 的配置项，你无需进行改动:

### logo <MyBadge text="改进" type="warn" />

- 类型: `string`
- 必填: 否

导航栏的 logo 图片，需填入绝对路径并放入 `.vuepress/public` 文件夹。

如果你希望在深色模式下显示另一个 logo，请配置 `themeConfig.darkLogo` 选项。

### sidebarDepth

- 类型: `number`
- 默认值: `2`

侧边栏嵌套的标题深度

### displayAllHeaders

- 类型: `boolean`
- 默认值: `false`

是否显示所有页面的标题链接

### activeHeaderLinks

- 类型: `boolean`
- 默认值: `true`

是否自动更新嵌套的标题链接和 URL 中的 Hash 值

### search

- 类型: `boolean`
- 默认值: `true`

是否启用默认的搜索框

### searchMaxSuggestions

- 类型: `number`
- 默认值: `10`

默认搜索框显示的搜索结果数量

### algolia

- 类型: `AlgoliaOption`
- 必填: 否

Algolia 搜索配置，你需要至少提供 `apiKey` 和 `indexName`。具体详见 [Doc Search 文档](https://github.com/algolia/docsearch#docsearch-options)。你也可以为每个语言配置 algolia。

### nextLinks

- 类型: `boolean`
- 默认值: `true`

所有页面的 下一篇 链接

### prevLinks

- 类型: `boolean`
- 默认值: `true`

所有页面的 上一篇 链接

### repo

- 类型: `string`
- 必填: 否

项目仓库地址

### repoLabel

- 类型: `string`
- 必填: 否

仓库标签文字，会自动解析 `repo` 选项，尝试推导出 `'GitHub'` `'GitLab'` `'Bitbucket'`，如果未能识别，显示为 `'Source'`。

### docsRepo

- 类型: `string`
- 必填: 否

文档所属仓库，默认同 `repo`。

### docsDir

- 类型: `string`
- 必填: 否

文档所属文件夹，默认为仓库根目录。

### docsBranch

- 类型: `string`
- 默认值: `'master'`

文档所属分支

### editLinks <MyBadge text="改变默认值" type="error" />

- 类型: `boolean`
- 默认值: `true`

显示编辑本页链接

## 主题色与深色模式 <MyBadge text="默认启用" />

主题色和深色模式设置选项配置。

### darkmode

- 类型: `'auto-switch' | 'switch' | 'auto' | 'disable'`
- 默认值: `'auto-switch'`

深色模式支持选项:

- `'auto-switch'`: "关闭 | 自动 | 打开" 的三段式开关
- `'switch'`: "关闭 | 打开" 的切换式开关
- `'auto'`: 自动根据用户设备主题或当前时间决定是否应用深色模式
- `'disable'`: 禁用深色模式

> 如果你不需要这项功能，请设置 `darkmode: "disable"` 将其禁用。

### themeColor

主题色选项配置。

> 如果你不需要这项功能，请设置 `themeColor: false` 将其禁用。

- 类型: `Record<string, string>`
- 默认值:

  ```js
  {
    blue: '#2196f3',
    red: '#f26d6d',
    green: '#3eaf7c',
    orange: '#fb9b5f'
  }
  ```

## 博客配置 <MyBadge text="默认启用" />

博客配置。

> 如果您不需要博客相关功能，为了加快构建速度，请设置 `blog: false`。

### blog.blogger

- 类型: `string`
- 必填: 否

博主姓名，默认为 `themeConfig.author`

### blog.avatar

- 类型: `string`
- 必填: 否

博主头像，默认为 `themeConfig.logo`

### blog.sidebarDisplay

- 类型: `'mobile' | 'none' | 'always'`
- 默认值: `'none'`

是否在侧边栏展示博主信息

- `mobile`: 在移动视图中显示在侧边栏中
- `'always'`: 总是展示在侧边栏中
- `'none'`: 永远不在侧边栏展示

### blog.intro

- 类型: `string`
- 必填: 否

博主的个人介绍地址。

填写后将允许点击“博主信息”中的头像或姓名进入个人介绍页。

### blog.timeline

- 类型: `string`
- 默认值: `'昨日不在'`

时间轴的顶部文字。

## pwa <MyBadge text="默认启用" />

PWA 设置选项。

> 如果您不需要这个功能，请设置为 `false`。

### pwa.popupComponent

- Type: `string`
- Required: No

用于替换默认弹出组件的自定义组件。

### pwa.gerateSWConfig

workbox-build 的 [generateSW 配置](https://developers.google.com/web/tools/workbox/modules/workbox-build#full_generatesw_config)

## pageInfo

- 类型: `string[] | false`
- 默认值: `['Author', 'Visitor', 'Time', 'Category', 'Tag', 'ReadTime']`

文章信息，可以填入数组，数组的顺序是各条目显示的顺序。填入 `false` 使其被禁用。

可以填入的条目如下：

- `'Author'`: 作者
- `'Time'`: 写作日期
- `'Category'`: 分类
- `'Tag'`: 标签
- `'ReadTime'`: 预计阅读时间
- `'Word'`: 字数
- `'Visitor'`: 访问量

## SEO <MyBadge text="默认启用" />

> 如果您不需要这个功能，请设置为 `false`。

### seo.twitterID

- 类型: `string`
- 必填: 否

填入你的 twitter 用户名

### seo.restrictions

- 类型: `string`
- 必填: 否

内容的年龄分级，格式为 `[int]+`，如 `'13+'`

### seo.seo

- 类型: `(info: PageSeoInfo) => Record<string, string>`

你可以使用此选项来注入新的或覆盖掉默认生成的 SEO，详情请见 [插件配置](plugin/seo.md#seo)。

### seo.customMeta

- 类型: `(meta: Meta, info: PageSeoInfo) => void`

你可以使用此选项来直接向 Meta 中注入内容。详情请见 [插件配置](plugin/seo.md#customMeta)。

## Sitemap <MyBadge text="默认启用" />

> 如果您不需要这个功能，请设置为 `false`。

### sitemap.hostname

- 类型: `string`
- 必填: 是

当前网站部署到的域名，请至少将其传入或设置 `themeConfig.hostname`，否则插件将无法工作。

### sitemap.urls

- 类型: `string[]`
- 必填: 否

需要额外包含的网址

### sitemap.exclude

- 类型: `string[]`
- 必填: 否

不被收录的页面

### sitemap.outFile

- 类型: `string`
- 默认值: `"sitemap.xml"`

输出的文件名

### sitemap.changefreq

- 类型: `"always"|"hourly"|"daily"|"weekly"|"monthly"|"yearly"|"never"`
- 默认值: `"daily"`

页面默认更新频率

### sitemap.dateFormatter

- 类型: `($page: PageComputed) => string`
- 必填: 否

时间格式化器。默认会自动生成时间戳，如果你遇到了时区问题，请设置这个选项。

### sitemap

## Markdown 增强

### markdown.enableAll

- 类型: `boolean`
- 默认值: `false`

是否启用全部功能

### markdown.lineNumbers <MyBadge text="改变默认值" type="error" />

- 类型: `boolean`
- 默认值: `true`

是否在每个代码块的左侧显示行号

### markdown.align

- 类型: `boolean`
- 默认值: `false`

是否启用自定义对齐支持

### markdown.sup

- 类型: `boolean`
- 默认值: `false`

是否启用上角标格式支持

### markdown.sub

- 类型: `boolean`
- 默认值: `false`

是否启用下角标格式支持

### markdown.footnote

- 类型: `boolean`
- 默认值: `false`

是否启用脚注格式支持

### markdown.mark

- 类型: `boolean`
- 默认值: `false`

是否启用标记格式支持

### markdown.tex

- 类型: `boolean`
- 默认值: `false`

是否启用 TeX 语法支持

### markdown.flowchart

- 类型: `boolean`
- 默认值: `false`

是否启用 流程图 语法支持

## 评论设置

具体配配置请见　[@mr-hope/vuepress-plugin-comment 文档](http://comment.mrhope.site/config/)

可以直接设置为 `false` 来禁用评论功能

## 页脚设置

### footer.content

- 类型: `string`
- 必填: 否

页脚的默认内容，可输入 HTMLString。

### footer.copyright

- 类型: `string | boolean`
- 默认值: `'Copyright © <作者>'`

默认的版权信息，设置为 `false` 来默认禁用它。

### footer.display

- 类型: `boolean`
- 默认值: `false`

是否默认显示页脚

## 版权设置

### copyright.status

- 类型: `"global" | "local"`
- 必填: 是

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

## 加密设置

加密设置选项。

### encrypt.status

- 类型: `"global" | "local"`
- 默认值: `"local"`

是否全局加密

### encrypt.global

- 类型: `string | string[]`
- 必填: 否

最高权限密码，可以以数组的形式设置多个

### encrypt.config

- 类型: `Record<string, string | string[]>`
- 必填: 否

加密配置，为一个对象，键名为匹配的路径，键值为对应的密码，接受字符串或字符串数组。

::: details 例子

```js
{
  // 这会加密整个 guide 目录，并且两个密码都是可用的
  "/guide/": ["1234", "5678"],
  // 这只会加密 config/page.html
  "/config/page.html": "1234"
}
```

:::

## 其他配置选项

以下是主题提供的其他配置选项，一般情况下你无需改动他们，但是主题也向你提供了更多有关主题的配置项。

### iconPrefix

- 类型: `string`
- 默认值: `'icon-'`

设置 iconfont 的图标前缀

### sidebarIcon

- 类型: `boolean`
- 默认值: `true`

是否在侧边栏显示图标

### breadcrumb

- 类型: `boolean`
- 默认值: `true`

是否全局启用路径导航

### breadcrumbIcon

- 类型: `boolean`
- 默认值: `true`

是否在路径导航显示图标

### wordPerminute

- 类型: `number`
- 默认值: `300`

每分钟的阅读字数

### smoothScroll <MyBadge text="改变默认值" type="error" />

- 类型: `boolean`
- 默认值: `true`

是否启用平滑滚动功能

### photoSwipe

- 类型: `boolean`
- 默认值: `true`

是否启用图片预览功能

### backToTop

- 类型: `boolean | Number`
- 默认值: `true`

返回顶部按钮的配置。默认的触发距离为 300px，填入数字时可改变这一触发距离。填入 `false` 会禁用返回顶部按钮。

### repoDisplay

- 类型: `boolean`
- 默认值: `true`

是否在导航栏显示仓库链接

### fullscreen

- 类型: `boolean`
- 默认值: `true`

是否显示 ”全屏“ 按钮
