---
title: Badge
---

A badge which allows you to customize its color.

You can use it in Markdown to add some status for titles or links.

<!-- more -->

## Demo

::: preview

## Heading Badge <Badge text="New" type="tip" /> <Badge text="MrHope" color="grey" />

Badge Test <Badge text="Building" type="warning" /> <Badge text="MrHope" color="grey" />

:::

## Options

::: fields
@`text` type=string required

Text of the badge.

@`type` type=`"tip" | "warning" | "danger" | "important" | "info" | "note"` default=`"info"`

Badge type:

- <Badge text="tip" type="tip" vertical="middle" />
- <Badge text="warning" type="warning" vertical="middle" />
- <Badge text="danger" type="danger" vertical="middle" />
- <Badge text="important" type="important" vertical="middle" />
- <Badge text="info" type="info" vertical="middle" />
- <Badge text="note" type="note" vertical="middle" />

@`color` type=string

Badge color, please fill in CSS color strings.

@`vertical` type=`"top" | "middle" | "baseline" | "bottom"`

Vertical position of the badge.

:::
