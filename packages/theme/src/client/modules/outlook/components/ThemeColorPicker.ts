import type { PropType, VNode } from "vue";
import { computed, defineComponent, h, onMounted } from "vue";

import { useDarkMode } from "@theme-hope/modules/outlook/composables/index";

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
    themeColors: {
      type: Object as PropType<Record<string, string>>,
      required: true,
    },
  },

  setup(props) {
    const { isDarkMode } = useDarkMode();

    const activeThemeColors = computed(() => {
      const themeColors = { ...props.themeColors };

      for (const [name, color] of Object.entries(themeColors)) {
        if (name.includes("light")) {
          if (isDarkMode.value) {
            delete themeColors[name];
          } else {
            themeColors[name.replace("light-", "")] = color;
            delete themeColors[name];
          }
        }

        if (name.includes("dark")) {
          if (isDarkMode.value) {
            themeColors[name.replace("dark-", "")] = color;
            delete themeColors[name];
          } else {
            delete themeColors[name];
          }
        }
      }

      return Object.entries(themeColors).map(([name, color]) => ({
        name,
        color,
      }));
    });

    const setThemeColor = (name = ""): void => {
      const classes = document.documentElement.classList;
      const colorNames = activeThemeColors.value.map(({ name }) => name);

      if (!name) {
        localStorage.removeItem(THEME_COLOR_KEY);
        classes.remove(...colorNames);

        return;
      }

      classes.remove(
        ...colorNames.filter((themeColorClass) => themeColorClass !== name),
      );

      classes.add(name);
      localStorage.setItem(THEME_COLOR_KEY, name);
    };

    onMounted(() => {
      const theme = localStorage.getItem(THEME_COLOR_KEY);

      if (theme) setThemeColor(theme);
    });

    return (): VNode =>
      h("ul", { class: "vp-theme-color-picker", id: "theme-color-picker" }, [
        h(
          "li",
          h("span", {
            class: "theme-color",
            onClick: () => {
              setThemeColor();
            },
          }),
        ),
        activeThemeColors.value.map(({ name, color }) =>
          h(
            "li",
            h("span", {
              style: { background: color },
              onClick: () => {
                setThemeColor(name);
              },
            }),
          ),
        ),
      ]);
  },
});
