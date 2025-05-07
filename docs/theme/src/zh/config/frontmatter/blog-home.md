---
title: 博客主页 Frontmatter 配置
icon: blog
order: 6
category:
  - 配置
tag:
  - Frontmatter
  - 博客主页
---

## home

- 类型: `true`
- 详情: [博客 → 播客主页](../../guide/blog/home.md#博客类型主页)

必须设置为 `true` 以使用博客主页布局。

## layout

- 类型: `"Blog"`
- 详情:
  - [博客 → 博客主页](../../guide/blog/home.md#博客类型主页)

必须设置为 `Blog` 以使用博客主页布局。

## hero

- 类型: `boolean`
- 默认值: `true`
- 详情:
  - [博客 → 博客主页](../../guide/blog/home.md#博客类型主页)

是否显示主页的图标与描述。

## title

- 类型: `string`
- 必填: 否
- 详情:
  - [博客 → 博客主页](../../guide/blog/home.md#博客类型主页)

设置页面标题，会用于路径导航、页面增强等。

## heroText

- 类型: `string`
- 默认值: 站点标题
- 详情:
  - [博客 → 博客主页](../../guide/blog/home.md#博客类型主页)

主页标题，可通过设置为空字符串来隐藏默认标题。

## tagline

- 类型: `string`
- 必填: 否
- 详情:
  - [博客 → 博客主页](../../guide/blog/home.md#博客类型主页)

附加文字描述

## heroImage

- 类型: `string`
- 必填: 否
- 详情:
  - [博客 → 博客主页](../../guide/blog/home.md#博客类型主页)
  - [常见问题 → 配置中的链接](../../faq/common-question.md#配置中的链接)

主页图标 (logo) 地址。

## heroImageDark

- 类型: `string`
- 默认值: `heroImage`
- 详情:
  - [博客 → 博客主页](../../guide/blog/home.md#博客类型主页)
  - [常见问题 → 配置中的链接](../../faq/common-question.md#配置中的链接)

深色模式下主页图标 (logo) 地址。

## heroImageStyle

- 类型: `Record<string, string> | string`
- 必填: 否
- 详情:
  - [博客 → 博客主页](../../guide/blog/home.md#博客类型主页)

主页图标 (logo) 的 CSS 样式

## heroAlt

- 类型: `string`
- 必填: 否
- 详情:
  - [博客 → 博客主页](../../guide/blog/home.md#博客类型主页)

主页图标的替代文字

## bgImage

- 类型: `string | false`
- 默认值: 一张内置风景图片
- 详情:
  - [博客 → 博客主页](../../guide/blog/home.md#博客类型主页)
  - [常见问题 → 配置中的链接](../../faq/common-question.md#配置中的链接)

背景图片的地址，不支持相对路径。如果不填写，会自动应用一张默认的风景图片。

## bgImageDark

- 类型: `string`
- 默认值: `bgImage`
- 详情:
  - [博客 → 博客主页](../../guide/blog/home.md#博客类型主页)
  - [常见问题 → 配置中的链接](../../faq/common-question.md#配置中的链接)

深色模式下背景图片的地址，不支持相对路径。

## bgImageStyle

- 类型: `Record<string, string> | string`
- 必填: 否
- 详情:
  - [博客 → 博客主页](../../guide/blog/home.md#博客类型主页)

背景图片的 CSS 样式。

## heroFullScreen

- 类型: `boolean`
- 默认值: `false`
- 详情:
  - [博客 → 博客主页](../../guide/blog/home.md#博客类型主页)

是否全屏显示 Hero

## projects

- 类型: `ThemeBlogHomeProjectOptions[]`

  ```ts
  interface ThemeBlogHomeProjectOptions {
    /**
     * 项目名称
     */
    name: string;

    /**
     * 项目描述
     */
    desc?: string;

    /**
     * 项目链接
     */
    link: string;

    /**
     * 项目图标
     *
     * @description 支持图片链接或者图标字体类，同时也支持 `"link"`、`"project"`、`"book"`、`"article"`、`"friend"`
     */
    icon?: string;
  }
  ```

- 必填: 否
- 详情:
  - [博客 → 博客主页](../../guide/blog/home.md#博客类型主页)

播客主页中的项目列表
