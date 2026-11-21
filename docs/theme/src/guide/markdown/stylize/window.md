---
title: Window
icon: window-maximize
category:
  - Markdown
tag:
  - Window
  - Markdown
---

Display content in a window with a titlebar.

<!-- more -->

## Settings

```ts twoslash {5} title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  markdown: {
    window: "windows",
  },
});
```

Set `window` to `true` to enable the container with the `mac` style, or to `"mac"` / `"windows"` to specify the default style of all windows.

## Syntax

Wrap the content in a `window` container. Any Markdown syntax is supported inside.

The `mac` style shows the traffic light buttons and a centered title, while the `windows` style shows the minimize, maximize and close buttons with the title aligned to the start. Add `mac` or `windows` after `window` to override the default style for a single window.

```md
::: window title="Hello World"

The content of the window.

:::

::: window windows title="Hello World"

The content of the window.

:::
```

The container accepts the following attributes:

- `title`: The window title, displayed as plain text.
- `height`: The height of the content area. A number is treated as pixels, and a length with a `px`, `em`, `rem`, `%`, `vh`, `vw`, `vmin` or `vmax` unit is also accepted. The content scrolls when it exceeds the height.
- `padding`: The padding of the content area. A number is treated as pixels, and a length with a `px`, `em`, `rem`, `%`, `vh`, `vw`, `vmin` or `vmax` unit is also accepted.
- `no-padding`: Remove the padding of the content area, which is useful for images and demos that should fill the window.

## Demo

:::: preview

::: window title="Hello World"

The content of the window supports any Markdown syntax.

```ts
console.log("Hello World!");
```

:::

::::

:::: preview

::: window windows title="Hello World"

The content of the window supports any Markdown syntax.

```ts
console.log("Hello World!");
```

:::

::::
