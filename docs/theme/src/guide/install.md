---
title: 安装/使用
icon: install
---

## 使用主题

借助 Vuepress 强大的主题系统，启用主题从未如此简单。

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

::: tip 为什么要引入 `resolve` 函数
vuepress-theme-hope 继承于官方的默认主题，为了尽可能减轻用户配置，vuepress-theme-hope 提供了一些额外的配置选项，需要经过处理才能提交给官方主题。另外 vuepress-theme-hope 也会自动帮你生成一些配置，比如自动根据你的主题配置中的多语言选项，为你生成项目配置中的多语言选项，并自动帮你完成本地化工作。
:::

### 常见错误
