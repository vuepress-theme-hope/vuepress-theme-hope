---
title: Theme Extending
icon: extend
category:
  - Advanced
tag:
  - Advanced
  - Customize
---

`vuepress-theme-hope` supports extending just like `@vuepress/theme-default`.

You can create your own theme based on `vuepress-theme-hope` and use it locally or publish it according to your needs.

## Theme extending

You need to create an entry file for your theme and import `hopeTheme` from `vuepress-theme-hope`.

In your entry file, set `extends: hopeTheme(options)` to extend the `vuepress-theme-hope` theme.

The aliases of the same name (`alias`) and layouts (`layouts`) of your own newly created theme has higher priority over the extended theme `vuepress-theme-hope`, which means that you can override `vuepress-theme-hope` components via `alias`.

::: code-tabs#language

@tab TS

```ts
// .vuepress/theme/index.ts
import { getDirname, path } from "@vuepress/utils";
import { hopeTheme } from "vuepress-theme-hope";
import type { ThemeOptions } from "vuepress-theme-hope";

const __dirname = getDirname(import.meta.url);

export const localTheme = (options: ThemeOptions) => ({
  name: "vuepress-theme-local",

  extends: hopeTheme(options),

  alias: {
    // You can override or add aliases here
    // For example, here we change the vuepress-theme-hope HomePage component to components/HomePage.js under our own theme
    "@theme-hope/components/HomePage.js": path.resolve(
      __dirname,
      "./components/HomePage.js"
    ),
  },
});
```

@tab JS

```js
// .vuepress/theme/index.js
import { getDirname, path } from "@vuepress/utils";
import { hopeTheme } from "vuepress-theme-hope";

const __dirname = getDirname(import.meta.url);

export default (options) => ({
  name: "vuepress-theme-local",

  extends: hopeTheme(options),

  alias: {
    // You can override or add aliases here
    // For example, here we change the vuepress-theme-hope HomePage component to components/HomePage.js under our own theme
    "@theme-hope/components/HomePage.js": path.resolve(
      __dirname,
      "./components/HomePage.js"
    ),
  },
});
```

:::

::: tip

If you want to use `vue` files, you can make a simple js wrapper by writing:

```js
// wrapper.js
import YouComponent from "./YouComponent.vue";
export default YouComponent;
```

:::

Also, you can add or override layout provided by `vuepress-theme-hope` via `layouts` in your theme client config file.

::: code-tabs#language

@tab TS

```ts
// .vuepress/theme/config.ts
import { defineClientConfig } from "@vuepress/client";
import Changelog from "./layouts/Changelog.vue";
import Layout from "./layouts/Layout.vue";

export default defineClientConfig({
  // You can override or add layouts here
  layouts: {
    // For example, here we change the default layout of vuepress-theme-hope to layouts/Layout.vue under our own theme
    Layout,
    // Also we added a Changelog layout
    Changelog,
  },
});
```

@tab JS

```js
// .vuepress/theme/config.js
import { defineClientConfig } from "@vuepress/client";
import Changelog from "./layouts/Changelog.vue";
import Layout from "./layouts/Layout.vue";

export default defineClientConfig({
  // You can override or add layouts here
  layouts: {
    // For example, here we change the default layout of vuepress-theme-hope to layouts/Layout.vue under our own theme
    Layout,
    // Also we added a Changelog layout
    Changelog,
  },
});
```
