---
title: Import markdown
icon: markdown
category:
  - markdown
tag:
  - feature
  - markdown
---

Let the Markdown file in your VuePress site support importing other markdown files.

<!-- more -->

## Configuration

```js {7}
module.exports = {
  plugins: [
    [
      "md-enhance",
      {
        // Enable import markdown
        mdImport: true,
      },
    ],
  ],
};
```

## Syntax

```md
<!-- minimal syntax -->

@[md](../foo.md)
```

To partially import the file:

```md
<!-- partial import, from line 1 to line 10 -->

@[md{1-10}](../foo.md)
```

## Demo

@[md](../../unit/__fixtures__/mdImport.md)

@[md{5,9}](../../unit/__fixtures__/mdImport.md)

```md
@[md](../../unit/__fixtures__/mdImport.md)

@[md{5,9}](../../unit/__fixtures__/mdImport.md)
```
