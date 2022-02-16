---
title: 博主信息
icon: blog
category:
  - blog
tag:
  - blog
  - path
---

## 头像和博主名称

你可以通过 `blog.avatar` 和 `blog.name` 自由配置博客页面中显示的的博主头像和姓名。

::: note

如果你没有填写它们，它们会自动回退到站点 Logo (`themeConfig.logo`) 和 站点名称 (`themeConfig.name`)。

:::

::: tip

如果你希望头像被剪裁成圆形，请设置 `blog.roundAvatar: true`。

:::

## 座右铭、社交媒体与个人介绍页地址

你可以通过 `blog.description` 设置自己的一句话介绍、左右民或口号。

你也可以通过 `blog.intro` 指定一个个人介绍页地址，点击头像与姓名时会自动进行跳转。

你还可以在 `blog.medias` 这个对象中以 `社交媒体名: 社交媒体链接` 的格式配置你的社交媒体链接。

::: tip 可用的社交媒体:

- `'Baidu'`: 百度
- `'Bitbucket'`: Bitbucket
- `'Dingding'`: 钉钉
- `'Discord'`: Discord
- `'Dribbble'`: Dribble
- `'Email'`: Email
- `'Evernote'`: 印象笔记
- `'Facebook'`: 脸书
- `'Flipboard'`: 红板报
- `'Gitee'`: Gitee
- `'Github'`: GitHub
- `'Gitlab'`: Gitlab
- `'Gmail'`: 谷歌邮箱(当然你也可以填入你自己的其他邮箱)
- `'Instagram'`: Instagram
- `'Line'`: Line
- `'Linkedin'`: 领英
- `'Pinterest'`: 拼趣
- `'Pocket'`: Pocket
- `'QQ'`: QQ
- `'Qzone'`: QQ 空间
- `'Reddit'`: Reddit
- `'Rss'`: RSS 地址
- `'Steam'`: Steam
- `'Twitter'`: Twitter
- `'Wechat'`: 微信
- `'Weibo'`: 微博
- `'Whatsapp'`: Whatsapp
- `'Youtube'`: YouTube
- `'Zhihu'`: 知乎

:::

::: note

我们计划在未来的版本中重建此功能，以便：

- 您可以提供自己的图标并使用您喜欢的媒体
- 未使用的图标不会被注入。

:::
