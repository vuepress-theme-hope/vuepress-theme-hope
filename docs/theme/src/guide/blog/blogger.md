---
title: Blogger Info
icon: circle-info
order: 2
category:
  - Blog
tag:
  - Blog
  - Blogger
---

Themes allow you to display basic information about the blogger.

<!-- more -->

![Blogger info](./assets/blogger-info-light.png#light)
![Blogger info](./assets/blogger-info-dark.png#dark)

## Avatar and blogger name

You can config blogger avatar and name displayed through `blog.avatar` and `blog.name`.

::: note

If you don't set those options, they automatically fall back to the site logo (`logo` in theme options) and site name.

:::

## Motto, Social Media & Profile Link

You can use `blog.description` to set your own introduction, motto or slogan.

You can also specify a personal introduction page link through `blog.intro`, so when users click on the avatar and name, they will be direct to that page.

You can also config your social media links with `blog.medias` option.

- If the social media icon is available below, you can set `MediaName: MediaLink` directly.
- Otherwise, you should pass in a tuple `MediaName: [MediaLink , MediaSvgIconString or MediaSvgIconPath]`,

  The second element in the tuple must be a valid SVG string or a full path of an existing SVG file.

:::: tip Available social media:

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

::: details Example

```ts twoslash title=".vuepress/theme.ts"
import { getDirname, path } from "vuepress/utils";
import { hopeTheme } from "vuepress-theme-hope";

const __dirname = getDirname(import.meta.url);

export default hopeTheme({
  blog: {
    medias: {
      // GitHub Icon is available
      GitHub: "https://github.com/Mister-Hope",
      // A custom Media called "MediaX" (just an example)
      MediaX: {
        // icon string
        icon: "<svg ....</svg>",
        // link
        link: "https://mediax.com/UserX/",
      },
      // A custom Media called "MediaY" (just an example)
      MediaY: {
        // icon path
        icon: "https://mediay.com/logo.svg",
        // link
        link: "https://mediay.com/UserY/",
      },
    },
  },
});
```

:::
