---
title: 项目主页 Frontmatter 配置
icon: home
order: 4
category:
  - 配置
tag:
  - Frontmatter
  - 项目主页
---

## home

必须设置为 `true` 以使用项目首页。

## title

- 类型: `string`
- 必填: 否

设置页面标题，会用于路径导航、页面增强等。

## heroText

- 类型: `string | false`
- 默认值: 站点标题

主页标题，可通过设置为空字符串来隐藏默认标题。

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

## heroStyle

- 类型: `string`
- 必填: 否

Hero 样式。

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

- 类型: `(ThemeProjectHomeFeatureOptions | ThemeProjectHomeHighlightOptions)[]`

  ```ts
  interface ThemeProjectHomeHighlightItem {
    /**
     * Item name, supports HTML string
     */
    title: string;

    /**
     * Item description, supports HTML string
     */
    details?: string;

    /**
     * Item icon
     *
     * @description image link or icon fontClass are supported
     */
    icon?: string;

    /**
     * Item link
     */
    link?: string;
  }

  type ThemeProjectHomeFeatureItem = ThemeProjectHomeHighlightItem;

  interface ThemeProjectHomeFeatureOptions {
    /**
     * 功能标题
     */
    header?: string;

    /**
     * 功能描述，支持 HTML 字符串
     */
    description?: string;

    /**
     * 文字颜色
     */
    color?: string;

    /**
     * 功能图像
     */
    image?: string;

    /**
     * 夜间模式使用的功能图片
     *
     * @default image
     */
    imageDark?: string;

    /**
     * 功能背景图
     */
    bgImage?: string;

    /**
     * 夜间模式使用的功能背景图
     *
     * @default bgImage
     */
    bgImageDark?: string;

    /**
     * 功能背景图样式
     */
    bgImageStyle?: Record<string, string> | string;

    /**
     * 功能
     */
    features: ThemeProjectHomeFeatureItem[];
  }

  interface ThemeProjectHomeHighlightSection {
    /**
     * 亮点标题，支持 HTML 字符串
     */
    header: string;

    /**
     * 亮点描述，支持 HTML 字符串
     */
    description?: string;

    /**
     * 文字颜色
     */
    color?: string;

    /**
     * 亮点图像
     */
    image?: string;

    /**
     * 夜间模式使用的亮点图片
     *
     * @default image
     */
    imageDark?: string;

    /**
     * 亮点背景图
     */
    bgImage?: string;

    /**
     * 夜间模式使用的亮点背景图
     *
     * @default bgImage
     */
    bgImageDark?: string;

    /**
     * 亮点背景图样式
     */
    bgImageStyle?: Record<string, string> | string;

    /**
     * 亮点列表类型
     *
     * @default un-order
     */
    type?: "order" | "un-order" | "no-order";

    /**
     * 亮点
     */
    highlights?: ThemeProjectHomeHighlightItem[];
  }
  ```

- 必填: 否

亮点描述。

## features

- 类型: `ThemeProjectHomeFeatureItem[]`

  ```ts
  interface ThemeProjectHomeFeatureItem {
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
  ```

- 必填: 否

功能描述。
