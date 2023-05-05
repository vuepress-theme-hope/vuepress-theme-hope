---
home: true
title: Home
icon: home
heroImage: /logo.svg
heroText: vuepress-plugin-redirect
tagline: VuePress2 的重定向插件
actions:
  - text: 文档
    link: https://plugin-redirect.vuejs.press

footer: MIT 协议 | 版权所有 © 2022-至今 Mr.Hope
redirectFrom:
  - /zh/redirect-from.html
---

## 如何使用

### 安装

```bash
pnpm add -D vuepress-plugin-redirect
```

### Usage

```ts
// .vuepress/config.ts
import { redirectPlugin } from "vuepress-plugin-redirect";

export default {
  plugins: [
    redirectPlugin({
      // 你的选项
    }),
  ],
};
```
