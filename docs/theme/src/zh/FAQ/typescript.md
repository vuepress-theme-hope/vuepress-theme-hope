---
title: TypeScript 错误排查
icon: typescript
category: FAQ
---

## 排查

1. 请确保你的项目依赖了 typescript，如果没有，请执行

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

1. 确保项目根目录下有一个合法的 tsconfig.json 文件，，如果没有，请执行

   <CodeGroup>
   <CodeGroupItem title="yarn">
   ```bash
   yarn tsc --init
   ```
   </CodeGroupItem>

   <CodeGroupItem title="npm">
   ```bash
   npx tsc --init
   ```
   </CodeGroupItem>
   </CodeGroup>

1. 保证你的项目至少有一个 TypeScript 文件被其 include。

请在你的文档目录下创建 `.vuepress/enhanceApp.ts`，并将其相对路径添加到 tsconfig.json 中的 `include` 数组中。

## 错误列表

### error when parsing tsconfig.json

这个问题通常当你启用了 TypeScript 支持后， ts-loader 找不到 tsconfig.json 导致的。

你可以:

1. 关闭 TypeScript 支持: 将 `themeConfig.typescript` 设置删除，或显式设置为 false 以禁用 `vuepress-plugin-typescript`。

1. 在你的项目内创建一个合法的 tsconfig.json。

   一个简单的 tsconfig.json 如下:

   ```json
   {
     "compilerOptions": {
       "target": "ES6", // 任何不低于 ES6 的 target 均可
       "allowSyntheticDefaultImports": true, // 规避 vuepress-types 的类型定义问题
       "experimentalDecorators": true, // Vue 的 TypeScript 写法需要开启此选项
       "module": "commonjs", // 为了避免 vuepress-types 解析失败
       // vuepress 与本主题的类型定义文件
       "types": ["@mr-hope/vuepress-theme-types"]
     },
     "include": [
       "src/.vuepress/enhanceApp.ts" // 请将 src 替换成你的文档目录
     ]
   }
   ```

### 提示找不到相应 types

请确保将 `"@mr-hope/vuepress-theme-types"` 加入 `compilerOptions.types` 中，因为它不在 `@types` 目录下。

### No inputs were found in config file tsconfig.json

这个问题一般是你的项目中没有 TypeScript 文件 (或你的 tsconfig.json 配置有误) 导致的。

`ts-loader` 要求 tsconfig.json 的 include 和 exclude 配置项的结果至少包含项目内的一个 ts 文件。

如果你的项目没有 ts 文件，为了规避这个问题，你可以在你的项目的任意地方创建一个空的 ts 文件并把它添加至 tsconfig.json 的 include 中。

一个稍微好些的解决方案是通过在 `.vuepress` 目录下，建立一个空的 `enhanceApp.ts` 来解决这个问题，如果你已经有 `enhanceApp.js`，你可以直接将其转换为 TS。
