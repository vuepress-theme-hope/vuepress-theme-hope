<template>
  <aside class="sidebar">
    <NavLinks />

    <slot name="top" />

    <ul class="sidebar-links">
      <SidebarChild
        v-for="item in sidebarItems"
        :key="item.link || item.text"
        :item="item"
      />
    </ul>

    <slot name="bottom" />
  </aside>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useSidebarItems } from "../../composables";
import NavLinks from "./NavLinks.vue";
import { SidebarChild } from "./SidebarChild";

export default defineComponent({
  name: "Sidebar",

  components: {
    NavLinks,
    SidebarChild,
  },

  setup() {
    const sidebarItems = useSidebarItems();
    return {
      sidebarItems,
    };
  },
});
</script>
