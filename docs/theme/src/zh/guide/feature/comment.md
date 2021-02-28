---
title: 评论
icon: commentfill
category: feature
tags:
  - comment
  - feature
---

通过内置 [`@mr-hope/vuepress-plugin-comment`](https://vuepress-theme-hope.github.io/comment/zh/)，`vuepress-theme-hope` 实现了评论功能。

<!-- more -->

## 启用 <Badge text="支持页面配置" />

```js {5,8,9}
// .vuepress/config.js
module.exports = {
  themeConfig: {
    comment: {
      type: "valine", // "valine" 或 "vssue"

      // valine 模式下
      appId: "...", // your appId
      appKey: "...", // your appKey
    },
  },
};
```

评论功能默认全局启用，配置项为 `comment`。

::: info

受篇幅限制，完整的评论插件配置，详见 [@mr-hope/vuepress-plugin-comment 插件文档](https://vuepress-theme-hope.github.io/comment)。

:::

## 评论服务

有两个评论插件可以选择: Valine 和 Vssue。

::: tip Valine 与 Vssue 的比较

- Valine 使用 leancloud，支持页面访问量统计，无需登录账号即可评论
- Vssue 使用代码平台仓库的 issue 面板，需要用户登录或注册相应平台账号。

如果你的站点面向大众而非程序员，推荐使用 Valine。

:::

## Valine

借助 Valine，主题实现了无后端开启阅读量展示与评论功能。

### 获取 APP ID 和 APP Key

请先 [登录](https://leancloud.cn/dashboard/login.html#/signin) 或 [注册](https://leancloud.cn/dashboard/login.html#/signup) LeanCloud, 进入控制台后点击左下角创建应用。

应用创建好以后，进入刚刚创建的应用，选择左下角的 `设置 > 应用Key`，然后就能看到你的 `APP ID` 和 `APP Key` 了。

```js
{
  type: 'valine',
  appId: '...', // your appId
  appKey: '...' // your appKey
}
```

将对应的 `APP ID` 和 `APP Key` 填入， Valine 即配置完成。

Valine 评论的其他配置将在 [配置](http://vuepress-theme-hope.github.io/comment/zh/config/valine/) 中列出。

::: tip

更多配置与使用，请见 [Valine 官方文档](https://valine.js.org)。

:::

## Vssue

### 选择你要使用的代码托管平台

Vssue 支持通过 GitHub, Gitlab, Bitbucket 或者 Gitee 的 Issue 系统来为你的静态页面提供评论功能，你可以选择其中之一来使用。

前往 [支持的代码托管平台 - 创建 OAuth App](http://vuepress-theme-hope.github.io/comment/zh/guide/supported-platforms/) 查看详细指引。

完成这一步之后，你将会配置好一个 OAuth App，并得到对应的 `client id` 和 `client secret`，它们将会用于 Vssue 的使用。

- `owner`: 对应 repository 的拥有者帐号或者团队
- `repo`: 用来存储评论的 repository
- `clientId`: OAuth App 的 `client id`
- `clientSecret`: OAuth App 的 `client secret` (只有在使用某些平台时需要)

### 使用插件

```js {5-15}
// .vuepress/config.js

module.exports = {
  plugins: {
    "@mr-hope/comment": {
      type: "vssue",
      // 设置 `platform` 而不是 `api`
      platform: "github",

      // 其他的 Vssue 配置
      owner: "OWNER_OF_REPO",
      repo: "NAME_OF_REPO",
      clientId: "YOUR_CLIENT_ID",
      clientSecret: "YOUR_CLIENT_SECRET",
    },
  },
};
```

::: tip

唯一的区别在于，你需要设置 `platform` 而不是对应的 `api` 包。

`@vssue/vuepress-plugin-vssue` 会自动根据你设置的 `platform` 为你解析对应的 API 包:

- Platform `github` - API 包 `@vssue/api-github-v3`
- Platform `github-v4` - API 包 `@vssue/api-github-v4`
- Platform `gitlab` - API 包 `@vssue/api-gitlab-v4`
- Platform `bitbucket` - API 包 `@vssue/api-bitbucket-v2`
- Platform `gitee` - API 包 `@vssue/api-gitee-v5`
- Platform `gitea` - API 包 `@vssue/api-gitea-v1`

:::
