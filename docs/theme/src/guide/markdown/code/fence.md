---
title: Code Block
icon: code
order: 1
category:
  - Markdown
tag:
  - Markdown
  - Code Block
---

## Highlighter

You can use `markdown.highlighter` to choose the highlighter you want to use, `shiki` for shiki, `prismjs` for prism.js. You can also set `markdown.highlighter` to an object to pass options to the highlighter, while specifying the type of highlighter with the `type` field:

```ts twoslash {7-12} title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  markdown: {
    // keyword "shiki" / "prismjs"
    // or an object format with type field
    highlighter: {
      type: "shiki", // or "prismjs"

      // shiki or prism options
      // ...
    },
  },
});
```

The shiki plugin is built-in, so you don't need to install it. If you want to use prismjs, you need to install the plugin first:

::: code-tabs#shell

@tab pnpm

```bash
pnpm add -D @vuepress/plugin-prismjs@next
```

@tab yarn

```bash
yarn add -D @vuepress/plugin-prismjs@next
```

@tab npm

```bash
npm i -D @vuepress/plugin-prismjs@next
```

:::

### Shiki

With [`@vuepress/plugin-shiki`][shiki], you can use [shiki](https://shiki.style) to highlight your code blocks.

We support all options in [`@vuepress/plugin-shiki`][shiki].

::: important Background for code block Themes

To let the theme display fenced code blocks correctly, you should set background color and font color for code blocks according to theme you use in shiki by adding these variables in `.vuepress/styles/config.scss`:.

- `$code-bg-color`: background color for code blocks
- `$code-color`: font color for code blocks

:::

### Prism.js

With [`@vuepress/plugin-prismjs`][prismjs], you can use [prism.js](https://prismjs.com) to highlight your code blocks.

We support all options in [`@vuepress/plugin-prismjs`][prismjs].

## Highlighter Features

The following features are both supported in shiki and prism.js, and is customizable via highlighter options.

### Line Numbers

You can add `:line-numbers` / `:no-line-numbers` mark in your fenced code blocks to override the value set in config, and customize the beginning number by adding `=` after `:line-numbers`. For example, `:line-numbers=2` means the line numbers in code blocks will start from `2`.

**Input:**

````md:no-line-numbers
```ts:line-numbers
// line-numbers is enabled
const line2 = 'This is line 2'
const line3 = 'This is line 3'
```

```ts :no-line-numbers
// line-numbers is disabled
const line2 = "This is line 2";
const line3 = "This is line 3";
```

```ts :line-numbers=2
// line-numbers is enabled and start from 2
const line3 = "This is line 3";
const line4 = "This is line 4";
```
````

**Output:**

```ts :line-numbers
// line-numbers is enabled
const line2 = "This is line 2";
const line3 = "This is line 3";
```

```ts :no-line-numbers
// line-numbers is disabled
const line2 = "This is line 2";
const line3 = "This is line 3";
```

```ts :line-numbers=2
// line-numbers is enabled and start from 2
const line3 = "This is line 3";
const line4 = "This is line 4";
```

### Highlight Lines

You can highlight specified lines of your code blocks by adding line ranges mark in your fenced code blocks:

- Line ranges: `{5-8}`
- Multiple single lines: `{4,7,9}`
- Combined: `{4,7-13,16,23-27,40}`

**Input:**

````md
```ts {1,7-9}
import { defaultTheme } from "@vuepress/theme-default";
import { defineUserConfig } from "vuepress";

export default defineUserConfig({
  title: "Hello, VuePress",

  theme: defaultTheme({
    logo: "https://vuepress.vuejs.org/images/hero.png",
  }),
});
```
````

**Output:**

```ts {1,7-9}
import { defaultTheme } from "@vuepress/theme-default";
import { defineUserConfig } from "vuepress";

export default defineUserConfig({
  title: "Hello, VuePress",

  theme: defaultTheme({
    logo: "https://vuepress.vuejs.org/images/hero.png",
  }),
});
```

### Line Collapsing

Disabled by default, can be enabled via `collapsedLines` in highlighter options.

You can add the `:collapsed-lines` / `:no-collapsed-lines` marker to the code block to override global settings. You can also add `=` after `:collapsed-lines` to customize the starting line number being collapsed, for example, `:collapsed-lines=12` means collapsing the code block starting from line 12.

**Input:**

````md :no-collapsed-lines
Collapse lines starting from 15:

```css :collapsed-lines=15
html {
  margin: 0;
  background: black;
  height: 100%;
}
/* ... more code */
```

Disabled collapsed lines:

```css :no-collapsed-lines
html {
  margin: 0;
  background: black;
  height: 100%;
}
/* ... more code */
```
````

**Output:**

Collapse lines starting from 15:

```css :collapsed-lines
html {
  margin: 0;
  background: black;
  height: 100%;
}

body {
  margin: 0;
  width: 100%;
  height: inherit;
}

/* the three main rows going down the page */

body > div {
  height: 25%;
}

.thumb {
  float: left;
  width: 25%;
  height: 100%;
  object-fit: cover;
}

.main {
  display: none;
}

.blowup {
  display: block;
  position: absolute;
  object-fit: contain;
  object-position: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2000;
}

.darken {
  opacity: 0.4;
}
```

Disabled collapsed lines:

```css :no-collapsed-lines
html {
  margin: 0;
  background: black;
  height: 100%;
}

body {
  margin: 0;
  width: 100%;
  height: inherit;
}

/* the three main rows going down the page */

body > div {
  height: 25%;
}

.thumb {
  float: left;
  width: 25%;
  height: 100%;
  object-fit: cover;
}

.main {
  display: none;
}

.blowup {
  display: block;
  position: absolute;
  object-fit: contain;
  object-position: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2000;
}

.darken {
  opacity: 0.4;
}
```

### Code Block Title

Add `title="Title"` after the code block ` ``` ` to set the title.

**Input:**

````md {1}
```ts title="foo/baz.js"
console.log("hello");
```
````

**Output:**

```ts title="foo/baz.js"
console.log("hello");
```

### Notation Diff

Enabled by `notationDiff: true` in highlighter options.

**Input:**

````md
```ts
console.log("hewwo"); // [\!code --]
console.log("hello"); // [\!code ++]
console.log("goodbye");
```
````

**Output:**

```ts
console.log("hewwo"); // [!code --]
console.log("hello"); // [!code ++]
console.log("goodbye");
```

### Notation Focus

Enabled by `notationFocus: true` in highlighter options.

**Input:**

````md
```ts
console.log("Not focused");
console.log("Focused"); // [\!code focus]
console.log("Not focused");
```
````

**Output:**

```ts
console.log("Not focused");
console.log("Focused"); // [!code focus]
console.log("Not focused");
```

### Notation Highlight

Enabled by `notationHighlight: true` in highlighter options.

**Input:**

````md
```ts
console.log("Not highlighted");
console.log("Highlighted"); // [\!code highlight]
console.log("Not highlighted");
```
````

**Output:**

```ts
console.log("Not highlighted");
console.log("Highlighted"); // [!code highlight]
console.log("Not highlighted");
```

### Notation Error Level

Enabled by `notationErrorLevel: true` in highlighter options.

**Input:**

````md
```ts
console.log("No errors or warnings");
console.warn("Warning"); // [\!code warning]
console.error("Error"); // [\!code error]
```
````

**Output:**

```ts
console.log("No errors or warnings");
console.warn("Warning"); // [!code warning]
console.error("Error"); // [!code error]
```

### Notation Word Highlight

Enabled by `notationWordHighlight: true` in highlighter options.

**Input:**

````md
```ts
// [\!code word:Hello]
const message = "Hello World";
console.log(message); // prints Hello World
```
````

**Output:**

```ts
// [!code word:Hello]
const message = "Hello World";
console.log(message); // prints Hello World
```

You can highlight words based on the meta string provided on the code snippet

**Input:**

````md
```js /Hello/
const msg = "Hello World";
console.log(msg);
console.log(msg); // prints Hello World
```
````

**Output:**

```js /Hello/
const msg = "Hello World";
console.log(msg);
console.log(msg); // prints Hello World
```

### Whitespace

Control rendering of whitespace characters (Space and Tab) in code blocks via `whitespace` option in highlighter options.

- `true`: enable render whitespace, same of `all`
- `false`: disable render whitespace
- `'all'`: render all whitespace
- `'boundary'`: render leading and trailing whitespace of the line
- `'trailing'`: render trailing whitespace of the line

You can add `:whitespace / :no-whitespace` mark in your fenced code blocks to override the value set in config, and customize the render type by adding `=` after `:whitespace`. For example `:whitespace=boundary` will render leading and trailing whitespace of the line.

**Input:**

````md
```md :whitespace
<!-- render all whitespace -->

A text  
with trailing spaces

    indented text
```

```md :whitespace=boundary
<!-- render leading and trailing whitespace of the line -->

A text  
with trailing spaces

    indented text
```

```md :whitespace=trailing
<!-- render trailing whitespace of the line -->

A text  
with trailing spaces

    indented text
```

```md :no-whitespace
<!-- disable render whitespace -->

A text  
with trailing spaces

    indented text
```
````

**Output:**

```md :whitespace
<!-- render all whitespace -->

A text  
with trailing spaces

    indented text
```

```md :whitespace=boundary
<!-- render leading and trailing whitespace of the line -->

A text  
with trailing spaces

    indented text
```

```md :whitespace=trailing
<!-- render trailing whitespace of the line -->

A text  
with trailing spaces

    indented text
```

```md :no-whitespace
<!-- disable render whitespace -->

A text  
with trailing spaces

    indented text
```

## Copy Button

The theme uses [`@vuepress/plugin-copy-code`][copy-code] to add copy buttons on all fenced code blocks.

::: info

`vuepress-theme-hope` passes `plugins.copyCode` in theme options as plugin options to `@vuepress/plugin-copy-code`.

:::

By default, the copy button is only displayed on desktop mode. Set `plugins.copyCode.showInMobile` to `true` in theme options to display this button on mobile devices.

A success hint will be displayed once user press the copy button, and its default duration is `2000` ms, you can customize it with `plugins.copyCode.duration` in theme options, and you can disable the hint by setting duration to `0`.

[copy-code]: https://ecosystem.vuejs.press/plugins/features/copy-code.html
[prismjs]: https://ecosystem.vuejs.press/plugins/markdown/prismjs.html
[shiki]: https://ecosystem.vuejs.press/plugins/markdown/shiki.html
