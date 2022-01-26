import { computed, defineComponent, h, resolveComponent } from "vue";
import LanguageDropdown from "./LanguageDropdown";
import RepoLink from "./RepoLink";
import ToggleDarkModeButton from "./ToggleDarkModeButton";
import { useThemeLocaleData } from "../../composables";

import type { VNode } from "vue";

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
