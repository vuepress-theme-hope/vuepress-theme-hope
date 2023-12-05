---
home: true
title: 主页
icon: home
heroText: vuepress-shared
tagline: VuePress2 的强大工具函数

footer: 使用 <a href="https://theme-hope.vuejs.press/zh/" target="_blank">VuePress Theme Hope</a> 主题 | MIT 协议, 版权所有 © 2019-present Mr.Hope

copyright: false
---

## 安装

::: code-tabs#shell

@tab pnpm

```bash
pnpm add -D vuepress-shared
```

@tab yarn

```bash
yarn add -D vuepress-shared
```

@tab npm

```bash
npm i -D vuepress-shared
```

:::

## 用法

::: warning

VuePress 同时运行在 Node.js 端和浏览器端，我们称之为 `node` 和 `client`。

因此，你应该注意导入正确的文件，因为 Node.js 具有内置模块并能够访问文件系统，并且浏览器具有全局变量，如 `window` 或 `navigator`。

:::

- 在 Node 端，你应该从 `vuepress-shared/node` 导入函数。
- 在客户端，你应该从 `vuepress-shared/client` 导入函数。
