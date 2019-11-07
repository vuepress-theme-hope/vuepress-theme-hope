---
home: true
title: vuepress-theme-hope
heroImage: /logo.svg
heroText: vuepress-theme-hope
tagline: 一个轻量的 Vuepress 主题
actionText: 使用说明 →
actionLink: /guide/
features:
- title: 主题色切换
  details: 支持自定义主题色并允许用户在预设的主题颜色之间切换
  link: /guide/themecolor.html#自定义主题色
- title: 夜间模式
  details: 可以在官方主题与一套酷炫的夜间模式间自由切换
  link: /guide/themecolor.html#夜间模式
- title: 浏览量与评论
  details: 配合 Valine 与 Vssue 来开启阅读量统计与评论支持
  link: /guide/comment.html
- title: 默认主题的增强
  details: 在默认主题基础上增强了一系列功能，包括路径导航、页脚支持、作者显示等
- title: 图标支持
  details: 贯穿整个主题的图标支持
footer: MIT Licensed | Copyright © 2019-present Mr.Hope
---

### vuepress-theme-hope 是一个轻量主题

## 使用主题

借助 Vuepress 强大的主题系统，启用主题从未如此简单。

### 安装

```bash
npm i -D vuepress-theme-hope
```

### 使用

```js
// .vuepress/config.js
module.exports = {
  theme: 'hope'
};
```

### 完全兼容

引入主题后，无需进行任何配置，主题即可正常工作！
