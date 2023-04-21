---
title: Customize Effects
icon: wand-magic-sparkles
category:
  - Cookbook
  - Customize
tag:
  - Customize
---

This tutorial guides you how to customize theme effects.

<!-- more -->

## Clear Effects

By default, the theme will:

- Use color list to decorate categories and tags
- Add animation when switching pages and elements
- Add ease-in animations to homepage elements, and add hovering effects to features.
- Use a more fancy code copy button
- Use fancy tooltips.
- Added fade-in when switching between day mode and night mode

If you need to remove these fancy styles, please set `pure: true` in the theme options to enable pure mode.

Meanwhile, you can control the duration of the animation by controlling `$color-transition` and `transform-transition` in the palette file:

```scss
// .vuepress/styles/palette.scss

$color-transition: 0s;
$transform-transition: 0s;
```

## Adding Effects

You are free to add more effects to your site through config file options and client files provided by VuePress.

- If you need to add global CSS and JS, please set `head` option in VuePress [config file](../vuepress/config.md).

  ::: tip Example

  ```ts
  // .vuepress/config.ts
  import { defineUserConfig } from "vuepress";

  export default defineUserConfig({
    //...

    head: [
      //...

      // import an external script
      ["script", { src: "YOUR_SCRIPT_LINK" }],
      // add a script
      [
        "script",
        {},
        `\
          // your script here
        `,
      ],
      // add an external CSS
      ["link", { rel: "stylesheet", href: "YOUR_STYLE_LINK" }],
      // add a style
      // We don't recommend this, you should prefer to use .vuepress/style/index.scss
      [
        "style",
        {},
        `\
          /* your style here */
        `,
      ],
    ],

    //...
  });
  ```

  :::

- If you need to add page-level CSS and JS, please set `head` option in [Front Matter](../vuepress/page.md#frontmatter).

  ```md
  ---
  head:
    - script: YOUR_SCRIPT_LINK
    - script:
        type: module
        src: YOUR_SCRIPT_LINK
    - style: YOUR_STYLE_LINK
    - style:
        type: text/css
        content: |
          /* your style here */
  ---

  Page content

  ...
  ```

- More global advanced operations can be done through [client configuration file](../vuepress/config.md#client-config).

  ```ts
  // .vuepress/client.ts
  import { defineClientConfig } from "@vuepress/client";
  import ExampleGlobalComponent from "./components/ExampleGlobalComponent.vue";
  import ExampleRootComponent from "./components/ExampleRootComponent.vue";
  import { setupExampleCompositionAPI } from "./composables/exampleCompositionAPI";

  export default defineClientConfig({
    // Client enhancements
    enhance: ({ app }) => {
      // register global component
      app.component("ExampleGlobalComponent", ExampleGlobalComponent);
    },

    // global registration
    setup() {
      // Register the global Composition API
      setupExampleCompositionAPI();
    },

    // global component
    rootComponents: [
      "ExampleRootComponent",
      //...
    ],
  });
  ```
