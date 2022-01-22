<script setup lang="ts">
import Layout from "@vuepress/theme-default/lib/client/layouts/Layout.vue";
</script>

<template>
  <Layout>
    <template #page-bottom><CommentService /></template>
  </Layout>
</template>
