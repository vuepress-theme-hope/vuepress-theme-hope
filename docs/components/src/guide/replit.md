---
title: ReplIt
---

Embed ReplIt demo in Markdown files.

<!-- more -->

## Demo

An embedded repl:

<ReplIt user="FuckDoctors" repl="Java-Test" />

```md
<ReplIt user="FuckDoctors" repl="Java-Test" />
```

An embedded repl with opening file:

<ReplIt user="FuckDoctors" repl="Java-Test" file="Main.java" />

```md
<ReplIt user="FuckDoctors" repl="Java-Test" file="Main.java" />
```

A repl link:

<ReplIt user="FuckDoctors" repl="Java-Test" is-link />

```md
<ReplIt user="FuckDoctors" repl="Java-Test" is-link />
```

Another repl link:

<ReplIt link="https://replit.com/@FuckDoctors/Java-Test" />

```md
<ReplIt link="https://replit.com/@FuckDoctors/Java-Test" />
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

ReplIt component width.

### height

- Type: `string | number`
- Required: No

ReplIt component height.

### ratio

- Type: `number`
- Default: `16 / 9`

ReplIt component ratio, ONLY valid when `height` not set.

### theme

- Type: `string`
- Default: `"light"`

Replit theme. (Only available without `isLink`)

### file

- Type: `string`
- Required: No

The default file to have open in the editor.

### isLink

- Type: `boolean`
- Default: `false`

Display Replit as a button instead of an iframe.

### text

- Type: `string`
- Default: `"Open on Replit"`

Text to display on the button. (Only available with `isLink`)
