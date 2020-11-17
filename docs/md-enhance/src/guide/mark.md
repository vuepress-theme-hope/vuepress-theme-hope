---
icon: write
---

# Mark

Make Markdown files in your VuePress site support markup.

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

## Case

Mr. Hope is ==handsome==.

```md
Mr. Hope is ==handsome==.
```
