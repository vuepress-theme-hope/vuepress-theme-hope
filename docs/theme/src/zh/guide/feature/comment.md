---
title: 评论
icon: comment
category:
  - 功能
tag:
  - 功能
  - 评论
---

通过内置 [`vuepress-plugin-comment2`][comment2]，`vuepress-theme-hope` 实现了评论功能。

::: info

`vuepress-theme-hope` 将 `themeConfig.plugins` 中的 `comment` 选项作为插件选项提供给 `vuepress-plugin-comment2`。

:::

<!-- more -->

## 启用 <Badge text="支持页面配置" />

:::: code-group

::: code-group-item TS

```ts {7,10}
// .vuepress/config.ts
import { defineHopeConfig } from "vuepress-theme-hope";

export default defineHopeConfig({
  themeConfig: {
    plugins: {
      comment: {
        type: "waline",

        // waline 模式下
        serverURL: "...", // your serverURL
      },
    },
  },
});
```

:::

::: code-group-item JS

```js {7,10}
// .vuepress/themeConfig.js
const { themeConfig } = require("vuepress-theme-hope");

module.exports = themeConfig({
  themeConfig: {
    plugins: {
      comment: {
        type: "waline",

        // waline 模式下
        serverURL: "...", // your serverURL
      },
    },
  },
});
```

:::

::::

评论功能默认全局启用，配置项为 `themeConfig.plugins.comment` 中的 `comment`。

::: info

受篇幅限制，完整的评论插件配置，详见 [插件文档][comment2]。

:::

## 评论服务

目前只有 Waline 服务可以选择。

<!-- 有两个服务: Waline 和 Vssue -->

<!-- ::: tip 评论服务的比较

- Waline 需要后端服务器以及额外的配置，支持页面访问量统计，无需登录账号即可评论。可以使用 Vercel。
- Vssue 使用代码平台仓库的 issue 面板，需要用户登录或注册相应平台账号。

如果你的站点面向大众而非程序员，推荐使用 Waline。

::: -->

## Waline

### 获取 APP ID 和 APP Key

请先 [登录](https://console.leancloud.app/login.html#/signin) 或 [注册](https://console.leancloud.app/login.html#/signup) `LeanCloud 国际版`, 进入 [控制台](https://console.leancloud.app/applist.html#/apps) 后点击左下角 [创建应用](https://console.leancloud.app/applist.html#/newapp)。创建应用后进入该应用，选择左下角的 `设置` > `应用Key`，然后记下 `APP ID`,`APP Key` 和 `Master Key`。

之后点击下方按钮，跳转至 Vercel 进行快速部署。

[![Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/lizheming/waline/tree/master/example)

按照要求输入 Vercel 项目名称与 GitHub 仓库名称。Vercel 会基于 waline 模板帮助你新建并初始化该仓库。仓库初始化完毕后，需要在 Environment Variables 中配置 `LEAN_ID`, `LEAN_KEY` 和 `LEAN_MASTER_KEY` 三个环境变量。它们的值分别对应上一步在 LeanCloud 中获得的 `APP ID`, `APP KEY`, `Master Key`。

设置好环境变量后，点击 `Deploy` 部署，一两分钟即可部署完成。之后在主题设置中设置 vercel 地址:

:::: code-group

::: code-group-item TS

```ts
// .vuepress/config.ts
import { defineHopeConfig } from "vuepress-theme-hope";

export default defineHopeConfig({
  themeConfig: {
    plugins: {
      comment: {
        type: "waline",
        serverURL: "YOUR_SERVER_URL", // your server url
      },
    },
  },
});
```

:::

::: code-group-item JS

```js
// .vuepress/config.js
const { defineHopeConfig } = require("vuepress-theme-hope");

module.exports = defineHopeConfig({
  themeConfig: {
    plugins: {
      comment: {
        type: "waline",
        serverURL: "YOUR_SERVER_URL", // your server url
      },
    },
  },
});
```

:::

::::

Waline 评论的其他配置将在 [Waline 配置][comment2-waline-config] 中列出。

::: tip

更多配置与使用，请见 [Waline 官方文档](https://waline.js.org)。

:::

[comment2]: https://vuepress-theme-hope.github.io/v2/comment/zh/
[comment2-waline-config]: https://vuepress-theme-hope.github.io/v2/comment/zh/config/waline.html
