---
icon: bitbucket
---

# BitBucket OAuth Consumer

## 创建一个新的 OAuth Consumer

- 前往 **Bitbucket settings - OAuth**
- 点击 **Add consumer**

![配置 OAuth App - Bitbucket 01](./assets/oauth-app-bitbucket-01.png)
![配置 OAuth App - Bitbucket 02](./assets/oauth-app-bitbucket-02.png)
![配置 OAuth App - Bitbucket 03](./assets/oauth-app-bitbucket-03.png)

- 将 `Callback URL` 设置为你的网站 URL (这里我们用 `localhost:8080` 作为示例)
- 取消选择 `This is a private consumer`
- 勾选 `Account - Read` 和 `Issues - Write` 权限

![配置 OAuth App - Bitbucket 04](./assets/oauth-app-bitbucket-04.png)
![配置 OAuth App - Bitbucket 05](./assets/oauth-app-bitbucket-05.png)

## 获取 Client ID

现在你已经创建了一个新的 OAuth Consumer，并得到了相应的 **Key** (`Client ID`).

![配置 OAuth App - Bitbucket 06](./assets/oauth-app-bitbucket-06.png)

## 配置并启动你的 Vssue

复制 `Client ID`，并设置 `owner` 和 `repo`。

> Bitbucket repository 的 URL 模式为 `https://bitbucket.org/${owner}/${repo}`

这里我们以 `https://bitbucket.org/meteorlxy/vssue-demo` 为例，并把 issue 的 `title` 设置为 `Vssue Demo`。

然后运行 `anywhere -h localhost 8080`，在 `localhost:8080` 监听一个 http server 并返回 `index.html`。

![配置 OAuth App - Bitbucket 07](./assets/oauth-app-bitbucket-07.png)

## 在本地尝试 Vssue

Vssue 已经成功运行。点击 `Login` 使用 Bitbucket 帐号登录。

![配置 OAuth App - Bitbucket 08](./assets/oauth-app-bitbucket-08.png)

重定向到 Bitbucket 授权页面。点击 `Grant access` 来登录。

![配置 OAuth App - Bitbucket 09](./assets/oauth-app-bitbucket-09.png)
![配置 OAuth App - Bitbucket 10](./assets/oauth-app-bitbucket-10.png)

如果出现加载评论失败，你需要确认你的仓库是否开启了 **Issue Tracker** 功能。

![配置 OAuth App - Bitbucket 11](./assets/oauth-app-bitbucket-11.png)

在当前页面写下评论吧 ~

![配置 OAuth App - Bitbucket 12](./assets/oauth-app-bitbucket-12.png)
![配置 OAuth App - Bitbucket 13](./assets/oauth-app-bitbucket-13.png)

::: tip

你可以前往 [meteorlxy/vssue-demo](https://bitbucket.org/meteorlxy/vssue-demo) 来获取 demo 代码。前往该仓库的 [#1 issue](https://bitbucket.org/meteorlxy/vssue-demo/issues/1) 看看发生了什么。

:::
