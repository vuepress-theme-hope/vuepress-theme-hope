<template>
  <ParentLayout>
    <template #page-bottom>
      <CommentService :darkmode="isDarkMode" />
    </template>
  </ParentLayout>
</template>
<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import ParentLayout from "@vuepress/theme-default/layouts/Layout.vue";

const isDarkMode = ref(false);

let observer;

onMounted(() => {
  const html = document.querySelector("html") as HTMLElement;

  isDarkMode.value = html.classList.contains("dark");

  // watch theme change
  observer = new MutationObserver(() => {
    isDarkMode.value = html.classList.contains("dark");
  });

  observer.observe(html, {
    attributeFilter: ["class"],
    attributes: true,
  });
});

onBeforeUnmount(() => {
  observer.disconnect();
});
</script>
