import type { VNode } from "vue";
import { computed, defineComponent, h } from "vue";

import { useThemeLocaleData } from "@theme-hope/composables/index";
import AppearanceSwitch from "@theme-hope/modules/outlook/components/AppearanceSwitch";
import { useDarkmode } from "@theme-hope/modules/outlook/composables/index";

import "../styles/appearance-switch.scss";

export default defineComponent({
  name: "AppearanceMode",

  setup() {
    const themeLocale = useThemeLocaleData();
    const { canToggle } = useDarkmode();

    const locale = computed(() => themeLocale.value.outlookLocales.darkmode);

    return (): VNode | null =>
      canToggle.value
        ? h("div", { class: "appearance-wrapper" }, [
            h(
              "label",
              { class: "appearance-title", for: "appearance-switch" },
              locale.value,
            ),
            h(AppearanceSwitch),
          ])
        : null;
  },
});
