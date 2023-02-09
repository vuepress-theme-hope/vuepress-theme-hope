---
title: 评论
icon: comment-dots
category:
  - 功能
tag:
  - 功能
  - 评论
---

通过内置 <ProjectLink name="comment2" path="/zh/">`vuepress-plugin-comment2`</ProjectLink>，`vuepress-theme-hope` 实现了评论功能。

::: info

`vuepress-theme-hope` 将主题选项中的 `plugins.comment` 作为插件选项提供给 `vuepress-plugin-comment2`。

:::

<!-- more -->

## 启用 <Badge text="支持页面配置" />

::: code-tabs#language

@tab TS

```ts {9,12}
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    plugins: {
      comment: {
        provider: "Waline",

        // waline 模式下
        serverURL: "...", // your serverURL
      },
    },
  }),
});
```

@tab JS

```js {8,11}
// .vuepress/config.js
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    plugins: {
      comment: {
        provider: "Waline",

        // waline 模式下
        serverURL: "...", // your serverURL
      },
    },
  }),
};
```

:::

评论功能默认全局启用，通过主题选项中的 `plugins.comment.comment` 控制。

::: info

受篇幅限制，完整的评论插件配置，详见 <ProjectLink name="comment2" path="/zh/">插件文档</ProjectLink>。

:::

## 评论服务

目前可以从 Giscus、Waline、Twikoo 和 Artalk 中选择。

::: tip 评论服务选择

- 如果你的博客或文档主要面向程序员，建议使用 Giscus。
- 如果你的博客或文档面向大众，建议使用 Waline。

:::

## Giscus

Giscus 是一个基于 GitHub Discussion 的评论系统，启用简便。

<!-- more -->

### 准备工作

1. 你需要创建一个公开仓库，并开启评论区，以作为评论存放的地点
1. 你需要安装 [Giscus App](https://github.com/apps/giscus)，使其有权限访问对应仓库。

在完成以上步骤后，请前往 [Giscus 页面](https://giscus.app/zh-CN) 获得你的设置。你只需要填写仓库和 Discussion 分类，之后滚动到页面下部的 “启用 giscus” 部分，复制 `data-repo`, `data-repo-id`, `data-category` 和 `data-category-id` 四项，因为它们是必须的。

### 配置

请将 `data-repo`, `data-repo-id`, `data-category` 和 `data-category-id` 作为插件选项传入 `repo`, `repoId`, `category` `categoryId`。

其他的配置项详见 <ProjectLink name="comment2" path="/zh/config/giscus.html">Giscus 配置</ProjectLink>。

## Waline

### 获取 APP ID 和 APP Key

请先 [登录](https://console.leancloud.app/login) 或 [注册](https://console.leancloud.app/register) `LeanCloud 国际版`, 进入 [控制台](https://console.leancloud.app/applist.html#/apps) 后点击左下角 [创建应用](https://console.leancloud.app/applist.html#/newapp)。创建应用后进入该应用，选择左下角的 `设置` > `应用Key`，然后记下 `APP ID`,`APP Key` 和 `Master Key`。

之后点击下方按钮，跳转至 Vercel 进行快速部署。

[![Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fwalinejs%2Fwaline%2Ftree%2Fmain%2Fexample)

按照要求输入 Vercel 项目名称与 GitHub 仓库名称。Vercel 会基于 waline 模板帮助你新建并初始化该仓库。仓库初始化完毕后，需要在 Environment Variables 中配置 `LEAN_ID`, `LEAN_KEY` 和 `LEAN_MASTER_KEY` 三个环境变量。它们的值分别对应上一步在 LeanCloud 中获得的 `APP ID`, `APP KEY`, `Master Key`。

设置好环境变量后，点击 `Deploy` 部署，一两分钟即可部署完成。之后在主题设置中设置 vercel 地址:

::: code-tabs#language

@tab TS

```ts
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    plugins: {
      comment: {
        provider: "Waline",
        serverURL: "YOUR_SERVER_URL", // your server url
      },
    },
  }),
});
```

@tab JS

```js
// .vuepress/config.js
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    plugins: {
      comment: {
        provider: "Waline",
        serverURL: "YOUR_SERVER_URL", // your server url
      },
    },
  }),
};
```

:::

Waline 评论的其他配置将在 <ProjectLink name="comment2" path="/zh/config/waline.html">Waline 配置</ProjectLink> 中列出。

::: tip

更多配置与使用，请见 [Waline 官方文档](https://waline.js.org)。

:::

## Twikoo

### Vercel 部署

[查看视频教程](https://www.bilibili.com/video/BV1Fh411e7ZH)

1. 申请 [MongoDB](https://www.mongodb.com/cloud/atlas/register) 账号
1. 创建免费 MongoDB 数据库，区域推荐选择 `AWS / N. Virginia (us-east-1)`
1. 在 Clusters 页面点击 CONNECT，按步骤设置允许所有 IP 地址的连接 ([为什么？](https://vercel.com/support/articles/how-to-allowlist-deployment-ip-address)) ，创建数据库用户，并记录数据库连接字符串，请将连接字符串中的 `<password>` 修改为数据库密码
1. 申请 [Vercel](https://vercel.com/signup) 账号
1. 点击以下按钮将 Twikoo 一键部署到 Vercel

   [![Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/imaegoo/twikoo/tree/dev/src/vercel-min)

1. 进入 Settings - Environment Variables，添加环境变量 `MONGODB_URI`，值为第 3 步的数据库连接字符串
1. 进入 Overview，点击 Domains 下方的链接，如果环境配置正确，可以看到 “Twikoo 云函数运行正常” 的提示
1. Vercel Domains (包含 `https://` 前缀，例如 `https://xxx.vercel.app`) 即为你的环境 ID

## Artalk

### 部署 Artalk 服务端

请参见 [Artalk 文档](https://artalk.js.org/guide/deploy.html)。

### Artalk 配置

请配置 `provider: "Artalk"` 并将你的服务端地址传入插件选项中的 `server`。

其他的配置项详见 [Artalk 配置](https://artalk.js.org/guide/frontend/config.html)。

::: note

插件保留 `el` 选项在页面自行插入 Artalk。同时插件会自动根据 VuePress 信息为你自动设置 `pageTitle`, `pageKey` 和 `site` 选项。

在 VuePress2 提供客户端配置前，暂不支持 `imgUploader` 和 `avatarURLBuilder` 这两个函数选项。

:::
