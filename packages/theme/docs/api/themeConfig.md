# 主题配置

::: warning
通过注入，vuepress-theme-hope 改变了默认主题一些配置的默认值。

虽然一般情况下，它们影响不大，但是还是需要着重提示这可能造成与默认文档预期不符的结果。

文档下方仔细的列出了所有配置项的改变。
:::

`.vuepress/config.js` 中的 themeConfig 字段(主题字段)新增以下配置：

## iconPrefix <MyBadge text="新增" />

- 类型: `String`
- 默认值: `'icon-'`

设置图标前缀

## nav <MyBadge text="改进" type="warn" />

NavBarItem 新增 `icon` 字段来支持图标显示。

## smoothScroll <MyBadge text="默认配置改变" type="error" />

- 类型: `Boolean`
- 默认值: `true`

是否启用平滑滚动功能

## breadcrumb <MyBadge text="新增" />

- 类型: `Boolean`
- 默认值: `true`

是否全局启用路径导航

## breadcrumbIcon <MyBadge text="新增" />

- 类型: `Boolean`
- 默认值: `true`

是否在路径导航显示图标

## sidebarIcon <MyBadge text="新增" />

- 类型: `Boolean`
- 默认值: `true`

是否在侧边栏显示图标

## footer.text <MyBadge text="新增" />

- 类型: `String`
- 默认值: `'MIT Licensed | Copyright © 2019-present Mr.Hope'`

页脚的默认文字

## footer.displayDefault <MyBadge text="新增" />

- 类型: `Boolean`
- 默认值: `false`

是否显示默认页脚

## backToTop <MyBadge text="V0.0.14+" />

- 类型: `Boolean`
- 默认值: `true`

是否显示返回顶部按钮

## repoDisplay <MyBadge text="新增" />

- 类型: `Boolean`
- 默认值: `true`

是否在导航栏显示仓库链接

## themeColor <MyBadge text="新增" />

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

## fullscreen <MyBadge text="新增" />

- 类型: `Boolean`
- 默认值: `true`

是否显示 ”全屏“ 按钮

## markdown <MyBadge text="新增" />

Markdown 增强配置

## enableAll

- 类型: `boolean`
- 默认值: `false`

启用全部功能。

### markdown.lineNumbers <MyBadge text="默认配置改变" type="error" />

- 类型: `boolean`
- 默认值: `false`

是否在每个代码块的左侧显示行号。

### markdown.sup

- 类型: `boolean`
- 默认值: `false`

是否启用上角标格式支持。

### markdown.sub

- 类型: `boolean`
- 默认值: `false`

是否启用下角标格式支持。

### markdown.footnote

- 类型: `boolean`
- 默认值: `false`

是否启用脚注格式支持。

### markdown.mathjax

- 类型: `boolean`
- 默认值: `false`

是否启用 TeX 语法支持。

### markdown.flowchart

- 类型: `boolean`
- 默认值: `false`

是否启用 流程图 语法支持。

## comment <MyBadge text="新增" />

评论设置。具体详情请见　[@mr-hope/vuepress-plugin-comment](http://comment.mrhope.site/api/)
