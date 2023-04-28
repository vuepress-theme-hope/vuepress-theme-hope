---
home: true
title: 主页
icon: home
heroImage: /logo.svg
heroText: vuepress-plugin-md-enhance
tagline: 为 VuePress2 提供更多 Markdown 增强功能
actions:
  - text: 快速上手 💡
    link: /zh/guide/
    type: primary

  - text: 配置 🛠
    link: /zh/config.html

features:
  - title: 链接检查
    icon: clipboard-check
    details: 检查 Markdown 链接
    link: /zh/guide/others.html#link-check

  - title: 自定义容器支持
    icon: box-archive
    details: 用样式装饰 Markdown 内容
    link: /zh/guide/container.html

  - title: 选项卡
    icon: table-columns
    details: 使用选项卡对相似内容进行分组
    link: /zh/guide/tabs.html

  - title: 代码组
    icon: code
    details: 使用选项卡对相似代码进行分组
    link: /zh/guide/code-tabs.html

  - title: 自定义对齐支持
    icon: align-center
    details: 让你在 Markdown 中对段落进行对齐
    link: /zh/guide/align.html

  - title: 自定义属性支持
    icon: code
    details: 让你为 Markdown 元素添加属性
    link: /zh/guide/attrs.html

  - title: 上下角标支持
    icon: superscript
    details: 你的 Markdown 现在将支持上下角标
    link: /zh/guide/sup-sub.html

  - title: 脚注
    icon: quote-left
    details: 你的 Markdown 现在将支持脚注
    link: /zh/guide/footnote.html

  - title: 标记支持
    icon: highlighter
    details: 让你在 Markdown 中对词句进行标记
    link: /zh/guide/mark.html

  - title: 任务列表
    icon: square-check
    details: 在 Markdown 中使用任务列表
    link: /zh/guide/tasklist.html

  - title: 图片语法
    icon: image
    details: 使用改进的语法指定图片大小与颜色模式
    link: /zh/guide/image.html

  - title: 卡片支持
    icon: square
    details: 在 Markdown 中展示卡片
    link: /zh/guide/card.html

  - title: 图表支持
    icon: chart-simple
    details: 在 Markdown 中展示图表
    link: /zh/guide/chart.html

  - title: 流程图支持
    icon: route
    details: 可以在 Markdown 中直接写出流程图
    link: /zh/guide/flowchart.html

  - title: Mermaid 支持
    icon: chart-pie
    details: 可以在 Markdown 中添加 Mermaid 图例
    link: /zh/guide/mermaid.html

  - title: Tex 支持
    icon: square-root-variable
    details: Markdown 现在也可以支持 Tex 语法以显示公式
    link: /zh/guide/tex.html

  - title: 导入文件支持
    icon: fab fa-markdown
    details: 将你的文档分段，并在 Markdown 中导入
    link: /zh/guide/include.html

  - title: 交互演示支持
    icon: code
    details: 你可以在 Markdown 中添加交互演示
    link: /zh/guide/playground.html

  - title: Vue 交互演示支持
    icon: fab fa-vuejs
    details: 在交互演示中展示 Vue 组件
    link: /zh/guide/vue-playground.html

  - title: 代码案例支持
    icon: laptop-code
    details: 你可以很方便的插入代码案例
    link: /zh/guide/demo/

  - title: 幻灯片支持
    icon: person-chalkboard
    details: 你可以直接在 Markdown 中插入幻灯片
    link: /zh/guide/presentation/

footer: 使用 <a href="https://theme-hope.vuejs.press/zh/" target="_blank">VuePress Theme Hope</a> 主题 | MIT 协议, 版权所有 © 2019-present Mr.Hope

copyright: false
---

## 使用插件

### 安装

::: code-tabs#shell

@tab pnpm

```bash
pnpm add -D vuepress-plugin-md-enhance
```

@tab yarn

```bash
yarn add -D vuepress-plugin-md-enhance
```

@tab npm

```bash
npm i -D vuepress-plugin-md-enhance
```

:::

### 使用

::: code-tabs#language

@tab TS

```ts
// .vuepress/config.ts
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";

export default {
  plugins: [
    mdEnhancePlugin({
      // 你的选项
    }),
  ],
};
```

@tab JS

```js
// .vuepress/config.js
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";

export default {
  plugins: [
    mdEnhancePlugin({
      // 你的选项
    }),
  ],
};
```

:::

## 从 V1 迁移

详见 [迁移指南](./migration.md)。

<NetlifyBadge alt="通过 Netlify 部署" />

<script setup lang="ts">
import NetlifyBadge from "@NetlifyBadge";
</script>
