import { computed, defineComponent, h } from "vue";

import AppearanceSwitch from "@theme-hope/module/outlook/components/AppearanceSwitch";

import { useThemeData, useThemeLocaleData } from "@theme-hope/composables";

import type { VNode } from "vue";

import "../styles/appearance-switch.scss";

export default defineComponent({
  name: "AppearanceMode",

  setup() {
    const themeData = useThemeData();
    const themeLocale = useThemeLocaleData();

    const locale = computed(() => themeLocale.value.outlookLocales.darkmode);

    const darkmode = computed(() => themeData.value.darkmode);

    const enable = computed(
      () => darkmode.value === "switch" || darkmode.value === "toggle"
    );

    return (): VNode | null =>
      enable.value
        ? h("div", { class: "appearance-wrapper" }, [
            h(
              "label",
              { class: "appearance-title", for: "appearance-switch" },
              locale.value
            ),
            h(AppearanceSwitch),
          ])
        : null;
  },
});
