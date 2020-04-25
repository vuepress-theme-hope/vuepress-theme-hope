---
home: true
title: vuepress-plugin-md-enhance
heroImage: /logo.svg
heroText: vuepress-plugin-md-enhance
tagline: 为 Vuepress 提供更多 Markdown 增强功能
actionText: 快速上手 →
actionLink: /guide/
features:
  - title: 上下角标支持
    details: 你的 Markdown 现在将支持上下角标
    link: /guide/sup-sub.html
  - title: 脚注
    details: 你的 Markdown 现在将支持脚注
    link: /guide/footnote.html
  - title: 自定义对齐支持
    details: 让你在 Markdown 中对段落进行对齐
    link: /guide/align.html
  - title: 流程图支持
    details: 可以在 Markdown 中直接写出流程图
    link: /guide/flowchart.html
  - title: Tex 支持
    details: Markdown 现在也可以支持 Tex 语法以显示公式
    link: /guide/text.html
footer: MIT Licensed | Copyright © 2019-present Mr.Hope
---

## 使用插件

### 安装

```bash
npm i -D vuepress-plugin-md-enhance
```

### 使用

```js {3}
// .vuepress/config.js
module.exports = {
  plugin: ['md-enhance']
};
```
