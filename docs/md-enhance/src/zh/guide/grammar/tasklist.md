---
title: 任务列表
icon: square-check
---

让你的 VuePress 站点中的 Markdown 文件支持任务列表。

<!-- more -->

## 配置

```js {7} title=".vuepress/config.js"
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";

export default {
  plugins: [
    mdEnhancePlugin({
      // 启用任务列表
      tasklist: true,
    }),
  ],
};
```

<!-- #region after -->

## 语法

- 使用 `- [ ] 一些文字` 渲染一个未勾选的任务项
- 使用 `- [x] 一些文字` 渲染一个勾选了的任务项 (我们也支持大写的 `X`)

::: md-demo 案例

- [ ] 计划 A
- [x] 计划 B

:::

## 高级

除了在插件选项中设置 `tasklist: true` 之外，你还可以将对象作为选项传递给它。可用选项如下:

```ts
interface TaskListOptions {
  /**
   * 是否禁用 checkbox
   *
   * @default true
   */
  disabled?: boolean;

  /**
   * 是否使用 `<label>` 来包裹文字
   *
   * @default true
   */
  label?: boolean;
}
```

<!-- #endregion after -->
