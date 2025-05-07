import { entries, fromEntries } from "@vuepress/helper/client";
import type { VNode } from "vue";
import { computed, defineComponent, h } from "vue";

import ThemeColorPicker from "@theme-hope/components/appearance/ThemeColorPicker";
import { useThemeLocale } from "@theme-hope/composables/useTheme";

import cssVariables from "../../styles/variables.module.scss";
import "../../styles/appearance/theme-color.scss";

export const hasMultipleThemeColors =
  cssVariables.hasMultipleThemeColors === "true";

const themeColors = hasMultipleThemeColors
  ? fromEntries(
      entries(cssVariables).filter(([key]) => key.startsWith("theme-")),
    )
  : {};

export default defineComponent({
  name: "ThemeColor",

  setup() {
    const themeLocale = useThemeLocale();

    const locale = computed(() => themeLocale.value.outlookLocales.themeColor);

    return (): VNode | null =>
      hasMultipleThemeColors
        ? h("div", { class: "vp-theme-color" }, [
            h(
              "label",
              { class: "vp-theme-color-title", for: "theme-color-picker" },
              locale.value,
            ),
            h(ThemeColorPicker, { themeColors }),
          ])
        : null;
  },
});
