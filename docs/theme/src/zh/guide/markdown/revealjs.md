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

在你的项目中安装 [Reveal.js](https://revealjs.com/):

::: code-tabs#shell

@tab pnpm

```bash
pnpm add -D reveal.js
```

@tab yarn

```bash
yarn add -D reveal.js
```

@tab npm

```bash
npm i -D reveal.js
```

:::

之后启用它:

::: code-tabs#language

@tab TS

```ts {8-10}
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        revealJs: true,
      },
    },
  }),
});
```

@tab JS

```js {7-9}
// .vuepress/config.js
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        revealJs: true,
      },
    },
  }),
};
```

:::

## 插件与主题

`revealJs` 也接收一个配置对象，允许你控制导入的内置此插件和主题。

你可以通过将 `revealJs.plugins` 设置为插件名称数组来启用以下插件:

- `highlight`
- `math`
- `search`
- `notes`
- `zoom`

::: note

为了支持 Markdown 语法，我们总会启用 `markdown` 插件。

:::

你也可以通过将 `revealJs.themes` 设置为主题名称数组来启用以下主题:

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

默认情况下，只有 `auto` 主题被启用。

## 语法

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

默认情况下，我们使用 `auto` 主题来渲染幻灯片，你也可以通过 `@slidestart 主题名称` 使用其他主题。

各主题的外观，详见 <ProjectLink name="md-enhance" path="/zh/guide/revealjs/themes.html">幻灯片主题</ProjectLink>。

## 演示

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

````md
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
````

::: tip

详细与完整的演示详见 <ProjectLink name="md-enhance" path="/zh/guide/revealjs/demo.html">幻灯片演示</ProjectLink>。

:::

## 自定义 Reveal.js

你也可以在客户端配置文件中导入并调用 `defineRevealConfig` 来自定义 reveal.js:

```ts
// .vuepress/client.ts
import { defineClientConfig } from "@vuepress/client";
import { defineRevealConfig } from "vuepress-plugin-md-enhance/client";

defineRevealConfig({
  // 在此设置 reveal.js 选项
});

export default defineClientConfig({
  // ...
});
```

::: note

Reveal.js 还提供了[更多的插件](https://github.com/hakimel/reveal.js/wiki/Plugins,-Tools-and-Hardware)，你可以通过 `plugin` 选项在 `defineRevealConfig` 中添加它们。在 Node 一侧要求的内置插件将自动添加。

:::

你也可以在 Frontmatter 设置 `revealJs` 以设置特定页面的 reveal.js 选项。

Reveal.js 选项，请参见[reveal.js config](https://revealjs.com/config/)，Reveal.js 用法，请参阅 [reveal.js 文档](https://revealjs.com/)。
