<!-- markdownlint-disable -->
<p align="center">
  <img width="240" src="https://vuepress-theme-hope.github.io/v2/logo.svg" style="text-align: center;"/>
</p>
<h1 align="center">vuepress-plugin-comment2</h1>
<h4 align="center">VuePress2 comment plugin💬 / VuePress2 评论插件💬</h4>

[![Version](https://img.shields.io/npm/v/vuepress-plugin-comment2/next.svg?style=flat-square&logo=npm) ![Downloads](https://img.shields.io/npm/dm/vuepress-plugin-comment2.svg?style=flat-square&logo=npm) ![Size](https://img.shields.io/bundlephobia/min/vuepress-plugin-comment2?style=flat-square&logo=npm)](https://www.npmjs.com/package/vuepress-plugin-comment2)

<!-- markdownlint-restore -->

VuePress2 comment plugin💬 / VuePress2 评论插件 💬

## [Official Docs](https://vuepress-theme-hope.github.io/v2/comment/) | [官方文档](https://vuepress-theme-hope.gitee.io/v2/comment/zh/)

## Install

```bash
npm i vuepress-plugin-comment2@next
```

Or

```bash
yarn add -D vuepress-plugin-comment2@next
```

## Feature

- PageInfo components
- Support Waline.

## Migration from V1

Renamed from `@mr-hope/vuepress-plugin-comment` to `vuepress-plugin-comment2`. ⚠

- Valine service is removed ![removed](https://img.shields.io/badge/-removed-red)

  Valine is lack of maintainence and can leak your privacy. You should use [Waline](https://waline.js.org) instead.

- vssue is not compatable with V2 yet ![warning](https://img.shields.io/badge/-warning-yellow)

- muti-categories support ![new](https://img.shields.io/badge/-new-brightgreen)

- option `hint` controlling whether a popup hint is disaplayed when page-info item is hovered ![new](https://img.shields.io/badge/-new-brightgreen)

- option `delay` controlling delay initializing comment service when page loads or navigates ![new](https://img.shields.io/badge/-new-brightgreen)

- option `pageInfoLocale` and `walineLocale` for i18n config ![new](https://img.shields.io/badge/-new-brightgreen)

---

## 安装

```bash
npm i vuepress-plugin-comment2@next
```

或

```bash
yarn add -D vuepress-plugin-comment2@next
```

## 特性

- 页面信息组件
- 支持 Waline

## 从 V1 迁移

名称从 `@mr-hope/vuepress-plugin-comment` 改为 `vuepress-plugin-comment2`. ⚠

- Valine 服务已被移除 ![移除](https://img.shields.io/badge/-移除-red)

  Valine 现已缺乏维护并可能泄露隐私. 你应当使用 [Waline](https://waline.js.org) 替代它.

- Vssue 暂未适配 V2 ![警告](https://img.shields.io/badge/-警告-yellow)

- 多分类支持 ![新增](https://img.shields.io/badge/-新增-brightgreen)

- 选项 `hint` 控制悬停在页面信息上是否显示提示 ![新增](https://img.shields.io/badge/-新增-brightgreen)

- 选项 `delay`，控制页面加载和切换后初始化评论服务的延迟 ![新增](https://img.shields.io/badge/-新增-brightgreen)

- 选项 `pageInfoLocale` 和 `walineLocale` 用于国际化配置 ![新增](https://img.shields.io/badge/-新增-brightgreen)
