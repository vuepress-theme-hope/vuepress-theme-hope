---
title: 主页 Frontmatter 配置
icon: home
order: 4
category:
  - 配置
tag:
  - Frontmatter
  - 主页
---

## home

- 类型: `boolean`
- 默认值: `false`

设置为 `true` 时启用首页样式

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

## actions

- 类型: `ThemeHomeActionOptions[]`

  ```ts
  interface ThemeHomeActionOptions {
    /**
     * 操作名称
     */
    text: string;

    /**
     * 操作链接
     */
    link: string;

    /**
     * 操作类型
     * @default 'default'
     */
    type?: "primary" | "default";
  }
  ```

- 必填: 否

主页操作

## features

- 类型: `ThemeHomeFeatureOptions[]`

  ```ts
  interface ThemeHomeFeatureOptions {
    /**
     * 功能名称
     */
    title: string;

    /**
     * 功能描述
     */
    details: string;

    /**
     * 功能图标
     *
     * @description 支持图片链接或者图标字体类
     */
    icon?: string;

    /**
     * 功能链接
     */
    link?: string;
  }
  ```

- 必填: 否

特性说明
