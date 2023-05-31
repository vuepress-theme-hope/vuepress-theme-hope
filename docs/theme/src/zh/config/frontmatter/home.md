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

主页图标 (logo) 链接，不支持相对路径。

## heroImageDark

- 类型: `string`
- 默认值: `heroImage`

深色模式下主页图标 (logo) 链接，不支持相对路径。

## heroImageStyle

- 类型: `Record<string, string> | string`
- 必填: 否

首页图标的 CSS 样式

## heroAlt

- 类型: `string`
- 必填: 否

主页图标的替代文字

## bgImage

- 类型: `string`
- 必填: 否

背景图片的地址，不支持相对路径。

## bgImageDark

- 类型: `string`
- 默认值: `bgImage`

深色模式下背景图片的地址，不支持相对路径。

## bgImageStyle

- 类型: `Record<string, string> | string`
- 必填: 否

背景图片的 CSS 样式。

## heroFullScreen

- 类型: `boolean`
- 默认值: `false`

是否全屏显示 Hero

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

## highlights

- 类型: `ThemeProjectHomeHighlightSection[]`

  ```ts
  interface ThemeProjectHomeItemOption {
    /**
     * 项目名称，支持 HTML 字符串
     */
    title: string;

    /**
     * 项目描述，支持 HTML 字符串
     */
    details?: string;

    /**
     * 项目图标
     *
     * @description 支持图片链接或者图标字体类
     */
    icon?: string;

    /**
     * 项目链接
     */
    link?: string;
  }

  interface ThemeProjectHomeHighlightSection {
    /**
     * 高亮标题，支持 HTML 字符串
     */
    header: string;

    /**
     * 高亮描述，支持 HTML 字符串
     */
    description?: string;

    /**
     * 文字颜色
     */
    color?: string;

    /**
     * 高亮图像
     */
    image?: string;

    /**
     * 夜间模式使用的高亮图片
     *
     * @default image
     */
    imageDark?: string;

    /**
     * 高亮背景图
     */
    bgImage?: string;

    /**
     * 夜间模式使用的高亮背景图
     *
     * @default bgImage
     */
    bgImageDark?: string;

    /**
     * 高亮列表类型
     *
     * @default un-order
     */
    type?: "order" | "un-order" | "no-order";

    /**
     * 高亮
     */
    highlights?: ThemeProjectHomeItemOption[];
  }
  ```

- 必填: 否

亮点描述。

## features

- 类型: `ThemeHomeFeatureOptions[]`

  ```ts
  interface ThemeProjectHomeItemOption {
    /**
     * 项目名称，支持 HTML 字符串
     */
    title: string;

    /**
     * 项目描述，支持 HTML 字符串
     */
    details?: string;

    /**
     * 项目图标
     *
     * @description 支持图片链接或者图标字体类
     */
    icon?: string;

    /**
     * 项目链接
     */
    link?: string;
  }

  interface ThemeProjectHomeFeatureOptions {
    /**
     * 功能标题
     */
    header?: string;

    /**
     * 功能配置
     */
    features: ThemeProjectHomeItemOption[];
  }
  ```

- 必填: 否

功能描述。
