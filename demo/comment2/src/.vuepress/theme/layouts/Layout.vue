<template>
  <ParentLayout>
    <template #page-bottom>
      <CommentService :darkmode="isDarkmode" />
    </template>
  </ParentLayout>
</template>
<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import ParentLayout from "@vuepress/theme-default/lib/client/layouts/Layout.vue";

const isDarkmode = ref(false);

let observer;

onMounted(() => {
  const html = document.querySelector("html") as HTMLElement;

  isDarkmode.value = html.classList.contains("dark");

  // watch theme change
  observer = new MutationObserver(() => {
    isDarkmode.value = html.classList.contains("dark");
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
