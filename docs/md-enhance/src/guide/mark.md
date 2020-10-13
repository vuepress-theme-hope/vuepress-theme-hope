---
icon: writefill
---

# Mark

Make Markdown files in your VuePress site support markup.

## Configuration

```js {6}
module.exports = {
  plugin: [
    "md-enhance",
    {
      // open tag
      mark: true,
    },
  ],
};
```

## Syntax

Use `== ==` to mark.

## Case

Mr. Hope is ==very== handsome.

```md
Mr. Hope is ==very== handsome.
```
