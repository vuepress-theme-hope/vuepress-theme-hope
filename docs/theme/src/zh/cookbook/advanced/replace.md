---
title: 替换主题组件
icon: customize
category:
  - 高级
tag:
  - 高级
  - 自定义
---

主题通过 `alias` 来引入组件，所以你可以利用它来替换主题的任何一个组件。

<!-- more -->

## 替换组件的方式

你需要在自己的 VuePress 配置文件通过 `alias` 替换主题中使用的组件别名。

::: code-tabs#language

@tab TS

```ts
// .vuepress/config.ts
import { path } from "@vuepress/utils";
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    // 主题选项
    // ...
  }),

  alias: {
    // 你可以在这里将别名定向到自己的组件
    // 比如这里我们将主题的主页组件改为用户 .vuepress/components 下的 HomePage.vue
    "@theme-hope/components/HomePage": path.resolve(
      __dirname,
      "./components/HomePage.vue"
    ),
  },
});
```

@tab JS

```js
// .vuepress/config.js
const { path } = require("@vuepress/utils");
const { hopeTheme } = require("vuepress-theme-hope");

module.exports = {
  theme: hopeTheme({
    // 主题选项
    // ...
  }),

  alias: {
    // 你可以在这里将别名定向到自己的组件
    // 比如这里我们将主题的主页组件改为用户 .vuepress/components 下的 HomePage.vue
    "@theme-hope/components/HomePage": path.resolve(
      __dirname,
      "./components/HomePage.vue"
    ),
  },
};
```

:::

可以支持的别名如下。

::: details 主题组件别名

组件:

- `@theme-hope/components/AutoLink`: 基础链接
- `@theme-hope/components/BreadCrumb`: 路径导航
- `@theme-hope/components/CommonWrapper`: 基本布局整合
- `@theme-hope/components/HomeFeatures`: 主页特性
- `@theme-hope/components/HomeHero`: 主页 Logo 及介绍
- `@theme-hope/components/HomePage`: 主页
- `@theme-hope/components/Icon`: 图标
- `@theme-hope/components/MarkdownContent`: Markdown 内容
- `@theme-hope/components/NormalPage`: 常规页面
- `@theme-hope/components/PageFooter`: 页脚
- `@theme-hope/components/PageNav`: 页面导航
- `@theme-hope/components/PageTitle`: 页面标题
- `@theme-hope/components/SkipLink`: 跳转到主内容

杂项:

- `@theme-hope/components/icons`: 主题图标
- `@theme-hope/components/transitions`: 主题渐变动画
- `@theme-hope/composables`: 主题可组合 API
- `@theme-hope/utils`: 主题通用函数

:::

::: details 导航栏组件别名

组件:

- `@theme-hope/module/navbar/components/DropdownLink`: 下拉列表
- `@theme-hope/module/navbar/components/LanguageDropdown`: 语言下拉列表
- `@theme-hope/module/navbar/components/NavActions`: 导航栏功能
- `@theme-hope/module/navbar/components/Navbar`: 导航栏
- `@theme-hope/module/navbar/components/NavbarBrand`: 导航栏品牌信息
- `@theme-hope/module/navbar/components/NavbarLinks`: 导航栏链接
- `@theme-hope/module/navbar/components/NavScreen`: 移动视图下的导航屏
- `@theme-hope/module/navbar/components/NavScreenDropdown`: 移动视图下导航栏下拉菜单
- `@theme-hope/module/navbar/components/NavScreenLinks`: 移动式视图下导航栏链接
- `@theme-hope/module/navbar/components/RepoLink`: 仓库链接
- `@theme-hope/module/navbar/components/ToggleNavbarButton`: 导航栏切换按钮
- `@theme-hope/module/navbar/components/ToggleSidebarButton`: 侧边栏切换按钮

杂项:

- `@theme-hope/module/navbar/components/icons`: 导航栏图标
- `@theme-hope/module/navbar/composables`: 导航栏可组合 API

:::

::: details 侧边栏组件别名

组件:

- `@theme-hope/module/sidebar/components/Sidebar`: 侧边栏
- `@theme-hope/module/sidebar/components/SidebarChild`: 侧边栏链接子项
- `@theme-hope/module/sidebar/components/SidebarGroup`: 侧边栏分组链接
- `@theme-hope/module/sidebar/components/SidebarLinks`: 侧边栏链接

杂项:

- `@theme-hope/module/sidebar/composables`: 侧边栏可组合 API
- `@theme-hope/module/sidebar/utils`: 侧边栏通用函数

:::

::: details 信息组件别名

Components:

- `@theme-hope/module/info/components/AuthorInfo`: 作者信息
- `@theme-hope/module/info/components/CategoryInfo`: 分类信息
- `@theme-hope/module/info/components/DateInfo`: 写作日期信息
- `@theme-hope/module/info/components/OriginalMark`: 原创标识
- `@theme-hope/module/info/components/PageInfo`: 页面信息
- `@theme-hope/module/info/components/PageMeta`: 页面元数据 information
- `@theme-hope/module/info/components/PageViewInfo`: 浏览量信息 information
- `@theme-hope/module/info/components/ReadingTimeInfo`: 阅读时间信息 time information
- `@theme-hope/module/info/components/TagInfo`: 标签信息
- `@theme-hope/module/info/components/TOC`: 内容列表
- `@theme-hope/module/info/components/WordInfo`: 字数信息

