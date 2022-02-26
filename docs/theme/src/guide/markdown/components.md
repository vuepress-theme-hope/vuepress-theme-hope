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

- Type: `"tip" | "warn" | "error"`
- Default: `"tip"`

Badge types:

- <Badge text="tip" type="tip" vertical="middle" />
- <Badge text="warn" type="warn" vertical="middle" />
- <Badge text="error" type="error" vertical="middle" />

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
### Badge <Badge text="Building" type="warn"/> <Badge text="MrHope" color="grey" />
```
