---
title: Theme Feature Config
icon: config
category:
  - config
tag:
  - config
  - themeConfig
---

These are config items of features provided by theme.

## Blog config

::: warning

This feature is built on [`vuepress-plugin-blog2`][blog2], and is disabled by default.

To enable blog plugin and use default options, you can set `themeConfig.plugins.blog` to `true`.

The following options will have NO effects unless you enable blog plugin.

For details, see [Blog Feature Intro](../../guide/blog/intro.md).

:::

### blog.name

- Type: `string`
- Required: No

Blogger name, default is name in `themeConfig.author`

### blog.avatar

- Type: `string`
- Required: No

Blogger avatar, default is `themeConfig.logo`

### blog.description

- Type: `string`
- Required: No

Motto, slogan or a short description.

### blog.intro

- Type: `string`
- Required: No

Personal introduction address of the blogger.

::: note

Visitors can click on the avatar or name in "Blogger Information" to enter the personal introduction page.

:::

### blog.medias

- Type: `Record<MediaType, string>`
- Required: No

Set social links.

::: tip Available social media:

The optional values of `MediaType` are as follows:

- `'Baidu'`: Baidu
- `'Bitbucket'`: Bitbucket
- `'Dingding'`: Dingding
- `'Discord'`: Discord
- `'Dribbble'`: Dribble
- `'Email'`: Email
- `'Evernote'`: Evernote
- `'Facebook'`: Facebook
- `'Flipboard'`: Flipboard
- `'Gitee'`: Gitee
- `'Github'`: GitHub
- `'Gitlab'`: Gitlab
- `'Gmail'`: Google mailbox
- `'Instagram'`: Instagram
- `'Line'`: Line
- `'Linkedin'`: LinkedIn
- `'Pinterest'`: Pinterest
- `'Pocket'`: Pocket
- `'QQ'`: QQ
- `'Qzone'`: Qzone
- `'Reddit'`: Reddit
- `'Rss'`: RSS address
- `'Steam'`: Steam
- `'Twitter'`: Twitter
- `'Wechat'`: WeChat
- `'Weibo'`: Weibo
- `'Whatsapp'`: Whatsapp
- `'Youtube'`: YouTube
- `'Zhihu'`: Zhihu

:::

### blog.roundAvatar

- Type: `boolean`
- Default: `false`

Whether cliping the avatar with round shape

### blog.sidebarDisplay

- Type: `'mobile' | 'none' | 'always'`
- Default: `'mobile'`

Whether to show blogger information in the sidebar

- `mobile`: Show in sidebar in mobile view
- `'always'`: Always show in the sidebar
- `'none'`: Never show in the sidebar

### blog.timeline

- Type: `string`
- Default: `'Yesterday once more'`

Text on the top of timeline page.

### blog.articlePerPage

- Type: `number`
- Default: `10`

Article number per page

### blog.articleInfo

- Type: `ArticleInfo[]`
- Default: `['Author', 'Original', 'Date', 'Category', 'Tag', 'ReadingTime']`

Article info displayed in article list

Available values for `ArticleInfo`:

- `"Author"`
- `"Category"`
- `"Date"`
- `"Original"`
- `"Tag"`
- `"ReadingTime"`
- `"Word"`

<!--

TODO: Provide this

### blog.autoExcerpt

- Type: `boolean`
- Default: `true`

Whether generate excerpt automatically for each article.
 -->

## Encrypt Config <Badge text="Root only" type="warning" />

::: note

You can only set this option in root of `themeConfig`.

:::

### encrypt.global

- Type: `boolean`
- Default: `false`

Whether to encrypt globally.

### encrypt.admin

- Type: `string | string []`
- Required: No

Admin password with highest authority, you can set multiple by using array.

### encrypt.config

- Type: `Record <string, string | string []>`
- Required: No

The encryption configuration is an object with a key name matching the path and a key-value corresponding to a password that accepts a string or an array of strings.

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

[blog2]: https://vuepress-theme-hope.github.io/v2/blog/
