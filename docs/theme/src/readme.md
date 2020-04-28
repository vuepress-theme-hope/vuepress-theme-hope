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
    link: /guide/feature/themecolor.html#自定义主题色

  - title: 深色模式
    details: 可以自由切换浅色模式与深色模式
    link: /guide/feature/themecolor.html#深色模式

  - title: 浏览量与评论
    details: 配合 Valine 与 Vssue 来开启阅读量统计与评论支持
    link: /guide/feature/comment.html

  - title: 博客支持
    details: 为你的文章添加日期、标签和分类并按照访客筛选条件展示它们
    link: /guide/feature/blog.html

  - title: 更多新特性
    details: 在默认主题基础上增强了一系列功能，包括图标支持、路径导航、页脚支持、作者显示等

  - title: PWA 支持
    details: 内置的 PWA 插件会让你的网站更像一个 APP。

  - title: TS 支持
    details: 为你的 Vuepress 开启 Typescript 支持

footer: MIT Licensed | Copyright © 2019-present Mr.Hope
---

## 使用主题

你可以直接使用 [vuepress-theme-hope 模板](https://github.com/Mister-Hope/vuepress-theme-hope-template) 来开始你的 vuepress 之旅。

### 安装

```bash
npm i -D vuepress-theme-hope
```

### 使用

```js
// .vuepress/config.js
const resolve = require('vuepress-theme-hope/resolve');

module.exports = resolve({
  // your config here
});
```

::: tip
引入 resolve 函数的作用是在你编辑配置的时候，通过 TS 的 Interface 以及 JSDoc，给予你充分的提示。

同时，resolve 函数也会在你预览或打包项目时针对你当前的配置项，为你补全一些默认配置，减少网站渲染时的计算压力。
:::

### FAQ

如果你的项目没有使用 typescript，你可能还需要安装 typescript:

```bash
npm i -D typescript
```

并在你的根目录创建一个 tsconfig.json 文件

```json
{
  "compilerOptions": {
    "target": "ES6", // 任何不低于 ES6 的 target 均可
    "experimentalDecorators": true, // Vue 的 Typescript 写法需要开启此选项
    // vuepress 与本主题的类型定义文件
    "types": ["@mr-hope/vuepress-theme-types", "vuepress-types"]
  },
  "include": [
    "src/.vuepress/enhanceApp.ts" // 请将 src 替换成你的文档目录
  ]
}
```

如果主题引入后在运行中出现 Typescript 相关错误，这可能是你的项目没有正确对 Typescript 进行配置。

具体详情请见 [FAQ](FAQ/readme.md)
