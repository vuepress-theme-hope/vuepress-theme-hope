---
title: StackBlitz
---

Embed StackBlitz demo in Markdown files.

<!-- more -->

## Demo

<!-- #region demo -->

::: preview A StackBlitz project

<StackBlitz id="vuepress-theme-hope" />

:::

::: preview A StackBlitz project with custom settings

<StackBlitz id="vuepress-theme-hope" hideExplorer hideNavigation hideDevtools />

:::

<!-- #endregion demo -->

## Options

::: fields
@`id` type=string required

StackBlitz id.

@`type` type=`"project" | "github"` default=`"project"`

Type of StackBlitz project.

@`width` type=`string | number` default=`100%`

Stackblitz component width.

@`height` type=`string | number`

Stackblitz component height.

@`ratio` type=number default=`16 / 9`

Stackblitz component ratio, only valid when `height` is not set.

@`file` type=`string[] | string`

The default file to have open in the editor.

@`initialPath` type=string

The initial URL path the preview should open.

@`embed` type=boolean

Embed the StackBlitz editor instead of displaying a button.

@`load` type=boolean

Whether to load the embed demo directly. Only available with `embed`.

@`theme` type=`"dark" | "light"` default=`"dark"`

Editor theme. Only available with `embed`.

@`text` type=string default=`"Open in StackBlitz"`

Text to display on the button. Only available without `embed`.

@`view` type=`"default" | "editor" | "preview"` default=`"preview"`

Which view to open by default.

@`hideExplorer` type=boolean

Hide the file explorer panel in the embed view.

@`hideNavigation` type=boolean

Hide the navigation panel in the embed view.

@`hideDevtools` type=boolean

Hide the debugging console in the editor preview.

:::
