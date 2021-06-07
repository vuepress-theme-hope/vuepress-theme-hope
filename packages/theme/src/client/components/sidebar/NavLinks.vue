<template>
  <nav v-if="navbarLinks.length" class="navbar-links">
    <div v-for="item in navbarLinks" :key="item.text" class="navbar-links-item">
      <DropdownLink v-if="item.children" :item="item" />

      <NavLink v-else :item="item" />
    </div>
  </nav>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { isString } from "@vuepress/shared";

import {
  useNavLink,
  useNavbarLanguageDropdown,
  useNavbarRepo,
  useThemeLocaleData,
} from "../../composables";
import DropdownLink from "./DropdownLink.vue";
import NavLink from "../NavLink.vue";

import type { ComputedRef } from "vue";
import type {
  NavbarItem,
  NavbarGroup,
  ResolvedNavbarItem,
} from "../../../shared";

const resolveNavbarItem = (
  item: NavbarItem | NavbarGroup | string
): ResolvedNavbarItem => {
  if (isString(item)) {
    return useNavLink(item);
  }
  if ((item as NavbarGroup).children) {
    return {
      ...item,
      children: (item as NavbarGroup).children.map(resolveNavbarItem),
    };
  }
  return item as ResolvedNavbarItem;
};

const useNavbarConfig = (): ComputedRef<ResolvedNavbarItem[]> => {
  const themeLocale = useThemeLocaleData();
  return computed(() =>
    (themeLocale.value.navbar || []).map(resolveNavbarItem)
  );
};

export default defineComponent({
  name: "SidebarNavLinks",

  components: {
    NavLink,
    DropdownLink,
  },

  setup() {
    const navbarConfig = useNavbarConfig();
    const navbarLanguageDropdown = useNavbarLanguageDropdown();
    const navbarRepo = useNavbarRepo();

    const navbarLinks = computed(() => [
      ...navbarConfig.value,
      navbarLanguageDropdown.value,
      navbarRepo.value,
    ]);

    return {
      navbarLinks,
    };
  },
});
</script>
