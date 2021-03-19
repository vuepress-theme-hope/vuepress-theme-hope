---
title: Markup
icon: write
---

Make Markdown files in your VuePress site support markup.

<!-- more -->

## Configuration

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

Mr. Hope is ==handsome==.

```md
Mr. Hope is ==handsome==.
```
