<template>
  <button
    class="toggle-sidebar-button"
    title="Toggle Sidebar"
    @click="$emit('toggle')"
  >
    <span class="icon" />
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ToggleSidebarButton",

  emits: ["toggle"],
});
</script>
