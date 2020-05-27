---
home: true
title: vuepress-theme-hope
icon: homefill
heroImage: /logo.svg
heroText: vuepress-theme-hope
tagline: 一个轻量的 Vuepress 主题
action:
  - text: 快速上手 💡
    link: /guide/

  - text: 配置 🛠
    link: /config/

features:
  - title: 主题色切换
    details: 支持自定义主题色并允许用户在预设的主题颜色之间切换
    link: /guide/feature/themecolor/#自定义主题色

  - title: 深色模式
    details: 可以自由切换浅色模式与深色模式
    link: /guide/feature/themecolor/#深色模式

  - title: 浏览量与评论
    details: 配合 Valine 与 Vssue 来开启阅读量统计与评论支持
    link: /guide/feature/comment/

  - title: 文章信息展示
    details: 为你的文章添加作者、写作日期、预计阅读时间、字数统计等信息
    link: /guide/feature/page-info/

  - title: Markdown 增强
    details: 新增文字对齐、上下角标、脚注、标记、公式与流程图支持
    link: /guide/feature/markdown/

  - title: 博客支持
    details: 为你的文章添加日期、标签和分类，将自动生成文章、分类、标签与时间轴列表
    link: /guide/feature/blog/

  - title: 文章加密
    details: 你可以为你的特定页面或特定目录进行加密，以便陌生人不能随意访问它们
    link: /guide/feature/encrypt/

  - title: 更多新特性
    details: 包括博客主页、图标支持、路径导航、页脚支持、全屏按钮、返回顶部按钮等
    link: /guide/feature/

  - title: PWA 支持
    details: 内置的 PWA 插件会让你的网站更像一个 APP。

  - title: TS 支持
    details: 为你的 Vuepress 开启 Typescript 支持

footer: MIT Licensed | Copyright © 2019-present Mr.Hope
copyright: false
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
const resolve = require("vuepress-theme-hope/resolve");

module.exports = resolve({
  // your config here
});
```

::: tip
引入 resolve 函数的作用是在你编辑配置的时候，通过 TS 的 Interface 以及 JSDoc，很方便的给你提示。

同时，resolve 函数也会为你补全一些直接交付给 vuepress 的默认配置。
:::

### FAQ

如果你的项目没有使用 typescript，你可能还需要安装 typescript:

```bash
npm i -D typescript
```

并在你的根目录创建一个 tsconfig.json 文件:

```json
{
  "compilerOptions": {
    "target": "ES6", // 任何不低于 ES6 的 target 均可
    "allowSyntheticDefaultImports": true, // 规避 vuepress-types 的类型定义问题
    "experimentalDecorators": true, // Vue 的 Typescript 写法需要开启此选项
    "module": "commonjs", // 为了避免 vuepress-types 解析失败
    // vuepress 与本主题的类型定义文件
    "types": ["@mr-hope/vuepress-theme-types"]
  },
  "include": [
    "src/.vuepress/enhanceApp.ts" // 请将 src 替换成你的文档目录
  ]
}
```

如果主题引入后在运行中出现 Typescript 相关错误，这可能是你的项目没有正确对 Typescript 进行配置。

具体详情请见 [FAQ](FAQ/readme.md)
