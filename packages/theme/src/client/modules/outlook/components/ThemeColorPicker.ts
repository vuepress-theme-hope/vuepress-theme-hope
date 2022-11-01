import { defineComponent, h, onMounted, PropType } from "vue";

import type { VNode } from "vue";

import "../styles/theme-color-picker.scss";

export default defineComponent({
  name: "ThemeColorPicker",

  props: {
    themeColor: {
      type: Object as PropType<Record<string, string>>,
      required: true,
    },
  },

  setup(props) {
    const setThemeColor = (theme = ""): void => {
      const classes = document.documentElement.classList;
      const themes = Object.keys(props.themeColor).map(
        (color) => `theme-${color}`
      );

      if (!theme) {
        localStorage.removeItem("theme");
        classes.remove(...themes);

        return;
      }

      classes.remove(
        ...themes.filter(
          (themeColorClass) => themeColorClass !== `theme-${theme}`
        )
      );

      classes.add(`theme-${theme}`);
      localStorage.setItem("theme", theme);
    };

    onMounted(() => {
      const theme = localStorage.getItem("theme");

      if (theme) setThemeColor(theme);
    });

    return (): VNode =>
      h("ul", { id: "theme-color-picker" }, [
        h(
          "li",
          h("span", {
            class: "theme-color",
            onClick: () => setThemeColor(),
          })
        ),
        ...Object.entries(props.themeColor).map(([color, value]) =>
          h(
            "li",
            h("span", {
              style: { background: value },
              onClick: () => setThemeColor(color),
            })
          )
        ),
      ]);
  },
});
