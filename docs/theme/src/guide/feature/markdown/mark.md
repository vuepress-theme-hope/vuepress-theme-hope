---
icon: writefill
tags:
  - feature
  - markdown
---

# Markup

Make Markdown files in your VuePress site support markup.

## Configuration

```js {4}
module.exports = {
  themeConfig: {
    mdEnhance: {
      mark: true,
    },
  },
};
```

## Syntax

Use `== ==` to mark.

## Case

Mr. Hope is ==very== handsome.

```md
Mr. Hope is ==very== handsome.
```
