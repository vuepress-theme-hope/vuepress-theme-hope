---
title: CodePen
---

This component adds CodePen demos.

You can use it in Markdown to add an embed demo.

<!-- more -->

## Demo

A demo with user and slug hash:

<CodePen user="kowlor" slug-hash="ZYYQoy" title="Solar System animation - Pure CSS" :default-tab="['css','result']" :theme="$isDarkmode? 'dark': 'light'" />

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

<CodePen link="https://codepen.io/kowlor/pen/ZYYQoy" title="Solar System animation - Pure CSS" :default-tab="['css','result']" :theme="$isDarkmode? 'dark': 'light'" />

```md
<CodePen
  link="https://codepen.io/kowlor/pen/ZYYQoy"
  title="Solar System animation - Pure CSS"
  :default-tab="['css','result']"
  :theme="$isDarkmode? 'dark': 'light'"
/>
```

A click to run demo:

<CodePen link="https://codepen.io/keginaring/pen/XWZazwW" title="Solar System animation - Pure CSS" status="clicktorun" :theme="$isDarkmode? 'dark': 'light'" />

```md
<CodePen
  link="https://codepen.io/kowlor/pen/ZYYQoy"
  title="Envelope w/ Hearts"
  status="clicktorun"
  :default-tab="['css','result']"
  :theme="$isDarkmode? 'dark': 'light'"
/>
```

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

### status

- Type: `"autoload" | "preview" | "clicktorun"`
- Default: `"preview"`

CodePen embed demo status.

- `"autoload"`: The demo will be loaded when the page is loaded.
- `"preview"`: The code of demo will be loaded and a preview button will be shown.
- `"clicktorun"`: The demo will only be loaded after user clicks the "Run Code" button.

### defaultTab

- Type: `string[]`
- Default: `["result"]`

Default opened editor tab.
