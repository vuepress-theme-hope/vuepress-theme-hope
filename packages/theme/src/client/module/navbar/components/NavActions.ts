import { computed, defineComponent, h, resolveComponent } from "vue";

import LanguageDropdown from "@theme-hope/module/navbar/components/LanguageDropdown";
import RepoLink from "@theme-hope/module/navbar/components/RepoLink";
import ToggleDarkModeButton from "@theme-hope/module/navbar/components/ToggleDarkModeButton";
import { useThemeLocaleData } from "@theme-hope/composables";

import type { VNode } from "vue";

import "../styles/navbar-actions.scss";

export default defineComponent({
  name: "NavActions",

  setup(_props, { slots }) {
    const themeLocale = useThemeLocaleData();

    const enableDarkmode = computed(
      () => themeLocale.value.darkmode !== "disable"
    );

    return (): VNode | null =>
      h("div", { class: "nav-actions-wrapper" }, [
        slots.before?.(),
        h("div", { class: ["nav-item"] }, h(LanguageDropdown)),
        h("div", { class: ["nav-item"] }, h(RepoLink)),
        enableDarkmode.value ? h(ToggleDarkModeButton) : null,
        h(resolveComponent("NavbarSearch")),
        slots.after?.(),
      ]);
  },
});
