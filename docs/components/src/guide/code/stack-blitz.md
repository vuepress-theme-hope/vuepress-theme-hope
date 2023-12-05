---
title: StackBlitz
---

Embed StackBlitz demo in Markdown files.

<!-- more -->

## Demo

<!-- #region demo -->

::: md-demo A StackBlitz project

<StackBlitz id="vuepress-theme-hope" />

:::

::: md-demo A StackBlitz project with custom settings

<StackBlitz id="vuepress-theme-hope" hideExplorer hideNavigation hideDevtools />

:::

<!-- #endregion demo -->

## Props

### id

- Type: `string`
- Required: Yes

StackBlitz id

### type

- Type: `"project" | "github"`
- Default: `"project"`

Type of StackBlitz project.

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

- Type: `string[] | string`
- Required: No

The default file to have open in the editor.

### initialPath

- Type: `string`
- Required: No

The initial URL path the preview should open.

### embed

- Type: `boolean`
- Default: `false`

Embed StackBlitz editor instead of displaying a button.

### load

- Type: `boolean`
- Default: `false`

Whether load embed demo directly. (Only available with `embed`)

### theme

- Type: `"dark" | "light"`
- Default: `"dark"`

Editor theme. (Only available with `embed`)

### text

- Type: `string`
- Default: `"Open in StackBlitz"`

Text to display on the button. (Only available without `embed`)

### view

- Type: `"default" | "editor" | "preview"`
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
