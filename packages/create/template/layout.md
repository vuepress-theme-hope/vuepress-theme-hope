---
title: Custom Layout
icon: layout
---

You can use slots with markdown and component support to custom page layout.

::: warning

This is just a demo, you should add styles according to your own needs.

<!-- markdownlint-disable MD033 -->

<style lang="stylus">
@require '~@mr-hope/vuepress-shared/styles/wrapper'

.content__navbar-start, .content__navbar-center, .content__navbar-end
  display inline-block
  
  p
    margin 0
    line-height 2rem

.content__sidebar-top, .content__sidebar-center, .content__sidebar-bottom
  text-align center

.content__page-top, .content__page-bottom, .content__content-top, .content__content-bottom
  @extend $wrapper
  padding-top 0
  padding-bottom 0
  text-align center
</style>

<!-- markdownlint-enable MD033 -->

:::

::: slot page-top

Page top content

:::

::: slot page-bottom

Page bottom content

:::

::: slot content-top

Content top content

:::

::: slot content-bottom

Content bottom content

:::

::: slot navbar-start

Navbar start content

:::

::: slot navbar-center

Navbar center content

:::

::: slot navbar-end

Navbar end content

:::

::: slot sidebar-top

Sidebar top content

:::

::: slot sidebar-center

Sidebar center content

:::

::: slot sidebar-bottom

Sidebar bottom content

:::

For details, see [Custom layout](https://vuepress-theme-hope.github.io/guide/layout/custom/).
