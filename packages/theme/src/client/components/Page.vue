<template>
  <main class="page">
    <slot name="top" />

    <PageInfo />

    <div class="theme-default-content">
      <Content />
    </div>

    <PageMeta />

    <PageNav />

    <Comment />

    <slot name="bottom" />
  </main>
</template>

<script>
import { defineComponent } from "vue";
import PageMeta from "./PageMeta.vue";
import PageNav from "./PageNav.vue";

export default defineComponent({
  name: "Page",

  components: {
    PageMeta,
    PageNav,
  },
});
</script>
