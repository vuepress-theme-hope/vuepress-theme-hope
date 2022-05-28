---
title: CodePen
---

This component adds CodePen demos.

You can use it in Markdown to add a embed demo。

<!-- more -->

## Props

### link

- Type: `string`
- Required: No

CodePen project link.

### user

- Type: `string`
- Required: Yes if `link` not set

CodePen user.

### slugHash

- Type: `string`
- Required: Yes if `link` not set

CodePen project slug hash.

### title

- Type: `string`
- Required: No

CodePen project title.

### height

- Type: `number`
- Default: `380`

Editor height in px.

### theme

- Type: `"default" | "light" | "dark"`
- Default: `"default"`

Editor theme

### defaultTab

- Type: `string[]`
- Default: `["result"]`

Default opened editor tab.

## Demo

A demo with user and slug hash:

<CodePen
  user="kowlor"
  slug-hash="ZYYQoy"
  title="Solar System animation - Pure CSS"
  :default-tab="['css','result']"
  :theme="$isDarkmode? 'dark': 'light'"
/>

```md
<CodePen
  user="kowlor"
  slug-hash="ZYYQoy"
  title="Solar System animation - Pure CSS"
  :default-tab="['css','result']"
  :theme="$isDarkmode? 'dark': 'light'"
/>
```

A demo with link:

<CodePen
  link="https://codepen.io/kowlor/pen/ZYYQoy"
  title="Solar System animation - Pure CSS"
  :default-tab="['css','result']"
  :theme="$isDarkmode? 'dark': 'light'"
/>

```md
<CodePen
  link="https://codepen.io/kowlor/pen/ZYYQoy"
  title="Solar System animation - Pure CSS"
  :default-tab="['css','result']"
  :theme="$isDarkmode? 'dark': 'light'"
/>
```
