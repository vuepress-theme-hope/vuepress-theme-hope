---
title: FontIcon
---

This component is used to display font icons.

You can use it in Markdown to add an icon。

<!-- more -->

## Demo

- Home icon: <FontIcon icon="home" />

- A big and red markdown icon: <FontIcon icon="markdown" color="red" size="32" />

```md
- Home icon: <FontIcon icon="home" />

- A big and red markdown icon: <FontIcon icon="markdown" color="red" size="32" />
```

## Props

### icon

- Type: `string`
- Required: Yes

Icon name

### color

- Type: `string`
- Default: `'inherit'`

Color used for icon.

### size

- Type: `number | string`
- Default: `Current font size`

Icon size.

## Global Settings

You can set icon assets url and icon prefix globally via `componentsOptions.fontIcon.assets` and `componentsOptions.fontIcon.prefix`.

Besides supporting url links, `'iconfont'` and `'fontawesome'` keywords are supported in `componentsOptions.fontIcon.assets`.
