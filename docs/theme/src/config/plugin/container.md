---
title: vuepress-plugin-container
category: config
tags:
  - plugin
  - config
---

Markdown DIY container

<!-- more -->

::: warning
Please note that this plugin is applied to alignment in markdown enhancements, so if you disable this plugin, you will not be able to use custom alignment and the prompt boxes provided by the default theme.
:::

## Configuration Item

### type

- type: `string`
- required: true

The type for the container. For example, if type is set to foo, only the following syntax will be parsed as a container:

```md
::: foo bar
write something here ~
:::
```

### defaultTitle

- type: `string | Record<string, string>`
- default: the upper case of type

The default title for the container. If no title is provided, `defaultTitle` will be shown as the title of the container.

Provide an object as locale config, and the default title will depend on current `locale`.

### before

- type: `string | ((info: string) => string)`
- default: `undefined`

String to be placed before the block.

If specified as a function, an argument `info` will be passed to it. (In the example above, `info` will be `bar`.)

If specified value for `before`, `defaultTitle` will be ignored.

### after

- type: `string | ((info: string) => string)`
- default: `undefined`

String to be placed after the block.

If specified as a function, an argument `info` will be passed to it. (In the example above, `info` will be `bar`.)

> See [markdown-it-container API](https://github.com/markdown-it/markdown-it-container#api)

### validate

- type: `((params: string) => boolean)`
- default: `undefined`

A function to validate tail after opening marker, should return true on success.

### render

- type: `Function`
- default: `undefined`

The renderer function for opening/closing tokens. If specified, `before`, `after` and `defaultTitle` will be ignored.

> See [markdown-it-container API](https://github.com/markdown-it/markdown-it-container#api)

### marker

- type: `string`
- default: `':'`

The character to use as a delimiter.

> See [markdown-it-container API](https://github.com/markdown-it/markdown-it-container#api)
