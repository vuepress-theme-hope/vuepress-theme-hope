---
title: CodePen
---

Embed CodePen demos in your Markdown.

<!-- more -->

## Demo

<!-- #region demo -->

::: preview A demo with user and slug hash

<CodePen
  user="kowlor"
  slug-hash="ZYYQoy"
  title="Solar System animation - Pure CSS"
  :default-tab="['css','result']"
  :theme="$isDarkMode? 'dark': 'light'"
/>

:::

::: preview A demo with link

<CodePen
  link="https://codepen.io/kowlor/pen/ZYYQoy"
  title="Solar System animation - Pure CSS"
  :default-tab="['css','result']"
  :theme="$isDarkMode? 'dark': 'light'"
/>

:::

::: preview A click to run demo

<CodePen
  link="https://codepen.io/kowlor/pen/ZYYQoy"
  title="Envelope w/ Hearts"
  status="clicktorun"
  :default-tab="['css','result']"
  :theme="$isDarkMode? 'dark': 'light'"
/>

:::

<!-- #endregion demo -->

## Options

::: fields
@`link` type=string

CodePen project link.

@`user` type=string required

CodePen user. Required when `link` is not set.

@`slugHash` type=string required

CodePen project slug hash. Required when `link` is not set.

@`title` type=string

CodePen project title.

@`height` type=number default=`380`

Editor height in pixels.

@`theme` type=`"default" | "light" | "dark"` default=`"default"`

Editor theme.

@`status` type=`"autoload" | "preview" | "clicktorun"` default=`"preview"`

CodePen embed demo status.

- `"autoload"`: The demo will be loaded when the page is loaded.
- `"preview"`: The code of demo will be loaded and a preview button will be shown.
- `"clicktorun"`: The demo will only be loaded after user clicks the "Run Code" button.

@`defaultTab` type=`string[]` default=`["result"]`

Default opened editor tab.

:::
