---
category: api
copyright:
  minLength: 10
tag: 
 - plugin
 - api
---

# 插件说明

除了继承默认主题启用的插件外，vuepress-theme-hope 启用了很多 vuepress 插件，如果你不需要，可以在 `plugins` 将其禁用。

## 默认主题启用的插件

- [vuepress-plugin-container](container.md): 自定义容器

- vuepress-plugin-smooth-scroll: 平滑滚动

- @vuepress/plugin-search: 搜索插件

- @vuepress/plugin-nprogress: 进度条

- @vuepress/plugin-active-header-links: 自动激活侧边栏标题

- @vuepress/plugin-last-updated: 显示上一次更新时间

## 新增或修改的插件

- [**@mr-hope/vuepress-plugin-pwa**](pwa.md) <MyBadge text="新增" />: PWA支持

- [**@vuepress/medium-zoom**](medium-zoom.md) <MyBadge text="新增" />: 这个插件将会使你的图片支持点击缩放

  **效果**：

  ![logo](/logo.svg)

- [**vuepress-plugin-md-enhance**](https://vuepress-md-enhance.mrhope.site/) <MyBadge text="新增" />: 这个插件将会增强你的 Markdown 功能

- [**vuepress-plugin-comment**](https://comment.mrhope.site) <MyBadge text="新增" />: 这个插件提供评论与阅读量功能

- @vuepress/plugin-search <MyBadge text="修改默认值" type="warn" />: 搜索插件，**将最大搜索建议增加至 10**

- vuepress-plugin-smooth-scroll <MyBadge text="修改默认值" type="warn" />: 平滑滚动，**默认开启该功能**
