---
title: Fields
icon: clipboard-list
category:
  - Markdown
tag:
  - Fields
  - Markdown
---

Describe fields of an object in your VuePress site.

<!-- more -->

## Settings

```ts twoslash {5} title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  markdown: {
    fields: true,
  },
});
```

## Syntax

Use a `fields` container to describe fields. Each line starting with `@name@` is a field item, and its attributes follow the closing `@`.

```md
::: fields
@theme@ type="ThemeConfig" required default="{ base: '/' }"

Theme config.

@enabled@ type="boolean" optional default="true"

Whether it is enabled.

:::
```

All attributes are allowed and displayed as-is. The common ones are:

- `type` is displayed as a code block in the field header.
- `default` is displayed as a labeled code block below the field header.
- `required`, `optional` and `deprecated` are displayed as badges, and a deprecated field name is colored red and struck through.
- Other attributes are displayed as `Name: value` badges.

### Nesting

To describe fields of an object type, nest a field item inside another one by increasing the starting `@` by one for each level of nesting.

```md
::: fields
@options@ type="object"

Options.

@@options.name@ type="string"

Option name.

:::
```

## Demo

:::: preview

::: fields
@theme@ type="ThemeConfig" required default="{ base: '/' }"

Theme config.

@enabled@ type="boolean" optional default="true"

Whether it is enabled.

@legacy@ type="string" deprecated

Deprecated field.

:::

::::
