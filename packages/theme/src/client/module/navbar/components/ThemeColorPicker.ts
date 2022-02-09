import { computed, defineComponent, h, onMounted } from "vue";
import { useThemeData, useThemeLocaleData } from "@theme-hope/composables";

import type { VNode } from "vue";

import "../styles/theme-color-picker.scss";

const DEFAULT_THEME_COLOR_CONFIG: Record<string, string> = {
  red: "#e74c3c",
  blue: "#3498db",
  green: "#3eaf7c",
  orange: "#f39c12",
  purple: "#8e44ad",
};

export default defineComponent({
  name: "ThemeColorPicker",

  setup() {
    const themeData = useThemeData();
    const themeLocaleData = useThemeLocaleData();

    const locale = computed(() => themeLocaleData.value.themeColorText);

    const themeColor = computed(() => {
      const { themeColor = DEFAULT_THEME_COLOR_CONFIG } = themeData.value;

      return themeColor === false ? null : themeColor;
    });

    const setThemeColor = (theme = ""): void => {
      if (themeColor.value) {
        const classes = document.documentElement.classList;
        const themes = Object.keys(themeColor.value).map(
          (color) => `theme-${color}`
        );

        if (!theme) {
          localStorage.removeItem("theme");
          classes.remove(...themes);

          return;
        }

        classes.remove(
          ...themes.filter((themeclass) => themeclass !== `theme-${theme}`)
        );

        classes.add(`theme-${theme}`);
        localStorage.setItem("theme", theme);
      }
    };

    onMounted(() => {
      const theme = localStorage.getItem("theme");

      if (theme) setThemeColor(theme);
    });

    return (): VNode[] | null =>
      themeColor.value
        ? [
            h(
              "label",
              { class: "theme-color-label", for: "theme-color-picker" },
              locale.value
            ),
            h("ul", { id: "theme-color-picker" }, [
              h(
                "li",
                h("span", {
                  class: "theme-color",
                  onClick: () => setThemeColor(),
                })
              ),
              ...Object.keys(themeColor.value).map((color) =>
                h(
                  "li",
                  h("span", {
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    style: { background: themeColor.value![color] },
                    onClick: () => setThemeColor(color),
                  })
                )
              ),
            ]),
          ]
        : null;
  },
});
