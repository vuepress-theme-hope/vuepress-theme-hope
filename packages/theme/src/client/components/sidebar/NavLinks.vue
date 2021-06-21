<template>
  <nav v-if="navbarLinks.length" class="sidebar-nav-links">
    <div v-for="item in navbarLinks" :key="item.text" class="navbar-links-item">
      <SidebarDropdownLink v-if="item.children" :item="item" />

      <NavLink v-else :item="item" />
    </div>

    <RepoLink />
  </nav>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import NavLink from "../NavLink";
import RepoLink from "../RepoLink";
import SidebarDropdownLink from "./DropdownLink.vue";
import { useNavbarConfig, useNavbarRepo } from "../../composables";

export default defineComponent({
  name: "SidebarNavLinks",

  components: {
    NavLink,
    RepoLink,
    SidebarDropdownLink,
  },

  setup() {
    const navbarConfig = useNavbarConfig();
    const navbarRepo = useNavbarRepo();

    const navbarLinks = computed(() => [
      ...navbarConfig.value,
      navbarRepo.value,
    ]);

    return {
      navbarLinks,
    };
  },
});
</script>
