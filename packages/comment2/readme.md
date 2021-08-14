<!-- markdownlint-disable -->
<p align="center">
  <img width="240" src="https://vuepress-theme-hope.github.io/logo.svg" style="text-align: center;"/>
</p>
<h1 align="center">vuepress-plugin-comment2</h1>
<h4 align="center">VuePress comment plugin💬 / VuePress 评论插件💬</h4>

[![Version](https://img.shields.io/npm/v/vuepress-plugin-comment2.svg?style=flat-square&logo=npm) ![Downloads](https://img.shields.io/npm/dm/vuepress-plugin-comment2.svg?style=flat-square&logo=npm) ![Size](https://img.shields.io/bundlephobia/min/vuepress-plugin-comment2?style=flat-square&logo=npm)](https://www.npmjs.com/package/vuepress-plugin-comment2)

<!-- markdownlint-restore -->

VuePress comment plugin💬 / VuePress 评论插件 💬

## [Official Docs](https://vuepress-theme-hope.github.io/comment/) | [官方文档](https://vuepress-theme-hope.github.io/comment/zh/)

## Install

```bash
npm i vuepress-plugin-comment2
```

Or

```bash
yarn add -D vuepress-plugin-comment2
```

## Feature

- PageInfo components
- Support Waline.

## Migration from V1

- Valine service is removed
- vssue is not compatable with V2 yet
- new option `hint` controlling whether a popup hint is disaplayed when page-info item is hovered
- new option `delay`, which means the delay initializing comment service when page loaded or navigated
- new option `pageInfoLocale` and `walineLocale` for i18n config

---

## 安装

```bash
npm i vuepress-plugin-comment2
```

或

```bash
yarn add -D vuepress-plugin-comment2
```

## 特性

- 页面信息组件
- 支持 Waline

## 从 V1 迁移

- Valine 服务已被移除
- Vssue 暂未适配 V2
- 新选项 `hint` 控制悬停在页面信息上是否显示提示
- 新选项 `delay`，控制页面加载和切换后初始化评论服务的延迟
- 新选项 `pageInfoLocale` 和 `walineLocale` 用于国际化配置
