---
title: Mark
icon: write
category: markdown
tags:
  - mark
  - markdown
---

Make Markdown files in your VuePress site support mark.

<!-- more -->

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

Mr. Hope is ==handsome==.

```md
Mr. Hope is ==handsome==.
```
