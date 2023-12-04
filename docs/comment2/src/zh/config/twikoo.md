---
title: Twikoo 选项
icon: t
---

## 配置

### envId

- 类型: `string`
- 必填: 是

腾讯云环境 ID 或 Vercel 地址。

### repoId

- 类型: `string`
- 默认值: `"ap-shanghai"`

腾讯云区域。

## 插件配置

你可以直接在插件选项中配置可序列化的选项:

```ts
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { commentPlugin } from "vuepress-plugin-comment2";

export default defineUserConfig({
  plugins: [
    commentPlugin({
      provider: "Twikoo",
      // 其他选项
      // ...
    }),
  ],
});
```

## 客户端配置

你可以使用 `defineTwikooConfig` 函数来配置 Twikoo。

```ts
// .vuepress/client.ts
import { defineClientConfig } from "@vuepress/client";
import { defineTwikooConfig } from "vuepress-plugin-comment2/client";

defineTwikooConfig({
  // Twikoo 选项
});

export default defineClientConfig({
  // ...
});
```
