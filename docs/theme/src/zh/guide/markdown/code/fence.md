---
title: 代码块
icon: code
order: 1
category:
  - Markdown
tag:
  - Markdown
  - 代码块
---

## 高亮器

你可以使用 `markdown.highlighter` 来选择你想要使用的高亮器，`shiki` 为 Shiki，`prismjs` 为 Prism.js。你也可以将 `markdown.highlighter` 设置为一个对象，通过 `type` 字段指定高亮器的类型，并将选项传递给高亮器：

```ts twoslash {7-12} title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  markdown: {
    // 关键词 "shiki" / "prismjs"
    // 或者拥有 type 字段的对象
    highlighter: {
      type: "shiki", // or "prismjs"

      // shiki 或 prismjs 选项
      // ...
    },
  },
});
```

Shiki 插件是内置的，所以你不需要安装它。如果你想要使用 Prism.js，你需要先安装插件：

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

通过 [`@vuepress/plugin-shiki`][shiki] 插件，你可以使用 Shiki 高亮器。

我们支持 [`@vuepress/plugin-shiki`][shiki] 插件的所有选项。

::: important 代码块主题的背景

为了让主题正确显示代码块，你应该根据 Shiki 中使用的主题设置代码块的背景颜色和字体颜色，通过在 `.vuepress/styles/config.scss` 中添加这些变量来实现：

- `$code-bg-color`：代码块的背景颜色
- `$code-color`：代码块的字体颜色

:::

### Prism.js

