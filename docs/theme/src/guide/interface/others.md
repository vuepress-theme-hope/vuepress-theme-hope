---
title: Other features
icon: ellipsis
order: 7
category:
  - Interface
tag:
  - Interface
---

## Print Button

Try it: <PrintButton />

The theme fully optimize style for print, and there will be a print button at toc in desktop mode by default.

To hide print button, you should set `print: false` in theme options.

::: code-tabs#language

@tab TS

```ts {7}
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    print: false,
  }),
});
```

@tab JS

```js {7}
// .vuepress/config.js
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    print: false,
  }),
});
```

:::

## Fullscreen Button

<ToggleFullScreenButton />

If you need it, you can enable it by setting `fullscreen: true` in theme options.

::: code-tabs#language

@tab TS

```ts {7}
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    fullscreen: true,
  }),
});
```

@tab JS

```js {7}
// .vuepress/config.js
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    fullscreen: true,
  }),
});
```

:::

::: tip

If the current browser does not support full screen, the full screen button is automatically hidden.

:::

## Back to top button

`vuepress-theme-hope` adds a back-to-top button with progress bar which will display after scrolling down 100px by default.

You can set `backToTop: false` in theme options to disable it, or set it with an object to customize its threshold distance and progress bar display:

::: code-tabs#language

@tab TS

```ts {7-8,12-26}
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    // disable back to top button
    backToTop: false,

    // or

    // customize back to top button
    backToTop: {
      /**
       * Scroll threshold distance to display back to top button (in pixels)
       *
       * @default 100
       */
      threshold: 500,
      /**
       * Whether display scroll progress
       *
       * @default true
       */
      progress: false,
    },
  }),
});
```

@tab JS

```js {7-8,12-26}
// .vuepress/config.js
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    // disable back to top button
    backToTop: false,

    // or

    // customize back to top button
    backToTop: {
      /**
       * Scroll threshold distance to display back to top button (in pixels)
       *
       * @default 100
       */
      threshold: 500,
      /**
       * Whether display scroll progress
       *
       * @default true
       */
      progress: false,
    },
  }),
});
```

:::

## RTL Layout

`vuepress-theme-hope` fully supports RTL layout. Just set `rtl: true` in rtl language of locales.

Try it: <ToggleRTLButton />

::: code-tabs#language

@tab TS

```ts {10,11}
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    locales: {
      // ...
      "/ar/": {
        // enable RTL layout
        rtl: true,
      },
    },
  }),
});
```

@tab JS

```js {10,11}
// .vuepress/config.js
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    locales: {
      // ...
      "/ar/": {
        // enable RTL layout
        rtl: true,
      },
    },
  }),
});
```

:::

<script setup lang="ts">
import ToggleFullScreenButton from "@theme-hope/modules/outlook/components/ToggleFullScreenButton";
import PrintButton from "@theme-hope/modules/info/components/PrintButton";
import ToggleRTLButton from "@ToggleRTLButton";
</script>
