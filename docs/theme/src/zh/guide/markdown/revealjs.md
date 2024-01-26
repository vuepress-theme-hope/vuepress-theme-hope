---
title: 幻灯片
icon: person-chalkboard
category:
  - Markdown
tag:
  - Markdown
  - 幻灯片
---

<!-- @include: @md-enhance/zh/guide/content/revealjs/README.md#before -->

::: code-tabs#language

@tab TS

```ts {8-10} title=".vuepress/config.ts"
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

```js {7-9} title=".vuepress/config.js"
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

<!-- @include: @md-enhance/zh/guide/content/revealjs/README.md#options -->

各主题的外观，详见 <ProjectLink name="md-enhance" path="/zh/guide/content/revealjs/themes.html">幻灯片主题</ProjectLink>。

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

::: tip

详细与完整的演示详见 <ProjectLink name="md-enhance" path="/zh/guide/content/revealjs/demo.html">幻灯片演示</ProjectLink>。

:::

<!-- @include: @md-enhance/zh/guide/content/revealjs/README.md#customize -->
