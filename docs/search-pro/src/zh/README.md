---
home: true
title: 主页
icon: home
heroText: vuepress-plugin-search-pro
tagline: VuePress2 的客户端搜索插件
actions:
  - text: 快速上手
    icon: lightbulb
    link: ./guide.html
    type: primary

  - text: 配置
    icon: tools
    link: ./config.html

features:
  - title: 高性能
    icon: rocket
    details: 在由 <strong>slimsearch</strong> 提供支持的独立 Worker 中进行高速搜索
    link: ./guide.html#极致速度

  - title: 全索引
    icon: file-zipper
    details: 索引您站点中的所有内容
    link: ./guide.html#索引范围

  - title: 突出显示和上下文
    icon: highlighter
    details: 突出显示关键字并在搜索结果中显示相关上下文
    link: ./guide.html#高亮与上下文

  - title: 自动建议
    icon: lightbulb
    details: 在输入时获取查询建议
    link: ./guide.html#自动搜索建议

  - title: 自定义字段
    icon: gears
    details: 使用选项将数据添加到索引
    link: ./guide.html#自定义索引

  - title: 搜索历史
    icon: clock
    details: 保留查询和结果的历史记录
    link: ./guide.html#查询和搜索的历史记录

footer: MIT Licensed | Copyright © 2022-present Mr.Hope
copyrightText: false
---

## 使用插件

### 安装

::: code-tabs#shell

@tab pnpm

```bash
pnpm add -D vuepress-plugin-search-pro
```

@tab yarn

```bash
yarn add -D vuepress-plugin-search-pro
```

@tab npm

```bash
npm i -D vuepress-plugin-search-pro
```

:::

### 使用

::: code-tabs#language

@tab TS

```ts
// .vuepress/config.ts
import { searchProPlugin } from "vuepress-plugin-search-pro";

export default {
  plugins: [
    searchProPlugin({
      // 配置选项
    }),
  ],
};
```

@tab JS

```js
// .vuepress/config.js
import { searchProPlugin } from "vuepress-plugin-search-pro";

export default {
  plugins: [
    searchProPlugin({
      // 配置选项
    }),
  ],
};
```

:::
