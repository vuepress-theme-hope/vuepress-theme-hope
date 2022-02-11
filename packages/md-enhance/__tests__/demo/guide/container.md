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

::: info custom title

A custom information container with `code`, [link](#markdown).

```js
const a = 1;
```

:::

::: note custom title

A custom note container with `code`, [link](#markdown).

```js
const a = 1;
```

:::

::: tip custom title

A custom tip container with `code`, [link](#markdown).

```js
const a = 1;
```

:::

::: warning custom title

A custom warning container with `code`, [link](#markdown).

```js
const a = 1;
```

:::

::: danger custom Title

A custom danger container with `code`, [link](#markdown).

```js
const a = 1;
```

:::

::: details custom title

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

::: info custom title

A custom information container with `code`, [link](#markdown).

```js
const a = 1;
```

:::

::: note custom title
A custom note container with `code`, [link](#markdown).

```js
const a = 1;
```

:::

::: tip custom title

A custom tip container with `code`, [link](#markdown).

```js
const a = 1;
```

:::

::: warning custom title

A custom warning container with `code`, [link](#markdown).

```js
const a = 1;
```

:::

::: danger custom Title

A custom danger container with `code`, [link](#markdown).

```js
const a = 1;
```

:::

::: details custom title

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
