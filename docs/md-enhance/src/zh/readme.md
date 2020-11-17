---
home: true
title: vuepress-plugin-md-enhance
icon: home
heroImage: /logo.svg
heroText: vuepress-plugin-md-enhance
tagline: 为 VuePress 提供更多 Markdown 增强功能
action:
  - text: 快速上手 💡
    link: /zh/guide/

  - text: 配置 🛠
    link: /zh/config/

features:
  - title: 上下角标支持
    details: 你的 Markdown 现在将支持上下角标
    link: /zh/guide/sup-sub/

  - title: 脚注
    details: 你的 Markdown 现在将支持脚注
    link: /zh/guide/footnote/

  - title: 自定义对齐支持
    details: 让你在 Markdown 中对段落进行对齐
    link: /zh/guide/align/

  - title: 标记支持
    details: 让你在 Markdown 中对词句进行标记
    link: /zh/guide/mark/

  - title: 流程图支持
    details: 可以在 Markdown 中直接写出流程图
    link: /zh/guide/flowchart/

  - title: Tex 支持
    details: Markdown 现在也可以支持 Tex 语法以显示公式
    link: /zh/guide/tex/

  - title: 代码案例支持
    details: 你可以很方便的插入代码案例
    link: /zh/guide/demo/

  - title: 幻灯片支持
    details: 你可以直接在 Markdown 中插入幻灯片
    link: /zh/guide/presentation/

footer: MIT Licensed | Copyright © 2019-present Mr.Hope
copyrightText: false
---

## 使用插件

### 安装

```bash
npm i -D vuepress-plugin-md-enhance
```

或

```bash
yarn add -D vuepress-plugin-md-enhance
```

### 使用

```js
// .vuepress/config.js
module.exports = {
  plugins: [
    [
      "md-enhance",
      {
        // 配置选项
      },
    ],
  ],
};
```
