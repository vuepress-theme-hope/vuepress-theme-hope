---
title: Task list
icon: check
category: markdown
tags:
  - markdown
  - task list
---

Let the Markdown file in your VuePress site support task list.

<!-- more -->

## Configuration

```js {4}
module.exports = {
  themeConfig: {
    mdEnhance: {
      tasklist: true,
    },
  },
};
```

## Syntax

- Use `- [ ] some text` to render a unchecked task item.
- Use `- [x] some text` to render a checked task item. (Capital `X` is also supported)

## Demo

- [ ] Plan A
- [x] Plan B

```md
- [ ] Plan A
- [x] Plan B
```
