---
title: TypeScript Troubleshoot
icon: typescript
category: FAQ
---

## Troubleshoot

1. Please make sure your project depends on typescript, if not, please execute:

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

1. Make sure there is a legal tsconfig.json file in your project root, if not, please execute:

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

1. Make sure that your project has at least one TypeScript file included by it.

Please create `.vuepress/enhanceApp.ts` in your document directory and add its relative path to the `include` in tsconfig.json.

## Error List

### error when parsing tsconfig.json

This problem is caused by ts-loader not finding tsconfig.json. Since the theme adds TypeScript support, you need to create a valid tsconfig.json inside your project.

You can:

1. Disable TypeScript support: delete the `themeConfig.typescript` setting, or explicitly set it to `false` to disable `vuepress-plugin-typescript`.

1. Create a legal tsconfig.json in your project.

   A simple tsconfig.json is as follows:

   ```json
   {
     "compilerOptions": {
       "target": "ES6", /// Any target not less than 'ES5'
       "allowSyntheticDefaultImports": true, // Avoiding some issues related to vuepress-types
       "experimentalDecorators": true, // TypeScript files for '.vue' needs this option
       "module": "commonjs", // Avoiding some issues related to vuepress-types
       // type definition files of vuepress and this theme
       "types": ["@mr-hope/vuepress-theme-types"]
     },
     "include": [
       "src/.vuepress/enhanceApp.ts" // replace `src` with your doc folder
     ]
   }
   ```

### Can’t find corresponding types

Make sure to add `"@mr-hope/vuepress-theme-types"` to `compilerOptions.types`, because the package is not in the `@types` directory.

### No inputs were found in config file tsconfig.json

This problem is caused by the absence of a TypeScript file in your project (or your tsconfig.json configuration is incorrect).

`ts-loader` requires that the include and exclude configuration items of tsconfig.json include at least one ts file in the project.

If your project does not have a ts file, to avoid this problem, you can create an empty ts file anywhere in your project and add it to the include of tsconfig.json.

A better solution is to solve this problem by creating an empty `enhanceApp.ts` in the`.vuepress` directory. If you already have `enhanceApp.js`, you can directly convert it to TS.
