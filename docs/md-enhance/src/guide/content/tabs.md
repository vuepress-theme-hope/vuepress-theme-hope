---
title: Tabs
icon: table-columns
---

Let the Markdown file in your VuePress site support tabs.

<!-- more -->

## Settings

::: code-tabs#language

@tab TS

```ts {8} title=".vuepress/config.ts"
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";

export default {
  plugins: [
    mdEnhancePlugin({
      // adds tabs support
      tabs: true,
    }),
  ],
};
```

@tab JS

```js {8} title=".vuepress/config.js"
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";

export default {
  plugins: [
    mdEnhancePlugin({
      // adds tabs support
      tabs: true,
    }),
  ],
};
```

:::

<!-- #region after -->

## Usage

You need to wrap your tabs in `tabs` container.

You can add an id suffix in `tabs` container, which will be used as tab id. All tabs with same id will share same switch event.

```md
::: tabs#fruit

<!-- here, fruit will be used as id, it's optional -->

<!-- tabs content -->

:::
```

Inside this container, you should use `@tab` marker to mark and separate tab contents.

Behind `@tab` marker, you can add text `:active` to activate the tab by default, and the text will be resolved as tab title.

```md
::: tabs

@tab title 1

<!-- tab 1 content -->

@tab title 2

<!-- tab 2 content -->

@tab:active title 3

<!-- tab 3 will be activated by default -->

<!-- tab 3 content -->

:::
```

By default, the title will be used as value of tab, but you can override it using id suffix.

```md
::: tabs

@tab title 1

<!-- here, tab 1's title "title 1" will be used as value. -->

<!-- tab 1 content -->

@tab title 2#value2

<!-- here, tab 2's title will be "title 2", but it will bind a value with "value2" -->

<!-- tab 2 content -->

:::
```

You can use Vue syntax and components in each tab, and you can access `value` and `isActive`, indicating the tab's binding value and whether the tab is active.

:::: info Switching together and persisting choice

If you want to make some tab groups switch together, you can use same tab id to bind them.

Also, your choice with that tab id will be stored and persisted.

Here is an example:

Choose a package manager:

::: tabs#shell

@tab npm

npm should be installed with Node.js.

@tab pnpm

```bash
corepack enable
corepack use pnpm@8
```

:::

Install `vuepress-plugin-md-enhance`:

::: tabs#shell

@tab Using npm#npm

```bash
npm i -D vuepress-plugin-md-enhance
```

@tab Using pnpm#pnpm

```bash
pnpm add -D vuepress-plugin-md-enhance
```

:::

::::

## Demo

:::: md-demo

A tab of fruit:

::: tabs#fruit

@tab apple#apple

Apple

@tab banana#banana

Banana

:::

Another tab of fruit:

::: tabs#fruit

@tab apple

Apple

@tab banana

Banana

@tab orange

Orange

:::

A tab of fruit without id:

::: tabs

@tab apple

Apple

@tab banana

Banana

@tab orange

Orange

:::

::::

<!-- #endregion after -->
