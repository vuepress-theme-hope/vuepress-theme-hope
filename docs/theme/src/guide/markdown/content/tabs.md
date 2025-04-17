---
title: Tabs
icon: table-columns
category:
  - Markdown
tag:
  - Markdown
  - Tabs
---

Let the Markdown file in your VuePress site support tabs.

<!-- more -->

## Settings

```ts twoslash {5} title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  markdown: {
    tabs: true,
  },
});
```

## Usage

You need to wrap your tabs in `tabs` container.

You can add an id suffix in `tabs` container, which will be used as tab id. All tabs with same id will share same switch event.

```md
<!-- 👇 here, fruit will be used as id, it's optional -->

::: tabs#fruit

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

<!-- 👇 tab 3 will be activated by default -->

@tab:active title 3

<!-- tab 3 content -->

:::
```

By default, the title will be used as value of tab, but you can override it using id suffix.

```md
::: tabs

<!-- 👇 here, tab 1's title "title 1" will be used as value. -->

@tab title 1

<!-- tab 1 content -->

<!-- 👇 here, tab 2's title will be "title 2", and it will bind with the value "value2" -->

@tab title 2#value2

<!-- tab 2 content -->

:::
```

You can use Vue syntax and components in each tab, and you can access `value` and `isActive`, indicating the tab's binding value and whether the tab is active.

### Switching together and persisting choice

If you want to make some tab groups switch together, you can use tab ids to bind them. Also, each tab id's choice will be stored and persisted.

Here is an example:

Choose a package manager:

::: tabs#shell

@tab npm

npm should be installed with Node.js.

@tab pnpm

```bash
corepack enable
corepack use pnpm@latest
```

:::

Install `vuepress`:

::: tabs#shell

@tab Using npm#npm

```bash
npm i -D vuepress
```

@tab Using pnpm#pnpm

```bash
pnpm add -D vuepress
```

:::

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
