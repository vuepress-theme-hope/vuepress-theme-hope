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

## themePicker <MyBadge text="新增" />

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

## fullscreen <MyBadge text="新增" />

- 类型: `Boolean`
- 默认值: `true`

是否显示 ”全屏“ 按钮

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

## markdown

在`.vuepress/config.js` 中配置 `themeConfig.markdown` 即可启用或禁用一些 markdown 插件。

::: warning
vuepress-theme-hope 注入了一些默认的 markdown插件，如果不需要这些插件，可以通过下方配置禁用它们。
:::

### markdown.lineNumbers <MyBadge text="默认配置改变" type="error" /> <MyBadge text="V0.0.8+" />

- 类型: `boolean`
- 默认值: true

是否在每个代码块的左侧显示行号。

### markdown.sup <MyBadge text="新增" /> <MyBadge text="V0.0.8+" />

- 类型: `boolean`
- 默认值: true

是否启用上角标格式支持。

### markdown.sub <MyBadge text="新增" /> <MyBadge text="V0.0.8+" />

- 类型: `boolean`
- 默认值: true

是否启用下角标格式支持。

### markdown.footnote <MyBadge text="新增" /> <MyBadge text="V0.0.8+" />

- 类型: `boolean`
- 默认值: true

是否启用脚注格式支持。

### markdown.mathjax <MyBadge text="新增" /> <MyBadge text="V0.0.8+" />

- 类型: `boolean`
- 默认值: true

是否启用 TeX 语法支持。

### markdown.flowchart <MyBadge text="新增" /> <MyBadge text="V0.0.9+" />

- 类型: `boolean`
- 默认值: true

是否启用 流程图 语法支持。

## valine <MyBadge text="新增" />

在`.vuepress/config.js` 中配置 `themeConfig.valine` 即可启用评论与访问量功能。

::: tip
如果不进行配置则不会启用相应功能，不会报错。
:::

### valine.appId

- 类型: `String`
- 必填: 是

填入 LeanCloud 中应用的 APP ID

### valine.appKey

- 类型: `String`
- 必填: 是

填入 LeanCloud 中应用的 APP Key

### valine.commet

- 类型: `Boolean`
- 默认值: `true`

留言功能

### valine.visitor

- 类型: `Boolean`
- 默认值: `true`

文章访问量统计功能

### 更多 Valine配置项

详见脚注[^configValine]

[^configValine]: **Valine配置选项**

    - **placeholder**

      - 类型: `String`
      - 默认值: `'请留言'`

      评论框的 placeholder

    - **meta**

      - 类型: `String[]`
      - 默认值: `['nick','mail','link']`

    评论者相关属性

    - **avatar**

      - 类型: `String`
      - 默认值: `'retro'`

      Gravatar 头像展示方式。

      ::: tip 可选值

      - ''(空字符串): Gravatar官方图形
      - mp: 神秘人(一个灰白头像)
      - identicon: 抽象几何图形
      - monsterid: 小怪物
      - wavatar
      - retro
      - robohash
      - hide

      具体相关说明详见 [Valine 头像配置](https://valine.js.org/avatar.html)
      :::

    - **verify**

      - 类型: `Boolean`
      - 默认值: `flase`

      评论提交验证码功能

    - notify

      - 类型: `Boolean`
      - 默认值: `true`

      是否依据留下的邮箱发出留言回复通知。

      ::: tip
      设置此选项后会自动开启验证码功能，即 `valine.verify` 失效。
      :::

#### pageSize

- 类型: `Number`
- 默认值: `10`

评论列表分页，每页条数

#### recordIP

- 类型: `Boolean`
- 默认值: `false`

是否记录评论者IP
