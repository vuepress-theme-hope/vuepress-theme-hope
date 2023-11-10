---
title: Guide
icon: lightbulb
index: false
---

## Optimized Size

This plugin fully supports tree-shaking.

This means you are free to pick any components you like, and remain the rest of the components unbundled.

For example, if you call this plugin with `{ rootComponents: { backToTop: true } }`, then only `<BackToTop />` component is injected.

## With Enhanced Syntax

We recommend you to use this plugin with [md-enhance component syntax](https://plugin-md-enhance.vuejs.press/guide/content/component.html).
