---
home: true
title: 主页
icon: home
heroImage: /logo.svg
heroText: vuepress-plugin-feed2
tagline: 为 VuePress2 提供 Feed 生成
actions:
  - text: 文档
    link: https://vuepress-theme-hope.github.io/v2/feed/zh/

footer: 使用 <a href="https://vuepress-theme-hope.github.io/v2/" target="_blank">VuePress Theme Hope</a> 主题 | MIT 协议, 版权所有 © 2019-present Mr.Hope
---

## 使用插件

### 安装

```bash
pnpm add -D vuepress-plugin-feed2@next
```

### 使用

```ts
// .vuepress/config.ts
import { feedPlugin } from "vuepress-plugin-feed2";

export default {
  plugins: [
    feedPlugin({
      // 插件选项
    }),
  ],
};
```
