---
icon: question
category: FAQ
---

# 常见问题

## 部分页面设置失效

你可以先重新查阅文档，看看该设置是否 **不支持页面配置**。

**支持页面配置** 意味着主题允许页面的配置能够覆盖全局的同名(同功能)配置，但并不是所有功能都满足此设置。为了项目的编译速度，有些项目在全局配置禁用后不会在编译阶段加载，它们就无法局部启用。

## TypeScript 相关问题

请确保你的项目依赖了 typescript，且目录下有一个合法的 tsconfig.json 文件。

同时，保证你的项目至少有一个 TypeScript 文件被其 include。

### error when parsing tsconfig.json

这个问题通常是 ts-loader 找不到 tsconfig.json 导致的。由于主题添加了 TypeScript 支持，你需要在你的项目内创建一个合法的 tsconfig.json。

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

`ts-loader` 要求 tsconfig.json 的 include 和 exclude 配置项包含项目内至少一个 ts 文件。

如果你的项目没有 ts 文件，为了规避这个问题，你可以在你的项目的任意地方创建一个空的 ts 文件并把它添加至 tsconfig.json 的 include 中。

一个稍微好些的解决方案是通过在 `.vuepress` 目录下，建立一个空的 `enhanceApp.ts` 来解决这个问题，如果你已经有 `enhanceApp.js`，你可以直接将其转换为 TS。
