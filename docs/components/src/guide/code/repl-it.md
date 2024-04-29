---
title: Replit
---

Embed Replit demo in Markdown files.

::: warning

Since Replit no longer allows to run code in embed mode, this component is deprecated and will be removed in future.

:::

<!-- more -->

## Demo

<!-- #region demo -->

::: md-demo A replit

<Replit user="FuckDoctors" repl="Java-Test" />

:::

::: md-demo A replit with opening file

<Replit user="FuckDoctors" repl="Java-Test" file="Main.java" />

:::

::: md-demo An click to load replit

<Replit user="FuckDoctors" repl="Java-Test" click-to-load />

:::

::: md-demo A repl with link

<Replit link="https://replit.com/@FuckDoctors/Java-Test" />

:::

<!-- #endregion demo -->

## Props

### link

- Type: `string`
- Required: Yes

Replit link.

### user

- Type: `string`
- Required: Yes

Replit username.

### repl

- Type: `string`
- Required: Yes

Replit repl name.

### title

- Type: `string`
- Required: Yes

Replit title.

### width

- Type: `string | number`
- Default: `100%`

Replit component width.

### height

- Type: `string | number`
- Required: No

Replit component height.

### ratio

- Type: `number`
- Default: `16 / 9`

Replit component ratio, ONLY valid when `height` not set.

### clickToLoad

- Type: `boolean`
- Default: `false`

Wether to click to load ReplIt.

### text

- Type: `string`
- Default: `"Load ReplIt"`

Load button text.

### theme

- Type: `string`
- Default: `"light"`

Replit theme.

### file

- Type: `string`
- Required: No

The default file to have open in the editor.
