---
icon: footnote
---

# Footnote <MyBadge text="V0.0.8" />

Let the Markdown file in your VuePress site support footnotes.

## Configuration

```js
module.exports = {
  themeConfig: {
    markdown: {
      // Add Footnote support
      footnote: true
    }
  }
};
```

## Syntax

Footnote 1 link[^first].

Footnote 2 link[^second].

Inline footnote^[Text of inline footnote] definition.

Duplicated footnote reference[^second].

[^first]: Footnote **can have markup**

    and multiple paragraphs.

[^second]: Footnote text.
