---
title: 替换主题组件
icon: boxes-packing
order: -2
category:
  - 高级
tag:
  - 高级
  - 自定义
---

当在 [行为选项](../../config/theme/behavior.md) 中设置 `{ custom: true }` 时，主题将通过 `@theme-hope` 别名来引入组件，所以你可以利用这一点来替换主题的任何一个组件。

<!-- more -->

## 如何通过别名替换组件

你需要在自己的 VuePress 配置文件通过 `alias` 替换主题中使用的组件别名。

```ts twoslash title=".vuepress/config.ts"
import { getDirname, path } from "vuepress/utils";
import { hopeTheme } from "vuepress-theme-hope";

const __dirname = getDirname(import.meta.url);

export default {
  theme: hopeTheme(
    {
      // 主题选项
      // ...
    },
    { custom: true },
  ),

  alias: {
    // 你可以在这里将别名定向到自己的组件
    // 比如这里我们将主题的主页组件改为用户 .vuepress/components 下的 HomePage.vue
    "@theme-hope/components/home/HomePage": path.resolve(
      __dirname,
      "./components/HomePage.vue",
    ),
  },
};
```

有些组件提供了插槽，在这种情况下，你可以在覆盖组件时直接引入原组件，并通过插槽传入你需要的内容。

## 主题别名

### 基础组件

- `@theme-hope/components/base/AutoLink`: 基础链接

  插槽: `default`, `before`, `after`

- `@theme-hope/components/base/BreadCrumb`: 面包屑导航

- `@theme-hope/components/base/EditIcon`: 编辑图标

- `@theme-hope/components/base/MainFadeInUpTransition`: 主布局过渡

  插槽: `default`

- `@theme-hope/components/base/MainLayout`: 主布局

  插槽: `default`, `navScreenTop`, `navScreenBottom`, `sidebarItems`, `sidebarTop`, `sidebarBottom`

  - `navScreenTop` `navScreenBottom` 插槽被传递到 `NavBar` 组件。
  - `sidebarItems`, `sidebarTop`, `sidebarBottom` 插槽被传递到 `Sidebar` 组件。

- `@theme-hope/components/base/MarkdownContent`: Markdown 内容

  插槽: `contentBefore`, `contentAfter`

- `@theme-hope/components/base/PageContent`: 主要页面内容

  插槽: `pageTop`, `pageBottom`, `content`, `contentBefore`, `contentAfter`, `toc`, `tocBefore`, `tocAfter`

  - `contentBefore`, `contentAfter` 插槽被传递到 `MarkdownContent` 组件。
  - `toc`, `tocBefore`, `tocAfter` 插槽被传递到 `TOC` 组件。

- `@theme-hope/components/base/PageFooter`: 页脚

- `@theme-hope/components/base/PrintButton`: 打印按钮

- `@theme-hope/components/base/PageNav`: 页面导航

- `@theme-hope/components/base/PageTitle`: 页面标题

- `@theme-hope/components/base/SkipLink`: 指向主要内容的链接

- `@theme-hope/components/base/TOC`: 页面目录

  插槽: `toc` `tocBefore`, `tocAfter`

### 主页组件

- `@theme-hope/components/home/FeatureSection`: 主页特色部分

- `@theme-hope/components/home/HighlightSection`: 主页高亮部分

- `@theme-hope/components/home/HeroInfo`: 主页英雄信息

  插槽: `heroInfo`, `heroLogo`, `heroBg`

  - `heroInfo` 插槽接收 `text` `tagline` `isFullScreen` 和 `style` 属性。
  - `heroLogo` 插槽接收 `image` `imageDark` `alt` 和 `style` 属性。
  - `heroBg` 插槽接收 `image` `imageDark` 和 `style` 属性。

- `@theme-hope/components/home/HeroSlideDownButton`: 主页英雄滑动按钮

- `@theme-hope/components/home/HomePage`: 默认主页 (项目主页)

  插槽: `heroInfo`, `heroLogo`, `heroBg`, `heroBefore`, `heroAfter`, `content`, `contentBefore`, `contentAfter`

  - `heroInfo`, `heroLogo`, `heroBg` 插槽被传递到 `HeroInfo` 组件。
  - `heroBefore`, `heroAfter` 插槽被传递到 `MainFadeInUpTransition` 组件。

- `@theme-hope/components/home/PortfolioHero`: 作品集英雄信息

  插槽: `portfolioInfo`, `portfolioAvatar`, `portfolioBg`

  - `portfolioInfo` 插槽接收 `name` `welcome` `title` `titles` 和 `links` 属性。
  - `portfolioAvatar` 插槽接收 `avatar` `avatarDark` `style` 和 `alt` 属性。
  - `portfolioBg` 插槽接收 `image` `imageDark` 和 `style` 属性。

