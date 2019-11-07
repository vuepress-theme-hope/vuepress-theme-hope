<!--
 * @Author: Mr.Hope
 * @Date: 2019-10-07 19:18:03
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-11-07 12:59:59
 * @Description: 页面主体
 *
 * 为每个页面都添加了 路径导航 / 页脚 支持
-->
<template>
  <main class="page">
    <BreadCrumb />
    <slot name="top" />

    <PageInfo />
    <Content class="theme-default-content" />
    <PageEdit />

    <PageNav v-bind="{ sidebarItems }" />
    <Comment />
    <CopyrightFooter />
    <slot name="bottom" />
  </main>
</template>

<script>
import BreadCrumb from '@theme/components/BreadCrumb.vue';
import CopyrightFooter from '@theme/components/CopyrightFooter.vue';
import PageEdit from '@parent-theme/components/PageEdit.vue';
import PageNav from '@parent-theme/components/PageNav.vue';

export default {
  components: { BreadCrumb, CopyrightFooter, PageEdit, PageNav },
  props: {
    sidebarItems: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style lang="stylus">
@require '~@parent-theme/styles/wrapper.styl'

.page
  padding-bottom 2rem
  display block
</style>
