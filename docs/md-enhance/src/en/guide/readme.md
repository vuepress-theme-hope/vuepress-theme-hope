---
icon: markdown
---

# New syntax in Markdown

By installing and enableing this plugin, you can use more syntax in your markdown files.

If you don't need them and want to reduce your site size, you can remove them from your code by not enabling them.

You can pass `true` directly instead of an object to enable all functions.

```js {2}
module.exports = {
  plugin: ['md-enhance', true]
};
```

## New Feature

- [Superscript and Subscript](sup-sub.md)

- [Align](align.md)

- [Footnote](footnote.md)

- [Flowchart](flowchart.md)

- [$\TeX$ Syntax](tex.md)
