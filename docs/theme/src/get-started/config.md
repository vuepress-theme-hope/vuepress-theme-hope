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

This tutorial guides you through configuring a VuePress project.

<!-- more -->

## Directory Structure

VuePress uses the `.vuepress` directory within the documentation root to store all configuration, files, and cache.

The primary entry point is `.vuepress/config.ts` (or `.vuepress/config.js`).

::: tip Use TypeScript
TypeScript configuration files provide type hinting, autocompletion, and real-time error checking. If using JavaScript, an editor like VS Code is recommended to maintain IntelliSense support.
:::

## Configuration Entry

Export a configuration object in `.vuepress/config.ts`. Use the `defineUserConfig` helper from `vuepress` for type safety:

```ts twoslash {2,4,6} title=".vuepress/config.ts"
import { defineUserConfig } from "vuepress";

export default defineUserConfig({
  /**
   * Site configuration options
   */
});
```

### Modular Configuration

To keep the main configuration concise, the VuePress Theme Hope template uses ESM to split theme, navigation bar, and sidebar settings into separate files.

The theme logic is defined in `.vuepress/theme.ts`:

```ts twoslash
import { hopeTheme } from "vuepress-theme-hope";

/**
 * Export theme configuration
 */
export default hopeTheme({
  /**
   * Theme-specific options
   */
});
```

Import this into the main configuration file:

```ts title=".vuepress/config.ts"
import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  /**
   * Equivalent to theme: hopeTheme({ ... })
   */
  theme,
});
```

## Configuration Scopes

### Site Config

Site configuration consists of global properties read by VuePress core, independent of the theme. This includes `lang`, `title`, and `description`.

::: info Reference
See [VuePress2 > Configuration](https://vuejs.press/en/reference/config.html) for the full list of core options.
:::

### Theme Config

Theme configuration is passed to the `hopeTheme` function and managed by VuePress Theme Hope. Available options are listed in [Config > Theme Config](../config/README.md).

::: tip IDE Support
Editors like VS Code provide the following features via TypeScript definitions:

- Hover hints for property descriptions.
- Validation for invalid types or keys.
- Autocompletion for available options.

![option hint](./assets/vscode-hint-light.png#light)
![option hint](./assets/vscode-hint-dark.png#dark)
:::

### Advanced Customization

::: info Plugin Config
VuePress Theme Hope includes several plugins. Configure them via the `plugins` property in theme options. See [Theme Plugin Config](../config/plugins/README.md) for details.

For external plugins, import them into `config.ts` and add them to the top-level `plugins` array.
:::

::: info Style Config
Custom styles are stored in `.vuepress/styles`:

- `index.scss`: Global CSS/SCSS injections.
- `config.scss`: Theme SCSS variable overrides.
- `palette.scss`: Color and layout constants.

Refer to [Config > Style](../config/style.md) for more details.
:::

::: info Page Config
Individual pages can be configured using Frontmatter in Markdown files. See [Project Content > Frontmatter](./content.md#frontmatter).
:::
