<template>
  <ParentLayout>
    <template #page>
      <main class="page">
        <h1 class="timeline-title">Timeline</h1>
        <ArticleList :items="timelines.items" />
      </main>
    </template>
  </ParentLayout>
</template>
<script setup lang="ts">
import { useBlogType } from "vuepress-plugin-blog2/lib/client";

import ArticleList from "../components/ArticleList.vue";
import ParentLayout from "@vuepress/theme-default/lib/client/layouts/Layout.vue";

const timelines = useBlogType("timeline");
</script>
<style lang="scss">
.timeline-title {
  padding: 0;
  text-align: center;
}
</style>
