---
title: Guide
icon: lightbulb
index: false
---

## Optimized Size

This plugin fully supports tree-shaking.

This means you are free to pick any components you like, and remain the rest of the components unbundled.

For example, if you call this plugin with `{ components: ['VidStack'] }`, then only `<VidStack />` component is injected.

## Using with Component Syntax

We recommend you to use the plugin with [component syntax](https://ecosystem.vuejs.press/plugins/markdown/markdown-ext.html#component).
