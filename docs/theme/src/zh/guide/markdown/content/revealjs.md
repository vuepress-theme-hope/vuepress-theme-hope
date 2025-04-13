---
title: 幻灯片
icon: person-chalkboard
category:
  - Markdown
tag:
  - Markdown
  - 幻灯片
---

在你的 VuePress 站点中添加幻灯片。

<!-- more -->

## 配置

在你的项目中安装 `@vuepress/plugin-revealjs`:

::: code-tabs#shell

@tab pnpm

```bash
pnpm add -D @vuepress/plugin-revealjs@next
```

@tab yarn

```bash
yarn add -D @vuepress/plugin-revealjs@next
```

@tab npm

```bash
npm i -D @vuepress/plugin-revealjs@next
```

:::

之后启用它:

```ts twoslash {5} title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  markdown: {
    revealjs: true,
  },
});
```

## 幻灯片语法

- 使用 `---` 分割幻灯片
- 使用 `--` 对幻灯片进行二次分割(垂直显示)

```md
@slidestart

<!-- slide1 -->

---

<!-- slide2 -->

---

<!-- slide3 -->

@slideend
```

::: details 示例

@slidestart

## 幻灯片标题

一个拥有文字和 [链接](https://mister-hope.com) 的段落

---

## 代码高亮

```js [2-4|1-5]
const add = (a, b) => {
  if (typeof b === "undefined") return a + 1;

  return a + b;
};
```

@slideend

````md
@slidestart

## 幻灯片标题

一个拥有文字和 [链接](https://mister-hope.com) 的段落

---

## 代码高亮

```js [2-4|1-5]
const add = (a, b) => {
  if (typeof b === "undefined") return a + 1;

  return a + b;
};
```

@slideend
````

:::

默认情况下，我们使用 `auto` 主题来渲染幻灯片，你也可以通过 `@slidestart 主题名称` 使用其他主题。

你可以通过插件选项中的 `themes` 启用以下主题:

- `auto` (默认)
- `black`
- `white`
- `league`
- `beige`
- `sky`
- `night`
- `serif`
- `simple`
- `solarized`
- `blood`
- `moon`

各主题的外观，详见 [幻灯片主题][revealjs-themes-demo]。

::: important 资源路径

由于 `@slidestart` 和 `@slideend` 之间的 Markdown 内容由 Reveal.js 在浏览器中处理，因此你只能在幻灯片中使用绝对路径的资源，这些资源必须可以直接在浏览器中访问，不支持相对路径或别名。

:::

## 演示

::: md-demo 简单幻灯片演示

@slidestart

## 幻灯片 1

一个有文字和 [链接](https://mister-hope.com) 的段落

---

## 幻灯片 2

- 项目 1
- 项目 2

---

## 幻灯片 3.1

```js
const a = 1;
```

--

## 幻灯片 3.2

$$
J(\theta_0,\theta_1) = \sum_{i=0}
$$

@slideend

:::

::: info

详细与完整的演示详见 [幻灯片演示][revealjs-demo]。

:::

## 自定义 Reveal.js

### 内置插件

你可以通过插件选项中的 `plugins` 启用 reveal.js 中的内置插件。它接受以下插件名称的数组:

- `highlight`
- `math`
- `search`
- `notes`
- `zoom`

::: note

为了支持 Markdown 语法，我们总会启用 `markdown` 插件。

:::

### 高级配置

你也可以在[客户端配置文件](../../../cookbook/vuepress/config.md#客户端配置文件) 中导入并调用 `defineRevealJsConfig` 来自定义 reveal.js:

```ts twoslash title=".vuepress/client.ts"
import { defineRevealJsConfig } from "@vuepress/plugin-revealjs/client";

defineRevealJsConfig({
  // 在此设置 reveal.js 选项
});
```

::: note

Reveal.js 还提供了[更多的插件](https://github.com/hakimel/reveal.js/wiki/Plugins,-Tools-and-Hardware)，你可以通过 `plugin` 选项在 `defineRevealJsConfig` 中添加它们，这种自定义行为不会影响你声明的内置插件。

:::

### 页面级配置

你也可以在 Frontmatter 设置 `revealJs` 以设置特定页面的 reveal.js 选项。

Reveal.js 选项，请参见[reveal.js config](https://revealjs.com/config/)，Reveal.js 用法，请参阅 [reveal.js 文档](https://revealjs.com/)。

[revealjs-demo]: https://ecosystem.vuejs.press/zh/plugins/markdown/revealjs/demo.html
[revealjs-themes-demo]: https://ecosystem.vuejs.press/zh/plugins/markdown/revealjs/themes.html
