import { computed, defineComponent, h, resolveComponent } from "vue";

import { useThemeLocaleData } from "@theme-hope/composables";

import type { VNode } from "vue";

import "../styles/full-screen.scss";

export default defineComponent({
  name: "ToggleFullScreen",

  setup() {
    const themeLocale = useThemeLocaleData();
    const FullScreen = resolveComponent("FullScreen");

    const fullscreenLocale = computed(
      () => themeLocale.value.outlookLocales.fullscreen
    );

    return (): VNode =>
      h("div", { class: "fullscreen-wrapper" }, [
        h(
          "label",
          { class: "full-screen-title", for: "full-screen-switch" },
          fullscreenLocale.value
        ),
        h(FullScreen, { id: "full-screen-switch" }),
      ]);
  },
});
