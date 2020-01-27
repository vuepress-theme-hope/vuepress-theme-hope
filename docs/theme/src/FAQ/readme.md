# 常见问题

## 项目运行报错

请确保你的项目目录下有一个合法的 tsconfig.json 文件，同时，保证你的项目包含了至少一个 TS 文件。

### 提示找不到 tsconfig.json

一个简单的 tsconfig.json 如下：

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

### 提示找不到相应 types

请确保将 `"@mr-hope/vuepress-theme-types"` 和 `"vuepress-types"` 加入 `compilerOptions.types` 中，因为它们不在 `@types` 目录下。

### 提示项目没有包含 TS文件

你可以通过在 `.vuepress` 目录下，建立一个空的 `enhanceApp.ts` 来解决这个问题，如果你已经有 `enhanceApp.js`，你可以直接将其转换为 TS。
