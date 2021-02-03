---
title: Superscript and Subscript
icon: superscript
---

Let the Markdown file in your VuePress site support Subscript and Superscript.

<!-- more -->

## Configuration

```js {7,9}
module.exports = {
  plugins: [
    [
      "md-enhance",
      {
        // Enable Subscript
        sub: true,
        // Enable  Superscript
        sup: true,
      },
    ],
  ],
};
```

## Syntax

- Use `^ ^` to mark the superscript.
- Use `~ ~` to mark the subscript.

## Demo

- 19^th^
- H~2~O

```md
- 19^th^
- H~2~O
```
