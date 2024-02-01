<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import ParentLayout from "@vuepress/theme-default/layouts/Layout.vue";
import { useBlogType } from "vuepress-plugin-blog2/client";

import ArticleList from "../components/ArticleList.vue";

const articles = useBlogType("article");
</script>

<template>
  <ParentLayout>
    <template #page>
      <main class="page">
        <ArticleList :items="articles.items" />
      </main>
    </template>
  </ParentLayout>
</template>
