---
title: 任务列表
icon: check
---

让你的 VuePress 站点中的 Markdown 文件支持任务列表。

<!-- more -->

## 配置

:::: code-group

::: code-group-item TS

```ts {8}
// .vuepress/config.ts
import { mdEnhance } from "vuepress-plugin-md-enhance";

export default {
  plugins: [
    mdEnhance({
      // 启用任务列表
      tasklist: true,
    }),
  ],
};
```

:::

::: code-group-item JS

```js {8}
// .vuepress/config.js
const { mdEnhance } = require("vuepress-plugin-md-enhance");

module.exports = {
  plugins: [
    mdEnhance({
      // 启用任务列表
      tasklist: true,
    }),
  ],
};
```

:::

::::

## 语法

- 使用 `- [ ] 一些文字` 渲染一个未勾选的任务项
- 使用 `- [x] 一些文字` 渲染一个勾选了的任务项 (我们也支持大写的 `X`)

## 例子

- [ ] Plan A
- [x] Plan B

```md
- [ ] Plan A
- [x] Plan B
```

## 高级

除了在插件选项中设置 `tasklist: true` 之外，您还可以将对象作为选项传递给它。可用选项如下:

```ts
interface TaskListOptions {
  /**
   * 是否使用 `<label>` 来包裹文字
   *
   * @default true
   */
  label?: boolean;
  /**
   * 是否将 `<label>` 放置在 `<input>` 后还是包裹住 `<input>`
   *
   * @default true
   */
  labelAfter?: boolean;
}
```
