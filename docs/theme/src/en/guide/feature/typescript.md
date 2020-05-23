---
icon: typescript
category: feature
tags:
  - typescript
  - function
---

# TS support

Most files of vuepress-theme-hope are written in Typescript, so vuepress-theme-hope also brings native Typescript support to your vuepress project.

This means you can use `enhanceAppFiles.ts` and use Tyepscript in both your vue components and Markdown files.

After enabling this theme, you no longer need to require and enable `@vuepress/plugin-typescript`.

## Precautions

After enabling this theme, you need to ensure that your workspace contains a valid `tsconfig.json`. One of the simplest tsconfig.json is as follows:

```json
{
  "compilerOptions": {
    "target": "ES6", /// Any target which is not less than 'ES5'
    "allowSyntheticDefaultImports": true, // Avoiding some issues related to vuepress-types
    "experimentalDecorators": true, // Typescript files for '.vue' needs this option
    "module": "commonjs", // Avoiding some issues related to vuepress-types
    // type definition files of vuepress and this theme
    "types": ["@mr-hope/vuepress-theme-types"]
  },
  "include": [
    "src/.vuepress/enhanceApp.ts" // replace `src` with your doc folder
  ]
}
```

::: warning

`ts-loader` requires `tsconfig.json` to hit at least one valid ts file, so the easiest way is to create or convert (if you already have `enhanceAppFiles.js`) an `enhanceAppFiles.ts` and add it in the `include` option
:::
