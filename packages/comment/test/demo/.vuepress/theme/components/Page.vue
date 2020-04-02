<!--
 * @Author: Mr.Hope
 * @Date: 2019-10-07 19:18:03
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2020-04-02 19:33:13
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
import Comment from '@mr-hope/vuepress-plugin-comment/Comment.vue';
import PageEdit from '@parent-theme/components/PageEdit.vue';
import PageInfo from '@mr-hope/vuepress-plugin-comment/PageInfo.vue';
import PageNav from '@parent-theme/components/PageNav.vue';

export default {
  components: { Comment, PageEdit, PageInfo, PageNav },
  props: ['sidebarItems']
};
</script>

<style lang="stylus">
@require '~@parent-theme/styles/wrapper.styl'

.page
  padding-bottom 2rem
  display block
</style>
