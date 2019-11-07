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

## themeColor <MyBadge text="New" />

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

## markdown

Configure `themeConfig.markdown` in `.vuepress/config.js` to enable or disable some markdown plugins.

::: warning
`vuepress-theme-hope` injects some default markdown plugins. If you don't need them, you can disable them by configuring them below.
:::

### markdown.lineNumbers <MyBadge text="Change Default" type="error" /> <MyBadge text="V0.0.8+" />

- Type: `boolean`
- Default: true

Whether to display the line number to the left of each code block.

### markdown.sup <MyBadge text="New" /> <MyBadge text="V0.0.8+" />

- Type: `boolean`
- Default: true

Whether to enable the upper format support.

### markdown.sub <MyBadge text="New" /> <MyBadge text="V0.0.8+" />

- Type: `boolean`
- Default: true

Whether to enable the lower corner format support.

### markdown.footnote <MyBadge text="New" /> <MyBadge text="V0.0.8+" />

- Type: `boolean`
- Default: true

Whether to enable footnote format support.

### markdown.mathjax <MyBadge text="New" /> <MyBadge text="V0.0.8+" />

- Type: `boolean`
- Default: true

Whether to enable TeX syntax support.

### markdown.flowchart <MyBadge text="New" /> <MyBadge text="V0.0.9+" />

- Type: `boolean`
- Default: true

Whether to enable flowchart syntax support.

## valine <MyBadge text="New" />

Configure `themeConfig.valine` in `.vuepress/config.js` to enable comments and traffic.

::: tip
If you do not configure it, valine will not be enabled and no error will be triggered.
:::

### valine.appId

- Type: `String`
- Required: 是

Fill in the application appId in LeanCloud

### valine.appKey

- Type: `String`
- Required: true

Fill in the application appKey in LeanCloud

### valine.commet

- Type: `Boolean`
- Default: `true`

Comment Funtion

### valine.visitor

- Type: `Boolean`
- Default: `true`

Pageviews FUntion

### More Config about valine

See footnote[^configValine]

[^configValine]: **Valine Configuration**

    - **placeholder**

      - Type: `String`
      - Default: `'请留言'`

      Comment placeholder

    - **meta**

      - Type: `String[]`
      - Default: `['nick','mail','link']`

      Commenter's info

    - **avatar**

      - Type: `String`
      - Default: `'retro'`

      Gravatar avatar display method.

      ::: tip Optional Values

      - ''(Empty String): Gravatar　Offical Pic
      - mp: Mistery
      - identicon
      - monsterid
      - wavatar
      - retro
      - robohash
      - hide

      See [Valine Avator Config](https://valine.js.org/avatar.html) for details.
      :::

    - **verify**

      - Type: `Boolean`
      - Default: `flase`

      Verification code on comment submit

    - notify

      - Type: `Boolean`
      - Default: `true`

      Whether to send a message reply notification based on the left mailbox

      ::: tip
      When this option is set, the verification code function will be automatically turned on.
      :::

#### pageSize

- Type: `Number`
- Default: `10`

Number of comment per page

#### recordIP

- Type: `Boolean`
- Default: `false`

Whether to record the commenter IP
