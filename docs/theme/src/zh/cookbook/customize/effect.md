---
title: 修改特效
icon: wand-magic-sparkles
category:
  - 教程知识
  - 自定义
tag:
  - 自定义
---

此教程引导你如何自定义主题特效。

<!-- more -->

## 清除特效

主题在默认情况下，会:

- 使用色卡对分类、标签进行装饰
- 在切换页面、元素时添加动画
- 为主页元素添加缓入动画、以及为特性添加悬浮特效。
- 使用较为显眼的代码复制按钮
- 使用较为花哨的提示框。
- 在日间模式和夜间模式切换时添加渐入

如果你需要清除这些花哨的样式，请在主题选项中配置 `pure: true` 开启纯净模式。

同时，你可以通过控制调色板文件中的 `$color-transition` 和 `transform-transition` 来控制动画的时长:

```scss
// .vuepress/styles/palette.scss

$color-transition: 0s;
$transform-transition: 0s;
```

## 添加特效

你可以自由的通过 VuePress 提供的配置文件选项和客户端文件为你的站点添加更多特效。

- 如果你需要添加全局的 CSS 与 JS，请在 VuePress [配置文件](../vuepress/config.md) 中配置 `head` 选项。

  ::: tip 例子

  ```ts
  // .vuepress/config.ts
  import { defineUserConfig } from "vuepress";

  export default defineUserConfig({
    // ...

    head: [
      // ...

      // 导入一个外部脚本
      ["script", { src: "YOUR_SCRIPT_LINK" }],
      // 添加一段脚本
      [
        "script",
        {},
        `\
          // your script here
        `,
      ],
      // 添加一个外部 CSS
      ["link", { rel: "stylesheet", href: "YOUR_STYLE_LINK" }],
      // 添加一段样式
      // 我们不建议这么做，你应该首选使用 .vuepress/style/index.scss
      [
        "style",
        {},
        `\
          /* your style here */
        `,
      ],
    ],

    // ...
  });
  ```

  :::

- 如果你需要添加页面级别的 CSS 与 JS，请在 [Front Matter](../vuepress/page.md#frontmatter) 中配置 `head` 选项。

  ```md
  ---
  head:
    - script: YOUR_SCRIPT_LINK
    - script:
        type: module
        src: YOUR_SCRIPT_LINK
    - style: YOUR_STYLE_LINK
    - style:
        type: text/css
        content: |
          /* your style here */
  ---

  页面内容

  ...
  ```

- 更多全局的高级操作，可以通过 [客户端配置文件](../vuepress/config.md#客户端配置文件) 进行。

  ```ts
  // .vuepress/client.ts
  import { defineClientConfig } from "@vuepress/client";
  import ExampleGlobalComponent from "./components/ExampleGlobalComponent.vue";
  import ExampleRootComponent from "./components/ExampleRootComponent.vue";
  import { setupExampleCompositionAPI } from "./composables/exampleCompositionAPI";

  export default defineClientConfig({
    // 客户端增强
    enhance: ({ app }) => {
      // 注册全局组件
      app.component("ExampleGlobalComponent", ExampleGlobalComponent);
    },

    // 全局注册
    setup() {
      // 注册全局 Composition API
      setupExampleCompositionAPI();
    },

    // 全局组件
    rootComponents: [
      "ExampleRootComponent",
      // ...
    ],
  });
  ```
