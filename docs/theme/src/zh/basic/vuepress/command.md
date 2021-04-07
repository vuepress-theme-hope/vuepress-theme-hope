---
title: 项目指令
icon: command
category: basic
tags:
  - vuepress
---

## 安装项目依赖

<CodeGroup>
<CodeGroupItem title="yarn">
```bash
yarn install
```
</CodeGroupItem>

<CodeGroupItem title="npm">
```bash
npm install
```
</CodeGroupItem>

<CodeGroupItem title="yarn 简写">
```bash
yarn
```
</CodeGroupItem>

<CodeGroupItem title="npm 简写">
```bash
npm i
```
</CodeGroupItem>
</CodeGroup>

## 升级依赖

<CodeGroup>
<CodeGroupItem title="yarn">
```bash
yarn upgrade
```
</CodeGroupItem>

<CodeGroupItem title="npm">
```bash
npm update
```
</CodeGroupItem>
</CodeGroup>

## 调试项目

创建开启一个本地预览，请使用[localhost:8080](http://localhost:8080)访问。

<CodeGroup>
<CodeGroupItem title="yarn">
```bash
yarn run serve
```
</CodeGroupItem>

<CodeGroupItem title="npm">
```bash
npm run serve
```
</CodeGroupItem>
</CodeGroup>

::: tip

使用`Ctrl + C`终止任务本地调试进程。

:::

## 构建项目

打包构建项目，生成最终部署到服务器上的文件

<CodeGroup>
<CodeGroupItem title="yarn">
```bash
yarn run build
```
</CodeGroupItem>

<CodeGroupItem title="npm">
```bash
npm run build
```
</CodeGroupItem>
</CodeGroup>
