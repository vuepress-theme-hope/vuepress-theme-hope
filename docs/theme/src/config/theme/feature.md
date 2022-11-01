---
title: Theme Feature Options
icon: config
order: 3
category:
  - Config
tag:
  - Feature
  - Theme Config
---

The following options control features provided by theme.

<!-- more -->

## Blog Options

The theme adds blog feature using [`vuepress-plugin-blog2`][blog2], and the feature is **disabled** by default.

To enable blog plugin and use default options, you can set `plugins.blog` to `true` in theme options.

::: warning

The following options will have NO effects unless you enable blog plugin.

For details, see [Blog Feature Intro](../../guide/blog/intro.md).

:::

### blog.name

- Type: `string`
- Default: `author`

Blogger name.

### blog.avatar

- Type: `string`
- Default: `logo`

Blogger avatar.

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

- Type: `Record<string, string | [string, string]>`
- Required: No

Set social links.

- If the social media icon is available below, you can set `MediaName: MediaLink` directly.
- Otherwise, you should pass in a tuple `MediaName: [MediaLink , MediaSvgIconString or MediaSvgIconPath]`,

  The second element in the tuple must be a valid SVG string or a full path of a existing SVG file.

::: info Available Social Media

The following social medias has built-in icons:

- `"Baidu"`
- `"BiliBili"`
- `"Bitbucket"`
- `"Dingding"`
- `"Discord"`
- `"Dribbble"`
- `"Email"`
- `"Evernote"`
- `"Facebook"`
- `"Flipboard"`
- `"Gitee"`
- `"GitHub"`
- `"Gitlab"`
- `"Gmail"`
- `"Instagram"`
- `"Lark"`
- `"Line"`
- `"Linkedin"`
- `"Pinterest"`
- `"Pocket"`
- `"QQ"`
- `"Qzone"`
- `"Reddit"`
- `"Rss"`
- `"Steam"`
- `"Twitter"`
- `"Wechat"`
- `"Weibo"`
- `"Whatsapp"`
- `"Youtube"`
- `"Zhihu"`

:::

### blog.roundAvatar

- Type: `boolean`
- Default: `false`

Whether clipping the avatar with round shape

### blog.sidebarDisplay

- Type: `"mobile" | "none" | "always"`
- Default: `"mobile"`

Whether to show blogger information in the sidebar

- `"mobile"`: Show in sidebar in mobile view
- `"always"`: Always show in the sidebar
- `"none"`: Never show in the sidebar

### blog.timeline

- Type: `string`
- Default: `"Yesterday once more"`

Text on the top of timeline page.

### blog.articlePerPage

- Type: `number`
- Default: `10`

Article number per page

### blog.articleInfo

- Type: `ArticleInfo[]`
- Default: `["Author", "Original", "Date", "PageView", "Category", "Tag", "ReadingTime"]`

Article info displayed in article list

Available values for `ArticleInfo`:

- `"Author"`
- `"Category"`
- `"Date"`
- `"Original"`
- `"Tag"`
- `"ReadingTime"`
- `"Word"`

## Encrypt Config <Badge text="Root only" type="warning" />

For details, see [Encrypt Intro](../../guide/feature/encrypt.md).

::: note

You can only set this option directly under theme options, setting it in each locale **has NO effect**.

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
