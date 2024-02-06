---
title: Project Config
icon: gears
order: 5
category:
  - Cookbook
  - Tutorial
  - Get Started
tag:
  - Project Config
---

This tutorial guides you on how to configure a VuePress project.

<!-- more -->

## Configure VuePress

VuePress uses `.vuepress` folder inside the docs folder to store configuration, and all VuePress related files will be placed here.

For a VuePress site, `.vuepress/config.ts` (or `.vuepress/config.js`) is the necessary config file.

::: tip Use TS configuration file

We recommend you to use TypeScript config files for better type hinting, autocompletion and error checking.

If you are not familiar with TypeScript, you can also use a JavaScript config file, but it is better to use an editor such as VSCode that fully supports TS/JS features to avoid losing the type checking, autocompletion and option hints features mentioned below.

:::

## Config File

You need to set up a config object in the config file `.vuepress/config.ts` (or `.vuepress/config.js`) and export it.

To get correct hints, importing `defineUserConfig` from `vuepress` and wrapping the config object is recommended:

::: code-tabs#language

@tab TS

```ts{2,4,6} title=".vuepress/config.ts"
import { defineUserConfig } from "vuepress";

export default defineUserConfig({
   // put your config here
});
```

@tab JS

```js{2,4,6} title=".vuepress/config.ts"
import { defineUserConfig } from "vuepress";

export default defineUserConfig({
   // put your config here
});
```

:::

In the template, in order to avoid the configuration file being too long, we use the ESM feature natively provided by JavaScript to split the theme configuration, navigation bar and sidebar configuration into separate files.

The template extracts theme functions to `.vuepress/theme.js` and exports them via `export default`.

`.vuepress/theme.ts`:

```ts
import { hopeTheme } from "vuepress-theme-hope";

// We export the theme object by default
export default hopeTheme({
  // theme configuration
});
```

Then import directly in the configuration file:

`.vuepress/config.ts`:

```ts
//...
// we introduce the theme here
import theme from "./theme.js";

//...

export default defineUserConfig({
  //...

  // This is equivalent to `theme: hopeTheme({/* your config */})`
  theme,

  //...
});
```

This can also help you understand the site configuration and theme configuration in the configuration more clearly.

## Config Scope

### Site Config

Config items in the Site Config are directly read by VuePress, have nothing to do with the theme and can take effect in all themes.

We know that every site should have its `lang`, `title` and `description` properties, so VuePress has built-in support for setting these properties.

::: info Site Config

You can go to [VuePress2 → Reference → Configuration](https://vuejs.press/en/reference/config.html) to see all VuePress configuration.

:::

### Theme Config

Theme config is the object you pass to `hopeTheme` function, which will be handled by VuePress Theme Hope.

You can find all the theme config in [Config → Theme Config](../config/README.md).

::: tip Hints and Checks

If you are using an editor that supports TS/JS language features (such as VSCode), you can easily get option hints and checks.

- You can hover over an option to get hints:

  ![option hint](./assets/vscode-hint-light.png#light)
  ![option hint](./assets/vscode-hint-dark.png#dark)

- If you enter wrong option name or invalid value, you will get error message:

  ![Error message](./assets/vscode-error-light.png#light)
  ![Error message](./assets/vscode-error-dark.png#dark)

- You can get autocompletion while inputting:

  ![autocomplete](./assets/vscode-autocomplete-light.png#light)
  ![Autocomplete](./assets/vscode-autocomplete-dark.png#dark)

:::

### More

::: info Plugin Config

VuePress Theme Hope bundles some plugins, you can pass plugin options through `plugins.PLUGIN_NAME` in theme options, see [Config → Theme Plugin](../config/plugins/README.md) for more details.

If you want to use additional plugins, please import the plugin yourself and pass plugin options, see [VuePress → plugins](../cookbook/vuepress/plugin.md) for details.

:::

::: info Style Config

VuePress Theme Hope is using `.vuepress/styles` folder to store style config like other themes.

In this folder you can:

- Create `index.scss` to inject additional CSS styles
- Create `config.scss` for styling config
- Create `palette.scss` to set color and layout

For more details, see [Config → Style](../config/style.md).

:::

::: info Page Config

VuePress supports page scope config of specific page through YAML Frontmatter in Markdown files. For details, see [Project Content → Frontmatter](./content.md#frontmatter) in the previous chapter.

:::
