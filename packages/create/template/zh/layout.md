---
title: 自定义布局
icon: layout
---

您可以使用带有 Markdown 支持的插槽来自定义页面布局。

::: warning

此处仅仅是一个演示，你应该自行根据需求添加样式。

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

页面顶部内容

:::

::: slot page-bottom

页面底部内容

:::

::: slot content-top

内容顶部内容

:::

::: slot content-bottom

内容底部内容

:::

::: slot navbar-start

导航栏起始内容

:::

::: slot navbar-center

导航栏中部内容

:::

::: slot navbar-end

导航栏末尾内容

:::

::: slot sidebar-top

侧边栏顶部内容

:::

::: slot sidebar-center

侧边栏中部内容

:::

::: slot sidebar-bottom

侧边栏底部内容

:::

更多详情，详见 [自定义布局](https://vuepress-theme-hope.github.io/zh/guide/layout/custom/).
