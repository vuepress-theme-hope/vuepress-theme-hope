---
title: Theme Behavior Options
icon: circle-info
order: -1
category:
  - Config
tag:
  - Behavior Options
---

`hopeTheme()` accepts an optional second argument, which is the behavior option. The behavior option controls the behavior of the theme.

The behavior option can also accept a boolean value:

- `false`: options set to`false` with `false` value
- `true`: `{ check: true, compact: true, custom: false, debug: false }`

<!-- more -->

```ts twoslash title=".vuepress/config.ts"
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  // siteConfig here
  // ...

  theme: hopeTheme(
    {
      // themeConfig here
      // ...
    },
    {
      // theme behavior options here (optional)
    },
  ),
});
```

## check

- Type: `boolean`
- Default: `true`

Whether to perform additional checks.

Checks include runtime checks, and frontmatter checks. Incompatible values will be warned.

::: note

This option will be reverted to `false` as default value in stable version.

:::

## compact

- Type: `boolean`
- Default: `true`

Whether to compact historical versions (v1 the latest version and v2 beta versions).

- Options which can still be polyfilled will keep working while leaving a warning in console.
- Options which are dropped will leave an error in console.

::: note

This option will be reverted to `false` as default value in stable version.

:::

## custom

- Type: `boolean`
- Default: `false`

Whether enable customization support by importing components through alias.

By default, the theme will run on performance mode, which all files are bundled and imported directly.

If you want to customize theme by overriding components and layouts, set this option to `true` and the theme will load components and layouts with `@theme-hope` alias.

## debug

- Type: `boolean`
- Default: `false`

Whether running under debug mode.

::: note

This is just a hack by setting `app.env.isDebug` to `true`.

You can also add `--debug` flag while running `vuepress dev` or `vuepress build` to enable debug mode. (Recommended)

:::
