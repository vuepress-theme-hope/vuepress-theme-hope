---
title: Artalk 选项
icon: a
---

## 配置

详见 [Artalk 配置](https://artalk.js.org/guide/frontend/config.html)。

- `el` `pageTitle`, `pageKey` 和 `site` 选项为插件的保留选项，将从 VuePress 配置中自动推断，不可设置。

- `imgUploader` 和 `avatarURLBuilder` 这两个函数选项只能在客户端配置。

## 插件配置

你可以直接在插件选项中配置可序列化的选项:

```ts title=".vuepress/config.ts"
import { defineUserConfig } from "vuepress";
import { commentPlugin } from "vuepress-plugin-comment2";

export default defineUserConfig({
  plugins: [
    commentPlugin({
      provider: "Artalk",
      // 其他选项
      // ...
    }),
  ],
});
```

## 客户端配置

你可以使用 `defineArtalkConfig` 函数来配置 Artalk。

```ts title=".vuepress/client.ts"
import { defineClientConfig } from "vuepress/client";
import { defineArtalkConfig } from "vuepress-plugin-comment2/client";

defineArtalkConfig({
  // Artalk 选项
});

export default defineClientConfig({
  // ...
});
```
