---
icon: typescript
category: feature
tags:
  - typescript
  - function
---

# TS 支持

vuepress-theme-hope 的大部分文件都是使用 Typescript 编写，所以 vuepress-theme-hope 也为你的 vuepress 项目带来了原生的 Typescript 支持。

这意味着你可以使用 `enhanceAppFiles.ts`，同时在你的 vue 组件 和 Markdown 文件中使用 Tyepscript。

启用本主题后，你无需再依赖并启用 `@vuepress/plugin-typescript`。

## 注意事项

在启用本主题后，你需要保证你的工作区包含有效的 `tsconfig.json`。 一个最简单的 `tsconfig.json` 如下:

```json
{
  "compilerOptions": {
    "target": "ES6", // 任何不低于 ES6 的 target 均可
    "allowSyntheticDefaultImports": true, // 规避 vuepress-types 的类型定义问题
    "experimentalDecorators": true, // Vue 的 Typescript 写法需要开启此选项
    "module": "commonjs", // 为了避免 vuepress-types 解析失败
    // vuepress 与本主题的类型定义文件
    "types": ["@mr-hope/vuepress-theme-types"]
  },
  "include": [
    "src/.vuepress/enhanceApp.ts" // 需要至少命中一个 ts 文件
  ]
}
```

::: warning

`ts-loader` 要求 `tsconfig.json` 至少命中一个有效的 ts 文件，所以最简单的办法就是创建或者转换(如果你已经有了 `enhanceAppFiles.js`) 一个 `enhanceAppFiles.ts` 并将它添加至 `include` 选项中
:::