杂项:

- `@theme-hope/module/blog/components/icons`: 信息图标
- `@theme-hope/module/blog/composables`: 信息可组合 API
- `@theme-hope/module/blog/utils`: 信息通用函数

:::

::: details 博客组件别名

组件:

- `@theme-hope/module/blog/components/ArticleItem`: 文章项
- `@theme-hope/module/blog/components/ArticleList`: 文章列表
- `@theme-hope/module/blog/components/ArticleType`: 文章类型
- `@theme-hope/module/blog/components/BloggerInfo`: 博主信息
- `@theme-hope/module/blog/components/BlogHero`: 博客主页 Logo 与介绍
- `@theme-hope/module/blog/components/BlogHome`: 博客主页
- `@theme-hope/module/blog/components/BlogPage`: 博客普通页面
- `@theme-hope/module/blog/components/CategoryList`: 分类列表
- `@theme-hope/module/blog/components/InfoList`: 博客信息列表
- `@theme-hope/module/blog/components/InfoPanel`: 博客信息面板
- `@theme-hope/module/blog/components/Pagination`: 分页组件
- `@theme-hope/module/blog/components/ProjectPanel`: 博客主页项目面板
- `@theme-hope/module/blog/components/SocialMedia`: 社交媒体链接
- `@theme-hope/module/blog/components/TagList`: 标签列表
- `@theme-hope/module/blog/components/TimelineItems`: 时间线项目
- `@theme-hope/module/blog/components/TimelineList`: 时间线列表

杂项:

- `@theme-hope/module/blog/components/icons`: 博客图标
- `@theme-hope/module/blog/composables`: 博客可组合 API

:::

::: details 加密组件别名

组件:

- `@theme-hope/module/encrypt/components/GlobalEncrypt`: 全局加密
- `@theme-hope/module/encrypt/components/LocalEncrypt`: 本地加密
- `@theme-hope/module/encrypt/components/PasswordModal`: 密码输入框

杂项:

- `@theme-hope/module/encrypt/composables`: 加密可组合 API
- `@theme-hope/module/encrypt/utils`: 加密通用函数

:::

::: details 外观模块组件别名

- `@theme-hope/module/outlook/components/AppearanceMode`: 主题外观模式
- `@theme-hope/module/outlook/components/AppearanceSwitch`: 主题外观开关
- `@theme-hope/module/outlook/components/OutlookButton`: 外观按钮
- `@theme-hope/module/outlook/components/OutlookSettings`: 外观设置
- `@theme-hope/module/outlook/components/ThemeColor`: 主题色
- `@theme-hope/module/outlook/components/ThemeColorPicker`: 主题色选择器
- `@theme-hope/module/outlook/components/ToggleFullScreenButton`: 全屏切换按钮

杂项:

- `@theme-hope/module/outlook/components/icons`: 外观图标
- `@theme-hope/module/outlook/composables`: 外观可组合 API

:::

## 插槽利用

有些组件提供了插槽，在这种情况下，你可以在覆盖组件时直接引入原组件，并通过插槽传入你需要的内容。

比如你的网站社交属性很强，你希望在主页也显示评论框的话，你可以这样引入:

::: code-tabs

@tab config.ts

```ts
// .vuepress/config.ts
import { path } from "@vuepress/utils";
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    // 主题选项
    // ...
  }),

  alias: {
    // 你可以在这里将别名定向到自己的组件
    // 比如这里我们将主题的主页组件改为用户 .vuepress/components 下的 HomePage.vue
    "@theme-hope/components/HomePage": path.resolve(
      __dirname,
      "./components/HomePage.vue"
    ),
  },
});
```

@tab HomePage.vue

```vue
<template>
  <HopeHomePage>
    <!-- 使用 bottom 插槽引入评论组件 -->
    <template #bottom>
      <CommentService />
    </template>
  </HopeHomePage>
</template>
<script setup lang="ts">
import HopeHomePage from "vuepress-theme-hope/lib/client/components/HomePage";
</script>
```

:::

提供插槽的组件如下:

**主题**:

- `AutoLink`: `default`, `before`, `after`
- `CommonWrapper`: `default`, `navbarLeftStart`, `navbarLeftEnd`, `navbarCenterStart`, `navbarCenterEnd`, `navbarRightStart`, `navbarRightEnd`, `navScreenTop`, `navScreenBottom`, `sidebar`, `sidebarTop`, `sidebarBottom`
- `HomeHero`: `heroImage`, `heroInfo`
- `HomePage`: `top`, `center`, `bottom`
- `NormalPage`: `top`, `contentBefore`, `contentAfter`, `bottom`

**导航栏**:

- `DropdownLink`: `title`
- `NavActions`: `before`, `after`
- `Navbar`: `left`, `center`, `right`
- `NavbarBrand`: `default`
- `NavScreen`: `before`, `after`
- `NavScreenDropdown`: `before`, `after`

**侧边栏**:

- `Sidebar`: `top`, `default`, `bottom`

**博客**:

- `BlogHero`: `heroImage`, `heroInfo`

::: tip

对于每个插槽的对应位置和功能，请详见 [主题源码](https://github.com/vuepress-theme-hope/vuepress-theme-hope/tree/main/packages/theme/src/client/)。

:::
