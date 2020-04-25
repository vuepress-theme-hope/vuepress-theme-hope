---
icon: full-screen
category: function
tags:
  - fullscreen
  - function
---

# Fullscreen Button

Enabled by default, you can disable it by setting `fullscreen` to `false` in the theme configuration.

::: tip
If the current browser does not support full screen, the full screen button is automatically hidden.
:::

```js {4}
// .vuepress/config.js
module.exports = {
  themeConfig: {
    fullscreen: false // Enable by default
  }
};
```
