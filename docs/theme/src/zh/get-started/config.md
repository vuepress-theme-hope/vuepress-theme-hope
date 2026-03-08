---
title: 配置项目
icon: gears
order: 5
category:
  - 快速上手
  - 基础知识
  - 教程
tag:
  - 配置项目
---

本教程指导你如何配置 VuePress 项目。

<!-- more -->

## 目录结构

VuePress 使用文档根目录下的 `.vuepress` 文件夹存储所有配置、相关文件及缓存。

核心入口文件为 `.vuepress/config.ts` (或 `.vuepress/config.js`)。

::: tip 使用 TypeScript
TypeScript 配置文件提供类型提示、自动补全和实时错误检查。如果使用 JavaScript，建议配合 VS Code 等编辑器以获得 IntelliSense 支持。
:::

## 配置文件

你需要在 `.vuepress/config.ts` 中导出配置对象。建议使用 `defineUserConfig` 工具函数以确保类型安全：

```ts twoslash {2,4,6} title=".vuepress/config.ts"
import { defineUserConfig } from "vuepress";

export default defineUserConfig({
  /**
   * 站点配置项
   */
});
```

### 模块化配置

为保持主配置文件简洁，VuePress Theme Hope 模板利用 ESM 特性将主题、导航栏和侧边栏配置拆分为独立文件。

主题逻辑通常提取至 `.vuepress/theme.ts`：

```ts twoslash
import { hopeTheme } from "vuepress-theme-hope";

/**
 * 导出主题配置
 */
export default hopeTheme({
  /**
   * 主题特定选项
   */
});
```

然后在主配置文件中引入：

```ts title=".vuepress/config.ts"
import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  /**
   * 等同于 theme: hopeTheme({ ... })
   */
  theme,
});
```

## 配置作用域

### 站点配置 (Site Config)

站点配置由 VuePress 核心直接读取，与主题无关。这些属性适用于所有主题，例如 `lang`、`title` 和 `description`。

::: info 参考
查看 [VuePress2 → 核心参考 → 配置](https://vuejs.press/zh/reference/config.html) 以获取完整选项列表。
:::

### 主题配置 (Theme Config)

主题配置是传递给 `hopeTheme` 函数的对象，由 VuePress Theme Hope 处理。详细选项参见 [配置 → 主题配置](../config/README.md)。

::: tip IDE 提示
在 VS Code 等编辑器中，你可以通过 TypeScript 定义获得以下支持：

- 悬停查看属性说明。
- 错误类型或键名的实时校验。
- 输入时的自动补全。

![选项提示](./assets/vscode-hint-light.png#light)
![选项提示](./assets/vscode-hint-dark.png#dark)
:::

### 进阶扩展

::: info 插件配置
VuePress Theme Hope 集成了多个插件。你可以通过主题选项中的 `plugins` 字段进行配置，详见 [主题插件配置](../config/plugins/README.md)。

如需使用外部插件，请在 `config.ts` 中自行导入并添加至顶层 `plugins` 数组。
:::

::: info 样式配置
自定义样式存储在 `.vuepress/styles` 目录中：

- `index.scss`: 注入全局 CSS/SCSS。
- `config.scss`: 覆盖主题 SCSS 变量。
- `palette.scss`: 定义颜色和布局常量。

详见 [配置 → 样式](../config/style.md)。
:::

::: info 页面配置
可以通过 Markdown 文件的 Frontmatter 为特定页面进行局部配置。详见 [项目内容 → Frontmatter](./content.md#frontmatter)。
:::
