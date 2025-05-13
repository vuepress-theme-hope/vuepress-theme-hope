import type { VNode } from "vue";
import { defineComponent, h } from "vue";

import ColorModeSwitch from "@theme-hope/components/appearance/ColorModeSwitch";
import { useAppearanceLocale } from "@theme-hope/composables/appearance/useAppearanceLocale";
import { useDarkMode } from "@theme-hope/composables/useDarkMode";

import "../../styles/appearance/color-mode.scss";

export default defineComponent({
  name: "ColorMode",

  setup() {
    const appearanceLocale = useAppearanceLocale();
    const { canToggle } = useDarkMode();

    return (): VNode | null =>
      canToggle.value
        ? h("div", { class: "vp-color-mode" }, [
            h(
              "label",
              { class: "vp-color-mode-title", for: "color-mode-switch" },
              appearanceLocale.value.darkmode,
            ),
            h(ColorModeSwitch),
          ])
        : null;
  },
});
