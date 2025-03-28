import { entries, fromEntries } from "@vuepress/helper/client";
import type { VNode } from "vue";
import { computed, defineComponent, h } from "vue";

import { useThemeLocaleData } from "@theme-hope/composables/index";
import ThemeColorPicker from "@theme-hope/modules/outlook/components/ThemeColorPicker";

import cssVariables from "../../../styles/variables.module.scss";
import "../styles/theme-color.scss";

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
    const themeLocale = useThemeLocaleData();

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
