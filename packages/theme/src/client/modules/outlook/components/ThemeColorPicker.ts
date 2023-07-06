import type { PropType, VNode } from "vue";
import { defineComponent, h, onMounted } from "vue";
import { entries, keys } from "vuepress-shared/client";

import "../styles/theme-color-picker.scss";

const THEME_COLOR_KEY = "VUEPRESS_THEME_COLOR";

export default defineComponent({
  name: "ThemeColorPicker",

  props: {
    /**
     * Theme color picker config
     *
     * 主题色选择器配置
     */
    themeColor: {
      type: Object as PropType<Record<string, string>>,
      required: true,
    },
  },

  setup(props) {
    const setThemeColor = (theme = ""): void => {
      const classes = document.documentElement.classList;
      const themes = keys(props.themeColor);

      if (!theme) {
        localStorage.removeItem(THEME_COLOR_KEY);
        classes.remove(...themes);

        return;
      }

      classes.remove(
        ...themes.filter((themeColorClass) => themeColorClass !== theme),
      );

      classes.add(theme);
      localStorage.setItem(THEME_COLOR_KEY, theme);
    };

    onMounted(() => {
      const theme = localStorage.getItem(THEME_COLOR_KEY);

      if (theme) setThemeColor(theme);
    });

    return (): VNode =>
      h("ul", { id: "theme-color-picker" }, [
        h(
          "li",
          h("span", {
            class: "theme-color",
            onClick: () => setThemeColor(),
          }),
        ),
        entries(props.themeColor).map(([color, value]) =>
          h(
            "li",
            h("span", {
              style: { background: value },
              onClick: () => setThemeColor(color),
            }),
          ),
        ),
      ]);
  },
});
