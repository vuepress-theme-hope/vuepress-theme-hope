<template>
  <aside class="sidebar">
    <SidebarNavLinks />

    <slot name="top" />

    <SidebarLinks :items="sidebarItems" />

    <slot name="bottom" />
  </aside>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useSidebarItems } from "../../composables";
import SidebarNavLinks from "./NavLinks";
import SidebarLinks from "./SidebarLinks";

import "./styles/index.scss";

export default defineComponent({
  name: "Sidebar",

  components: {
    SidebarNavLinks,
    SidebarLinks,
  },

  setup() {
    const sidebarItems = useSidebarItems();
    return {
      sidebarItems,
    };
  },
});
</script>
