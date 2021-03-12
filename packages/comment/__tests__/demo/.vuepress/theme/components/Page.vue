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
import Comment from "@mr-hope/vuepress-plugin-comment/Comment.vue";
import PageEdit from "@parent-theme/components/PageEdit.vue";
import PageInfo from "@mr-hope/vuepress-plugin-comment/PageInfo.vue";
import PageNav from "@parent-theme/components/PageNav.vue";

export default {
  components: { Comment, PageEdit, PageInfo, PageNav },
  props: ["sidebarItems"],
};
</script>

<style lang="stylus">
@require '~@parent-theme/styles/wrapper'

.page
  padding-bottom 2rem
  display block
</style>
