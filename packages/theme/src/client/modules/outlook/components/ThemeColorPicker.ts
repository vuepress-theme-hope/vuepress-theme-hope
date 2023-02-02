import { type PropType, type VNode, defineComponent, h, onMounted } from "vue";
import { entries, keys } from "vuepress-shared/client";

import "../styles/theme-color-picker.scss";

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
      const themes = keys(props.themeColor).map((color) => `theme-${color}`);

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
        ...entries(props.themeColor).map(([color, value]) =>
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
