---
title: 主题行为选项
icon: circle-info
order: -1
category:
  - 配置
tag:
  - 行为选项
---

`hopeTheme()` 接受可选的第二个参数，即行为选项。行为选项控制主题的行为。

行为选项也可接受一个布尔值:

- `false`: 意味着所有选项都设置为 `false`
- `true`: 意味着 `{ check: true, compact:true, custom :false, debug: false }`

<!-- more -->

::: code-tabs#language

@tab TS

```ts
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  // 站点选项
  // ...

  theme: hopeTheme(
    {
      // 主题选项
      // ...
    },
    {
      // 主题行为选项 (可选)
    }
  ),
});
```

@tab JS

```js
// .vuepress/config.js
import { hopeTheme } from "vuepress-theme-hope";

export default {
  // 站点选项
  // ...

  theme: hopeTheme(
    {
      // 主题选项
      // ...
    },
    {
      // 主题行为选项 (可选)
    }
  ),
};
```

:::

## check

- 类型: `boolean`
- 默认值: `true`

是否执行附加检查。

检查包括运行时检查和 frontmatter 检查。不兼容的值将被警告。

::: note

此选项将在稳定版本中恢复为 `false` 作为默认值。

:::

## compact

- 类型: `boolean`
- 默认值: `true`

是否兼容历史版本 (v1 最新版本和 v2 beta 版本)。

- 仍然可以兼容的选项将继续工作，同时在控制台中留下警告。
- 移除的选项将在控制台中留下错误。

::: note

此选项将在稳定版本中恢复为 `false` 作为默认值。

:::

## custom

- 类型: `boolean`
- 默认值: `false`

是否启用通过别名导入组件的自定义支持。

默认情况下，主题将在性能模式下运行，所有文件都被捆绑并直接导入。

如果你想通过覆盖组件和布局来自定义主题，请将此选项设置为 `true`，主题将加载带有 `@theme-hope` 别名的组件和布局。

## debug

- 类型: `boolean`
- 默认值: `false`

是否在调试模式下运行。

::: note

这只是通过将 `app.env.isDebug` 设置为 `true` 来实现的。

你还可以在运行 `vuepress dev` 或 `vuepress build` 时添加 `--debug` 标志以启用调试模式。(推荐)

:::
