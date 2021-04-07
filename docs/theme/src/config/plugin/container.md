---
title: vuepress-plugin-container
icon: plugin
category: config
tags:
  - plugin
  - config
---

Markdown DIY container

<!-- more -->

## Configuration Item

### type

- Type: `string`
- Required: true

The type for the container. For example, if type is set to foo, only the following syntax will be parsed as a container:

```md
::: foo bar

write something here ~

:::
```

### defaultTitle

- Type: `string | Record<string, string>`
- Default: the upper case of type

The default title for the container. If no title is provided, `defaultTitle` will be shown as the title of the container.

Provide an object as locale config, and the default title will depend on current `locale`.

### before

- Type: `string | ((info: string) => string)`
- Default: `undefined`

String to be placed before the block.

If specified as a function, an argument `info` will be passed to it. (In the example above, `info` will be `bar`.)

If specified value for `before`, `defaultTitle` will be ignored.

### after

- Type: `string | ((info: string) => string)`
- Default: `undefined`

String to be placed after the block.

If specified as a function, an argument `info` will be passed to it. (In the example above, `info` will be `bar`.)

> See [markdown-it-container API](https://github.com/markdown-it/markdown-it-container#api)

### validate

- Type: `((params: string) => boolean)`
- Default: `undefined`

A function to validate tail after opening marker, should return true on success.

### render

- Type: `Function`
- Default: `undefined`

The renderer function for opening/closing tokens. If specified, `before`, `after` and `defaultTitle` will be ignored.

> See [markdown-it-container API](https://github.com/markdown-it/markdown-it-container#api)

### marker

- Type: `string`
- Default: `':'`

The character to use as a delimiter.

> See [markdown-it-container API](https://github.com/markdown-it/markdown-it-container#api)
