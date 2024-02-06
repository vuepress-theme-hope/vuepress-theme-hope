---
title: Giscus Options
icon: fab fa-fw fa-github
---

## Config

### repo

- Type: `string`
- Required: No

The name of repository to store discussions.

### repoId

- Type: `string`
- Required: No

The ID of repository to store discussions. Generate through [Giscus Page](https://giscus.app/)

### category

- Type: `string`
- Required: No

The name of the discussion category.

### categoryId

- Type: `string`
- Required: No

The ID of the discussion category. Generate through [Giscus Page](https://giscus.app/)

### mapping

- Type: `string`
- Default: `"pathname"`

Page - Discussion mapping. For details see [Giscus Page](https://giscus.app/)

### strict

- Type: `boolean`
- Default: `true`

Whether enable strict mapping or not

### lazyLoading

- Type: `boolean`
- Default: `true`

Whether enable lazy loading or not

### reactionsEnabled

- Type: `boolean`
- Default: `true`

Whether enable reactions or not

### inputPosition

- Type: `"top" | "bottom"`
- Default: `"top"`

Input position

### lightTheme

- Type: `GiscusTheme`

  ```ts
  type GiscusTheme =
    | "light"
    | "light_high_contrast"
    | "light_protanopia"
    | "dark"
    | "dark_high_contrast"
    | "dark_protanopia"
    | "dark_dimmed"
    | "transparent_dark"
    | "preferred_color_scheme"
    | `https://${string}`;
  ```

- Default: `"light"`

Giscus theme used in lightmode

Should be a built-in theme keyword or a css link starting with `https://`.

### darkTheme

- Type: `GiscusTheme`

  ```ts
  type GiscusTheme =
    | "light"
    | "light_high_contrast"
    | "light_protanopia"
    | "dark"
    | "dark_high_contrast"
    | "dark_protanopia"
    | "dark_dimmed"
    | "transparent_dark"
    | "preferred_color_scheme"
    | `https://${string}`;
  ```

- Default: `"dark"`

Giscus theme used in darkmode

Should be a built-in theme keyword or a css link starting with `https://`.

## Plugin Config

You can directly configure serializable options in the plugin options:

```ts title=".vuepress/config.ts"
import { defineUserConfig } from "vuepress";
import { commentPlugin } from "vuepress-plugin-comment2";

export default defineUserConfig({
  plugins: [
    commentPlugin({
      provider: "GIscus",
      // other options
      // ...
    }),
  ],
});
```

## Client Config

You can use the `defineGIscusConfig` function to customize GIscus:

```ts title=".vuepress/client.ts"
import { defineClientConfig } from "vuepress/client";
import { defineGIscusConfig } from "vuepress-plugin-comment2/client";

defineGIscusConfig({
  // GIscus config
});

export default defineClientConfig({
  // ...
});
```
