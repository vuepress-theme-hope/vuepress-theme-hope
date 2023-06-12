---
title: 主题继承
icon: clone
order: -2
category:
  - 高级
tag:
  - 高级
  - 自定义
---

`vuepress-theme-hope` 和默认主题一样，同样支持继承。

你可以根据自己的需求在 `vuepress-theme-hope` 的基础上二次创作自己的主题并本地使用或发布它。

<!-- more -->

## 继承主题

你需要为自己的主题创建一个入口文件，并从 `vuepress-theme-hope` 中导入 `hopeTheme`。

在你的入口文件中，设置 `extends: hopeTheme(options)` 声明继承 `vuepress-theme-hope` 主题。

你自己新创建的主题的同名别名 (`alias`) 和 同名布局 (`layouts`) 的优先级高于被继承主题 `vuepress-theme-hope`，这意味着你可以通过主题 API 的 `alias` 选项覆盖 `vuepress-theme-hope` 主题的组件，也可以通过客户端配置文件的同名布局覆盖 `vuepress-theme-hope` 主题的布局。

主题提供了如下布局

- Layout
- NotFound
- Slide (仅在幻灯片启用时可用)
- BlogCategory (仅在博客启用时可用)
- BlogHome (仅在博客启用时可用)
- BlogType (仅在博客启用时可用)
- Timeline (仅在博客启用时可用)

::: code-tabs#language

@tab TS

```ts
// .vuepress/theme/index.ts
import { getDirname, path } from "@vuepress/utils";
import { hopeTheme } from "vuepress-theme-hope";
import type { ThemeOptions } from "vuepress-theme-hope";

const __dirname = getDirname(import.meta.url);

export default (options) => ({
  name: "vuepress-theme-local",

  extends: hopeTheme(options, { custom: true }),

  alias: {
    // 你可以在这里覆盖或新增别名
    // 比如这里我们将 vuepress-theme-hope 主页组件改为自己主题下的 components/HomePage.vue
    "@theme-hope/components/HomePage": path.resolve(
      __dirname,
      "./components/HomePage.vue"
    ),
  },
});
```

@tab JS

```js
// .vuepress/theme/index.js
import { getDirname, path } from "@vuepress/utils";
import { hopeTheme } from "vuepress-theme-hope";

const __dirname = getDirname(import.meta.url);

export default (options) => ({
  name: "vuepress-theme-local",

  extends: hopeTheme(options, { custom: true }),

  alias: {
    // 你可以在这里覆盖或新增别名
    // 比如这里我们将 vuepress-theme-hope 主页组件改为自己主题下的 components/HomePage.vue
    "@theme-hope/components/HomePage": path.resolve(
      __dirname,
      "./components/HomePage.vue"
    ),
  },
});
```

:::

你也可以通过主题客户端文件的 `layouts` 覆盖或新增 `vuepress-theme-hope` 提供的布局。

::: code-tabs#language

@tab TS

```ts
// .vuepress/theme/config.ts
import { defineClientConfig } from "@vuepress/client";
import Changelog from "./layouts/Changelog.vue";
import Layout from "./layouts/Layout.vue";

export default defineClientConfig({
  // 你可以在这里覆盖或新增布局
  layouts: {
    // 比如这里我们将 vuepress-theme-hope 的默认布局改为自己主题下的 layouts/Layout.vue
    Layout,
    // 同时我们新增了一个 Changelog 布局
    Changelog,
  },
});
```

@tab JS

```js
// .vuepress/theme/config.js
import { defineClientConfig } from "@vuepress/client";
import Changelog from "./layouts/Changelog.vue";
import Layout from "./layouts/Layout.vue";

export default defineClientConfig({
  // 你可以在这里覆盖或新增布局
  layouts: {
    // 比如这里我们将 vuepress-theme-hope 的默认布局改为自己主题下的 layouts/Layout.vue
    Layout,
    // 同时我们新增了一个 Changelog 布局
    Changelog,
  },
});
```
