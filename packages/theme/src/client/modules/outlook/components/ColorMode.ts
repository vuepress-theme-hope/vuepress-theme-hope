import type { VNode } from "vue";
import { computed, defineComponent, h } from "vue";

import { useThemeLocaleData } from "@theme-hope/composables/index";
import ColorModeSwitch from "@theme-hope/modules/outlook/components/ColorModeSwitch";
import { useDarkmode } from "@theme-hope/modules/outlook/composables/index";

import "../styles/color-mode.scss";

export default defineComponent({
  name: "ColorMode",

  setup() {
    const themeLocale = useThemeLocaleData();
    const { canToggle } = useDarkmode();

    const locale = computed(() => themeLocale.value.outlookLocales.darkmode);

    return (): VNode | null =>
      canToggle.value
        ? h("div", { class: "vp-color-mode" }, [
            h(
              "label",
              { class: "vp-color-mode-title", for: "color-mode-switch" },
              locale.value,
            ),
            h(ColorModeSwitch),
          ])
        : null;
  },
});
