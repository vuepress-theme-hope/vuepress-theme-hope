---
title: Giscus 选项
icon: fab fa-fw fa-github
---

## 配置

### repo

- 类型: `string`
- 必填: 是

存放评论的仓库

### repoId

- 类型: `string`
- 必填: 是

仓库 ID，请从 [Giscus 页面](https://giscus.app/zh-CN) 生成。

### category

- 类型: `string`
- 必填: 是

讨论分类

### categoryId

- 类型: `string`
- 必填: 是

讨论分类 ID，请从 [Giscus 页面](https://giscus.app/zh-CN) 生成。

### mapping

- 类型: `string`
- 默认值: `"pathname"`

页面 ↔️ discussion 映射关系，详见 [Giscus 页面](https://giscus.app/zh-CN)。

### strict

- 类型: `boolean`
- 默认值: `true`

是否启用严格匹配

### lazyLoading

- 类型: `boolean`
- 默认值: `true`

是否启用懒加载

### reactionsEnabled

- 类型: `boolean`
- 默认值: `true`

是否启用主帖子上的反应

### inputPosition

- 类型: `"top" | "bottom"`
- 默认值: `"top"`

输入框的位置

### lightTheme

- 类型: `GiscusTheme`

  ```ts
  type GiscusTheme =
    | "light"
    | "light_high_contrast"
    | "light_protanopia"
    | "dark"
    | "dark_high_contrast"
    | "dark_protanopia"
    | "dark_dimmed"
    | "transparent_dark"
    | "preferred_color_scheme"
    | `https://${string}`;
  ```

- 默认值: `"light"`

Giscus 在日间模式下使用的主题

应为一个内置主题关键词或者一个 CSS 链接。

### darkTheme

- 类型: `GiscusTheme`

  ```ts
  type GiscusTheme =
    | "light"
    | "light_high_contrast"
    | "light_protanopia"
    | "dark"
    | "dark_high_contrast"
    | "dark_protanopia"
    | "dark_dimmed"
    | "transparent_dark"
    | "preferred_color_scheme"
    | `https://${string}`;
  ```

- 默认值: `"dark"`

Giscus 在夜间模式下使用的主题

应为一个内置主题关键词或者一个 CSS 链接。

## 插件配置

你可以直接在插件选项中配置可序列化的选项:

```ts
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { commentPlugin } from "vuepress-plugin-comment2";

export default defineUserConfig({
  plugins: [
    commentPlugin({
      provider: "Giscus",
      // 其他选项
      // ...
    }),
  ],
});
```

## 客户端配置

你可以使用 `defineGiscusConfig` 函数来配置 Giscus。

```ts
// .vuepress/client.ts
import { defineClientConfig } from "@vuepress/client";
import { defineGiscusConfig } from "vuepress-plugin-comment2/client";

defineGiscusConfig({
  // Giscus 选项
});

export default defineClientConfig({
  // ...
});
```
