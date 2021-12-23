---
title: Theme Config
icon: config
category: config
tags:
  - themeConfig
  - config
---

::: tip

You can view [Config of this site][docs-config] as an example, and you can directly view [Type Declaration file](https://github.com/vuepress-theme-hope/vuepress-theme-hope/blob/v1/packages/theme/types/theme/) in the source code.

Besides, we also provide a `themeConfig` helper function, which you can import to provide automatic completion and verification:

<CodeGroup>
<CodeGroupItem title="js">

```js
// .vuepress/themeConfig.js
const { themeConfig } = require("vuepress-theme-hope");

module.exports = themeConfig({
  // Your themeConfig here
});
```

</CodeGroupItem>

<CodeGroupItem title="ts">

```ts{2,4,6}
// .vuepress/config.ts
import theme from "vuepress-theme-hope";

export default theme.themeConfig({
  // Your themeConfig here
});
```

</CodeGroupItem>
</CodeGroup>

:::

The following configuration has been added to the themeConfig field in `.vuepress/config.js`:

## Basic options

::: danger

These options are important and require you to configure them.

:::

### author

- Type: `string`
- Required: No

Default author

### hostname

- Type: `string`
- Required: Yes

The domain name where the current site is deployed.

### nav <Badge text="improved" type="warn" />

NavBarItem now has:

- `icon` field to support icon display.
- `prefix` field to automatically add group prefix

For certain configuration, please see [Layout → Navbar](../../guide/layout/navbar.md)

### sidebar <Badge text="improved" type="warn" />

SideBarItem now has:

- `icon` field to support icon display.
- `prefix` field to automatically add group prefix

For certain configuration, please see [Layout → Sidebar](../../guide/layout/sidebar.md)

### locales

- Type: `Record <string, HopeLangI18nConfigItem>`

The multi-language configuration of the theme mainly needs to configure `nav` and`sidebar` of each language.

## More

- [**Default Config**](default.md)

- [**Theme Feature Config**](feature.md)

- [**Theme Plugin Config**](plugin.md)

- [**Theme Layout Config**](layout.md)

- [**Theme Appearance Config**](apperance.md)

[docs-config]: https://github.com/vuepress-theme-hope/vuepress-theme-hope/blob/v1/docs/theme/src/.vuepress/config.js
