---
title: Custom container
icon: customize
---

The plugin adds tip, note, info, warning, danger and detail container.

<!-- more -->

## Config

```js {7}
module.exports = {
  plugins: [
    [
      "md-enhance",
      {
        // Enable container
        container: true,
      },
    ],
  ],
};
```

## Demo

::: info
Information container
:::

::: note
Note container
:::

::: tip
Tip container
:::

::: warning
Warning container
:::

::: danger
Dangerous container
:::

::: details
Details container
:::

::: info Custom Title

A custom information container with `code`, [link](#markdown).

```js
const a = 1;
```

:::

::: note Custom Title

A custom note container with `code`, [link](#markdown).

```js
const a = 1;
```

:::

::: tip Custom Title

A custom tip container with `code`, [link](#markdown).

```js
const a = 1;
```

:::

::: warning Custom Title

A custom warning container with `code`, [link](#markdown).

```js
const a = 1;
```

:::

::: danger Custom Title

A custom danger container with `code`, [link](#markdown).

```js
const a = 1;
```

:::

::: details Custom Title

A custom details container with `code`, [link](#markdown).

```js
const a = 1;
```

:::

::: info Custom info
:::

::: note Custom note
:::

::: tip Custom tip
:::

::: warning Custom warning
:::

::: danger Custom danger
:::

````md
::: info
Information container
:::

::: note
Note container
:::

::: tip
Tip container
:::

::: warning
Warning container
:::

::: danger
Dangerous container
:::

::: details
Details container
:::

::: info Custom Title

A custom information container with `code`, [link](#markdown).

```js
const a = 1;
```

:::

::: note Custom Title
A custom note container with `code`, [link](#markdown).

```js
const a = 1;
```

:::

::: tip Custom Title

A custom tip container with `code`, [link](#markdown).

```js
const a = 1;
```

:::

::: warning Custom Title

A custom warning container with `code`, [link](#markdown).

```js
const a = 1;
```

:::

::: danger Custom Title

A custom danger container with `code`, [link](#markdown).

```js
const a = 1;
```

:::

::: details Custom Title

A custom details container with `code`, [link](#markdown).

```js
const a = 1;
```

:::

::: info Custom info
:::

::: note Custom note
:::

::: tip Custom tip
:::

::: warning Custom warning
:::

::: danger Custom danger
:::
````
