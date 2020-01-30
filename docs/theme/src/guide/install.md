---
title: 安装/使用
icon: install
tag: intro
category: instruction
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

::: tip 为什么要引入 resolve 函数
vuepress-theme-hope 继承于官方的默认主题，为了尽可能减轻用户配置，vuepress-theme-hope 提供了一些额外的配置选项，需要经过处理才能提交给官方主题。另外 vuepress-theme-hope 也会自动帮你生成一些配置，比如自动根据你的主题配置中的多语言选项，为你生成项目配置中的多语言选项，并自动帮你完成本地化工作。
:::

同时，请在你的项目添加 `tsconfig.json`:

```json
{
  "compilerOptions": {
    "types": [
      "@mr-hope/vuepress-theme-types",
      "vuepress-types"
    ]
  },
  "include": [
    "src/.vuepress/enhanceApp.ts"
  ]
}
```

如果你已经有了 `tsconfig.json`, 那么只需要在 `compilerOptions.types` 中添加 vuepress 与 vuepress-theme-hope 的类型定义文件包即可。
