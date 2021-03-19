---
title: Superscript and Subscript
icon: superscript
category: markdown
tags:
  - subscript
  - superscript
  - markdown
---

Let the Markdown file in your VuePress site support Subscript and Superscript.

<!-- more -->

## Configuration

```js {4,5}
module.exports = {
  themeConfig: {
    mdEnhance: {
      sub: true,
      sup: true,
    },
  },
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
