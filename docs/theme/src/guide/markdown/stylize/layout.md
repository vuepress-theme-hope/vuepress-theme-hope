---
title: Layout
icon: code
category:
  - Markdown
tag:
  - Markdown
  - Layout
---

Create Flexbox, CSS Grid and Multi-column layouts with directive-based syntax in your VuePress site.

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

The plugin uses a "plural-for-container, singular-for-item" convention:

| Type         | Container  | Item      | End    |
| ------------ | ---------- | --------- | ------ |
| Flexbox      | `@flexs`   | `@flex`   | `@end` |
| CSS Grid     | `@grids`   | `@grid`   | `@end` |
| Multi-column | `@columns` | `@column` | `@end` |

For example:

```md
@flexs gap-4 items-center

@flex.flex-demo flex-1

### Left Column

This content grows to fill available space.

@flex.flex-demo

### Right Column

This content takes its natural width.

@end
```

### Attribute Injection

You can attach class and id selectors directly to the directive name:

- `@flexs.nav#top gap-4 items-center`
  - `.class-name` adds a CSS class
  - `#id` adds an HTML id
  - Space-separated text after selectors are utility classes mapped to inline styles

### Nesting

Same or different containers can be nested inside items:

```md
@flexs
@flex
@grids grid-cols-2
@grid
Nested content
@end
@end
```

For complex nesting, you can use the prefix mode with multiple `@` to provide an explicit depth indicator:

```md
@flexs
@flex
@@flexs
@@flex
Content (depth 2 via @@)
@@end
@end
```

In prefix mode, `@@` = depth 2, `@@@` = depth 3, etc. Items and `@end` must use the same number of `@` as their container.

## Supported Utilities

Utility classes are converted to inline CSS styles by default.

### Flexbox

- Direction: `flex-row`, `flex-col`, `flex-row-reverse`, `flex-col-reverse`
- Wrap: `flex-wrap`, `flex-nowrap`, `flex-wrap-reverse`
- Flex: `flex-1`, `flex-auto`, `flex-initial`, `flex-none`
- Grow/Shrink: `grow`, `grow-0`, `shrink`, `shrink-0`
- Order: `order-{n}`, `order-first`, `order-last`, `order-none`

### Grid

- Columns: `grid-cols-{n}`, `grid-cols-none`
- Rows: `grid-rows-{n}`, `grid-rows-none`
- Span: `col-span-{n}`, `col-span-full`, `row-span-{n}`, `row-span-full`
- Start/End: `col-start-{n}`, `col-end-{n}`, `row-start-{n}`, `row-end-{n}`
- Auto Flow: `grid-flow-row`, `grid-flow-col`, `grid-flow-dense`, `grid-flow-row-dense`, `grid-flow-col-dense`
- Auto Sizing: `auto-cols-auto`, `auto-cols-min`, `auto-cols-max`, `auto-cols-fr`, `auto-rows-auto`, `auto-rows-min`, `auto-rows-max`, `auto-rows-fr`

### Spacing & Alignment

- Gap: `gap-{n}`, `gap-x-{n}`, `gap-y-{n}`, `gap-px`, `gap-x-px`, `gap-y-px`
- Justify: `justify-start`, `justify-end`, `justify-center`, `justify-between`, `justify-around`, `justify-evenly`, `justify-stretch`
- Justify Items/Self: `justify-items-{value}`, `justify-self-{value}`
- Align Items/Self/Content: `items-{value}`, `self-{value}`, `content-{value}`
- Place: `place-content-{value}`, `place-items-{value}`, `place-self-{value}`

### Multi-column

- Columns: `columns-{n}`
- Breaks: `break-after-{value}`, `break-before-{value}`, `break-inside-{value}`
- Span: `.span-all` class maps to `column-span: all`

### Other

- Aspect Ratio: `aspect-auto`, `aspect-square`, `aspect-video`

For the full syntax and all utilities, see [@mdit/plugin-layout](https://mdit-plugins.github.io/layout.html#syntax).

## Demo

::::: preview Flexbox

@flexs gap-4 items-center

@flex.flex-demo flex-1

### Left Column

This content grows to fill available space.

@flex.flex-demo

### Right Column

This content takes its natural width.

@end

:::::
