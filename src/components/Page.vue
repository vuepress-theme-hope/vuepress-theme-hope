<!--
 * @Author: Mr.Hope
 * @Date: 2019-10-07 19:18:03
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-10-10 17:57:27
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
    <Valine />
    <CopyrightFooter />
    <slot name="bottom" />
  </main>
</template>

<script>
import BreadCrumb from '@theme/components/BreadCrumb.vue';
import CopyrightFooter from '@theme/components/CopyrightFooter.vue';
import PageEdit from '@parent-theme/components/PageEdit.vue';
import PageInfo from '@theme/components/PageInfo.vue';
import PageNav from '@parent-theme/components/PageNav.vue';
import Valine from '@theme/components/Valine.vue';

export default {
  components: { BreadCrumb, CopyrightFooter, PageEdit, PageInfo, PageNav, Valine },
  props: ['sidebarItems']
};
</script>

<style lang="stylus">
@require '~@parent-theme/styles/wrapper.styl'

.page
  padding-bottom 2rem
  display block
</style>
