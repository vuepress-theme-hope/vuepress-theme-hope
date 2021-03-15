---
title: 安装/使用
icon: install
category: Get Started
tags:
  - install
---

## 快速安装

<CodeGroup>
<CodeGroupItem title="yarn">
```bash
yarn create vuepress-theme-hope [dir]
```
</CodeGroupItem>

<CodeGroupItem title="npm">
```bash
npx create-vuepress-theme-hope [dir]
```
</CodeGroupItem>
</CodeGroup>

## 手动安装

<CodeGroup>
<CodeGroupItem title="yarn">
```bash
yarn add -D vuepress-theme-hope
```
</CodeGroupItem>

<CodeGroupItem title="npm">
```bash
npm i -D vuepress-theme-hope
```
</CodeGroupItem>
</CodeGroup>

## 使用

```js
// .vuepress/config.js
const { config } = require("vuepress-theme-hope");

module.exports = config({
  // your config here
});
```

::: tip 为什么要引入 config 函数

为了尽可能减轻用户配置，vuepress-theme-hope 提供了一些额外的配置选项，需要经过处理才能提交 VuePress、同时 vuepress-theme-hope 也会允许你省略一些配置并自动帮你生成它们。

比如自动根据你的主题配置中的多语言选项，为你生成项目配置中的多语言选项，并自动帮你完成本地化工作。

:::
