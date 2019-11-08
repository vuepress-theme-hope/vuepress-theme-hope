<!--
 * @Author: Mr.Hope
 * @Date: 2019-10-07 19:18:03
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-11-06 23:57:39
 * @Description: 页面主体
 *
 * 为每个页面都添加了 路径导航 / 页脚 支持
-->
<template>
  <main class="page">
    <slot name="top" />

    <PageInfo />
    <Content class="theme-default-content" />
    <PageEdit />

    <PageNav v-bind="{ sidebarItems }" />
    <Comment />
    <slot name="bottom" />
  </main>
</template>

<script>
import PageEdit from '@parent-theme/components/PageEdit.vue';
import PageNav from '@parent-theme/components/PageNav.vue';

export default {
  components: { PageEdit, PageNav },
  props: ['sidebarItems']
};
</script>

<style lang="stylus">
@require '~@parent-theme/styles/wrapper.styl'
// @require '~@vuepress/theme-default/styles/wrapper.styl'

.page
  padding-bottom 2rem
  display block
</style>
