---
category: config
tags:
  - plugin
  - config
---

# @vuepress/medium-zoom <MyBadge text="New" />

This plugin will make your images support click zoom.

## Default configuration instructions

Turn on the function and make night mode adaptation.

The default configuration is:

```js {3-13}
module.exports = {
  plugins: [
    [
      '@vuepress/medium-zoom',
      {
        options: {
          /** pic margin after zoom */
          margin: 16,
          /** px to scroll before cloase */
          scrollOffset: 40
        }
      }
    ]
  ]
};
```
