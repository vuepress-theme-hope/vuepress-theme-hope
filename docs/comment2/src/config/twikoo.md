---
title: Twikoo Options
icon: t
---

## Config

### envId

- Type: `string`
- Required: Yes

Vercel address

## Plugin Config

You can directly configure serializable options in the plugin options:

```ts
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { commentPlugin } from "vuepress-plugin-comment2";

export default defineUserConfig({
  plugins: [
    commentPlugin({
      provider: "Twikoo",
      // other options
      // ...
    }),
  ],
});
```

## Client Config

You can use the `defineTwikooConfig` function to customize Twikoo:

```ts
// .vuepress/client.ts
import { defineClientConfig } from "@vuepress/client";
import { defineTwikooConfig } from "vuepress-plugin-comment2/client";

defineTwikooConfig({
  // Twikoo config
});

export default defineClientConfig({
  // ...
});
```
