---
icon: superscript
category: markdown
tags:
  - feature
  - markdown
---

# Superscript and Subscript

Let the Markdown file in your VuePress site support Subscript and Superscript.

## Configuration

```js {3-6}
module.exports = {
  themeConfig: {
    markdown: {
      sub: true,
      sup: true,
    },
  },
};
```

## Syntax

- Use `^ ^` to mark the superscript.
- Use `~ ~` to mark the subscript.

::: details Demo

- 19^th^
- H~2~O

```md
- 19^th^
- H~2~O
```

:::
