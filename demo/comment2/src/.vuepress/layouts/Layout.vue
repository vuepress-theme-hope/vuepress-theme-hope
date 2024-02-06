<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import ParentLayout from "@vuepress/theme-default/layouts/Layout.vue";
import { onMounted, onUnmounted, ref } from "vue";

const isDarkMode = ref(false);

onMounted(() => {
  const html = document.documentElement;

  isDarkMode.value = html.classList.contains("dark");

  // Watch theme change
  const observer = new MutationObserver(() => {
    isDarkMode.value = html.classList.contains("dark");
  });

  observer.observe(html, {
    attributeFilter: ["class"],
    attributes: true,
  });

  onUnmounted(() => {
    observer.disconnect();
  });
});
</script>

<template>
  <ParentLayout>
    <template #page-bottom>
      <!-- eslint-disable-next-line vue/no-undef-components -->
      <CommentService :darkmode="isDarkMode" />
    </template>
  </ParentLayout>
</template>
