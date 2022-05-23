---
title: Badge
---

A badge which allows you to customize it’s color.

You can use it in Markdown to add some status for titles or links.

<!-- more -->

## Props

### text

- Type: `string`
- Required: Yes

Text of the badge

### type

- Type: `"tip" | "warning" | "danger" | "info" | "note"`
- Default: `"info"`

Badge types:

- <Badge text="tip" type="tip" vertical="middle" />
- <Badge text="warning" type="warning" vertical="middle" />
- <Badge text="danger" type="danger" vertical="middle" />
- <Badge text="info" type="info" vertical="middle" />
- <Badge text="note" type="note" vertical="middle" />

### color

- Type: `string`
- Required: No

Badge color, please fill in CSS color strings

### vertical

- Type: `"top" | "middle"`
- Default: `"top"`

Vertical position of the badge

## Demo

Badge Test <Badge text="Building" type="warning" /> <Badge text="MrHope" color="grey" />

```md
Badge Test <Badge text="Building" type="warning" /> <Badge text="MrHope" color="grey" />
```
