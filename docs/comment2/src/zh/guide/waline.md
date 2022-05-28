---
title: Waline
icon: waline
---

欢迎使用 Waline，只需几个步骤，你就可以在你的网站中启用 Waline 提供评论与浏览量服务。

<!-- more -->

## LeanCloud 设置 (数据库)

1. [登录](https://console.leancloud.app/login) 或 [注册](https://console.leancloud.app/register) `LeanCloud 国际版` 并进入 [控制台](https://console.leancloud.app/apps)

1. 点击左下角 [创建应用](https://console.leancloud.app/apps) 并起一个你喜欢的名字 (请选择免费的开发版):

   ![创建应用](./assets/leancloud-1.jpeg)

1. 进入应用，选择左下角的 `设置` > `应用 Key`。你可以看到你的 `APP ID`,`APP Key` 和 `Master Key`。后续我们会用到这三个值。

   ![ID 和 Key](./assets/leancloud-2.jpeg)

::: warning

如果你正在使用 Leancloud 国内版 ([leancloud.cn](https://leancloud.cn))，我们推荐你切换到国际版 ([leancloud.app](https://leancloud.app))。否则，你需要为应用额外绑定**已备案**的域名:

- 登录国内版并进入需要使用的应用
- 选择 `设置` > `域名绑定` > `API 访问域名` > `绑定新域名` > 输入域名 > `确定`。
- 按照页面上的提示按要求在 DNS 上完成 CNAME 解析。

![域名设置](./assets/leancloud-3.png)

:::

## Vercel 部署 (服务端)

[![Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/walinejs/waline/tree/main/example)

1. 点击上方按钮，跳转至 Vercel 进行 Server 端部署。

1. 如果你未登录的话，Vercel 会让你注册或登录，请使用 GitHub 账户进行快捷登录。

1. 输入一个你喜欢的 Vercel 项目名称并点击 `Create` 继续:

   ![创建项目](./assets/vercel-1.png)

1. 此时会让你创建 Team 账号，这里选择 `Skip` 即可：

   ![skip team](./assets/vercel-2.png)

1. 此时 Vercel 会基于 Waline 模板帮助你新建并初始化仓库，仓库名为你之前输入的项目名。

   ![deploy](./assets/vercel-3.png)

   一两分钟后，满屏的烟花会庆祝你部署成功。此时点击 `Go to Dashboard` 可以跳转到应用的控制台。

   ![deploy](./assets/vercel-4.png)

1. 点击顶部的 `Settings` - `Environment Variables` 进入环境变量配置页，并配置三个环境变量`LEAN_ID`, `LEAN_KEY` 和 `LEAN_MASTER_KEY` 。它们的值分别对应上一步在 LeanCloud 中获得的 `APP ID`, `APP KEY`, `Master Key`。

   ![设置环境变量](./assets/vercel-5.png)

   ::: tip

   如果你使用 LeanCloud 国内版，请额外配置 `LEAN_SERVER` 环境变量，值为你绑定好的域名。

   :::

1. 环境变量配置完成之后点击顶部的 `Deployments` 点击顶部最新的一次部署右侧的 `Redeploy` 按钮进行重新部署。该步骤是为了让刚才设置的环境变量生效。

   ![redeploy](./assets/vercel-6.png)

1. 此时会跳转到 `Overview` 界面开始部署，等待片刻后 `STATUS` 会变成 `Ready`。此时请点击 `Visit` ，即可跳转到部署好的网站地址，此地址即为你的服务端地址。

   ![redeploy success](./assets/vercel-7.png)

## 客户端

### 使用插件

在插件选项中设置 `type: "waline"`，同时设置服务端地址 `serverURL` 为上一步获取到的值。

此时，将 `<CommentService>` 组件放置在你网站中合适的位置 (通常是页面的底部)，即可使用 Waline 评论功能。

::: tip

你也可以传入其他 Waline 支持的选项 (除了 `el`)。

详情请见 [Waline 配置](../config/waline.md)

:::

## 评论管理 (管理端)

1. 部署完成后，请访问 `<serverURL>/ui/register` 进行注册。首个注册的人会被设定成管理员。
1. 管理员登陆后，即可看到评论管理界面。在这里可以修改、标记或删除评论。
1. 用户也通过评论框注册账号，登陆后会跳转到自己的档案页。
