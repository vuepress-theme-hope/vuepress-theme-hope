---
title: 博主信息
icon: circle-info
order: 2
category:
  - 博客
tag:
  - 博客
  - 博主信息
---

主题允许你展示博主的基本信息。

<!-- more -->

![博主信息](./assets/blogger-info-light.png#light)
![博主信息](./assets/blogger-info-dark.png#dark)

## 头像和博主名称

你可以通过 `blog.avatar` 和 `blog.name` 自由配置博客页面中显示的的博主头像和姓名。

::: note

如果你没有填写它们，它们会自动回退到站点 Logo (主题选项中的 `logo`) 和 站点名称。

:::

::: tip

如果你希望头像被剪裁成圆形，请设置 `blog.roundAvatar: true`。

:::

## 座右铭、社交媒体与个人介绍页地址

你可以通过 `blog.description` 设置自己的一句话介绍、座右铭或口号。

你也可以通过 `blog.intro` 指定一个个人介绍页地址，点击头像与姓名时会自动进行跳转。

你还可以通过 `blog.medias` 这个对象配置你的社交媒体链接。

- 如果社交媒体已在下方列表中，你可以直接设置 `社交媒体名称: 社交媒体地址`。
- 否则，你应该传入一个元组 `社交媒体名称: [社交媒体地址, 社交媒体 SVG 图标字符串或路径]`

  元组的第二个元素应该是一个合法的 SVG 字符串或是一个完整的 SVG 文件路径。

:::: tip 可用的社交媒体:

::: tabs

@tab 社交

- `"CoolApk"`: 酷安
- `"Discord"`: Discord
- `"Douban"`: 豆瓣
- `"Facebook"`: 脸书
- `"Instagram"`: Instagram
- `"Kook"`: KOOK 语音
- `"Line"`: Line
- `"Messenger"`: Facebook Messenger
- `"QQ"`: QQ
- `"Qzone"`: QQ 空间
- `"Reddit"`: 红迪
- `"Skype"`: Skype
- `"SnapChat"`: 色拉布
- `"Soul"`: Soul
- `"Telegram"`: 电报
- `"Tieba"`: 百度贴吧
- `"Tumblr"`: 汤不热
- `"Twitter"`: 推特
- `"VK"`: VKontakte
- `"Wechat"`: 微信
- `"Weibo"`: 微博
- `"Whatsapp"`:瓦次艾普
- `"YY"`: 歪歪

@tab 办公

- `"Bitbucket"`: Bitbucket
- `"Dingding"`: 钉钉
- `"Dribbble"`: Dribbble
- `"Email"`: 邮件
- `"Evernote"`: 印象笔记
- `"Gitee"`: 码云
- `"GitHub"`: GitHub
- `"Gitlab"`: Gitlab
- `"Gmail"`: 谷歌邮箱
- `"KDocs"`: 金山文档
- `"Lark"`: 飞书
- `"Linkedin"`: 领英
- `"Pocket"`: Pocket
- `"QQDocs"`: 腾讯文档
- `"WechatWork"`: 微信企业版

@tab 聚合

- `"AFDian"`: 爱发电
- `"Baidu"`: 百度
- `"Bangumi"`: 番组计划
- `"DuiTang"`: 堆糖
- `"Flipboard"`: 红板报
- `"HuaBan"`: 花瓣
- `"Pinterest"`: 拼趣
- `"Pixiv"`: Pixiv
- `"Rss"`: RSS 地址
- `"WechatMP"`: 微信公众号
- `"XiaoHongShu"`: 小红书
- `"Zhihu"`: 知乎

@tab 音频

- `"163Music"`: 网易云音乐
- `"5Sing"`: 5sing
- `"Kugou"`: 酷狗音乐
- `"Kuwo"`: 酷我音乐
- `"QQMusic"`: QQ 音乐
- `"SoundCloud"`: 声云
- `"XiMaLaYa"`: 喜马拉雅

@tab 视频

- `"AcFun"`: ACFun
- `"BiliBili"`: 哔哩哔哩
- `"Douyin"`: 抖音
- `"Douyu"`: 斗鱼
- `"HuoShan"`: 抖音火山版
- `"HuYa"`: 虎牙
- `"iQiYi"`: 爱奇艺
- `"KuaiShou"`: 快手
- `"Nico"`: NicoNico动画
- `"QQVideo"`: 腾讯视频
- `"Twitch"`: Twitch
- `"WechatCh"`: 微信视频号
- `"Weishi"`: 微视
- `"Youku"`: 优酷
- `"Youtube"`: 油管

@tab 其他

- `"115"`: 115 网盘
- `"360Yun"`: 360云盘
- `"AliDrive"`: 阿里云盘
- `"AliPay"`: 支付宝
- `"BaiduDisk"`: 百度网盘
- `"BattleNET"`: 战网
- `"IdleFish"`: 闲鱼
- `"Paypal"`: 贝宝
- `"Steam"`: 蒸汽
- `"WechatPay"`: 微信支付

:::

(请不要好奇为什么这里一定要加上特别奇怪的中文翻译)

::::

:::: details 例子

::: code-tabs#language

@tab TS

```ts
// .vuepress/config.ts
import { getDirname, path } from "@vuepress/utils";
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

const __dirname = getDirname(import.meta.url);

export default defineUserConfig({
  theme: hopeTheme({
    blog: {
      medias: {
        // GitHub 已经内置了图标
        GitHub: "https://github.com/Mister-Hope",
        // 一个自定义媒体 MediaX (仅作示例)
        MediaX: [
          // 链接
          "https://mediax.com/UserX/",
          // 图标 SVG 字符串
          "<svg ....</svg>",
        ],
        // 一个自定义媒体 MediaY (仅作示例)
        MediaY: [
          // 链接
          "https://mediay.com/UserY/",
          // 图标地址
          path.resolve(__dirname, "icons/mediay.svg"),
        ],
      },
    },
  }),
});
```

@tab JS

```js
// .vuepress/config.js
import { getDirname, path } from "@vuepress/utils";
import { hopeTheme } from "vuepress-theme-hope";

const __dirname = getDirname(import.meta.url);

export default {
  theme: hopeTheme({
    blog: {
      medias: {
        // GitHub 已经内置了图标
        GitHub: "https://github.com/Mister-Hope",
        // 一个自定义媒体 MediaX (仅作示例)
        MediaX: [
          // 链接
          "https://mediax.com/UserX/",
          // 图标 SVG 字符串
          "<svg ....</svg>",
        ],
        // 一个自定义媒体 MediaY (仅作示例)
        MediaY: [
          // 链接
          "https://mediay.com/UserY/",
          // 图标地址
          path.resolve(__dirname, "icons/mediay.svg"),
        ],
      },
    },
  }),
};
```

:::

::::