通过 [`@vuepress/plugin-prismjs`][prismjs] 插件，你可以使用 [prism.js](https://prismjs.com) 来高亮你的代码块。

我们支持 [`@vuepress/plugin-prismjs`][prismjs] 插件的所有选项。

## 高亮器功能

以下功能在 Shiki 和 Prism.js 中都受支持，并且可以通过高亮器选项进行自定义。

### 行号

你可以在代码块添加 `:line-numbers` / `:no-line-numbers` 标记来覆盖配置项中的设置，还可以在 `:line-numbers` 之后添加 `=` 来自定义起始行号，例如 `:line-numbers=2` 表示代码块中的行号从 `2` 开始。

**输入：**

````md
```ts :line-numbers
// 启用行号
const line2 = "This is line 2";
const line3 = "This is line 3";
```

```ts :no-line-numbers
// 禁用行号
const line2 = "This is line 2";
const line3 = "This is line 3";
```

```ts :line-numbers=2
// 行号已启用，并从 2 开始
const line3 = "This is line 3";
const line4 = "This is line 4";
```
````

**输出：**

```ts :line-numbers
// 启用行号
const line2 = "This is line 2";
const line3 = "This is line 3";
```

```ts :no-line-numbers
// 禁用行号
const line2 = "This is line 2";
const line3 = "This is line 3";
```

```ts :line-numbers=2
// 行号已启用，并从 2 开始
const line3 = "This is line 3";
const line4 = "This is line 4";
```

### 行高亮

你可在代码块的信息描述中添加行数标记来高亮指定的行：

- 行数范围：`{5-8}`
- 多个单行：`{4,7,9}`
- 组合：`{4,7-13,16,23-27,40}`

**输入：**

````md
```ts {1,7-9}
import { defaultTheme } from "@vuepress/theme-default";
import { defineUserConfig } from "vuepress";

export default defineUserConfig({
  title: "你好， VuePress",

  theme: defaultTheme({
    logo: "https://vuepress.vuejs.org/images/hero.png",
  }),
});
```
````

**输出：**

```ts {1,7-9}
import { defaultTheme } from "@vuepress/theme-default";
import { defineUserConfig } from "vuepress";

export default defineUserConfig({
  title: "你好， VuePress",

  theme: defaultTheme({
    logo: "https://vuepress.vuejs.org/images/hero.png",
  }),
});
```

### 行折叠

默认情况下禁用，可以通过高亮器选项中的 `collapsedLines` 启用。

你可以在代码块添加 `:collapsed-lines` / `:no-collapsed-lines` 标记来覆盖配置项中的设置。还可以在 `:collapsed-lines` 之后添加 `=` 来自定义起始折叠行号，例如 `:collapsed-lines=12` 表示代码块从第 12 行开始折叠。

**输入：**

````md :no-collapsed-lines
从第 15 行开始折叠:

```css :collapsed-lines
html {
  margin: 0;
  background: black;
  height: 100%;
}
/* ... 更多代码 */
```

<!-- 禁用折叠 -->

```css :no-collapsed-lines
html {
  margin: 0;
  background: black;
  height: 100%;
}
/* ... 更多代码 */
```
````

**输出：**

从第 15 行开始折叠:

```css :collapsed-lines=15
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

禁用折叠:

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

### 代码块标题

在代码块 ` ``` ` 后面添加 `title="标题"` 来设置标题。

**输入：**

````md {1}
```ts title="foo/baz.js"
console.log("hello");
```
````

**输出：**

```ts title="foo/baz.js"
console.log("hello");
```

### 差异标记

在高亮器选项中通过 `notationDiff: true` 启用。

**输入：**

````md
```ts
console.log("hewwo"); // [\!code --]
console.log("hello"); // [\!code ++]
console.log("goodbye");
```
````

**输出：**

```ts
console.log("hewwo"); // [!code --]
console.log("hello"); // [!code ++]
console.log("goodbye");
```

### 聚焦标记

在高亮器选项中通过 `notationFocus: true` 启用。

**输入：**

````md
```ts
console.log("Not focused");
console.log("Focused"); // [\!code focus]
console.log("Not focused");
```
````

**输出：**

```ts
console.log("Not focused");
console.log("Focused"); // [!code focus]
console.log("Not focused");
```

### 高亮标记

在高亮器选项中通过 `notationHighlight: true` 启用。

**输入：**

````md
```ts
console.log("Not highlighted");
console.log("Highlighted"); // [\!code highlight]
console.log("Not highlighted");
```
````

**输出：**

```ts
console.log("Not highlighted");
console.log("Highlighted"); // [!code highlight]
console.log("Not highlighted");
```

### 错误级别标记

在高亮器选项中通过 `notationErrorLevel: true` 启用。

**输入：**

````md
```ts
console.log("No errors or warnings");
console.warn("Warning"); // [\!code warning]
console.error("Error"); // [\!code error]
```
````

**输出：**

```ts
console.log("No errors or warnings");
console.warn("Warning"); // [!code warning]
console.error("Error"); // [!code error]
```

### 词高亮标记

在高亮器选项中通过 `notationWordHighlight: true` 启用。

**输入：**

````md
```ts
// [\!code word:Hello]
const message = "Hello World";
console.log(message); // prints Hello World
```
````

**输出：**

```ts
// [!code word:Hello]
const message = "Hello World";
console.log(message); // prints Hello World
```

你可以根据代码片段中提供的元字符串，高亮显示词

**输入：**

````md
```js /Hello/
const msg = "Hello World";
console.log(msg);
console.log(msg); // 打印 Hello World
```
````

**输出：**

```js /Hello/
const msg = "Hello World";
console.log(msg);
console.log(msg); // 打印 Hello World
```

### 空白符渲染

通过高亮器选项中的 `whitespace` 控制空白符（空格 和 Tab）渲染。

- `true`: 启用空白符渲染，等同于 `all`
- `false`: 禁用空白符渲染
- `'all'`: 渲染所有空白符
- `'boundary'`: 仅渲染行首行尾的空白符
- `'trailing'`: 仅渲染行尾的空白符

你可以在代码块中添加 `:whitespace / :no-whitespace` 标记来覆盖配置项中的设置。还可以在 `:whitespace` 之后添加 `=` 来定义渲染空白符的方式。比如 `:whitespace=boundary` 将渲染行首行尾的空白符。

**输入：**

````md
```md :whitespace
<!-- 渲染所有空白符 -->

具有尾随空格  
的文字

    缩进文字
```

```md :whitespace=boundary
<!-- 渲染行首行尾的空白符 -->

具有尾随空格  
的文字

    缩进文字
```

```md :whitespace=trailing
<!-- 渲染行尾的空白符 -->

具有尾随空格  
的文字

    缩进文字
```

```md :no-whitespace
<!-- 禁用空白符 -->

A text
with line break

    code block
```
````

**输出：**

```md :whitespace
<!-- 渲染所有空白符 -->

具有尾随空格  
的文字

    缩进文字
```

```md :whitespace=boundary
<!-- 渲染行首行尾的空白符 -->

具有尾随空格  
的文字

    缩进文字
```

```md :whitespace=trailing
<!-- 渲染行尾的空白符 -->

具有尾随空格  
的文字

    缩进文字
```

```md :no-whitespace
<!-- 禁用空白符 -->

A text
with line break

    code block
```

## 复制按钮

主题使用 [`@vuepress/plugin-copy-code`][copy-code] 在所有代码块上添加复制按钮。

::: info

`vuepress-theme-hope` 将主题选项中的 `plugins.copyCode` 选项作为插件选项提供给 `@vuepress/plugin-copy-code`。

:::

默认情况下，复制按钮仅在桌面模式下显示。在主题选项中设置 `plugins.copyCode.showInMobile` 为 `true` 可以在移动设备上显示此按钮。

用户按下复制按钮后，将显示一个成功提示，默认持续时间为 `2000` 毫秒，你可以通过主题选项中的 `plugins.copyCode.duration` 自定义它，也可以通过将持续时间设置为 `0` 来禁用提示。

[copy-code]: https://ecosystem.vuejs.press/zh/plugins/features/copy-code.html
[prismjs]: https://ecosystem.vuejs.press/zh/plugins/markdown/prismjs.html
[shiki]: https://ecosystem.vuejs.press/zh/plugins/markdown/shiki.html
