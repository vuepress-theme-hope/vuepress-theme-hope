---
title: StackBlitz
---

Embed StackBlitz demo in Markdown files.

<!-- more -->

## Demo

A StackBlitz project:

<StackBlitz id="vuepress-theme-hope" />

```md
<StackBlitz id="vuepress-theme-hope" />
```

A StackBlitz project with custom settings:

<StackBlitz id="vuepress-theme-hope" hideExplorer hideNavigation hideDevtools />

```md
<StackBlitz id="vuepress-theme-hope" hideExplorer hideNavigation hideDevtools />
```

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

### ratio

- Type: `number`
- Default: `16 / 9`

Stackblitz component ratio, ONLY valid when `height` not set.

### file

- Type: `string`
- Required: No

The default file to have open in the editor.

### initialPath

- Type: `string`
- Required: No

The initial URL path the preview should open.

### embed

- Type: `boolean`
- Default: `false`

Force embed view regardless of screen size.

### load

- Type: `boolean`
- Default: `false`

RWhether load embed demo directly.

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

### hideDevtools

- Type: `boolean`
- Default: `false`

Hide the debugging console in the editor preview.
