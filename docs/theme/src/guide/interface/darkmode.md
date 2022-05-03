---
title: Darkmode
icon: contrast
index: 1
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

- `"auto-switch"`: "off | automatic | on" switch (default)
- `"switch"`: "Close | Open" toggle switch
- `"auto"`: Automatically decide whether to apply dark mode based on user device’s color-scheme or current time
- `"force-dark"`: only dark mode
- `"disable"`: disable dark mode

<script setup lang="ts">
import AppearanceSwitch from '@theme-hope/module/outlook/components/AppearanceSwitch'
</script>