- `@theme-hope/components/home/PortfolioHome`: 作品集主页

  插槽: `portfolioInfo`, `portfolioAvatar`, `portfolioBg`

  - `portfolioInfo`, `portfolioAvatar`, `portfolioBg` 插槽被传递到 `PortfolioHero` 组件。

### 导航栏组件

- `@theme-hope/components/navbar/I18nIcon`: 多语言图标

- `@theme-hope/components/navbar/LanguageDropdown`: 语言下拉菜单

- `@theme-hope/components/navbar/Navbar`: 导航栏组件

  插槽: `navScreenTop`, `navScreenBottom`

  - `navScreenTop` `navScreenBottom` 插槽被传递到 `NavBar` 组件。

- `@theme-hope/components/navbar/NavbarBrand`: 导航栏品牌信息

- `@theme-hope/components/navbar/NavbarDropdown`: 下拉列表

  插槽: `title`

- `@theme-hope/components/navbar/NavbarLinks`: 导航栏链接

- `@theme-hope/components/navbar/NavScreen`: 移动视图导航页面

  插槽: `navScreenTop`, `navScreenBottom`

- `@theme-hope/components/navbar/NavScreenLinks`: 导航页面链接

- `@theme-hope/components/navbar/NavScreenMenu`: 导航页面菜单

- `@theme-hope/components/navbar/RepoLink`: 仓库链接

- `@theme-hope/components/navbar/ToggleNavbarButton`: 导航栏切换按钮

- `@theme-hope/components/navbar/ToggleSidebarButton`: 侧边栏切换按钮

### 侧边栏组件

- `@theme-hope/components/sidebar/Sidebar`: 侧边栏

  插槽: `sidebarItems`, `sidebarTop`, `sidebarBottom`

  - `sidebarItems` 插槽接收 `sidebarItems` 属性。

- `@theme-hope/components/sidebar/SidebarChild`: 侧边栏子项

- `@theme-hope/components/sidebar/SidebarGroup`: 侧边栏组

- `@theme-hope/components/sidebar/SidebarLinks`: 侧边栏链接

### 信息组件

- `@theme-hope/components/info/AuthorInfo`: 作者信息
- `@theme-hope/components/info/CategoryInfo`: 分类信息
- `@theme-hope/components/info/DateInfo`: 日期信息
- `@theme-hope/components/info/OriginalInfo`: 原创标记
- `@theme-hope/components/info/PageInfo`: 页面信息
- `@theme-hope/components/info/PageMeta`: 页面元信息
- `@theme-hope/components/info/PageViewInfo`: 页面浏览量信息
- `@theme-hope/components/info/ReadingTimeInfo`: 阅读时间信息
- `@theme-hope/components/info/TagInfo`: 标签信息
- `@theme-hope/components/info/WordInfo`: 字数信息
- `@theme-hope/components/info/icons`: 信息图标

### 外观组件

- `@theme-hope/components/appearance/AppearanceButton`: 外观按钮
- `@theme-hope/components/appearance/AppearanceIcon`: 外观图标
- `@theme-hope/components/appearance/AppearanceSettings`: 外观设置
- `@theme-hope/components/appearance/ColorMode`: 颜色模式
- `@theme-hope/components/appearance/ColorModeSwitch`: 颜色模式开关
- `@theme-hope/components/appearance/ThemeColor`: 主题颜色
- `@theme-hope/components/appearance/ThemeColorPicker`: 主题颜色选择器
- `@theme-hope/components/appearance/ToggleFullScreen`: 全屏切换
- `@theme-hope/components/appearance/ToggleFullScreenButton`: 全屏切换按钮

### 过渡组件

- `@theme-hope/components/transition/DropTransition`: 下落过渡组件
  插槽: `default`

### 博客组件

- `@theme-hope/components/blog/ArticleItem`: 文章项目

  插槽: `articleTitle`, `articleCover`, `articleInfo`, `articleExcerpt`

  - `articleTitle` 插槽接收 `title` `isEncrypted` 和 `type` 属性。
  - `articleCover` 插槽接收 `cover` 属性。
  - `articleInfo` 插槽接收 `author` `category` `tag` `date` `isOriginal` `pageview` `readingTime` 和 `readingTimeLocale` 属性。
  - `articleExcerpt` 插槽接收 `excerpt` 属性。

- `@theme-hope/components/blog/ArticleList`: 文章列表

  插槽: `articleTitle`, `articleCover`, `articleInfo`, `articleExcerpt`

  - `articleTitle`, `articleCover`, `articleInfo`, `articleExcerpt` 插槽被传递到 `ArticleItem` 组件。

- `@theme-hope/components/blog/ArticlesInfo`: 文章信息

- `@theme-hope/components/blog/ArticleType`: 文章类型

- `@theme-hope/components/blog/BloggerInfo`: 博主信息

  插槽: `bloggerInfo`

  - `bloggerInfo` 插槽接收 `name` `avatar` 和 `description` 属性。

