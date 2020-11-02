---
title: Config
icon: configuration
---

You can pass these options to the plugin:

## baseLang

- Type: `string`
- Default: `'en-US'`

The language of the home directory.

## Enable all

- Type: `boolean`
- Default: `false`

Enable all features.

## align

- Type: `boolean`
- Default: `false`

Whether to enable custom align.

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

## mark

- Type: `boolean`
- Default: `false`

Whether to enable mark support.

## tex

- Type: `boolean`
- Default: `false`

Whether to enable $\TeX$ syntax support.

## flowchart

- Type: `boolean`
- Default: `false`

Whether to enable flowchart syntax support.

## presentation

- Type: `PresentationOptions | boolean`
- Default: `false`

Whether to enable presentation syntax support.

You can set it with an object, the object will be used to config reveal.js.

### presentation.plugins

- Type: `string[]`
- Required: No

Plugins you want to use on reveal.js.

Acceptable values are:

- `"highlight"`
- `"math"`
- `"search"`
- `"notes"`
- `"zoom"`

<!-- - `"anything"`
- `"audio"`
- `"chalkboard"` -->

### presentation.revealConfig

- Type: `Partial<RevealOptions>`
- Required: No

Config which you want to pass to reveal.js.
