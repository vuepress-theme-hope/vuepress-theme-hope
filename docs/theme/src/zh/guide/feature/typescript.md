---
title: TS 支持
icon: typescript
category: feature
tags:
  - feature
  - typescript
---

`vuepress-theme-hope` 的大部分文件都是使用 TypeScript 编写，所以 vuepress-theme-hope 也可以为你的 VuePress 项目带来了原生的 TypeScript 支持，你只需设置 `themeConfig.typescript` 为 `true` 即可开启 `typescript` 支持。

开启 TypeScript 支持意味着你可以使用 `enhanceAppFiles.ts`，同时在你的 vue 组件 和 Markdown 文件中使用 TypeScript。

如果你需要向 ts-loader 传递一些自定义选项，你也可以将 `themeConfig.typescript` 设置为一个 Object 来传递给 ts-loader。

<!-- more -->

::: tip

启用本主题后，你无需再依赖并启用 `@vuepress/plugin-typescript`。

:::

## 开启准备

如果你的项目没有依赖 typescript，你需要额外安装它:

<CodeGroup>
<CodeGroupItem title="yarn">
```bash
yarn add -D typescript
```
</CodeGroupItem>

<CodeGroupItem title="npm">
```bash
npm i -D typescript
```
</CodeGroupItem>
</CodeGroup>

同时，你需要保证你的工作区包含有效的 `tsconfig.json`。 一个最简单的 `tsconfig.json` 如下:

```json
{
  "compilerOptions": {
    "target": "ES6", // 任何不小于 es6 的 target 均可
    "allowSyntheticDefaultImports": true, // 规避 vuepress-types 的类型定义问题
    "experimentalDecorators": true, // Vue 的 TypeScript 写法需要开启此选项
    "module": "commonjs", // 为了避免 vuepress-types 解析失败
    "types": ["@mr-hope/vuepress-theme-types"]
  },
  "include": [
    // 项目中需要至少包含一个 ts 文件 (空的文件也可)，并正确配置在 include 中
    "src/.vuepress/enhanceApp.ts" // 请将 src 替换成你的文档目录
  ]
}
```

如果你已经有了 `tsconfig.json`, 那么只需要在 `compilerOptions.types` 中添加 vuepress-theme-hope 的类型定义文件包 `"@mr-hope/vuepress-theme-types"` 即可。

你还应该在你的项目中创建一个 ts 文件并添加至 `tsconfig.json` 的 `include` 中，你可以直接创建一个空的 enhanceApp.ts 并将其引入。

::: warning

`ts-loader` 要求 `tsconfig.json` 至少命中一个有效的 ts 文件，所以最简单的办法就是创建或者转换 (如果你已经有了 `enhanceAppFiles.js`) 一个 `enhanceAppFiles.ts` 并将它添加至 `include` 选项中

:::
