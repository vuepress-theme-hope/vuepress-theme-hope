---
title: Safari 常见问题
icon: fab fa-safari
category:
  - FAQ
---

## 平滑滚动不生效

我们使用 CSS 属性 `scroll-behavior: smooth` 来提供平滑滚动。它在全球有 93.06% 的支持率[^scroll-behavior-percent]

[^scroll-behavior-percent]: 数据来自 [canIUse](https://caniuse.com/?search=scroll-behavior)。

目前，只有 iOS 和 iPadOS 15.4 及以上，macOS 12.3 及以上支持该属性[^scroll-behavior-support]。

[^scroll-behavior-support]: 详见 [Safari 15.4 发行日志](https://developer.apple.com/documentation/safari-release-notes/safari-15_4-release-notes#New-Features)

如果你需要在旧版本的 Safari 使用这个功能，请自行参考 [Stack Overflow 问答](https://stackoverflow.com/questions/56011205/is-there-a-safari-equivalent-for-scroll-behavior-smooth) 了解原因，并自行引入 [smooth-scroll](https://github.com/iamdustan/smoothscroll) 包进行兼容。


**这里另外提供一种通过配置vite解决上述问题的最简方法**

```ts
// .vuepress\client.ts
import { defineUserConfig } from "vuepress";
import { viteBundler } from "@vuepress/bundler-vite";
import postcssPresetEnv from "postcss-preset-env"; // 需要安装这个库

export default defineUserConfig({
  bundler: viteBundler({
    viteOptions: {
      css: {
        postcss: {
          plugins: [
            // `postcss-preset-env` 会为css属性添加浏览器引擎前缀，使得编写的css属性能在较旧的浏览器中被识别
            // 比如会为 `transition` 添加前缀：`-webkit-transition`,`-moz-transition`,`-ms-transition`,`-o-transition`
            // 此外会根据运行的浏览器环境确定所需的polyfill，使得较旧的浏览器能够使用较新的css特性

            // 可以用于实现对 `scroll-behavior: smooth` 的支持
            // 实际测试可在iOS14.4(Safari 14.0.3)上正常显示

            postcssPresetEnv(),
          ],
        },
      },
    },
    vuePluginOptions: {},
  }),
});
```
