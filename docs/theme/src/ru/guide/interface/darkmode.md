---
title: Darkmode
icon: contrast
order: 1
category:
  - Interface
tag:
  - Darkmode
  - Interface
---

In dark mode, the page uses a dark background to make you comfortable.

<!-- more -->

## Try it

Toggle the button below to see effects.

<!-- markdownlint-disable-->

<AppearanceSwitch />

<!-- markdownlint-restore -->

## Options

You can config darkmode through `darkmode` in theme options.

Available options:

- `"switch"`: switch between dark, light and auto (default)
- `"toggle"`: toggle between lightmode and darkmode
- `"auto"`: Automatically decide whether to apply dark mode based on user device’s color-scheme or current time
- `"enable"`: only dark mode
- `"disable"`: disable dark mode

<script setup lang="ts">
import AppearanceSwitch from '@theme-hope/module/outlook/components/AppearanceSwitch'
</script>

## Global Vairables

`$isDarkMode` is avaiable in all markdown files.
