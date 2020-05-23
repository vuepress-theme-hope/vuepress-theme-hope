---
title: 安装/使用
icon: install
category: instruction
tags: intro
---

## 在新项目中使用

如果你想构建自己的博客，或者在一个新的项目中使用本主题生成你的文档，你可以直接使用 [vuepress-theme-hope 模板](https://github.com/Mister-Hope/vuepress-theme-hope-template) 来开始你的 vuepress 之旅。点击 “Use this template" 按钮即可。

## 在旧项目中使用

### 安装

```bash
npm i -D vuepress-theme-hope
```

### 使用

```js
// .vuepress/config.js
const resolve = require("vuepress-theme-hope/resolve");

module.exports = resolve({
  // your config here
});
```

::: tip 为什么要引入 resolve 函数
为了尽可能减轻用户配置，vuepress-theme-hope 提供了一些额外的配置选项，需要经过处理才能提交 vuepress、同时 vuepress-theme-hope 也会允许你省略一些配置并自动帮你生成它们。

比如自动根据你的主题配置中的多语言选项，为你生成项目配置中的多语言选项，并自动帮你完成本地化工作。
:::

如果你的项目没有依赖 typescript，你还需要额外安装它：

```bash
npm i -D typescript
```

同时，请在你的项目添加 `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES6", // 任何不小于 es6 的 target 均可
    "allowSyntheticDefaultImports": true, // 规避 vuepress-types 的类型定义问题
    "experimentalDecorators": true, // Vue 的 Typescript 写法需要开启此选项
    "module": "commonjs", // 为了避免 vuepress-types 解析失败
    "types": ["@mr-hope/vuepress-theme-types"]
  },
  "include": [
    // 项目中需要至少包含一个 ts 文件 (空的文件也可)，并正确配置在 include 中
    "src/.vuepress/enhanceApp.ts" // 请将 src 替换成你的文档目录
  ]
}
```

如果你已经有了 `tsconfig.json`, 那么只需要在 `compilerOptions.types` 中添加 vuepress-theme-hope 的类型定义文件包即可。

你还应该在你的项目中创建一个 ts 文件并添加至 `tsconfig.json` 的 `include` 中，你可以直接创建一个空的 enhanceApp.ts 并将其引入。
