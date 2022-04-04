---
home: true
title: 主页
icon: home
heroImage: /logo.svg
heroText: vuepress-plugin-feed2
tagline: 为 VuePress2 提供 Feed 生成
actions:
  - text: 快速上手 💡
    link: /zh/guide.html
    type: primary

  - text: 配置 🛠
    link: /zh/config/

footer: MIT Licensed | Copyright © 2019-present Mr.Hope
---

## 使用插件

### 安装

```bash
yarn add -D vuepress-plugin-feed2@next
```

### 使用

```ts
// .vuepress/config.ts
import { feed } from "vuepress-plugin-feed2";

export default {
  plugins: [
    feed({
      // 插件选项
    }),
  ],
};
```
