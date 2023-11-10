---
title: Code Demo
icon: splotch
---

Let you insert code demos in your Markdown file.

<!-- more -->

::: info What's Code Demo

Code demo is a feature that let you insert code snippets in your Markdown file, and the plugin will render the source code and run the code on the browser for you. If users like to try it, they can click CodePen or JSFiddle button to open the demo in CodePen or JSFiddle and edit them online.

So, this means you do not have access to internal components in your project. Neither can we read your local file system in users' browser, nor can Codepen and JSFiddle access Vue components in your project.

:::

## Settings

::: code-tabs#language

@tab TS

```ts {8}
// .vuepress/config.ts
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";

export default {
  plugins: [
    mdEnhancePlugin({
      // Enable Code Demo
      demo: true,
    }),
  ],
};
```

@tab JS

```js {8}
// .vuepress/config.js
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";

export default {
  plugins: [
    mdEnhancePlugin({
      // Enable Code Demo
      demo: true,
    }),
  ],
};
```

:::

<!-- #region syntax -->

## Syntax

You should use the following syntax:

````md
::: [type]-demo Optional title text

```html
<!-- ↑ use available ones -->
<!-- your code here -->
<!-- you can have multiple code block, but each language must appear only once. -->
```

```json
// json block is for config
{
  // your config here (optional)
}
```

:::
````

<!-- #endregion syntax -->

::: tip

The json block is optional, for config please see [config](../../../config.md#demo).

:::

The plugin support three types:

- normal
- vue
- react

<!-- #region language -->

## Available Languages

You can use different language in your demo block.

When you set language which can not run on browsers, since the plugin is not able to resolve them, so demo display will be disabled. The plugin will only show the code and provide you a button to open it in CodePen.

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

<!-- #endregion language -->

### Not Supported Language Demo

<!-- #region demo -->

:::: md-demo A demo using language not supported by browsers

::: normal-demo Normal demo

```md
# Title

is very powerful!
```

```ts
const message: string = "VuePress Theme Hope";

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

::::

<!-- #endregion demo -->
