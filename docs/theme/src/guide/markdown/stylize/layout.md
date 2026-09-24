---
title: Layout
icon: table-columns
category:
  - Markdown
tag:
  - Layout
  - Markdown
---

Create flexbox, grid and multi-column layouts with directives.

<!-- more -->

## Settings

```ts twoslash {5} title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  markdown: {
    layout: true,
  },
});
```

## Syntax

Use a plural directive to open a layout, a singular directive for its items, and `@end` to close it.

- Flexbox: `@flexs` opens a layout, and `@flex` adds an item.
- CSS Grid: `@grids` opens a layout, and `@grid` adds an item.
- Multi-column: `@columns` opens a layout, and `@column` adds an item.

Utilities separated by spaces are supported, such as `gap-4`, `items-center`, `flex-1` and `grid-cols-2`, and they are converted to inline styles by default.

You can also use `@flexs.nav#top gap-4` to add a class and an id to a layout.

Nesting is supported by closing each layout with `@end`, and you can use `@@`, `@@@` to state the depth explicitly.

For all supported utilities and options, see [@mdit/plugin-layout](https://mdit-plugins.github.io/layout.html).

## Demo

:::: preview

@flexs gap-4 items-center

@flex flex-1

I grow to fill the available space.

@flex

I take my natural width.

@end

::::
