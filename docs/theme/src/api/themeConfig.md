---
icon: api
category: api
tag: 
  - api
  - themeConfig
---

# 主题配置

除了查看本指南，您也可以直接查看源代码中的 [types 文件](https://github.com/Mister-Hope/vuepress-theme-hope/blob/master/packages/theme/typings/hopeConfig.d.ts) 或本文档的 [配置文件](https://github.com/Mister-Hope/vuepress-theme-hope/blob/master/docs/theme/src/.vuepress/config.js)。

::: warning
通过注入，vuepress-theme-hope 改变了默认主题一些配置的默认值。

虽然一般情况下，它们影响不大，但是还是需要着重提示这可能造成与默认文档预期不符的结果。

文档下方仔细的列出了所有配置项的改变。
:::

`.vuepress/config.js` 中的 themeConfig 字段(主题字段)新增以下配置：

## baseLang

- 类型: `String`
- 默认值: `'zh-CN'`

主目录所对应的语言

## author

- 类型: `String`
- 必填: 否

默认作者

## iconPrefix

- 类型: `String`
- 默认值: `'icon-'`

设置图标前缀

## nav <MyBadge text="改进" type="warn" />

NavBarItem 新增

- `icon` 字段来支持图标显示。
- `prefix` 字段来自动添加分组前缀

## sidebar <MyBadge text="改进" type="warn" />

SideBarItem 新增

- `icon` 字段来支持图标显示。
- `prefix` 字段来自动添加分组前缀

## sidebarIcon

- 类型: `Boolean`
- 默认值: `true`

是否在侧边栏显示图标

## breadcrumb

- 类型: `Boolean`
- 默认值: `true`

是否全局启用路径导航

## breadcrumbIcon

- 类型: `Boolean`
- 默认值: `true`

是否在路径导航显示图标

## footer

页脚设置选项

### footer.text

- 类型: `String`
- 默认值: `'MIT Licensed | Copyright © 2019-present Mr.Hope'`

页脚的默认文字

### footer.displayDefault

- 类型: `Boolean`
- 默认值: `false`

是否显示默认页脚

## smoothScroll <MyBadge text="改变默认值" type="error" />

- 类型: `Boolean`
- 默认值: `true`

是否启用平滑滚动功能

## backToTop

- 类型: `Boolean | Number`
- 默认值: `true`

返回顶部按钮的配置。默认的触发距离为 300px，填入数字时可改变这一触发距离。填入 `false` 会禁用返回顶部按钮。

## repoDisplay

- 类型: `Boolean`
- 默认值: `true`

是否在导航栏显示仓库链接

## themeColor

主题色和夜间模式设置选项

### themeColor.picker

- 类型: `Object`
- 默认值:

  ```js
  {
    blue: '#2196f3',
    red: '#f26d6d',
    green: '#3eaf7c',
    orange: '#fb9b5f'
  }
  ```

### themeColor.allowNightmode

- 类型: `Boolean`
- 默认值: `true`

是否开启夜间模式支持

## fullscreen

- 类型: `Boolean`
- 默认值: `true`

是否显示 ”全屏“ 按钮

## markdown

Markdown 增强配置

### markdown.enableAll

- 类型: `boolean`
- 默认值: `false`

启用全部功能。

### markdown.lineNumbers <MyBadge text="改变默认值" type="error" />

- 类型: `boolean`
- 默认值: `true`

是否在每个代码块的左侧显示行号

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

### markdown.mathjax

- 类型: `boolean`
- 默认值: `false`

是否启用 TeX 语法支持

### markdown.flowchart

- 类型: `boolean`
- 默认值: `false`

是否启用 流程图 语法支持

## comment

评论设置。具体详情请见　[@mr-hope/vuepress-plugin-comment](http://comment.mrhope.site/api/)

## pwa

PWA 设置选项

## encrypt

加密设置选项

### encrypt.global

- 类型: `string | string[]`
- 必填: 否

最高权限密码，可以以数组的形式设置多个

### encrypt.globalEncrypt

- 类型: `boolean`
- 默认值: `false`

是否全局加密

### encrypt.config

- 类型: `Record<string, string | string[]>`
- 必填: 否

加密配置，为一个对象，键名为匹配的路径，键值为对应的函数，接受字符串或字符串数组。

::: details 例子

```js
{
  // 这会加密整个 guide 目录，并且两个密码都是可用的
  "/guide/": ["1234", "5678"],
  // 这只会加密 api/page.html
  "/api/page.html": "1234"
}
```

:::
