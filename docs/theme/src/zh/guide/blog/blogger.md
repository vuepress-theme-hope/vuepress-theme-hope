---
title: 博主信息
icon: blog
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

::: tip 可用的社交媒体:

- `"Baidu"`: 百度
- `"Bitbucket"`: Bitbucket
- `"Dingding"`: 钉钉
- `"Discord"`: Discord
- `"Dribbble"`: Dribbble
- `"Email"`: 邮件
- `"Evernote"`: 印象笔记
- `"Facebook"`: 脸书
- `"Flipboard"`: 红板报
- `"Gitee"`: 码云
- `"GitHub"`: GitHub
- `"Gitlab"`: Gitlab
- `"Gmail"`: 谷歌邮箱
- `"Instagram"`: Instagram
- `"Line"`: Line
- `"Linkedin"`: 领英
- `"Pinterest"`: 拼趣
- `"Pocket"`: Pocket
- `"QQ"`: QQ
- `"Qzone"`: QQ 空间
- `"Reddit"`: 红迪
- `"Rss"`: RSS 地址
- `"Steam"`: 蒸汽
- `"Twitter"`: 推特
- `"Wechat"`: 微信
- `"Weibo"`: 微博
- `"Whatsapp"`:瓦次艾普
- `"Youtube"`: 油管
- `"Zhihu"`: 知乎

(请不要好奇为什么这里一定要加上特别奇怪的中文翻译)

:::

:::: details 例子

::: code-tabs#language

@tab TS

```ts
// .vuepress/config.ts
import { path } from "@vuepress/utils";
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    blog: {
      media: {
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
const { path } = require("@vuepress/utils");
const { hopeTheme } = require("vuepress-theme-hope");

module.exports = {
  theme: hopeTheme({
    blog: {
      media: {
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
