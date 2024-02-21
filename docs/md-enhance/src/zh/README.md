---
home: true
title: 主页
icon: home
bgImage: https://theme-hope-assets.vuejs.press/bg/6-light.svg
bgImageDark: https://theme-hope-assets.vuejs.press/bg/6-dark.svg
bgImageStyle:
  background-attachment: fixed
heroText: vuepress-plugin-md-enhance
tagline: 为 VuePress2 提供更多 Markdown 增强功能
actions:
  - text: 指南
    icon: lightbulb
    link: ./guide/
    type: primary

  - text: 配置
    icon: tools
    link: ./config.html

highlights:
  - header: 开箱即用
    image: /assets/image/box.svg
    bgImage: https://theme-hope-assets.vuejs.press/bg/3-light.svg
    bgImageDark: https://theme-hope-assets.vuejs.press/bg/3-dark.svg
    highlights:
      - title: GFM 支持
        icon: clipboard-check
        details: 支持 GitHub 风格 Markdown
        link: ./guide/others.html#gfm

  - header: 新语法
    image: /assets/image/module.svg
    bgImage: https://theme-hope-assets.vuejs.press/bg/2-light.svg
    bgImageDark: https://theme-hope-assets.vuejs.press/bg/2-dark.svg
    highlights:
      - title: 扩展图片语法
        icon: image
        details: 指定图片大小与颜色模式，并将它们转化为插图
        link: ./guide/grammar/image.html

      - title: 上下角标支持
        icon: superscript
        details: 你的 Markdown 现在将支持上下角标
        link: ./guide/grammar/sup-sub.html

      - title: 任务列表
        icon: square-check
        details: 在 Markdown 中使用任务列表
        link: ./guide/grammar/tasklist.html

      - title: Tex 支持
        icon: square-root-variable
        details: Markdown 现在也可以支持 Tex 语法以显示公式
        link: ./guide/grammar/tex.html

  - header: 内容中心
    image: /assets/image/edit.svg
    bgImage: https://theme-hope-assets.vuejs.press/bg/10-light.svg
    bgImageDark: https://theme-hope-assets.vuejs.press/bg/10-dark.svg
    highlights:
      - title: 脚注
        icon: quote-left
        details: 你的 Markdown 现在将支持脚注
        link: ./guide/content/footnote.html

      - title: 导入文件
        icon: fab fa-markdown
        details: 将你的文档分段，并在 Markdown 中导入
        link: ./guide/content/include.html

      - title: 幻灯片
        icon: person-chalkboard
        details: 通过 Reveal.js 在 Markdown 中插入幻灯片
        link: ./guide/content/revealjs/

      - title: 选项卡
        icon: table-columns
        details: 使用选项卡对相似内容进行分组
        link: ./guide/content/tabs.html

      - title: 组件
        icon: puzzle-piece
        details: 在 Markdown 中快速插入组件
        link: ./guide/content/component.html

  - header: 样式化内容
    image: /assets/image/marker.svg
    bgImage: https://theme-hope-assets.vuejs.press/bg/1-light.svg
    bgImageDark: https://theme-hope-assets.vuejs.press/bg/1-dark.svg
    bgImageStyle:
      background-repeat: repeat
      background-size: initial
    highlights:
      - title: 提示容器支持
        icon: box-archive
        details: 用样式装饰 Markdown 内容
        link: ./guide/stylize/hint.html

      - title: GFM 警告
        icon: bell
        details: GFM 风格的警告容器
        link: ./guide/stylize/alert.html

      - title: 自定义对齐支持
        icon: align-center
        details: 让你在 Markdown 中对段落进行对齐
        link: ./guide/stylize/align.html

      - title: 属性支持
        icon: code
        details: 让你为 Markdown 元素添加属性
        link: ./guide/stylize/attrs.html

      - title: 标记支持
        icon: highlighter
        details: 让你在 Markdown 中对词句进行标记
        link: ./guide/stylize/mark.html

      - title: 样式化字符
        icon: wand-magic-sparkles
        details: 以你想要的方式样式化字符
        link: ./guide/stylize/stylize.html

  - header: 嵌入图表
    image: /assets/image/chart.svg
    bgImage: https://theme-hope-assets.vuejs.press/bg/5-light.svg
    bgImageDark: https://theme-hope-assets.vuejs.press/bg/5-dark.svg
    highlights:
      - title: Chart.js 支持
        icon: chart-simple
        details: 在 Markdown 中展示图表
        link: ./guide/chart/chartjs.html

      - title: ECharts 支持
        icon: bar-chart
        details: 在 Markdown 中展示 ECharts 图表
        link: ./guide/chart/echarts.html

      - title: 流程图支持
        icon: route
        details: 可以在 Markdown 中直接写出流程图
        link: ./guide/chart/flowchart.html

      - title: Markmap 支持
        icon: fab fa-markdown
        details: 从 Markdown 生成思维导图
        link: ./guide/chart/markmap.html

      - title: Mermaid 支持
        icon: chart-pie
        details: 可以在 Markdown 中添加 Mermaid 图例
        link: ./guide/chart/mermaid.html

  - header: 展示你的代码和工作
    image: /assets/image/code.svg
    bgImage: https://theme-hope-assets.vuejs.press/bg/4-light.svg
    bgImageDark: https://theme-hope-assets.vuejs.press/bg/4-dark.svg
    highlights:
      - title: 代码选项卡
        icon: code
        details: 使用选项卡对相似代码进行分组
        link: ./guide/code/code-tabs.html

      - title: 代码案例支持
        icon: laptop-code
        details: 你可以很方便的插入代码案例
        link: ./guide/code/demo/

      - title: 交互演示支持
        icon: code
        details: 你可以在 Markdown 中添加交互演示
        link: ./guide/code/playground.html

      - title: Kotlin 交互演示支持
        icon: fab fa-kickstarter
        details: 响应式的 Kotlin Playground
        link: ./guide/code/kotlin-playground.html

      - title: Vue 交互演示支持
        icon: fab fa-vuejs
        details: 在交互演示中展示 Vue 组件
        link: ./guide/code/vue-playground.html

      - title: Sandpack 交互演示支持
        icon: code
        details: Sandpack 驱动的实时的编码环境
        link: ./guide/code/sandpack.html

footer: 使用 <a href="https://theme-hope.vuejs.press/zh/" target="_blank">VuePress Theme Hope</a> 主题 | MIT 协议, 版权所有 © 2019-present Mr.Hope

copyright: false
---

## 安装

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

## 使用

::: code-tabs#language

@tab TS

```ts title=".vuepress/config.ts"
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

```js title=".vuepress/config.js"
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
