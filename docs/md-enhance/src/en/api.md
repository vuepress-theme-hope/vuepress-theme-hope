---
icon: api
---

# API

You can pass these options to the plugin:

## Enable all

You can pass `true` directly instead of an object to enable all functions.

```js {2}
module.exports = {
  plugin: ['md-enhance', true]
};
```

## lineNumbers

- Type: `boolean`
- Default: `true`

Whether to display the line number to the left of each code block.

## sup

- Type: `boolean`
- Default: `false`

Whether to enable the upper format support.

## sub

- Type: `boolean`
- Default: `false`

Whether to enable the lower corner format support.

## footnote

- Type: `boolean`
- Default: `false`

Whether to enable footnote format support.

## tex

- Type: `boolean`
- Default: `false`

Whether to enable $\TeX$ syntax support.

## flowchart

- Type: `boolean`
- Default: `false`

Whether to enable flowchart syntax support.
