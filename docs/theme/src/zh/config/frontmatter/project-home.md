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

## 选项 {#options}

::: fields
@`home` type=boolean required

是否使用项目首页布局。

@`title` type=string

页面标题，会用于路径导航、SEO 等。

@`heroText` type=string default="站点标题"

主页标题。设置为空字符串可隐藏默认标题。

@`tagline` type=string default=`"Welcome to your VuePress site"`

主页的简短描述。

@`heroImage` type=string

主页图标 (logo) 链接，不支持相对路径。

@`heroImageDark` type=string default=`heroImage`

深色模式下主页图标 (logo) 链接，不支持相对路径。

@`heroAlt` type=string default=`heroText`

主页图标的替代文字。

@`heroImageStyle` type=`Record<string, string> | string`

首页图标的 CSS 样式。

@`bgImage` type=string

背景图片的地址，不支持相对路径。

@`bgImageDark` type=string default=`bgImage`

深色模式下背景图片的地址，不支持相对路径。

@`bgImageStyle` type=`Record<string, string> | string`

背景图片的 CSS 样式。

@`heroStyle` type=string

Hero 样式。

@`heroFullScreen` type=boolean

是否全屏显示 Hero。

@`actions` type=`ThemeProjectHomeActionOptions[]`

主页操作。

@@`actions[*].text` type=string required

操作名称。

@@`actions[*].link` type=string required

操作链接。

@@`actions[*].type` type=`'primary' | 'default'` default=`'default'`

操作类型。

@@`actions[*].icon` type=string

操作图标。

@`highlights` type=`(ThemeProjectHomeFeatureOptions | ThemeProjectHomeHighlightOptions)[]`

主页的亮点区域。每一项要么是功能区域，要么是亮点区域。

@@`highlights[*].header` type=string

区域标题，支持 HTML 字符串。亮点区域中为必填。

@@`highlights[*].description` type=string

区域描述，支持 HTML 字符串。

@@`highlights[*].color` type=string

文字颜色。

@@`highlights[*].image` type=string

区域图像。

@@`highlights[*].imageDark` type=string default=`image`

夜间模式使用的区域图片。

@@`highlights[*].bgImage` type=string

区域背景图。

@@`highlights[*].bgImageDark` type=string default=`bgImage`

夜间模式使用的区域背景图。

@@`highlights[*].bgImageStyle` type=`Record<string, string> | string`

区域背景图样式。

@@`highlights[*].features` type=`ThemeProjectHomeFeatureItem[]` feature-section=Yes

功能区域中的功能。

@@@`highlights[*].features[*].title` type=string required

项目名称，支持 HTML 字符串。

@@@`highlights[*].features[*].details` type=string

项目描述，支持 HTML 字符串。

@@@`highlights[*].features[*].icon` type=string

项目图标，支持图片链接或图标字体类。

@@@`highlights[*].features[*].link` type=string

项目链接。

@@`highlights[*].type` type=`'order' | 'un-order' | 'no-order'` default=`'un-order'` highlight-section=Yes

亮点区域的列表类型。

@@`highlights[*].highlights` type=`ThemeProjectHomeHighlightItem[]` highlight-section=Yes

亮点区域中的亮点。

@@@`highlights[*].highlights[*].title` type=string required

项目名称，支持 HTML 字符串。

@@@`highlights[*].highlights[*].details` type=string

项目描述，支持 HTML 字符串。

@@@`highlights[*].highlights[*].icon` type=string

项目图标，支持图片链接或图标字体类。

@@@`highlights[*].highlights[*].link` type=string

项目链接。

@`features` type=`ThemeProjectHomeFeatureItem[]`

主页的功能。

@@`features[*].title` type=string required

功能名称，支持 HTML 字符串。

@@`features[*].details` type=string

功能描述，支持 HTML 字符串。

@@`features[*].icon` type=string

功能图标，支持图片链接或图标字体类。

@@`features[*].link` type=string

功能链接。

:::
