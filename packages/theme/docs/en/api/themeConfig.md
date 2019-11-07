# Theme Config

::: danger W.I.P.
This theme is still being built, the API may contain rapid changes.

If you met a bug while using, you can open an issue [here](https://github.com/Mister-Hope/vuepress-theme-hope/issues)
:::

::: warning
By injecting, vuepress-theme-hope changes the default values of some configurations of the default theme.

Although in general, they have little effect, but they may led to a result that does not match the default document expectations.

The changes to all configuration items are carefully listed below the documentation.
:::

The following configuration has been added to the themeConfig field in `.vuepress/config.js`:

## iconPrefix <MyBadge text="New" />

- Type: `String`
- Default: `'icon-'`

Set Icon prefix

## nav <MyBadge text="Approve" type="warn" />

NavBarItem adds `icon` fileds to support icon display.

## smoothScroll <MyBadge text="Change Default" type="error" />

- 类型: `Boolean`
- 默认值: `true`

Whether to enable smooth scroll function

## breadcrumb <MyBadge text="New" />

- Type: `Boolean`
- Default: `true`

Whether to enable breadcrumb globally

## breadcrumbIcon <MyBadge text="New" />

- Type: `Boolean`
- Default: `true`

Whether to display the icon in the breadcrumb component

## sidebarIcon <MyBadge text="New" />

- Type: `Boolean`
- Default: `true`

Whether to display the icon in the sidebar

## footer.text <MyBadge text="New" />

- Type: `String`
- Default: `'MIT Licensed | Copyright © 2019-present Mr.Hope'`

Default text for footer

## footer.displayDefault <MyBadge text="New" />

- Type: `Boolean`
- Default: `false`

Whether to display the default footer

## backToTop <MyBadge text="V0.0.14+" />

- Type: `Boolean`
- Default: `true`

Whether to display the backToTop button

## repoDisplay <MyBadge text="New" />

- Type: `Boolean`
- Default: `true`

Whether to display the repo link in the navigation bar

## themeColor <MyBadge text="New" />

Theme Color and nightmode config.

### themeColor.picker

- Type: `Object`
- Default:

  ```js
  {
    blue: '#2196f3',
    red: '#f26d6d',
    green: '#3eaf7c',
    orange: '#fb9b5f'
  }
  ```

### themeColor.allowNightmode

- Type: `Boolean`
- Default: `true`

Whether to enable nightmode function

## fullscreen <MyBadge text="New" />

- Type: `Boolean`
- Default: `true`

Whether to display the "fullscreen" button

## markdown <MyBadge text="New" /

Markdown Enhancement Option

## markdown.enableAll

- Type: `boolean`
- Default: `false`

Whether to enable all the functions.

### markdown.lineNumbers <MyBadge text="Change Default" type="error" />

- Type: `boolean`
- Default: `false`

Whether to display the line number to the left of each code block.

### markdown.sup >

- Type: `boolean`
- Default: `false`

Whether to enable the upper format support.

### markdown.sub

- Type: `boolean`
- Default: `false`

Whether to enable the lower corner format support.

### markdown.footnote

- Type: `boolean`
- Default: `false`

Whether to enable footnote format support.

### markdown.mathjax

- Type: `boolean`
- Default: `false`

Whether to enable TeX syntax support.

### markdown.flowchart

- Type: `boolean`
- Default: `false`

Whether to enable flowchart syntax support.

## comment <MyBadge text="New" />

Commnet options.

For Details, see [@mr-hope/vuepress-plugin-comment](http://comment.mrhope.site/en/api/)
