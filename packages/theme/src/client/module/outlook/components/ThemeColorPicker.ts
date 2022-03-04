import { computed, defineComponent, h, onMounted, PropType } from "vue";
import { useThemeData } from "@theme-hope/composables";

import type { VNode } from "vue";

import "../styles/theme-color-picker.scss";

export default defineComponent({
  name: "ThemeColorPicker",

  props: {
    themeColor: {
      type: Object as PropType<Record<string, string>>,
      default: () => ({}),
    },
  },

  setup(props) {
    const themeData = useThemeData();

    const themeColor = computed(() => {
      const { themeColor } = themeData.value;

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

    return (): VNode =>
      h("ul", { id: "themecolor-picker" }, [
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
