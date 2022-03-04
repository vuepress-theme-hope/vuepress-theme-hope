import { computed, defineComponent, h } from "vue";

import ThemeColorPicker from "@theme-hope/module/outlook/components/ThemeColorPicker";
import { useThemeData, useThemeLocaleData } from "@theme-hope/composables";

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
        ? h("div", { class: "themecolor-wrapper" }, [
            h(
              "label",
              { class: "themecolor-title", for: "theme-color-picker" },
              locale.value
            ),
            h(ThemeColorPicker, { themeColor: themeColor.value }),
          ])
        : null;
  },
});
