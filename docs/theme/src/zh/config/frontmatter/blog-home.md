---
title: 博客主页 Frontmatter 配置
icon: blog
order: 5
category:
  - 配置
tag:
  - Frontmatter
  - 博客主页
---

## home

- 类型: `boolean`
- 默认值: `false`

设置为 `true` 时启用首页样式

## hero

- 类型: `boolean`
- 默认值: `true`

是否显示主页的图标与描述。

## title

- 类型: `string`
- 必填: 否

设置页面标题，会用于路径导航、页面增强等。

## heroText

- 类型: `string | false`
- 默认值: `"Hello"`

主页标题

## tagline

- 类型: `string | false`
- 默认值: `"Welcome to your VuePress site"`

附加文字描述

## heroImage

- 类型: `string`
- 必填: 否

主页图标 (logo) 地址，需要填入绝对路径 (图片需要放入 `.vuepress/public` 文件夹)

## heroImageDark

- 类型: `string`
- 必填: 否

深色模式下主页图标 (logo) 地址，需要填入绝对路径 (图片需要放入 `.vuepress/public` 文件夹)，默认同 `heroImage`。

## heroAlt

- 类型: `string`
- 必填: 否

主页图标的替代文字

## bgImage

- 类型: `string | false`
- 默认值: 一张内置风景图片

背景图片的地址，需填写绝对路径或完整路径。如果不填写，会自动应用一张默认的风景图片。

## bgImageStyle

- 类型: `Record<string, string> | string`
- 必填: 否

背景图片的 CSS 样式。

## heroImageStyle

- 类型: `Record<string, string> | string`
- 必填: 否

首页图标的 CSS 样式

## heroFullScreen

- 类型: `boolean`
- 默认值: `false`

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

项目列表
