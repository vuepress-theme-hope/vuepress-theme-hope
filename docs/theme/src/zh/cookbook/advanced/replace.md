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
import { getDirname, path } from "@vuepress/utils";
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

const __dirname = getDirname(import.meta.url);

export default defineUserConfig({
  theme: hopeTheme({
    // 主题选项
    // ...
  }),

  alias: {
    // 你可以在这里将别名定向到自己的组件
    // 比如这里我们将主题的主页组件改为用户 .vuepress/components 下的 HomePage.vue
    "@theme-hope/components/HomePage.js": path.resolve(
      __dirname,
      "./components/HomePage.js"
    ),
  },
});
```

@tab JS

```js
// .vuepress/config.js
import { getDirname, path } from "@vuepress/utils";
import { hopeTheme } from "vuepress-theme-hope";

const __dirname = getDirname(import.meta.url);

export default {
  theme: hopeTheme({
    // 主题选项
    // ...
  }),

  alias: {
    // 你可以在这里将别名定向到自己的组件
    // 比如这里我们将主题的主页组件改为用户 .vuepress/components 下的 HomePage.vue
    "@theme-hope/components/HomePage.js": path.resolve(
      __dirname,
      "./components/HomePage.js"
    ),
  },
};
```

:::

::: tip

如果你想使用 `vue` 文件，你可以创建一个简单的 wrapper:

```js
// wrapper.js
import YouComponent from "./YouComponent.vue";
export default YouComponent;
```

:::

可以支持的别名如下。

::: details 主题组件别名

组件:

- `@theme-hope/components/AutoLink.js` 基础链接
- `@theme-hope/components/BreadCrumb.js` 路径导航
- `@theme-hope/components/CommonWrapper.js` 基本布局整合
- `@theme-hope/components/HomeFeatures.js` 主页特性
- `@theme-hope/components/HomeHero.js` 主页 Logo 及介绍
- `@theme-hope/components/HomePage.js` 主页
- `@theme-hope/components/Icon.js` 图标
- `@theme-hope/components/MarkdownContent.js` Markdown 内容
- `@theme-hope/components/NormalPage.js` 常规页面
- `@theme-hope/components/PageFooter.js` 页脚
- `@theme-hope/components/PageNav.js` 页面导航
- `@theme-hope/components/PageTitle.js` 页面标题
- `@theme-hope/components/SkipLink.js` 跳转到主内容
- `@theme-hope/components/transitions/DropTransition.js`: 主题下坠渐变动画
- `@theme-hope/components/transitions/FadeSlideY.js`: 主题竖直滑动渐变动画

杂项:

- `@theme-hope/components/icons/index.js` 主题图标
- `@theme-hope/composables/index.js` 主题可组合 API
- `@theme-hope/utils/index.js` 主题通用函数

:::

::: details 导航栏组件别名

组件:

- `@theme-hope/modules/navbar/components/DropdownLink.js` 下拉列表
- `@theme-hope/modules/navbar/components/LanguageDropdown.js` 语言下拉列表
- `@theme-hope/modules/navbar/components/NavActions.js` 导航栏功能
- `@theme-hope/modules/navbar/components/Navbar.js` 导航栏
- `@theme-hope/modules/navbar/components/NavbarBrand.js` 导航栏品牌信息
- `@theme-hope/modules/navbar/components/NavbarLinks.js` 导航栏链接
- `@theme-hope/modules/navbar/components/NavScreen.js` 移动视图下的导航屏
- `@theme-hope/modules/navbar/components/NavScreenDropdown.js` 移动视图下导航栏下拉菜单
- `@theme-hope/modules/navbar/components/NavScreenLinks.js` 移动式视图下导航栏链接
- `@theme-hope/modules/navbar/components/RepoLink.js` 仓库链接
- `@theme-hope/modules/navbar/components/ToggleNavbarButton.js` 导航栏切换按钮
- `@theme-hope/modules/navbar/components/ToggleSidebarButton.js` 侧边栏切换按钮

杂项:

- `@theme-hope/modules/navbar/components/icons/index.js` 导航栏图标
- `@theme-hope/modules/navbar/composables/index.js` 导航栏可组合 API

:::

::: details 侧边栏组件别名

组件:

- `@theme-hope/modules/sidebar/components/Sidebar.js` 侧边栏
- `@theme-hope/modules/sidebar/components/SidebarChild.js` 侧边栏链接子项
- `@theme-hope/modules/sidebar/components/SidebarGroup.js` 侧边栏分组链接
- `@theme-hope/modules/sidebar/components/SidebarLinks.js` 侧边栏链接

杂项:

- `@theme-hope/modules/sidebar/composables/index.js` 侧边栏可组合 API
- `@theme-hope/modules/sidebar/utils/index.js` 侧边栏通用函数

:::

::: details 信息组件别名

Components:

- `@theme-hope/modules/info/components/AuthorInfo.js` 作者信息
- `@theme-hope/modules/info/components/CategoryInfo.js` 分类信息
- `@theme-hope/modules/info/components/DateInfo.js` 写作日期信息
- `@theme-hope/modules/info/components/OriginalMark.js` 原创标识
- `@theme-hope/modules/info/components/PageInfo.js` 页面信息
- `@theme-hope/modules/info/components/PageMeta.js` 页面元数据 information
- `@theme-hope/modules/info/components/PageViewInfo.js` 浏览量信息 information
- `@theme-hope/modules/info/components/ReadingTimeInfo.js` 阅读时间信息 time information
- `@theme-hope/modules/info/components/TagInfo.js` 标签信息
- `@theme-hope/modules/info/components/TOC.js` 内容列表
- `@theme-hope/modules/info/components/WordInfo.js` 字数信息

杂项:

- `@theme-hope/modules/blog/components/icons.js` 信息图标
- `@theme-hope/modules/blog/composables/index.js` 信息可组合 API
- `@theme-hope/modules/blog/utils/index.js` 信息通用函数

:::

::: details 博客组件别名

组件:

- `@theme-hope/modules/blog/components/ArticleItem.js` 文章项
- `@theme-hope/modules/blog/components/ArticleList.js` 文章列表
- `@theme-hope/modules/blog/components/ArticleType.js` 文章类型
- `@theme-hope/modules/blog/components/BloggerInfo.js` 博主信息
- `@theme-hope/modules/blog/components/BlogHero.js` 博客主页 Logo 与介绍
- `@theme-hope/modules/blog/components/BlogHome.js` 博客主页
- `@theme-hope/modules/blog/components/BlogPage.js` 博客普通页面
- `@theme-hope/modules/blog/components/CategoryList.js` 分类列表
- `@theme-hope/modules/blog/components/InfoList.js` 博客信息列表
- `@theme-hope/modules/blog/components/InfoPanel.js` 博客信息面板
- `@theme-hope/modules/blog/components/Pagination.js` 分页组件
- `@theme-hope/modules/blog/components/ProjectPanel.js` 博客主页项目面板
- `@theme-hope/modules/blog/components/SocialMedia.js` 社交媒体链接
- `@theme-hope/modules/blog/components/TagList.js` 标签列表
- `@theme-hope/modules/blog/components/TimelineItems.js` 时间线项目
- `@theme-hope/modules/blog/components/TimelineList.js` 时间线列表

杂项:

- `@theme-hope/modules/blog/components/icons/index.js` 博客图标
- `@theme-hope/modules/blog/composables/index.js` 博客可组合 API

:::

::: details 加密组件别名

组件:

- `@theme-hope/modules/encrypt/components/GlobalEncrypt.js` 全局加密
- `@theme-hope/modules/encrypt/components/LocalEncrypt.js` 本地加密
- `@theme-hope/modules/encrypt/components/PasswordModal.js` 密码输入框

杂项:

- `@theme-hope/modules/encrypt/composables/index.js` 加密可组合 API
- `@theme-hope/modules/encrypt/utils/index.js` 加密通用函数

:::

::: details 外观模块组件别名

- `@theme-hope/modules/outlook/components/AppearanceMode.js` 主题外观模式
- `@theme-hope/modules/outlook/components/AppearanceSwitch.js` 主题外观开关
- `@theme-hope/modules/outlook/components/OutlookButton.js` 外观按钮
- `@theme-hope/modules/outlook/components/OutlookSettings.js` 外观设置
- `@theme-hope/modules/outlook/components/ThemeColor.js` 主题色
- `@theme-hope/modules/outlook/components/ThemeColorPicker.js` 主题色选择器
- `@theme-hope/modules/outlook/components/ToggleFullScreenButton.js` 全屏切换按钮

杂项:

- `@theme-hope/modules/outlook/components/icons/index.js` 外观图标
- `@theme-hope/modules/outlook/composables/index.js` 外观可组合 API

:::

## 插槽利用

有些组件提供了插槽，在这种情况下，你可以在覆盖组件时直接引入原组件，并通过插槽传入你需要的内容。

比如你的网站社交属性很强，你希望在主页也显示评论框的话，你可以这样引入:

::: code-tabs

@tab config.ts

```ts
// .vuepress/config.ts
import { getDirname, path } from "@vuepress/utils";
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

const __dirname = getDirname(import.meta.url);

export default defineUserConfig({
  theme: hopeTheme({
    // 主题选项
    // ...
  }),

  alias: {
    // 你可以在这里将别名定向到自己的组件
    // 比如这里我们将主题的主页组件改为用户 .vuepress/components 下的 HomePage.vue
    "@theme-hope/components/HomePage.js": path.resolve(
      __dirname,
      "./components/HomePage.js"
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
import HopeHomePage from "vuepress-theme-hope/components/HomePage.js";
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
- `Navbar`: `leftStart`, `leftEnd`, `centerStart`, `centerEnd`, `rightStart`, `rightEnd`
- `NavbarBrand`: `default`
- `NavScreen`: `before`, `after`
- `NavScreenDropdown`: `before`, `after`

**侧边栏**:

- `Sidebar`: `top`, `default`, `bottom`

::: tip

对于每个插槽的对应位置和功能，请详见 [主题源码](https://github.com/vuepress-theme-hope/vuepress-theme-hope/tree/main/packages/theme/src/client/)。

:::
