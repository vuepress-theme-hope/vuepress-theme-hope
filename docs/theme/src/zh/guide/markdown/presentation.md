---
title: 幻灯片
icon: person-chalkboard
category:
  - Markdown
tag:
  - Markdown
  - 幻灯片
---

让你的 VuePress 站点中的 Markdown 文件支持幻灯片。

我们使用 [reveal.js](https://revealjs.com/) 来支持这一功能。

<!-- more -->

## 配置

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
        presentation: true,
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
        presentation: true,
      },
    },
  }),
};
```

:::

`presentation` 也接收一个字符串数组，可以自由配置是否启用一些内置插件。

::: tip

内置插件包括:

- `"highlight"`
- `"math"`
- `"search"`
- `"notes"`
- `"zoom"`

注: 为了支持 Markdown 语法，我们总会启用 `markdown` 插件。

:::

Reveal.js 还提供了[更多的插件](https://github.com/hakimel/reveal.js/wiki/Plugins,-Tools-and-Hardware)。如果你需要某个特定的插件，请在 GitHub 上提出 [Feature Request](https://github.com/vuepress-theme-hope/vuepress-theme-hope/issues/new?assignees=Mister-Hope&labels=enhancement&template=feature_request.md&title=%5BFeature+Request%5D)

你可以在客户端配置文件中导入并使用 `defineRevealConfig` 来自定义 reveal.js 的配置:

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

## 语法

- 使用 `---` 分割幻灯片
- 使用 `--` 对幻灯片进行二次分割(垂直显示)

```md
@slidestart [theme]

<!-- slide1 -->

---

<!-- slide2 -->

---

<!-- slide3 -->

@slideend
```

目前可用的主题(请使用它们直接替换 `[theme]`):

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

主题演示，请详见 <ProjectLink name="md-enhance" path="/zh/guide/presentation/themes.html">幻灯片主题</ProjectLink>。

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

详细与完整的演示详见 <ProjectLink name="md-enhance" path="/zh/guide/presentation/demo.html">幻灯片演示</ProjectLink>。

:::

## 选项

你可以在 Frontmatter 设置 `reveal` 以设置特定页面的 reveal.js 选项，也可以在插件选项中设置 `presentation` 以全局设置 reveal.js。

更多选项，请参见[reveal.js config](https://revealjs.com/config/)，更多用法，请参阅 [reveal.js 文档](https://revealjs.com/)。
