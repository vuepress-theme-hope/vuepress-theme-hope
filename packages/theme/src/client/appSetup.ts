import { computed, provide, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { defineClientAppSetup, usePageFrontmatter } from "@vuepress/client";
import {
  resolveSidebarItems,
  sidebarItemsSymbol,
  useThemeLocaleData,
} from "./composables";
import type {
  HopeThemeNormalPageFrontmatter,
  ResolvedSidebarItem,
} from "../shared";

export default defineClientAppSetup(() => {
  // we need to access sidebar items in multiple components
  // so we make it global computed
  const router = useRouter();
  const route = useRoute();
  const themeLocale = useThemeLocaleData();
  const frontmatter = usePageFrontmatter<HopeThemeNormalPageFrontmatter>();

  const sidebarItems = ref<ResolvedSidebarItem[]>([]);

  // get sidebar config from frontmatter > themeConfig
  const sidebarConfig = computed(() =>
    frontmatter.value.home
      ? false
      : frontmatter.value.sidebar ?? themeLocale.value.sidebar ?? "auto"
  );
  const sidebarDepth = computed(
    () => frontmatter.value.sidebarDepth ?? themeLocale.value.sidebarDepth ?? 2
  );
  watch(
    [(): string => route.path, sidebarConfig, sidebarDepth],
    ([path, sidebarConfig, sidebarDepth], _, onInvalidate) => {
      let dirty = false;
      onInvalidate(() => {
        dirty = true;
      });

      void resolveSidebarItems(router, path, sidebarConfig, sidebarDepth).then(
        (items) => {
          if (!dirty) sidebarItems.value = items;
        }
      );
    },
    { deep: true, immediate: true }
  );
  provide(sidebarItemsSymbol, sidebarItems);
});
