import { fromEntries } from "@vuepress/helper/client";
import type { VNode } from "vue";
import { computed, defineComponent, h } from "vue";

import { useThemeLocaleData } from "@theme-hope/composables/index";
import ThemeColorPicker from "@theme-hope/modules/outlook/components/ThemeColorPicker";

import {
  enableThemeColor as _enableThemeColor,
  themeColors,
} from "../../../styles/variables.module.scss?module";
import "../styles/theme-color.scss";

export const enableThemeColor = _enableThemeColor === "true";

const themeColor = enableThemeColor
  ? fromEntries(
      themeColors
        .split("|")
        .map((color, index) => [`theme-${index + 1}`, color]),
    )
  : {};

export default defineComponent({
  name: "ThemeColor",

  setup() {
    const themeLocale = useThemeLocaleData();

    const locale = computed(() => themeLocale.value.outlookLocales.themeColor);

    return (): VNode | null =>
      enableThemeColor
        ? h("div", { class: "vp-theme-color" }, [
            h(
              "label",
              { class: "vp-theme-color-title", for: "theme-color-picker" },
              locale.value,
            ),
            h(ThemeColorPicker, { themeColor }),
          ])
        : null;
  },
});
