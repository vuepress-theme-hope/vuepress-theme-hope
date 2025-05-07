---
title: Theme Feature Options
icon: splotch
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

The theme adds blog feature using [`@vuepress/plugin-blog`][blog], and the feature is **disabled** by default.

To enable blog plugin and use default options, you can set `plugins.blog` to `true` in theme options.

::: warning

The following options will have NO effects unless you enable blog plugin.

For details, see [Blog Feature Intro](../../guide/blog/intro.md).

:::

### blog\.name

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

- Type: `Record<string, string | { icon: string ; link: string }>`
- Required: No

Set social links.

- If the social media icon is available below, you can set `MediaName: MediaLink` directly.
- Otherwise, you should pass in a object `MediaName: { icon: MediaSvgIconString or MediaUrl MediaLink, link: MediaLink }`,

:::: info Available Social Media

The following social medias has built-in icons:

::: tabs

@tab Social

- `"CoolApk"`
- `"Discord"`
- `"Douban"`
- `"Facebook"`
- `"Instagram"`
- `"Kook"`
- `"Line"`
- `"Messenger"`
- `"QQ"`
- `"Qzone"`
- `"Reddit"`
- `"Skype"`
- `"SnapChat"`
- `"Soul"`
- `"Telegram"`
- `"Tieba"`
- `"Tumblr"`
- `"Twitter"`
- `"VK"`
- `"Wechat"`
- `"Weibo"`
- `"Whatsapp"`
- `"YY"`

@tab Work

- `"Bitbucket"`
- `"Dingding"`
- `"Dribbble"`
- `"Email"`
- `"Evernote"`
- `"Gitee"`
- `"GitHub"`
- `"Gitlab"`
- `"Gmail"`
- `"KDocs"`
- `"Lark"`
- `"Linkedin"`
- `"Pocket"`
- `"QQDocs"`
- `"WechatWork"`

@tab Integrate

- `"AFDian"`
- `"Baidu"`
- `"Bangumi"`
- `"DuiTang"`
- `"Flipboard"`
- `"HuaBan"`
- `"Pinterest"`
- `"Pixiv"`
- `"Rss"`
- `"WechatMP"`
- `"XiaoHongShu"`
- `"Zhihu"`

@tab Music

- `"163Music"`
- `"5Sing"`
- `"Kugou"`
- `"Kuwo"`
- `"QQMusic"`
- `"SoundCloud"`
- `"XiMaLaYa"`

@tab Video

- `"AcFun"`
- `"BiliBili"`
- `"Douyin"`
- `"Douyu"`
- `"HuoShan"`
- `"HuYa"`
- `"iQiYi"`
- `"KuaiShou"`
- `"Nico"`
- `"QQVideo"`
- `"Twitch"`
- `"WechatCh"`
- `"Weishi"`
- `"Youku"`
- `"Youtube"`

@tab Other

- `"115"`
- `"360Yun"`
- `"AliDrive"`
- `"AliPay"`
- `"BaiduDisk"`
- `"BattleNET"`
- `"IdleFish"`
- `"Paypal"`
- `"Steam"`
- `"WechatPay"`

:::

::::

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

::: warning Limitation

ReadingTime and Word are not available in devServer by default, [see reasons and how to enable it](./basic.md#hotreload).

:::

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

- Type: `PasswordOptions`

  ```ts
  type PasswordOptions =
    | string
    | string[]
    | {
        password: string | string[];
        hint: string;
      };
  ```

- Required: No

Admin password with the highest authority, you can set multiple ones by using array, or adding hint with object format.

### encrypt.config

- Type: `Record<string, PasswordOptions>`

  ```ts
  type PasswordOptions =
    | string
    | string[]
    | {
        password: string | string[];
        hint: string;
      };
  ```

- Required: No

The encryption configuration is an object with a key name matching the path and a key-value corresponding to a password that accepts a string or an array of strings, or adding hint with object format.

::: details Example

```json
{
  // This will encrypt the entire guide directory and both passwords will be available
  "/guide/": ["1234", "5678"],
  // this will only encrypt /config/page.html
  "/config/page.html": {
    "password": "Mister-Hope",
    "hint": "The password is author's name"
  }
}
```

:::

[blog]: https://ecosystem.vuejs.press/plugins/blog/blog/
