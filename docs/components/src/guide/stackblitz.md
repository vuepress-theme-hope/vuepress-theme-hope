---
title: StackBlitz
---

Embed StackBlitz demo in Markdown files.

<!-- more -->

## Props

### id

- Type: `string`
- Required: Yes

StackBlitz id

### width

- Type: `string | number`
- Default: `100%`

Stackblitz component width.

### height

- Type: `string | number`
- Required: No

Stackblitz component height

### radio

- Type: `number`
- Default: `16 / 9`

Stackblitz component radio, ONLY valid when `height` not set.

### file

- Type: `string`
- Required: No

The default file to have open in the editor.

### initialpath

- Type: `string`
- Required: No

The initial URL path the preview should open.

### embed

- Type: `boolean`
- Default: `true`

Force embed view regardless of screen size.

### clickToLoad

- Type: `boolean`
- Default: `true`

Require user to 'click to load' the embed demo.

### view

- Type: `"editor" | "preview"`
- Default: `"preview"`

Which view to open by default.

### hideExplorer

- Type: `boolean`
- Default: `false`

Hide file explorer panel in embed view.

### hideNavigation

- Type: `boolean`
- Default: `false`

Hide navigation panel in embed view.

### hidedevtools

- Type: `boolean`
- Default: `false`

Hide the debugging console in the editor preview.

## Demo

A StackBlitz project:

<StackBlitz id="vuepress-theme-hope" />

```md
<StackBlitz id="vuepress-theme-hope" />
```

A StackBlitz project with custom settings:

<StackBlitz id="vuepress-theme-hope" hideExplorer hideNavigation hidedevtools />

```md
<StackBlitz id="vuepress-theme-hope" hideExplorer hideNavigation hidedevtools />
```
