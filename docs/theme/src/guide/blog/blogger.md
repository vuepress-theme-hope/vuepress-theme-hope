---
title: Blogger Info
icon: blog
category:
  - blog
tag:
  - blog
  - path
---

## Avatar and blogger name

You can config blogger avatar and name displayed through `blog.avatar` and `blog.name`.

::: note

If you don't set those options, they automatically fall back to the site logo (`themeConfig.logo`) and site name (`themeConfig.name`).

:::

::: tip

If you want the avatar to be clipped with round shape, set `blog.roundAvatar: true`.

:::

## Motto, Social Media & Profile Link

You can use `blog.description` to set your own introduction, motto or slogan.

You can also specify a personal introduction page link through `blog.intro`, so when users click on the avatar and name, they will be direct to that page.

You can also config your social media links with `blog.medias` option in the format `medianame: medialink` with an object.

::: tip Available social media:

- `'Baidu'`
- `'Bitbucket'`
- `'Dingding'`
- `'Discord'`
- `'Dribbble'`
- `'Email'`
- `'Evernote'`
- `'Facebook'`
- `'Flipboard'`
- `'Gitee'`
- `'Github'`
- `'Gitlab'`
- `'Gmail'`
- `'Instagram'`
- `'Line'`
- `'Linkedin'`
- `'Pinterest'`
- `'Pocket'`
- `'QQ'`
- `'Qzone'`
- `'Reddit'`
- `'Rss'`
- `'Steam'`
- `'Twitter'`
- `'Wechat'`
- `'Weibo'`
- `'Whatsapp'`
- `'Youtube'`
- `'Zhihu'`

:::

::: note

We are planning to rebuild this feature in furture verions so that:

- you can provide your own icons and use media you like
- Icons not used won't be injected.

:::
