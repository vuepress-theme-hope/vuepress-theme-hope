---
icon: fullsrceen
---

# Fullscreen Button <MyBadge text="Beta" type="warning" />

vuepress-theme-hope implements the theme color and night mode functions with built-in `@mr-hope/vuepress-plugin-full-screen`.

`themeConfig.fullscreen` in `.vuepress/config.js` will be passed directly to the plugin as a plugin option.

Enable by default.

You can set `fullscreen` field to `false` in the theme configuration to cancel it.

::: tip
Currently, this feature is in the beta phase, and it will automatically be hidden according to the browser's judgment when it encounters an environment that does not support full screen in the future.
:::

```js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    fullscreen: false // Enable by default
  }
}
```
