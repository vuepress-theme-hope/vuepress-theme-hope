import { computed, defineComponent, h } from "vue";

import ThemeColorPicker from "@theme-hope/modules/outlook/components/ThemeColorPicker.js";
import {
  useThemeData,
  useThemeLocaleData,
} from "@theme-hope/composables/index.js";

import type { VNode } from "vue";

import "../styles/theme-color-picker.scss";

export default defineComponent({
  name: "ThemeColor",

  setup() {
    const themeData = useThemeData();
    const themeLocale = useThemeLocaleData();

    const locale = computed(() => themeLocale.value.outlookLocales.themeColor);

    const themeColor = computed(() => {
      const { themeColor } = themeData.value;

      return themeColor === false ? null : themeColor;
    });

    return (): VNode | null =>
      themeColor.value
        ? h("div", { class: "theme-color-wrapper" }, [
            h(
              "label",
              { class: "theme-color-title", for: "theme-color-picker" },
              locale.value
            ),
            h(ThemeColorPicker, { themeColor: themeColor.value }),
          ])
        : null;
  },
});