- `@theme-hope/components/blog/BlogHero`: 博客英雄信息

  插槽: `heroInfo`, `heroLogo`, `heroBg`

  - `heroInfo` 插槽接收 `text` `tagline` `isFullScreen` 和 `style` 属性。
  - `heroLogo` 插槽接收 `image` `imageDark` `alt` 和 `style` 属性。
  - `heroBg` 插槽接收 `image` `imageDark` 和 `style` 属性。

- `@theme-hope/components/blog/BlogHome`: 博客主页

  插槽: `heroInfo`, `heroLogo`, `heroBg`, `heroBefore`, `heroAfter`, `articleCover`, `articleTitle`, `articleInfo`, `articleExcerpt`, `bloggerInfo`, `infoBefore`, `infoAfter`, `content`, `contentBefore`, `contentAfter`

  - `heroInfo`, `heroLogo`, `heroBg` 插槽被传递到 `BlogHero` 组件。
  - `articleTitle`, `articleCover`, `articleInfo`, `articleExcerpt` 插槽被传递到 `ArticleList` 组件。
  - `bloggerInfo` 插槽被传递到 `BloggerInfo` 组件。
  - `infoBefore`, `infoAfter` 插槽被传递到 `InfoPanel` 组件。
  - `contentBefore`, `contentAfter` 插槽被传递到 `MarkdownContent` 组件。

- `@theme-hope/components/blog/BlogMainLayout`: 博客主布局

  插槽: `default`, `navScreenTop`, `navScreenBottom`, `sidebarItems`, `sidebarTop`, `sidebarBottom`, `bloggerInfo`

  - `navScreenTop` `navScreenBottom` 插槽被传递到 `NavBar` 组件。

- `@theme-hope/components/blog/CategoriesInfo`: 分类信息

- `@theme-hope/components/blog/CategoryList`: 分类列表

- `@theme-hope/components/blog/CategoryPage`: 分类页面

  插槽: `default`, `articleTitle`, `articleCover`, `articleInfo`, `articleExcerpt`, `articleBefore`, `articleAfter`, `bloggerInfo`, `infoBefore`, `infoAfter`

  - `articleTitle`, `articleCover`, `articleInfo`, `articleExcerpt` 插槽被传递到 `ArticleList` 组件。
  - `bloggerInfo` 插槽被传递到 `BloggerInfo` 组件。
  - `infoBefore`, `infoAfter` 插槽被传递到 `InfoPanel` 组件。

- `@theme-hope/components/blog/InfoList`: 信息列表

  插槽: `bloggerInfo`, `infoBefore`, `infoAfter`

- `@theme-hope/components/blog/InfoPanel`: 信息面板

  - `bloggerInfo` 插槽被传递到 `BloggerInfo` 组件。

- `@theme-hope/components/blog/Pagination`: 分页导航

- `@theme-hope/components/blog/ProjectPanel`: 博客项目面板

- `@theme-hope/components/blog/SocialMedias`: 社交媒体链接

- `@theme-hope/components/blog/TagList`: 标签列表

- `@theme-hope/components/blog/TagPage`: 标签页面

- `@theme-hope/components/blog/TagsInfo`: 标签信息

- `@theme-hope/components/blog/TimelineItems`: 时间线项目

- `@theme-hope/components/blog/TimelineList`: 时间线列表

- `@theme-hope/components/blog/TimelinePage`: 时间线页面

  插槽: `articleBefore`, `articleAfter`, `bloggerInfo`, `infoBefore`, `infoAfter`

  - `bloggerInfo` 插槽被传递到 `BloggerInfo` 组件。
  - `infoBefore`, `infoAfter` 插槽被传递到 `InfoPanel` 组件。

- `@theme-hope/components/blog/TypePage`: type page

  插槽: `default`, `articleTitle`, `articleCover`, `articleInfo`, `articleExcerpt`, `articleBefore`, `articleAfter`, `bloggerInfo`, `infoBefore`, `infoAfter`

  - `articleTitle`, `articleCover`, `articleInfo`, `articleExcerpt` 插槽被传递到 `ArticleList` 组件。
  - `bloggerInfo` 插槽被传递到 `BloggerInfo` 组件。
  - `infoBefore`, `infoAfter` 插槽被传递到 `InfoPanel` 组件。

- `@theme-hope/components/blog/icons`: 博客图标

### 加密组件

- `@theme-hope/modules/encrypt/components/GlobalEncrypt`: 全局加密

  插槽: `default`

- `@theme-hope/modules/encrypt/components/LocalEncrypt`: 局部加密

  插槽: `default`

- `@theme-hope/modules/encrypt/components/PasswordModal`: 密码输入

### 其他别名

主题的可组合式 API，布局和工具函数也提供了别名。详见 [主题源代码](https://github.com/vuepress-theme-hope/vuepress-theme-hope/tree/main/packages/theme/src/client/)。
