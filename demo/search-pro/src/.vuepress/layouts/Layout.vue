<script setup>
import ParentLayout from "@vuepress/theme-default/layouts/Layout.vue";
</script>

<template>
  <ParentLayout>
    <template #navbar-after>
      <SearchButton />
    </template>
  </ParentLayout>
</template>
