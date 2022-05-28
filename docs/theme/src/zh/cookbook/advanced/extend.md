---
title: 主题继承
icon: extend
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

你自己新创建的主题的同名别名 (`alias`) 和 同名布局 (`layouts`) 的优先级高于被继承主题 `vuepress-theme-hope`，这意味着你可以通过 `alias` 覆盖 `vuepress-theme-hope` 主题的组件，并通过 `layouts` 覆盖或新增 `vuepress-theme-hope` 提供的布局。

::: code-tabs#language

@tab TS

```ts
// .vuepress/theme/index.ts
import { path } from "@vuepress/utils";
import { hopeTheme } from "vuepress-theme-hope";
import type { HopeThemeOptions } from "vuepress-theme-hope";

export default {
  name: "vuepress-theme-local",

  extends: hopeTheme(options),

  alias: {
    // 你可以在这里覆盖或新增别名
    // 比如这里我们将 vuepress-theme-hope 主页组件改为自己主题下的 components/HomePage.vue
    "@theme-hope/components/HomePage": path.resolve(
      __dirname,
      "./components/HomePage.vue"
    ),
  },

  layouts: {
    // 你可以在这里覆盖或新增布局
    // 比如这里我们将 vuepress-theme-hope 的默认布局改为自己主题下的 layouts/Layout.vue
    Layout: path.resolve(__dirname, "layouts/Layout.vue"),
    // 同时我们新增了一个 Changelog 布局
    Changelog: path.resolve(__dirname, "layouts/Changelog.vue"),
  },
};
```

@tab JS

```js
// .vuepress/them/index.js
const { path } = require("@vuepress/utils");
const { hopeTheme } = require("vuepress-theme-hope");

module.exports = {
  name: "vuepress-theme-local",

  extends: hopeTheme(options),

  alias: {
    // 你可以在这里覆盖或新增别名
    // 比如这里我们将 vuepress-theme-hope 主页组件改为自己主题下的 components/HomePage.vue
    "@theme-hope/components/HomePage": path.resolve(
      __dirname,
      "./components/HomePage.vue"
    ),
  },

  layouts: {
    // 你可以在这里覆盖或新增布局
    // 比如这里我们将 vuepress-theme-hope 的默认布局改为自己主题下的 layouts/Layout.vue
    Layout: path.resolve(__dirname, "layouts/Layout.vue"),
    // 同时我们新增了一个 Changelog 布局
    Changelog: path.resolve(__dirname, "layouts/Changelog.vue"),
  },
};
```

:::
