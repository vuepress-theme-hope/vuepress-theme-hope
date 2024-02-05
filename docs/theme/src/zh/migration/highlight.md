---
title: V2 亮点
icon: fire
order: 1
category:
  - 迁移
tag:
  - 迁移
  - 亮点
---

我们强烈建议你切换到 V2 版本，因为 V2 版本提供了以下改进。

<!-- more -->

## 总览

V2 基于 [_VuePress2_](https://vuejs.press/zh/)， 通过 [_Vite5_](https://cn.vitejs.dev/) / [_Webpack5_](https://webpack.docschina.org/) 提供通过 [_Vue3_](https://cn.vuejs.org/) 提供强大功能。

V2 完全重写，包括:

- 所有组件都用 Vue3 中的 _Composition API_ 重写
- 所有样式都迁移到 _Sass_

V2 也有更好的表现: 🚀

- DevServer 冷启动时间减少了 **70%**
- 构建内存使用量减少了 **65%**
- 构建时间减少了 **75%**
- 输出尺寸减少 **35%**
- 网页性能提高 **60%**

## Vue3 变更

Vue 3 使用 Proxy 来提供响应式并支持全新的组合 API。基于 Proxy 的响应式比基于 setter/getter 的旧的响应式快得多。

此外，Composition API 是 tree-shaking 友好的，这意味着没有开启的功能可以在构建过程中被移除。

## VuePress2 变更

VuePress v2 是使用 TypeScript 开发的，因此它现在提供了更好的 TS 支持。

VuePress@v2 也将打包器与核心解耦。 VuePress v2 添加了 Webpack 和 Vite 打包器的支持。现在 Vite 是默认的打包器，而你仍然可以选择使用 Webpack。你可以在开发模式下使用 Vite 以获得更好的开发体验，在构建模式下使用 Webpack 以获得更好的浏览器兼容性。

VuePress@v2 比 VuePress@v1 灵活得多，它删除了 siteData 和 siteData.pages，这大大提高了可扩展性 (特别是在具有大量页面的大型网站上)。与 V1 相比，它的性能得分更高，加载时间更少，网页性能更高。

## VuePress Theme Hope 变更

VuePressThemeHope@v2 使用组合 API 重写，其样式系统从 stylus 迁移到 sass。

通过使用 composition api 重写主题和插件，在捆绑时通过 tree-shaking 几乎可以删除所有你禁用的功能，以便你轻松获得更小的尺寸。

此外，我们正在向 VuePressThemeHope@v2 添加新功能。

### 新功能

#### 博客

- 现在整个博客功能都 tree-shakable，并且默认禁用。

  要启用它，你需要将 `plugins.blog` 设置为 `true`。

- 社交媒体图标支持 tree-shakable，并且可以 [自定义图标](../guide/blog/blogger.md)

- 支持 [禁用博客主页的 Hero 部分或背景图片](../guide/blog/home.md)

- 博客主页的项目支持 [自定义图标](../guide/blog/home.md)

- 支持 [配置博客页面的路径](../guide/blog/path.md)

- 支持 [自定义博客文章类型](../guide/blog/article.md#其他类型的文章)

- 支持 [自动摘要生成](../guide/blog/article.md#自动生成摘要)

#### 评论

不再支持 Valine 和 Vssue。

相反，我们在 Waline 之外添加了 Artalk、Giscus 和 Twikoo 支持。

#### 加密

- 现在加密功能同样 tree-shakable，并且只有在必要时才进行加密检查。

- Frontmatter 中的密码支持被删除

#### Feed

- 不再默认生成 feed
- 提供 `getter` 选项让你完全自定义 feed 生成。

#### PhotoSwipe

使用体积更小的 PhotoSwipe@v5。

#### PWA

- 支持更新提示控制
- 支持自动为 Manifest 补充 Base。

#### 搜索引擎优化

- 添加规范链接支持
- 添加 JSON-LD 支持
- 你现在也可以在 V2 中注入任何 `<head>` 标签。

#### 自动目录页

- 新增的 `@vuepress/catalog` 插件可以为你自动生成目录页

#### 其他

- 纯净模式

  该主题现在支持具有较少花哨样式与动画的 [纯净模式](../guide/interface/pure.md)。

- RTL 布局

  主题现在完全支持 RTL 布局

- 打印支持

  你现在可以使用打印按钮打印主题页面

### 布局

#### 主页

- 全新主页样式
- 添加了多特性支持
- 特性添加图标支持

#### 页面

- 外观更新

- 目录重构，现在目录自动滚动到活动标题

- 支持 [更多 Markdown 组件](../guide/component/built-in.md)

#### 导航栏和侧边栏

- 更新了外观

- 现在共享相同的配置选项

- 新的 `activeMatch` 选项控制项目是否应该被激活

- 新的 `"structure"` 关键字支持 [从文件结构生成侧边栏](../guide/layout/sidebar.md#自动生成侧边栏)

- 侧边栏现在会自动打开并滚动到激活项目

#### 打印

现在你可以打印网站页面。

#### 代码块主题

现在你可以在深色模式和浅色模式下为代码块 [设置不同的主题](../guide/interface/code-theme.md)。

### Markdown

添加了以下新功能:

- [图像标记](../guide/markdown/image.md#图片-id-标记)

- [GFM](../guide/markdown/others.md#gfm)

- [Chart.js](../guide/markdown/chartjs.md)

- [ECharts](../guide/markdown/echarts.md)

- [文件引入](../guide/markdown/include.md)

- [代码组](../guide/markdown/code-tabs.md)

- [选项卡](../guide/markdown/tabs.md)
