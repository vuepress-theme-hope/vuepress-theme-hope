---
copyright:
  minLength: 10
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

- [**@vuepress/plugin-pwa**](pwa.md)) <MyBadge text="新增" /> <MyBadge text="默认中文" type="warn" />: PWA支持

- [**@vuepress/medium-zoom**](medium-zoom.md) <MyBadge text="新增" />: 这个插件将会使你的图片支持点击缩放。

  **效果**：

  ![logo](/logo.svg)

- @vuepress/plugin-search <MyBadge text="默认配置修改" type="warn" />: 搜索插件，**将最大搜索建议增加至 10**

- vuepress-plugin-smooth-scroll <MyBadge text="默认配置修改" type="warn" />: 平滑滚动，**默认开启该功能**
