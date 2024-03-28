---
title: 幻灯片支持
icon: person-chalkboard
---

<!-- #region before -->

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

<!-- #endregion before -->

```js {7} title=".vuepress/config.js"
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";

export default {
  plugins: [
    mdEnhancePlugin({
      // 启用幻灯片
      revealJs: true,
    }),
  ],
};
```

<!-- #region options -->

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

<!-- #endregion options -->

各主题的外观，详见 [幻灯片主题](themes.md)

## 演示

请见 [幻灯片演示](demo.md)。

<!-- #region customize -->

## 自定义 Reveal.js

你也可以在[客户端配置文件][client-config]中导入并调用 `defineRevealJsConfig` 来自定义 reveal.js:

```ts title=".vuepress/client.ts"
import { defineClientConfig } from "vuepress/client";
import { defineRevealJsConfig } from "vuepress-plugin-md-enhance/client";

defineRevealJsConfig({
  // 在此设置 reveal.js 选项
});

export default defineClientConfig({
  // ...
});
```

::: note

Reveal.js 还提供了[更多的插件](https://github.com/hakimel/reveal.js/wiki/Plugins,-Tools-and-Hardware)，你可以通过 `plugin` 选项在 `defineRevealJsConfig` 中添加它们。在 Node 一侧要求的内置插件将自动添加。

:::

你也可以在 Frontmatter 设置 `revealJs` 以设置特定页面的 reveal.js 选项。

Reveal.js 选项，请参见[reveal.js config](https://revealjs.com/config/)，Reveal.js 用法，请参阅 [reveal.js 文档](https://revealjs.com/)。

[client-config]: https://vuejs.press/zh/guide/configuration.html#%E5%AE%A2%E6%88%B7%E7%AB%AF%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6

<!-- #endregion customize -->
