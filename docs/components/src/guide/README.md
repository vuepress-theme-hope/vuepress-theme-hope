---
title: Guide
icon: lightbulb
index: false
---

::: info Tree Shakable

This plugin fully supports tree-shaking.

This means you are free to pick any components you like, and remain the rest of the components unbundled.

For example, if you call this plugin with `{ rootComponents: { backToTop: true } }`, then only `<BackToTop />` component is injected.

:::
