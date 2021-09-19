---
title: Code Demo
icon: discover
---

Let you insert code demos in your Markdown file.

<!-- more -->

## Configuration

```js {7}
module.exports = {
  plugins: [
    [
      "md-enhance",
      {
        // Enable Code Demo
        demo: true,
      },
    ],
  ],
};
```

## Syntax

You should use the following syntax:

````md
::: demo [type] Optional title text

```html
<!-- ↑ use available ones -->
<!-- your code here -->
<!-- you can have mutiple code block, but each language must appear only once. -->
```

```json
// json block is for config
{
  // your config here (optional)
}
```

:::
````

::: tip

The json block is optional, for config please see [config](../../config.md#demo).

:::

The plugin support three types:

- normal (default)
- vue
- react

## Available languages

You can use different language in your demo block.

When you set language which can not run on browers, since the plugin is not able to resolve them, so demo display will be disabled. The plugin will only show the code and provide you a button to open it in CodePen.

Available HTML languages:

- `"html"` (default)
- `"slim"`
- `"haml"`
- `"markdown"`

> You can also use `md` in code block.

Available JS languages:

- `"javascript"` (default)
- `"coffeescript"`
- `"babel"`
- `"livescript"`
- `"typescript"`

> You can also use `js`, `ts`, `coffee` and `ls` in code block.

Available CSS languages:

- `"css"` (default)
- `"less"`
- `"scss"`
- `"sass"`
- `"stylus"`

> You can also use `styl` in code block.

### Not supported language demo

::: demo A demo using language not supoprted by browsers

```md
# Title

is very handsome.
```

```ts
const message: string = "Mr.Hope";

document.querySelector("h1").innerHTML = message;
```

```scss
h1 {
  font-style: italic;

  + p {
    color: red;
  }
}
```

:::

:::: details Code

````md
::: demo A normal demo

```md
# Title

is very handsome.
```

```ts
const message: string = "Mr.Hope";

document.querySelector("h1").innerHTML = message;
```

```scss
h1 {
  font-style: italic;

  + p {
    color: red;
  }
}
```

:::
````

::::
