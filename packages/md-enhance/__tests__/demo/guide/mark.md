---
title: Markup
icon: write
---

Make Markdown files in your VuePress site support markup.

<!-- more -->

## Config

```js {7}
module.exports = {
  plugins: [
    [
      "md-enhance",
      {
        // open tag
        mark: true,
      },
    ],
  ],
};
```

## Syntax

Use `== ==` to mark.

## Demo

VuePress Theme Hope is ==powerful==.

```md
VuePress Theme Hope is ==powerful==.
```
