---
title: Components
icon: plugin
index: 16
category:
  - Markdown
tag:
  - Components
  - Markdown
---

## Badge

A badge which allows you to customize it’s color.

### Badge Props

#### text

- Type: `string`
- Required: Yes

Text of the badge

#### type

- Type: `"tip" | "warning" | "danger" | "info" | "note"`
- Default: `"info"`

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
Badge Test <Badge text="Building" type="warning"/> <Badge text="MrHope" color="grey" />
```

Badge Test <Badge text="Building" type="warning"/> <Badge text="MrHope" color="grey" />

## CodePen

CodePen demo component.

### CodePen Props

#### link

- Type: `string`
- Required: No

CodePen project link.

#### user

- Type: `string`
- Required: Yes if `link` not set

CodePen user.

#### slugHash

- Type: `string`
- Required: Yes if `link` not set

CodePen project slug hash.

#### title

- Type: `string`
- Required: No

CodePen project title.

#### height

- Type: `number`
- Default: `265`

Editor height in px.

#### theme

- Type: `"default" | "light" | "dark"`
- Default: `"default"`

Editor theme

#### defaultTab

- Type: `string[]`
- Default: `["result"]`

Default opened editor tab.

### CodePen Usage

You can use it in Markdown to add a embed demo:

```md
<CodePen user="kowlor" slug-hash="ZYYQoy" title="Solar System animation - Pure CSS" :default-tab="['css','result']" />
```

<CodePen user="kowlor" slug-hash="ZYYQoy" title="Solar System animation - Pure CSS" :default-tab="['css','result']" />

## PDF

PDF preview component

### PDF Props

#### url

- Type: `string`
- Required: Yes

PDF document link, relative path is NOT supported.

#### height

- Type: `string | number`
- Required: Yes

Height of PDF previewer.

#### page

- Type: `number`
- Default: `1`

Initial page of pdf document.

#### toolbar

- Type: `boolean`
- Default: `true`

Whether display toolbar.

#### zoom

- Type: `number`
- Default: `100`

Initial zoom level of pdf document.

## Tab

Tab component, contains `<Tabs>` and `<Tab>`.

::: tip

For tabs with same `tab-id`, the tab will switch together.

:::

### Tabs Props

#### tabId

- Type: `string`
- Required: No

Event id for tabs.

### Tab Props

#### title

- Type: `string`
- Required: Yes

Title of tab

#### label

- Type: `string`
- Default: `title`

Label of tab, a11y only.

#### value

- Type: `string`
- Default: `title`

Value of tab

### Tab Usage

You can use it to add tabs in your markdown files:

```md
A tab of fruit:

<Tabs tab-id="fruit">
  <Tab title="apple" value="apple">
  Apple
  </Tab>
  <Tab title="banana" value="banana">
  banana
  </Tab>
</Tabs>

Another tab of fruit:

<Tabs tab-id="fruit">
  <Tab title="apple" >
  Apple
  </Tab>
  <Tab title="banana" >
  banana
  </Tab>
  <Tab title="orange" >
  orange
  </Tab>
</Tabs>

A tab of fruit without id:

<Tabs>
  <Tab title="apple">
  Apple
  </Tab>
  <Tab title="banana">
  banana
  </Tab>
  <Tab title="orange" >
  orange
  </Tab>
</Tabs>
```

A tab of fruit:

<Tabs tab-id="fruit">
  <Tab title="apple" value="apple">
  Apple
  </Tab>
  <Tab title="banana" value="banana">
  banana
  </Tab>
</Tabs>

Another tab of fruit:

<Tabs tab-id="fruit">
  <Tab title="apple" >
  Apple
  </Tab>
  <Tab title="banana" >
  banana
  </Tab>
  <Tab title="orange" >
  orange
  </Tab>
</Tabs>

A tab of fruit without id:

<Tabs>
  <Tab title="apple">
  Apple
  </Tab>
  <Tab title="banana">
  banana
  </Tab>
  <Tab title="orange" >
  orange
  </Tab>
</Tabs>
