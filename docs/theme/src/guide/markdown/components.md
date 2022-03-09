---
title: Components
icon: plugin
category:
  - Markdown
tag:
  - Components
  - Markdown
---

## Badge

Badge available in Markdown

### Badge Props

#### text

- Type: `string`
- Required: Yes

Text of the badge

#### type

- Type: `"tip" | "warning" | "danger" | "info" | "note"`
- Default: `"tip"`

Badge types:

- <Badge text="tip" type="tip" vertical="middle" />
- <Badge text="warning" type="warning" vertical="middle" />
- <Badge text="danger" type="danger" vertical="middle" />
- <Badge text="info" type="info" vertical="middle" />
- <Badge text="note" type="note" vertical="middle" />

#### color

- Type: `string`
- Required: No

Badge color, please fill in CSS color strings

#### vertical

- Type: `"top" | "middle"`
- Default: `"top"`

Vertical position of the badge

### Badge Usage

You can use it in Markdown to add some status for titles or links:

```md
### Badge <Badge text="Building" type="warning"/> <Badge text="MrHope" color="grey" />
```
