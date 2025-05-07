import type { VNode } from "vue";
import { computed, defineComponent, h } from "vue";

import ColorModeSwitch from "@theme-hope/components/appearance/ColorModeSwitch";
import { useDarkMode } from "@theme-hope/composables/useDarkMode";
import { useThemeLocale } from "@theme-hope/composables/useTheme";

import "../../styles/appearance/color-mode.scss";

export default defineComponent({
  name: "ColorMode",

  setup() {
    const themeLocale = useThemeLocale();
    const { canToggle } = useDarkMode();

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
