---
title: Theme Feature Config
icon: config
category: config
tags:
  - config
  - themeConfig
---

These are config items of features provided by theme.

## darkmode <Badge text="Enabled by default" />

- Type: `'auto-switch' | 'switch' | 'auto' | 'disable'`
- Default: `'auto-switch'`

Dark mode support options:

- `'auto-switch'`: "off | automatic | on" three-stage switch
- `'switch'`: "Close | Open" toggle switch
- `'auto'`: Automatically decide whether to apply dark mode based on user device’s color-scheme or current time
- `'disable'`: disable dark mode

> If you don’t need this feature, set `darkmode: "disable"` to disable it.

## themeColor <Badge text="Enabled by default" />

Theme color configuration.

> If you don’t need this feature, set `themeColor: false` to disable it.

- Type: `Record<string, string>`
- Defaults:

  ```js
  {
    blue: '#2196f3',
    red: '#f26d6d',
    green: '#3eaf7c',
    orange: '#fb9b5f'
  }
  ```

## Blog configuration <Badge text="Enabled by default" />

Blog configuration.

> You can directly set `blog: false` to disable related functions.

### blog.name

- Type: `string`
- Required: No

Blogger name, default is `themeConfig.author`

### blog.avatar

- Type: `string`
- Required: No

Blogger avatar, default is `themeConfig.logo`

### blog.intro

- Type: `string`
- Required: No

Personal introduction address of the blogger.

After filling in, you will be allowed to click on the avatar or name in "Blogger Information" to enter the personal introduction page.

### blog.links

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
- `'Gmail'`: Google mailbox (you can also fill in your own other mailbox)
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
- Default: `true`

Whether cliping the avatar with round shape

### blog.sidebarDisplay

- Type: `'mobile' | 'none' | 'always'`
- Default: `'none'`

Whether to show blogger information in the sidebar

- `mobile`: Show in sidebar in mobile view
- `'always'`: Always show in the sidebar
- `'none'`: Never show in the sidebar

### blog.timeline

- Type: `string`
- Default: `'Yesterday once more'`

Text on the top of timeline page.

### blog.perPage

- Type: `number`
- Default: `10`

Article number per page

## Encryption settings

Encryption setting options

### encrypt.status

- Type: `"global" | "local"`
- Default value: `"local"`

Whether to encrypt globally

### encrypt.global

- Type: `string | string []`
- Required: No

Highest authority password, you can set multiple by using array

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

## Custom layout

The following options control the custom layout of the theme. You need to fill in the path of the Vue component.

You can fill in an absolute path or a relative path relative to the `.vuepress` folder.

### custom.pageTop

- Type: `string`
- Required: No

Page top slot

### custom.contentTop

- Type: `string`
- Required: No

Content top slot

### custom.contentBottom

- Type: `string`
- Required: No

Content bottom slot

### custom.pageBottom

- Type: `string`
- Required: No

Page bottom slot

### custom.navbarStart

- Type: `string`
- Required: No

Navbar start slot

### custom.navbarCenter

- Type: `string`
- Required: No

Navbar center slot

### custom.navbarEnd

- Type: `string`
- Required: No

Navbar end slot

### custom.sidebarTop

- Type: `string`
- Required: No

Sidebar top slot

### custom.sidebarCenter

- Type: `string`
- Required: No

Sidebar center slot

### custom.sidebarBottom

- Type: `string`
- Required: No

Sidebar bottom slot

## wordPerminute

- Type: `number`
- Default: `300`

Words reading per minute
