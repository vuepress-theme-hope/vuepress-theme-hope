---
icon: superscript
---

# Superscript and Subscript

Let the Markdown file in your VuePress site support Subscript and Superscript.

## Configuration

```js {6,8}
module.exports = {
  plugin: [
    "md-enhance",
    {
      // Enable Subscript
      sub: true,
      // Enable  Superscript
      sup: true,
    },
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
