---
title: Replit
---

Embed Replit demo in Markdown files.

<!-- more -->

## Demo

An embedded repl:

<Replit user="FuckDoctors" repl="Java-Test" />

```md
<Replit user="FuckDoctors" repl="Java-Test" />
```

An embedded repl with opening file:

<Replit user="FuckDoctors" repl="Java-Test" file="Main.java" />

```md
<Replit user="FuckDoctors" repl="Java-Test" file="Main.java" />
```

A repl link:

<Replit user="FuckDoctors" repl="Java-Test" plain />

```md
<Replit user="FuckDoctors" repl="Java-Test" plain />
```

Another repl link:

<Replit link="https://replit.com/@FuckDoctors/Java-Test" />

```md
<Replit link="https://replit.com/@FuckDoctors/Java-Test" />
```

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

### theme

- Type: `string`
- Default: `"light"`

Replit theme. (Only available without `plain`)

### file

- Type: `string`
- Required: No

The default file to have open in the editor.

### plain

- Type: `boolean`
- Default: `false`

Display Replit as a button instead of an iframe.

### text

- Type: `string`
- Default: `"Open on Replit"`

Text to display on the button. (Only available with `plain`)
